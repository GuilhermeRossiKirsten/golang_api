# Bitcoin Price Tracker - Lorenzo Design System

Uma aplicação web moderna de rastreamento de preços do Bitcoin em tempo real, construída com React e Go, usando o **Lorenzo Motocross Design System**.

## 🎨 Design System Implementado

Este projeto foi completamente redesenhado usando o Lorenzo Design System, um sistema de design ousado e esportivo originalmente criado para sites de atletas de alta performance.

### Características Visuais

- **Paleta de Cores**: Bitcoin Orange (#f7931a) como cor de destaque sobre fundos escuros
- **Tipografia**: Roboto para corpo, Oswald para títulos
- **Animações**: Framer Motion para transições suaves e efeitos de scroll
- **Layout**: Mobile-first com breakpoints responsivos

## 🚀 Tecnologias

### Frontend

- **React 18** - Framework JavaScript
- **Framer Motion** - Biblioteca de animações
- **Chart.js** - Visualização de dados
- **Lucide React** - Ícones modernos
- **CSS Variables** - Sistema de design tokens

### Backend

- **Go** - Servidor WebSocket
- **Gorilla WebSocket** - Conexões em tempo real

## 📦 Estrutura do Projeto

```
frontend/
├── public/
│   └── index.html          # Google Fonts incluídas
├── src/
│   ├── components/         # Componentes do Design System
│   │   ├── Header.js       # Header fixo com navegação
│   │   ├── HeroSection.js  # Hero com animações parallax
│   │   ├── StatsSection.js # Estatísticas em tempo real
│   │   ├── ChartSection.js # Gráfico de histórico
│   │   ├── AboutSection.js # Seção informativa
│   │   └── Footer.js       # Footer completo
│   ├── App.js              # Componente principal
│   ├── App.css             # Estilos globais
│   ├── index.css           # Design tokens e variáveis
│   └── index.js            # Entry point
└── package.json
```

## 🎯 Componentes

### Header

- Navegação fixa com scroll detection
- Menu responsivo mobile
- Smooth scroll para seções
- Logo animado

### Hero Section

- Display do preço em destaque
- Status da conexão WebSocket
- Animações de parallax
- Background dinâmico

### Stats Section

- Cards de estatísticas em tempo real
- Ícones animados
- Grid responsivo
- Informações detalhadas

### Chart Section

- Gráfico de linha interativo
- Estatísticas min/max/avg
- Estilização customizada
- Performance otimizada

### About Section

- Cards de features
- Tech stack display
- Animações on scroll
- Layout modular

### Footer

- Links organizados
- Social media
- Copyright dinâmico
- Layout multi-coluna

## 🎨 Sistema de Cores

```css
--lorenzo-dark: #1a1a1a          /* Fundo principal */
--lorenzo-accent: #f7931a         /* Bitcoin Orange */
--lorenzo-light: #e8e8e3          /* Texto claro */
--success-green: #10b981          /* Positivo */
--danger-red: #ef4444             /* Negativo */
```

## 📱 Responsividade

Breakpoints implementados:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Instalação

```bash
# Instalar dependências
cd frontend
npm install

# Iniciar desenvolvimento
npm start

# Build para produção
npm run build
```

## 🌐 WebSocket

O frontend conecta automaticamente ao backend Go:

- Local: `ws://localhost:8080/ws`
- Codespaces: Auto-detecta e usa `wss://`

## ✨ Funcionalidades

### Tempo Real

- ✅ Conexão WebSocket persistente
- ✅ Atualizações instantâneas de preço
- ✅ Histórico visual com gráfico
- ✅ Estatísticas ao vivo

### Animações

- ✅ Parallax scrolling
- ✅ Fade in ao entrar no viewport
- ✅ Hover effects nos cards
- ✅ Transições suaves

### UX

- ✅ Smooth scroll entre seções
- ✅ Menu mobile responsivo
- ✅ Loading states
- ✅ Status de conexão visual

## 🎓 Design System Adaptado

O Lorenzo Design System foi adaptado para o contexto de criptomoedas:

| Original                   | Adaptação                    |
| -------------------------- | ---------------------------- |
| Verde Neon Motocross       | Bitcoin Orange               |
| Temas de Esportes Radicais | Tecnologia & Finanças        |
| Hero com imagens de atleta | Hero com dados em tempo real |
| Galeria de fotos           | Gráfico de preços            |
| Stats de competições       | Stats de mercado             |

## 📄 Licença

Este projeto usa o Lorenzo Design System adaptado para demonstração de tecnologias web.

## 🤝 Contribuindo

Para adicionar novos componentes seguindo o design system:

1. Use as variáveis CSS de `index.css`
2. Siga a estrutura de componentes existentes
3. Implemente animações com Framer Motion
4. Mantenha responsividade mobile-first
5. Use tipografia Oswald para títulos, Roboto para corpo

---

**Desenvolvido com Lorenzo Design System** 🏍️ → 🪙
