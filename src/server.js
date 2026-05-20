// FORÇA O NODE A LER O ARQUIVO .ENV LOGO NA PRIMEIRA LINHA
require("dotenv").config(); 

const { app } = require("./app.js");
const { env } = require("./config");
const cors = require("cors");

// Usa a porta do .env, e se por acaso falhar, joga a 5007 como garantia
const PORT = env.PORT || 5007; 

// 🦊 TRUQUE DE MESTRE: Configuração cirúrgica do CORS para matar o erro do Chrome
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Seu Frontend rodando local no Vite
      "http://127.0.0.1:5173"  // IP padrão do localhost caso o navegador mude a rota
    ],
    credentials: true, // Permite o tráfego seguro de cookies/headers que o RTK Query exige
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"]
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
});