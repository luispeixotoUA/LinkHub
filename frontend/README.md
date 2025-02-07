# LinkHub Frontend

## 📋 Sobre o Projeto

O LinkHub é uma aplicação web que permite aos utilizadores criar uma página personalizada para partilhar os seus links importantes. Similar ao Linktree, mas com funcionalidades avançadas de personalização e análise de métricas.

### ✨ Principais Funcionalidades

- 👤 Sistema completo de autenticação
- 🔗 Gestão intuitiva de links com drag-and-drop
- 🎨 Personalização visual avançada
- 📊 Analytics detalhado
- 🎯 Métricas de visualização e cliques
- 👑 Painel de administração

## 🚀 Para correr o Projeto

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn
- [Backend do LinkHub](https://github.com/luispeixotoUA/LinkHub/tree/main/linkhub-api) em execução

### Instalação

1. Clonar o repositório
```
git clone https://github.com/luispeixotoUA/LinkHub/tree/main/frontend
```

2. Entrar no projeto
```
cd frontend
```

3. Instalar as dependências
```
npm install
# ou
yarn install
```

4. Iniciar o servidor
```
npm run dev
# ou
yarn dev
```

## 🛠️ Tecnologias

- [Nuxt.js 3](https://nuxt.com/) - Framework Vue.js
- [Vue 3](https://vuejs.org/) - Framework JavaScript
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS

## 📦 Estrutura do Projeto

```
frontend/
├── components/        # Componentes Vue reutilizáveis
├── composables/       # Composables Vue
├── middleware/        # Middlewares Vue
├── pages/            # Páginas da aplicação
├── services/         # Serviços e API
└── utils/            # Utilitários
```

## 🔐 Autenticação

O sistema utiliza autenticação JWT. Os tokens são armazenados localmente e geridos através de um composable dedicado.

## 🎨 Personalização

Os utilizadores podem personalizar suas páginas através de:
- Temas predefinidos
- Cores personalizadas
- Estilos de bordas

## 📊 Analytics

O sistema inclui métricas detalhadas:
- Visualizações de página
- Cliques por link

## 👑 Painel Admin

Funcionalidades exclusivas para administradores:
- Gestão de utilizadores

## ✒️ Autor

* **Luis Peixoto** - *2402741*
