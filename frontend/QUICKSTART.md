# 🚀 Guia Rápido - Lorenzo Design System no Bitcoin Tracker

## ✅ O que foi implementado

### 1. **Design Tokens** (index.css)

- Variáveis CSS para cores, tipografia, espaçamento
- Tema Bitcoin (orange #f7931a)
- Animações e transições customizadas

### 2. **Google Fonts** (index.html)

- Roboto (300, 400, 500, 700, 900)
- Oswald (300, 400, 500, 700)
- Libre Baskerville (400, 700)

### 3. **Componentes Criados**

#### Header (Header.js + Header.css)

```javascript
import Header from "./components/Header";
// Navegação fixa, menu mobile, smooth scroll
```

#### Hero Section (HeroSection.js + HeroSection.css)

```javascript
<HeroSection price={price} status={status} />
// Display de preço em destaque, animações parallax
```

#### Stats Section (StatsSection.js + StatsSection.css)

```javascript
<StatsSection
  price={price}
  timestamp={timestamp}
  updateCount={updateCount}
  priceHistory={priceHistory}
/>
// Cards de estatísticas em tempo real
```

#### Chart Section (ChartSection.js + ChartSection.css)

```javascript
<ChartSection priceHistory={priceHistory} timeLabels={timeLabels} />
// Gráfico com design customizado
```

#### About Section (AboutSection.js + AboutSection.css)

```javascript
<AboutSection />
// Features e tech stack
```

#### Footer (Footer.js + Footer.css)

```javascript
<Footer />
// Links, social, copyright
```

### 4. **Bibliotecas Adicionadas**

- `framer-motion` - Animações
- `lucide-react` - Ícones

## 🎨 Como Usar o Design System

### Cores

```css
/* Use as variáveis CSS */
color: var(--lorenzo-accent); /* Bitcoin orange */
background: var(--lorenzo-dark); /* Fundo escuro */
color: var(--lorenzo-text-light); /* Texto claro */
```

### Tipografia

```jsx
<h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight">
  TÍTULO <span style={{ color: "var(--lorenzo-accent)" }}>DESTAQUE</span>
</h1>
```

### Animações

```jsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Conteúdo animado
</motion.div>;
```

### Ícones

```jsx
import { TrendingUp, Activity, Clock } from "lucide-react";

<TrendingUp size={32} color="var(--lorenzo-accent)" />;
```

## 📝 Para Iniciar o Projeto

```bash
# 1. Instalar dependências
cd /workspaces/golang_api/frontend
npm install

# 2. Iniciar desenvolvimento
npm start

# 3. Abrir no navegador
# http://localhost:3000
```

## 🎯 Estrutura da Página

```
App
├── Header (fixo no topo)
├── Main
│   ├── HeroSection (#hero)
│   ├── StatsSection (#stats)
│   ├── ChartSection (#chart)
│   └── AboutSection (#about)
└── Footer
```

## 🔧 Personalizações Rápidas

### Mudar Cor de Destaque

Em `index.css`:

```css
:root {
  --lorenzo-accent: #SUA_COR; /* Mude aqui */
}
```

### Adicionar Nova Seção

1. Copie estrutura de qualquer Section.js
2. Ajuste conteúdo
3. Importe e adicione em App.js
4. Adicione link no Header.js

### Customizar Animações

Em qualquer component com motion:

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    duration: 0.8,      // duração
    delay: 0.2,         // delay
    ease: "easeOut"     // easing
  }}
>
```

## 🎨 Classes CSS Úteis

```css
/* Layout */
.max-w-7xl mx-auto px-6      /* Container centralizado */
.grid grid-cols-1 md:grid-cols-2 gap-6    /* Grid responsivo */

/* Texto */
.text-4xl md:text-6xl        /* Tamanho responsivo */
.font-black uppercase        /* Bold + uppercase */
.tracking-tight              /* Letter spacing */

/* Animações */
.transition-smooth           /* Transição suave */
.hover-scale:hover           /* Escala no hover */
```

## 📚 Componentes Reutilizáveis

### Card Padrão

```jsx
<div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8">
  {/* Conteúdo */}
</div>
```

### Botão CTA

```jsx
<button className="bg-[var(--lorenzo-accent)] text-black px-8 py-4 rounded-lg font-bold uppercase hover:scale-105 transition-all">
  Clique Aqui
</button>
```

### Título de Seção

```jsx
<h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-center mb-16">
  TÍTULO <span style={{ color: "var(--lorenzo-accent)" }}>DESTAQUE</span>
</h2>
```

## 🐛 Troubleshooting

### Fontes não carregam

✅ Verifique que index.html tem os links do Google Fonts

### Animações não funcionam

✅ Confirme que framer-motion está instalado: `npm install framer-motion`

### Ícones não aparecem

✅ Confirme que lucide-react está instalado: `npm install lucide-react`

### Layout quebrado

✅ Verifique que index.css tem todas as variáveis CSS

## 🎓 Próximos Passos

1. ✅ **Iniciado**: Design System implementado
2. ⏳ **Testar**: Abrir no navegador e verificar
3. 🔄 **Personalizar**: Ajustar cores/conteúdo para seu caso
4. 🚀 **Deploy**: Build de produção quando pronto

## 📖 Documentação Completa

Ver [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) para documentação detalhada.

---

**Sistema implementado com sucesso!** 🎉

Para iniciar: `npm start`
