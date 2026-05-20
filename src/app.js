const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { routes } = require("./routes");
const { errorHandler } = require("./middlewares/error-handler.js");

const app = express();

// 🦊 TRUQUE DO MOTORISTA: CORS configurado para aceitar credenciais e liberar o seu localhost!
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
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

// Middleware global de erros (sempre por último)
app.use(errorHandler);

module.exports = { app };