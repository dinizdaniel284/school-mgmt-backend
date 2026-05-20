const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { routes } = require("./routes/v1.js"); 

// 🎯 IMPORT SEGURO: Importamos o módulo bruto
const errorModule = require("./middlewares/handle-global-error.js"); 

// 🧠 TRUQUE DE SEGURANÇA: Se for uma função, usa ela. Se for um objeto, tenta pegar a propriedade de dentro!
const handleGlobalError = typeof errorModule === "function" 
  ? errorModule 
  : (errorModule.handleGlobalError || errorModule.errorHandler || Object.values(errorModule)[0]);

const app = express();

// 🦊 TRUQUE DO MOTORISTA: CORS liberando Localhost E a sua nova URL oficial da Vercel!
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// Rotas da API
app.use("/api/v1", routes);

// Middleware global de erros (Garantindo que nunca vá um undefined para o Express)
if (handleGlobalError && typeof handleGlobalError === "function") {
  app.use(handleGlobalError);
} else {
  // Se tudo falhar, injetamos um middleware reserva na hora para o servidor NÃO crashar!
  app.use((err, req, res, next) => {
    console.error("Erro capturado no fallback:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  });
}

module.exports = { app };