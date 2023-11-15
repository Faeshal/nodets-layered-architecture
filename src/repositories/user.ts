import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import log4js from "log4js";
const log = log4js.getLogger("repository:user");
log.level = "info";

// data mapper
const userRepo = AppDataSource.getRepository(User)

export const create = async (body: any) => {
    const data = await userRepo.save(body)
    return data
};

export const findAll = async (limit: number, offset: number, filter: any) => {
    const data = await userRepo.findAndCount({
        where: filter,
        order: { id: 'DESC' },
        skip: offset,
        take: limit
    });
    return data;
};

export const findOne = async (filter: any) => {
    const data = await userRepo.findOne({ where: filter })
    return data
};
