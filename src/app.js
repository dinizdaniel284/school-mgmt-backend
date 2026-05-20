const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { routes } = require("./routes/v1.js"); // 👈 AJUSTADO! Apontando direto para o v1.js sem errar o caminho no Linux!
const { errorHandler } = require("./middlewares/error-handler.js");

const app = report_unused_disable_directives = express();

// 🦊 TRUQUE DO MOTORISTA: CORS liberando Localhost E a sua nova URL oficial da Vercel!
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "http://127.0.0.1:5173",
      "https://school-management-frontend-henna.vercel.app" // Seu link oficial da Vercel injetado!
    ],
    credentials: true, // Mantém a conexão segura ativa para cookies e headers
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

// Middleware global de erros (sempre por último)
app.use(errorHandler);

module.exports = { app };