let allowedOrigins;
if (process.env.PROD) {
    allowedOrigins = ["https://leetclone-roan.vercel.app/"];
}
else {
    allowedOrigins = [
        "http://127.0.0.1:5500",
        "http://localhost:3500",
        "http://localhost:3000",
        "http://localhost:5173",
    ];
}
export default allowedOrigins;
//# sourceMappingURL=allowedOrigins.js.map