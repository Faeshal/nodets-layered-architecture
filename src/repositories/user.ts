import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { Profile } from "../entities/Profile";
import log4js from "log4js";
const log = log4js.getLogger("repository:user");
log.level = "info";

// data mapper
const userRepo = AppDataSource.getRepository(User)
const profileRepo = AppDataSource.getRepository(Profile)

export const create = async (body: any) => {
    log.warn("USER REPO:", body)
    const data = await userRepo.save(body)
    return data
};

export const findAll = async (limit: number, offset: number, filter: any) => {
    const data = await userRepo.findAndCount({
        where: filter,
        order: { id: 'DESC' },
        skip: offset,
        take: limit,
        relations: { profile: true }
    });
    return data;
};

export const findOne = async (filter: any) => {
    const data = await userRepo.findOne({ where: filter })
    return data
};


export const createProfile = async (body: any) => {
    log.warn("PROFILE REPO:", body)
    const data = await profileRepo.save(body)
    return data
};
