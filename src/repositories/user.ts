import { User } from "../entities/User";
import log4js from "log4js";
const log = log4js.getLogger("repository:user");
log.level = "info";

export const create = async (body: any) => {
    const data = await User.save(body)
    return data
};

export const findAll = async (limit: number, offset: number, filter: any) => {
    const data = await User.findAndCount({
        where: filter,
        order: {
            id: 'DESC',
        },
        skip: offset,
        take: limit
    });
    log.warn("DATA", data)
    return data;
};

export const findOne = async (filter: any) => {
    const data = await User.findOne({ where: filter })
    return data
};
