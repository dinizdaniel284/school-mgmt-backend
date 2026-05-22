const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const routesModule = require("./routes/v1.js"); 
const routes = typeof routesModule === "function" || routesModule.use ? routesModule : (routesModule.routes || Object.values(routesModule)[0]);

const errorModule = require("./middlewares/handle-global-error.js"); 
const handleGlobalError = typeof errorModule === "function" 
  ? errorModule 
  : (errorModule.handleGlobalError || errorModule.errorHandler || Object.values(errorModule)[0]);

const app = express();

app.use(
  cors({
    origin: "https://school-management-frontend-henna.vercel.app",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({
  crossOriginResourcePolicy: false, // Permite que o front leia os assets
}));
app.use(morgan("dev"));

// 🎯 MIDDLEWARE SALVA-VIDAS: Se o Linux pedir maiúscula, ele entrega o arquivo minúsculo!
app.use((req, res, next) => {
  const ext = path.extname(req.path).toLowerCase();
  if (ext === ".svg" || ext === ".png" || ext === ".jpg") {
    const filename = path.basename(req.path).toLowerCase(); // dashboard.svg
    const localPath = path.join(__dirname, "../public", filename);
    
    if (fs.existsSync(localPath)) {
      res.setHeader("Content-Type", "image/svg+xml");
      return res.sendFile(localPath);
    }
  }
  next();
});

// Servidor estático padrão
app.use(express.static(path.join(__dirname, "../public")));

app.all("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy and running."
  });
});

if (routes) {
  app.use("/api/v1", routes);
}

if (handleGlobalError && typeof handleGlobalError === "function") {
  app.use(handleGlobalError);
}

module.exports = { app };