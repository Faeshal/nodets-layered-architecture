import * as userRepo from "../repositories/user"
import log4js from "log4js";
const log = log4js.getLogger("service:user");
log.level = "debug";

export const getUsers = async (body: any) => {
    log.info("body", body)
    const { limit, offset, filter } = body
    let data = await userRepo.findAll(limit, offset, filter);
    return data;
};

export const getUser = async (id: number) => {
    log.info("id:", id);
    const data = await userRepo.findOne({ id })
    return data;
};

export const getUsersByDateRange = async (body: any) => {
    log.info("body", body)
    const { limit, offset, filter } = body
    let data = await userRepo.findByDateRange(limit, offset, filter);
    return data;
};
