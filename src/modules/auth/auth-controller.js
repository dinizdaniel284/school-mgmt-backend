const asyncHandler = require("express-async-handler");
const { login, logout, getNewAccessAndCsrfToken, processAccountEmailVerify, processPasswordSetup, processResendEmailVerification, processResendPwdSetupLink, processPwdReset } = require("./auth-service");
const { setAccessTokenCookie, setCsrfTokenCookie, setAllCookies, clearAllCookies } = require("../../cookie");

const handleLogin = asyncHandler(async (req, res) => {
    // 🔀 CORTE DO DIRETOR: IGNORA O SUPABASE TRAVADO E LOGA DIRETO
    const mockAccessToken = "mocked_access_token_para_destravar_o_painel";
    const mockRefreshToken = "mocked_refresh_token";
    const mockCsrfToken = "mocked_csrf_token";

    const mockAccountBasic = {
        id: "1",
        email: "admin@school.com",
        name: "Admin Master",
        role: "ADMIN",
        status: "ACTIVE"
    };

    // Limpa e seta os cookies que o front precisa para autenticar
    clearAllCookies(res);
    setAllCookies(res, mockAccessToken, mockRefreshToken, mockCsrfToken);

    // Devolve o usuário pro front mudar de página na hora!
    return res.json(mockAccountBasic);
});

const handleLogout = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;

    const message = await logout(refreshToken);
    clearAllCookies(res);

    res.status(204).json(message);
});

const handleTokenRefresh = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;

    const { accessToken, csrfToken, message } = await getNewAccessAndCsrfToken(refreshToken);
    res.clearCookie("accessToken");
    res.clearCookie("csrfToken");

    setAccessTokenCookie(res, accessToken);
    setCsrfTokenCookie(res, csrfToken);

    res.json(message);
});

const handleAccountEmailVerify = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const message = await processAccountEmailVerify(id);
    res.json(message);
});

const handleAccountPasswordSetup = asyncHandler(async (req, res) => {
    const { id: userId } = req.user;
    const { username: userEmail, password } = req.body;
    const message = await processPasswordSetup({ userId, userEmail, password });
    res.json(message);
});

const handleResendEmailVerification = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const message = await processResendEmailVerification(userId);
    res.json(message);
});

const handleResendPwdSetupLink = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const message = await processResendPwdSetupLink(userId);
    res.json(message);
});

const handlePwdReset = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const message = await processPwdReset(userId);
    res.json(message);
});

module.exports = {
    handleLogin,
    handleLogout,
    handleTokenRefresh,
    handleAccountEmailVerify,
    handleAccountPasswordSetup,
    handleResendEmailVerification,
    handleResendPwdSetupLink,
    handlePwdReset
};