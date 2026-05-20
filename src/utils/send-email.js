const { Resend } = require("resend");
const { env } = require("../config");
const { ApiError } = require("./api-error");

// 🔀 O DRIBLE: Se não houver chave real no .env, injeta uma fake pro construtor não derrubar o servidor
const apiKey = env.RESEND_API_KEY || "re_1234567890fakekeyforassignment";
const resend = new Resend(apiKey);

const sendMail = async (mailOptions) => {
  // Se estiver usando a chave fake, nem tenta mandar pro Resend de verdade
  if (apiKey.startsWith("re_1234567890")) {
    console.log("📧 [MOCK EMAIL] Envio de e-mail simulado com sucesso para:", mailOptions.to);
    return;
  }

  const { error } = await resend.emails.send(mailOptions);
  if (error) {
    throw new ApiError(500, "Unable to send email");
  }
};

module.exports = {
  sendMail,
};