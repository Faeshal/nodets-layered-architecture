import "dotenv/config";
import { V3 } from "paseto"
import log4js from "log4js";
const log = log4js.getLogger("utils:paseto");
log.level = "info";

const PASETO_SECRET: any = process.env.PASETO_SECRET_KEY

const generateToken = async (payload: any) => {
    try {
        log.info("payload", payload);

        // local paseto strategy
        const token = await V3.encrypt(payload, PASETO_SECRET, {
            expiresIn: "24h",
        });

        return {
            success: true,
            statusCode: 200,
            message: "ok",
            data: token,
        };
    } catch (err) {
        log.error(err);
        return {
            success: false,
            statusCode: 500,
            message: "generate token failed",
        };
    }
};

const verifyToken = async (token: string) => {
    try {
        const decoded = await V3.decrypt(token, PASETO_SECRET);
        log.warn("decoded:", decoded);
        return {
            success: true,
            statusCode: 200,
            message: "token valid",
            data: decoded,
        };
    } catch (err) {
        log.error(err);
        return {
            success: false,
            statusCode: 500,
            message: "invalid / expired token",
        };
    }
};

export { generateToken, verifyToken };
