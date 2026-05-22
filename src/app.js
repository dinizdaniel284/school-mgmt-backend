const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// 🎯 AJUSTE DAS ROTAS: Importa o módulo bruto direto para evitar o 'undefined'
const routesModule = require("./routes/v1.js"); 
const routes = typeof routesModule === "function" || routesModule.use ? routesModule : (routesModule.routes || Object.values(routesModule)[0]);

// 🎯 AJUSTE DO MIDDLEWARE DE ERRO: Importa direto também
const errorModule = require("./middlewares/handle-global-error.js"); 
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
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// 👑 VACINA DA ROTA RAIZ (TESTE DE SAÚDE DA API):
// Quando o frontend der um HEAD ou GET na raiz (/), respondemos com 200 OK instantâneo!
app.all("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy and running.",
    environment: "test-bypass"
  });
});

// Rotas da API (Garantindo que nunca vá um undefined)
if (routes) {
  app.use("/api/v1", routes);
} else {
  console.error("⚠️ Erro crítico: Módulo de rotas não pôde ser carregado.");
}

// Middleware global de erros
if (handleGlobalError && typeof handleGlobalError === "function") {
  app.use(handleGlobalError);
} else {
  app.use((err, req, res, next) => {
    console.error("Erro capturado no fallback:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  });
}

module.exports = { app };
