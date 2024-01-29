import allowedOrigins from "../config/allowedOrigins.js";
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.set("Access-Control-Allow-Credentials", "true");
    }
    next();
};
export default credentials;
//# sourceMappingURL=credentials.js.map