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
    const { startDate, endDate, role } = filter
    log.info("LOG REPOSITORY", filter)

    // construct main query
    var query = userRepo.createQueryBuilder("user")
        .where("user.createdAt >= :start", { start: startDate })
        .andWhere("user.createdAt <= :end", { end: endDate })
        .skip(offset)
        .take(limit)

    if (role) {
        query = query.andWhere("user.role = :role", { role });
    }

    // final call
    const data = await query
        .getManyAndCount();

    return data
};