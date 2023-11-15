import "dotenv/config";
import * as userRepo from "../repositories/user"
import { generateToken } from "../utils/paseto"
import bcrypt from "bcrypt";
import log4js from "log4js";
const log = log4js.getLogger("service:auth");
log.level = "debug";

export const register = async (body: { username: string, email: string, password: string, role: string }) => {
    log.info("body:", body);
    const { username, email, password, role } = body;

    // * call repo (check double email)
    const emailExist = await userRepo.findOne({ email });
    if (emailExist) {
        return { success: false, statusCode: 400, message: "email already exist" };
    }

    // * call repo (check double uname)
    const unameExist = await userRepo.findOne({ username });
    if (unameExist) {
        return { success: false, statusCode: 400, message: "username already exist" };
    }

    // * hash Pass
    const hashedPw = await bcrypt.hash(password, 12);

    // * save user
    const result = await userRepo.create({ username, email, password: hashedPw, role })

    // * formating return data
    const fmtData = { id: result.id, username, email };
    return {
        success: true,
        statusCode: 200,
        message: "ok",
        data: fmtData
    };
};

export const login = async (body: { email: string, password: string }) => {
    log.info("body:", body);
    const { email, password } = body

    // * check is email exist ?
    const user = await userRepo.findOne({ email });
    if (!user) {
        return {
            success: false,
            statusCode: 400,
            message: "email / password doesn't match or exists",
        };
    }

    // * compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return {
            success: false,
            statusCode: 400,
            message: "email / password doesn't match or exists",
        };
    }

    // * generate paseto token
    const tokenPayload = {
        id: user.id,
        timestamp: Date.now(),
        role: user.role
    };
    const accessToken = await generateToken(tokenPayload);

    // * formating data
    const fmtData = {
        isLoggedIn: true,
        accessToken: accessToken.data,
    };
    return { success: true, statusCode: 200, message: "ok", data: fmtData };
};
