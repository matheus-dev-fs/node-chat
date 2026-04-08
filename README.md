# Node Chat (Socket.IO) — Projeto de Estudo

Este projeto foi desenvolvido durante o curso de Node.js da **B7WEB** (aula de chat com sockets), porém **foi amplamente aprimorado por mim em relação ao projeto original do curso**, com várias melhorias de arquitetura, organização do código e experiência de desenvolvimento.

O objetivo é estudar comunicação em tempo real usando **Socket.IO**, praticando também build do cliente, organização em módulos e padronização do projeto.

---

## Visão geral

Aplicação de chat em tempo real com:

- Conexão de múltiplos usuários via Socket.IO
- Atualização de lista de usuários conectados
- Envio/recebimento de mensagens em tempo real
- Interface simples servida em `public/`

---

## Stack / Tecnologias

### Backend

- Node.js
- Express
- Socket.IO
- TypeScript (projeto em ESM)

### Frontend

- TypeScript (bundled com **esbuild**)
- TailwindCSS (build via CLI)

---

## Scripts

- `npm run dev` — inicia o servidor em modo desenvolvimento (TSX watch)
- `npm run client:build` — faz bundle do cliente (`src/main.ts` → `public/main.js`)
- `npm run client:watch` — bundle do cliente em watch mode
- `npm run css:build` — compila Tailwind (`src/styles.css` → `public/styles.css` minificado)
- `npm run css:watch` — compila Tailwind em watch mode

---

## Como rodar

### 1) Instalar dependências

```bash
npm install
```

### 2) Build do client + CSS (opcional, mas recomendado)

Em um terminal:

```bash
npm run client:watch
```

Em outro terminal:

```bash
npm run css:watch
```

### 3) Rodar o servidor

```bash
npm run dev
```

Abra no navegador a URL servida pelo servidor (por padrão, `http://localhost:3000`).

---

## Melhorias implementadas

Este projeto foi evoluído em relação ao projeto base do curso, com foco em:

1) **Estrutura de projeto mais organizada**
   - Separação em módulos (`src/chat`, `src/data`, `src/helpers`, `src/types`)
   - Facilita manutenção e evolução do chat

2) **Client moderno e automatizado**
   - O client foi migrado para TypeScript (`src/main.ts`) e é empacotado com **esbuild**
   - Evita código JS “solto” no `public/` e melhora a DX

3) **Estilização com Tailwind e pipeline de build**
   - Tailwind compilado a partir de `src/styles.css`
   - Scripts de build/watch para desenvolvimento mais produtivo

4) **Servidor em TypeScript + ESM**
   - Uso de `tsx watch` para desenvolvimento
   - Tipagem para reduzir erros comuns em projetos com Socket.IO

---

## Estrutura de pastas (resumo)

- `src/server.ts` — server HTTP + Socket.IO
- `src/app.ts` — configuração do app (Express)
- `src/main.ts` — client (browser)
- `src/styles.css` — entrada do Tailwind
- `public/` — arquivos servidos (HTML, JS bundle e CSS gerado)

---

## Licença

ISC