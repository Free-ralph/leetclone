import allowedOrigins from "./allowedOrigins.js";
const corsOptions = {
    origin: (origin, callback) => {
        // for prod, where going to check if there's an origin, so vices like postman "without origin won't access" so !origin 
        if (allowedOrigins.indexOf(origin) !== -1) {
            console.log(origin, allowedOrigins.indexOf(origin));
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};
export default corsOptions;
//# sourceMappingURL=corsOptions.js.map