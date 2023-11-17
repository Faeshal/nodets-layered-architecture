import { AppDataSource } from "../config/data-source";
import { ILike, Like, Between } from "typeorm";
import { User } from "../entities/User";
import { Profile } from "../entities/Profile";
import log4js from "log4js";
const log = log4js.getLogger("repository:user");
log.level = "info";
import { format } from 'date-fns';


// data mapper
const userRepo = AppDataSource.getRepository(User)
const profileRepo = AppDataSource.getRepository(Profile)

export const create = async (body: any) => {
    const data = await userRepo.save(body)
    return data
};

export const findAll = async (limit: number, offset: number, filter: any) => {
    // const qb = await userRepo.createQueryBuilder("user").leftJoinAndSelect("user.profile", "profile").orderBy("user.id", "DESC").getManyAndCount()
    // log.warn("QB", qb)
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
    const data = await userRepo.findOne({ where: filter, relations: { profile: true } })
    return data
};

export const createProfile = async (body: any) => {
    const data = await profileRepo.save(body)
    return data
};

export const findByDateRange = async (limit: number, offset: number, filter: any) => {
    const data = await userRepo.createQueryBuilder("user")
        .where("user.createdAt >= :start", { start: "2023-11-07 21:29:06" })
        .andWhere("user.createdAt <= :end", { end: "2023-11-16 23:29:06" })
        .andWhere("user.role = :role", { role: "admin" })
        .andWhere("user.username = :username", { username: "fauziah" })
        .getMany();

    // .andWhere("user.username = :username", { username: "malika" })
    return data
};