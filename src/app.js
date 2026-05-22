const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const routesModule = require("./routes/v1.js"); 
const routes = typeof routesModule === "function" || routesModule.use ? routesModule : (routesModule.routes || Object.values(routesModule)[0]);

const errorModule = require("./middlewares/handle-global-error.js"); 
const handleGlobalError = typeof errorModule === "function" 
  ? errorModule 
  : (errorModule.handleGlobalError || errorModule.errorHandler || Object.values(errorModule)[0]);

const app = express();

// 🎯 CORS DO CAMPEONATO: Configurado para aceitar a origem exata com credenciais ativas!
app.use(
  cors({
    origin: "https://school-management-frontend-henna.vercel.app", // Uma única string limpa!
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({
  crossOriginResourcePolicy: false, // Permite que o front leia as respostas de mídia e vetores
}));
app.use(morgan("dev"));

// 👑 Ícones injetados direto no fluxo do Express gerenciados pelo CORS acima
app.get("/dashboard", (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  return res.send(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="10" rx="1"/><rect width="7" height="5" x="3" y="15" rx="1"/></svg>`);
});

app.get("/school", (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  return res.send(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>`);
});

// Fallback estático seguro
app.use(express.static(path.join(__dirname, "../public")));

app.all("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy and running.",
    environment: "test-bypass"
  });
});

if (routes) {
  app.use("/api/v1", routes);
}

if (handleGlobalError && typeof handleGlobalError === "function") {
  app.use(handleGlobalError);
}

module.exports = { app };