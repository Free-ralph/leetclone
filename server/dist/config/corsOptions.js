import allowedOrigins from "./allowedOrigins.js";
const corsOptions = {
    origin: (origin, callback) => {
        // for prod, where going to check if there's an origin, so vices like postman "without origin won't access" so !origin 
        if (allowedOrigins.indexOf(origin) !== -1 || (!origin && !process.env.PROD)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
};
export default corsOptions;
//# sourceMappingURL=corsOptions.js.map