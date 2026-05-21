// FORÇA O NODE A LER O ARQUIVO .ENV LOGO NA PRIMEIRA LINHA
require("dotenv").config(); 

const { app } = require("./app.js");
const { env } = require("./config");
const cors = require("cors");

// 🚀 Lendo a porta do Render direto, ou o env customizado, ou a 5007 local
const PORT = process.env.PORT || env.PORT || 5007; 

// 🦊 Configuração do CORS atualizada com o link oficial da Vercel
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://school-management-frontend-henna.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"]
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
});
