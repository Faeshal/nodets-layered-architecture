import { AppDataSource } from "../config/data-source";
import { Category } from "../entities/Category";
import log4js from "log4js";
const log = log4js.getLogger("repository:category");
log.level = "debug";

// data mapper
const categoryRepo = AppDataSource.getRepository(Category);

export const create = async (body: any) => {
  const data = await categoryRepo.save(body);
  return data;
};

export const findAll = async (limit: number, offset: number, filter: any) => {
  const data = await categoryRepo.findAndCount({
    where: filter,
    skip: offset,
    take: limit,
    order: { id: "DESC" },
  });
  log.warn("data", data);
  return data;
};

export const bulkCreate = async (bodyArr: any) => {
  log.warn("bodyarr", bodyArr);
  const data = await AppDataSource.createQueryBuilder()
    .insert()
    .into(Category)
    .values([bodyArr])
    .execute();
  return data;
};

export const findOne = async (filter: any) => {
  const data = await categoryRepo.findOne({ where: filter });
  return data;
};

export const destroy = async (filter: any) => {
  // const data = await Category.softRemove(filter) // hard delete
  // const data = await AppDataSource
  //     .createQueryBuilder(Category, "category")
  //     .softDelete()
  //     .where("id = :id", filter).execute();
  const data = await AppDataSource.manager
    .createQueryBuilder(Category, "category")
    .softDelete()
    .where("id = :id", filter)
    .execute();
  return data;
};

export const findRaw = async () => {
  const data = await AppDataSource.query(`SELECT * FROM category`);
  return data;
};
