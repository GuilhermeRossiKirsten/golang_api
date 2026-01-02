# Frontend - Bitcoin WebSocket Client

Frontend simples em React que consome o WebSocket do backend e exibe o preço do Bitcoin em tempo real.

## Como executar

```bash
# Instalar dependências
npm install

# Executar o aplicativo
npm start
```

O aplicativo estará disponível em `http://localhost:3000`

## Requisitos

- O backend deve estar rodando em `http://localhost:8080`
- Node.js versão 14 ou superior

## Funcionamento

- Conecta ao WebSocket em `ws://localhost:8080/ws`
- Recebe atualizações de preço a cada 2 segundos
- Exibe o preço formatado e o horário da atualização
- Interface simples e responsiva
