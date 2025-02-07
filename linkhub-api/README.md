# LinkHub API

API REST para a plataforma LinkHub, desenvolvida com Node.js, Express e MongoDB.

## 📋 Sobre

Backend do LinkHub, fornece endpoints para gestão de links, utilizadores, personalização e análise de métricas.

### ⚡ Principais Funcionalidades

- 🔐 Autenticação JWT
- 🔗 CRUD completo de links
- 📊 Sistema de métricas
- 👥 Gestão de utilizadores
- 🎨 Gestão de temas
- 👑 Funções administrativas

## 🚀 Configuração

### Pré-requisitos

- Node.js (v16+)
- MongoDB
- npm ou yarn

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/luispeixotoUA/LinkHub/tree/main/linkhub-api
```

2. Entrar no diretório

```bash
cd linkhub-api
```

3. Instalar as dependências

```bash
npm install
```

4. É necessário iniciar o MongoDB via Docker Compose na raiz do projeto (**se ainda não estiver a correr**)

```bash
docker-compose up -d
```

Isto irá:

- Criar um container MongoDB
- Expor a porta 27017
- Criar um volume persistente para os dados

###

5. Iniciar o servidor
```bash
npm run start
```

## 🛠️ Tecnologias

- Node.js
- Express
- MongoDB (Mongoose)
- JWT
- bcrypt

## 📦 Estrutura do Projeto
```
linkhub-api/
├── config/           # Configurações
├── controllers/      # Controladores
├── services/        # Serviços
├── repositories/      # Repositórios
├── middlewares/       # Middlewares
├── models/          # Modelos
└── routes/          # Rotas
```

## 📚 API Endpoints

### Autenticação
- `POST /auth/register` - Registo de novo utilizador
- `POST /auth/login` - Login de utilizador (obtém token)

### Utilizadores
- `GET /users` - Obtém perfil privado (requer auth)
- `GET /users/getAll` - Lista todos utilizadores (requer auth)
- `PUT /users/profile` - Atualiza perfil (requer auth)
- `GET /users/:url` - Obtém perfil público de utilizador

### Links (todos requerem auth)
- `GET /links` - Lista links do utilizador
- `POST /links` - Cria novo link
- `POST /links/bulk` - Cria múltiplos links
- `GET /links/user/:username` - Obtém links por username
- `GET /links/:id` - Obtém link específico
- `PUT /links/:id` - Atualiza link
- `DELETE /links/:id` - Remove link
- `PATCH /links/reorder` - Reordena links

### Métricas
- `GET /metrics/dashboard` - Dashboard de métricas (requer auth)
- `GET /metrics/activity` - Atividade recente (requer auth)
- `POST /metrics/link/:id/click` - Regista clique em link
- `POST /metrics/profile/:username/view` - Regista visualização de perfil


## 💾 Base de Dados

### Tabelas Principais

- Users - Utilizadores, perfis e configurações
- Links - Links e ordem
- Metrics - Métricas e análises


## 🔒 Segurança

- Autenticação via JWT
- Encriptação de passwords com bcrypt


## ✒️ Autor

* **Luis Peixoto** - *2402741*