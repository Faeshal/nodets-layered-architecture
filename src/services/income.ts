import * as incomeRepo from "../repositories/income";
import * as categoryRepo from "../repositories/category";
import log4js from "log4js";
import { FilterRequest } from "../interfaces/generic";
import { AddIncomeRequest, UpdateIncomeRequest } from "../interfaces/income";
const log = log4js.getLogger("service:income");
log.level = "debug";

export const addIncome = async (body: AddIncomeRequest) => {
  log.info("body:", body);
  const { name, value, userId, categories } = body;

  // income
  const data = await incomeRepo.create({ name, value, user: userId });
  const incomeId = data.id;

  // category
  for (let category of categories) {
    const { tag } = category;
    const isExist = await categoryRepo.findOne({ tag });
    var categoryId;
    if (!isExist) {
      const cat = await categoryRepo.create({ tag });
      categoryId = cat.id;
      log.info("new category created");
    } else {
      categoryId = isExist.id;
      log.info("category already exist", categoryId);
    }

    const insert = await incomeRepo.insertToPivotTable(
      "income_categories_category",
      { incomeId, categoryId }
    );
    log.info("inser to pivot:", insert);
  }

  return data;
};

export const getIncomes = async (body: FilterRequest) => {
  log.info("body:", body);
  const { limit, offset, filter } = body;
  let data = await incomeRepo.findAll(limit, offset, filter);
  return data;
};

export const getIncome = async (id: string) => {
  log.info("id:", id);
  const data = await incomeRepo.findOne({ id });
  return data;
};

export const updateIncome = async (body: UpdateIncomeRequest) => {
  log.info("body:", body);
  const { id, ...bodyWithoutId } = body;
  const data = await incomeRepo.update(id, bodyWithoutId);
  return data;
};

export const destroy = async (id: string) => {
  log.info("id:", id);
  const data = await incomeRepo.destroy(id);
  return data;
};
