# Backend - Bitcoin WebSocket

Backend simples em Go que disponibiliza um WebSocket para enviar o preço do Bitcoin em tempo real.

## Como executar

```bash
# Instalar dependências
go mod download

# Executar o servidor
go run main.go
```

O servidor estará disponível em `ws://localhost:8080/ws`

## Funcionamento

- O servidor WebSocket envia o preço do Bitcoin a cada 2 segundos
- O preço é simulado (valor aleatório entre ~44500 e ~45500)
- Em produção, você pode integrar com APIs reais como CoinGecko ou Binance
