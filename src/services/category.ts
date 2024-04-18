import { AddCategoryRequest } from "../interfaces/category";
import { FilterRequest } from "../interfaces/generic";
import * as categoryRepo from "../repositories/category";
import log4js from "log4js";
const log = log4js.getLogger("service:category");
log.level = "debug";

export const addCategory = async (body: AddCategoryRequest) => {
  log.info("body:", body);
  const data = await categoryRepo.create(body);
  return data;
};

export const getCategories = async (body: FilterRequest) => {
  log.info("body:", body);
  const { limit, offset, filter } = body;
  let data = await categoryRepo.findAll(limit, offset, filter);
  return data;
};

export const deleteCategory = async (id: string) => {
  log.info("id:", id);
  let data = await categoryRepo.destroy(id);
  return data;
};
