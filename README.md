# Kamba Store - Deploy no Render.com

## Passo a passo:

### 1. GitHub
1. Vai a github.com → cria conta grátis
2. Cria um novo repositório chamado `kamba-store`
3. Faz upload de TODOS estes ficheiros (server.js, package.json, pasta public/)
4. Commit changes

### 2. Render
1. Vai a render.com → cria conta grátis (podes usar GitHub para entrar)
2. Clica "New +" → "Web Service"
3. Liga ao teu repositório GitHub `kamba-store`
4. Configurações:
   - Name: kamba-store
   - Runtime: Node
   - Build Command: npm install
   - Start Command: npm start
   - Instance Type: Free
5. Clica "Create Web Service"

### 3. Aguarda o deploy (2-5 minutos)
O teu site vai ficar disponível em: https://kamba-store-XXXX.onrender.com

## Credenciais Manager
- Email: baracklast33@gmail.com
- Senha: kamba2025

## Importante
- As fotos ficam guardadas no servidor Render e são visíveis para TODOS automaticamente
- Os dados (produtos, preços, cores, etc) também ficam guardados para todos
- No plano gratuito do Render, o servidor "dorme" depois de 15 min sem uso e demora ~30s a "acordar" na próxima visita
