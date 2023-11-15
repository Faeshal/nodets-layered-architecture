import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from "./errorHandler";
import { verifyToken } from "../utils/paseto";
import log4js from "log4js";
const log = log4js.getLogger("middleware:auth");
log.level = "info";

export const protect = async (req: Request, res: Response, next: any) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return next(new ErrorResponse("unauthorized, token is empty", 401));
        }

        // * verify paseto 
        const decoded = await verifyToken(token);
        if (decoded.success == false) {
            return next(new ErrorResponse("unauthorized or expired token", 401));
        }
        req.user = decoded.data;
        log.info("req.user", req.user)
        next();
    } catch (err) {
        log.error(err);
        return res
            .status(401)
            .json({ success: false, message: "unauthorized or expired token" });
    }
};

export const authorize = (...roles: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res
                .status(401)
                .json({ success: false, message: "role not authorize" });
        }
        next();
    };
};
