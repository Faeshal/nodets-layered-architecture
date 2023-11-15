import { AppDataSource } from "../config/data-source";
import { Income } from "../entities/Income";
import log4js from "log4js";
const log = log4js.getLogger("repository:income");
log.level = "info";

export const create = async (body: any) => {
    const data = await Income.save(body)
    return data
};

export const findAll = async (limit: number, offset: number, filter: any) => {
    const data = await Income.findAndCount({
        relations: {
            user: true,
            categories: true
        },
        select: {
            user: {
                id: true, email: true
            },
            categories: {
                id: true, tag: true
            }
        },
        where: filter,
        order: {
            id: "DESC",
        },
        skip: offset,
        take: limit,
    })
    return data;
};

export const findOne = async (filter: any) => {
    const data = await Income.findOne({ where: filter });
    return data
};

export const update = async (id: number, body: any) => {
    const data = await Income.update(id, body)
    return data;
};

export const destroy = async (id: number) => {
    const data = await Income.delete(id)
    return data;
};


export const insertToPivotTable = async (tableName: string, body: any) => {
    const data = await AppDataSource.createQueryBuilder(tableName, tableName).insert().values(body).execute();
    return data;
};

