const express = require("express");
const cookieParser = require("cookie-parser"); 
const cors = require("cors"); // 1. Mudamos para puxar o pacote padrão do CORS
const dotenv = require("dotenv");
dotenv.config();

const { handle404Error, handleGlobalError } = require("./middlewares");
const { v1Routes } = require("./routes/v1");
const path = require("path");
const app = express();

app.use(cors()); // 2. Agora executando como função () para liberar o frontend!
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser());

app.use("/api/v1", v1Routes);

app.use(handle404Error);
app.use(handleGlobalError);

module.exports = { app };