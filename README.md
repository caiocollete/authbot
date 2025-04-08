# 🤖 Discord Bot - Token Generator

Este é um bot para Discord feito em **Node.js** usando a biblioteca **discord.js**, com funcionalidades como geração de tokens e visualização de usuários.

## 🚀 Funcionalidades

- `/ping` — Verifica se o bot está online.
- `/echo <mensagem>` — O bot repete a mensagem enviada.
- `/gen <mensagem>` — Gera um token com base na mensagem. Ex "/gen 7d" ou para gerar uma chave LIFETIME "/gen lf"
- `/users` — Mostra os usuários cadastrados (Username, email e tempo de restante da key).

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/)
- [discord.js](https://discord.js.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)

## 📦 Instalação

```bash
git clone git@github.com:caiocollete/authbot.git
cd authbot
npm install
```

Crie um arquivo `.env` com seu token do Discord:

```env
DISCORD_TOKEN=seu_token_aqui
CLIENT_ID=seu_client_aqui
GUILD_ID=seu_guild_aqui
```

## ✅ Rodando o Bot

```bash
node index.js
```

## 🧩 Comandos Slash

Certifique-se de registrar os comandos com a API do Discord. Você pode usar o método de deploy de comandos em outro script como `deploy-commands.js`.