# Projeto Bitcoin WebSocket

Projeto educacional simples com backend em Go e frontend em React para demonstrar comunicação via WebSocket.

## 📁 Estrutura do Projeto

```
golang_api/
├── backend/          # Servidor Go com WebSocket
│   ├── main.go
│   ├── go.mod
│   └── README.md
└── frontend/         # Cliente React
    ├── src/
    ├── public/
    ├── package.json
    └── README.md
```

## 🚀 Como Executar

### Backend (Terminal 1)

```bash
cd backend
go mod download
go run main.go
```

O servidor estará rodando em `http://localhost:8080`

### Frontend (Terminal 2)

```bash
cd frontend
npm install
npm start
```

O aplicativo estará disponível em `http://localhost:3000`

## 📝 Funcionamento

- **Backend**: Servidor WebSocket em Go que envia o preço do Bitcoin a cada 2 segundos
- **Frontend**: Aplicação React que se conecta ao WebSocket e exibe o preço em tempo real
- **Preço**: Simulado para fins educacionais (valores aleatórios entre ~44.500 e ~45.500)

## 🎯 Características

- ✅ Código simples e educacional
- ✅ WebSocket em tempo real
- ✅ Interface responsiva
- ✅ Atualizações automáticas
- ✅ Sem complexidade desnecessária

## 📚 Tecnologias

- **Backend**: Go 1.21, Gorilla WebSocket
- **Frontend**: React 18, WebSocket API nativo
