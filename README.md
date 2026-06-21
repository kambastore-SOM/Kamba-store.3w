# Kamba Store - Deploy com MongoDB Atlas

## 1. Criar conta MongoDB Atlas (gratuito para sempre)
1. Vai a mongodb.com/cloud/atlas → cria conta grátis
2. Cria um cluster gratuito (M0 - Free Tier)
3. Em "Security" → "Database Access" → cria um utilizador com senha
4. Em "Security" → "Network Access" → clica "Allow access from anywhere" (0.0.0.0/0)
5. Clica em "Connect" no teu cluster → "Drivers" → copia a Connection String
   (algo como: mongodb+srv://usuario:senha@cluster.mongodb.net/...)

## 2. Configurar no Render
1. Vai ao teu serviço no render.com
2. Clica em "Environment" 
3. Adiciona uma variável:
   - Key: MONGO_URI
   - Value: (cola a connection string do passo 1, substitui <password> pela senha real)
4. Clica "Save Changes" - o Render reinicia automaticamente

## 3. Deploy no GitHub + Render (se ainda não fizeste)
1. github.com → cria repositório `kamba-store`
2. Faz upload de: server.js, package.json, README.md, pasta public/
3. render.com → New Web Service → liga ao repositório
4. Build Command: npm install
5. Start Command: npm start

## Credenciais Manager
- Senha: kamba2025

## Importante
- Com o MongoDB, os dados e fotos NUNCA desaparecem, mesmo quando o servidor "dorme"
- O Render gratuito "dorme" depois de 15 min sem visitas - demora ~30s a "acordar"
