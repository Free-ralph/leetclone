import jwt from "jsonwebtoken";
import { Unauthorized } from "../errors/index.js";
export default function AuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Unauthorized("No Authentication token provided");
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new Unauthorized("Unauthorized");
        }
        req.user = decoded;
        next();
    });
}
//# sourceMappingURL=authMiddleware.js.map