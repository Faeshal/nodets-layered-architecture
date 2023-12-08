import { AppDataSource } from "../config/data-source";
import { Income } from "../entities/Income";
import log4js from "log4js";
const log = log4js.getLogger("repository:income");
log.level = "info";

// data mapper
const incomeRepo = AppDataSource.getRepository(Income);

export const create = async (body: any) => {
  log.warn("data", body);
  const data = await incomeRepo.save(body);
  log.warn("data", data);
  return data;
};

export const findAll = async (limit: number, offset: number, filter: any) => {
  const data = await incomeRepo.findAndCount({
    relations: {
      user: true,
      categories: true,
    },
    select: {
      user: {
        id: true,
        email: true,
      },
      categories: {
        id: true,
        tag: true,
      },
    },
    where: filter,
    order: {
      id: "DESC",
    },
    skip: offset,
    take: limit,
  });
  return data;
};

export const findOne = async (filter: any) => {
  const data = await incomeRepo.findOne({ where: filter });
  return data;
};

export const update = async (id: string, body: any) => {
  const data = await incomeRepo.update(id, body);
  return data;
};

export const destroy = async (id: string) => {
  const data = await incomeRepo.delete(id);
  return data;
};

export const insertToPivotTable = async (tableName: string, body: any) => {
  const data = await AppDataSource.createQueryBuilder(tableName, tableName)
    .insert()
    .values(body)
    .execute();
  return data;
};
