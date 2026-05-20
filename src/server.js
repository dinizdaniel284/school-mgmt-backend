// FORÇA O NODE A LER O ARQUIVO .ENV LOGO NA PRIMEIRA LINHA
require("dotenv").config(); 

const { app } = require("./app.js");
const { env } = require("./config");
const cors = require("cors");

// Usa a porta do .env, e se por acaso falhar, joga a 5007 como garantia
const PORT = env.PORT || 5007; 

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
});