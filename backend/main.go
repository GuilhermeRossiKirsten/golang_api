package main

import (
	"log"
	"math"
	"math/rand"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Permite todas as origens (apenas para desenvolvimento)
	},
}

type BitcoinPrice struct {
	Price     float64 `json:"price"`
	Timestamp string  `json:"timestamp"`
}

// Hub gerencia todas as conexões WebSocket
type Hub struct {
	clients    map[*websocket.Conn]bool
	broadcast  chan BitcoinPrice
	register   chan *websocket.Conn
	unregister chan *websocket.Conn
	mutex      sync.RWMutex
	history    []BitcoinPrice // Buffer circular com histórico
	maxHistory int
}

func newHub() *Hub {
	return &Hub{
		clients:    make(map[*websocket.Conn]bool),
		broadcast:  make(chan BitcoinPrice, 256),
		register:   make(chan *websocket.Conn),
		unregister: make(chan *websocket.Conn),
		history:    make([]BitcoinPrice, 0, 200),
		maxHistory: 200,
	}
}

// reset limpa o histórico e reinicia o contador
func (h *Hub) reset() {
	h.mutex.Lock()
	h.history = make([]BitcoinPrice, 0, h.maxHistory)
	h.mutex.Unlock()
	log.Println("🔄 Histórico resetado")
}

// run gerencia o registro/desregistro de clientes e broadcast
func (h *Hub) run() {
	for {
		select {
		case conn := <-h.register:
			h.mutex.Lock()
			h.clients[conn] = true

			// Envia todo o histórico para o novo cliente
			for _, price := range h.history {
				if err := conn.WriteJSON(price); err != nil {
					log.Printf("Erro ao enviar histórico: %v", err)
					delete(h.clients, conn)
					conn.Close()
					break
				}
			}

			log.Printf("Cliente conectado e recebeu %d pontos de histórico. Total de clientes: %d", len(h.history), len(h.clients))
			h.mutex.Unlock()

		case conn := <-h.unregister:
			h.mutex.Lock()
			if _, ok := h.clients[conn]; ok {
				delete(h.clients, conn)
				conn.Close()
				log.Printf("Cliente desconectado. Total: %d", len(h.clients))
			}
			h.mutex.Unlock()

		case price := <-h.broadcast:
			h.mutex.Lock()
			// Adiciona ao histórico
			h.history = append(h.history, price)
			if len(h.history) > h.maxHistory {
				h.history = h.history[len(h.history)-h.maxHistory:]
			}
			h.mutex.Unlock()

			// Envia para todos os clientes
			h.mutex.RLock()
			for conn := range h.clients {
				if err := conn.WriteJSON(price); err != nil {
					log.Printf("Erro ao enviar dados para cliente: %v", err)
					go func(c *websocket.Conn) {
						h.unregister <- c
					}(conn)
				}
			}
			h.mutex.RUnlock()
		}
	}
}

var (
	hub          = newHub()
	currentPrice = 10000.0
	trend        = 0.0 // Tendência de mercado (-1 a 1)
	volatility   = 500.0
	lastUpdate   = time.Now()
	pointCounter = 0 // Contador de pontos enviados
	counterMutex sync.Mutex
)

// Simula o preço do Bitcoin com quedas e valorizações realistas
func getBitcoinPrice() float64 {
	// Calcula tempo decorrido desde última atualização
	elapsed := time.Since(lastUpdate).Seconds()
	lastUpdate = time.Now()

	// Atualiza a tendência de mercado (muda gradualmente)
	trendChange := (rand.Float64() - 0.5) * 0.1
	trend = math.Max(-1, math.Min(1, trend+trendChange))

	// Variação aleatória baseada na volatilidade
	randomChange := (rand.Float64()*2 - 1) * volatility * math.Sqrt(elapsed)

	// Movimento baseado na tendência (bull ou bear market)
	trendMovement := trend * 100 * elapsed

	// Atualiza o preço
	currentPrice += randomChange + trendMovement

	// Mantém o preço em limites razoáveis (10k a 15k)
	if currentPrice < 10000 {
		currentPrice = 10000
		trend = 0.5 // Força recuperação
	}
	if currentPrice > 15000 {
		currentPrice = 15000
		trend = -0.5 // Força correção
	}

	return currentPrice
}

// priceGenerator gera preços continuamente e faz broadcast para todos os clientes
func priceGenerator() {
	ticker := time.NewTicker(50 * time.Millisecond)
	defer ticker.Stop()

	for range ticker.C {
		price := getBitcoinPrice()
		data := BitcoinPrice{
			Price:     price,
			Timestamp: time.Now().Format("15:04:05"),
		}
		hub.broadcast <- data
	}
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Erro ao fazer upgrade:", err)
		return
	}

	// Registra o novo cliente
	hub.register <- conn

	// Mantém a conexão viva até que seja fechada
	// O hub vai enviar os dados para este cliente
	for {
		if _, _, err := conn.ReadMessage(); err != nil {
			hub.unregister <- conn
			break
		}
	}
}

func handleReset(w http.ResponseWriter, r *http.Request) {
	// Permite CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	// Reseta o histórico do hub
	hub.reset()

	// Reseta o contador de pontos
	counterMutex.Lock()
	pointCounter = 0
	counterMutex.Unlock()

	// Reseta o preço inicial
	currentPrice = 10000.0
	trend = 0.0

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"ok","message":"Cache resetado com sucesso"}`))
	log.Println("✅ Cache e contador resetados via API")
}

func main() {
	// Inicializa gerador de números aleatórios
	rand.Seed(time.Now().UnixNano())

	// Inicia o hub de broadcast
	go hub.run()

	// Inicia o gerador de preços (único para todos os clientes)
	go priceGenerator()

	http.HandleFunc("/ws", handleWebSocket)
	http.HandleFunc("/reset", handleReset)

	log.Println("Servidor WebSocket rodando na porta 8080")
	log.Println("Hub de broadcast ativo - todos os clientes receberão os mesmos dados")
	log.Println("Endpoint /reset disponível para limpar o cache")
	log.Fatal(http.ListenAndServe("0.0.0.0:8080", nil))
}
