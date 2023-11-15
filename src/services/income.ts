import * as incomeRepo from "../repositories/income"
import * as categoryRepo from "../repositories/category"
import log4js from "log4js";
const log = log4js.getLogger("service:income");
log.level = "debug";

export const addIncome = async (body: any) => {
  log.info("body:", body);
  const { name, value, userId, categories } = body

  // income
  const data = await incomeRepo.create({ name, value, userId });
  const incomeId = data.id

  // category 
  for (let category of categories) {
    const { tag } = category
    const isExist = await categoryRepo.findOne({ tag })
    var categoryId
    if (!isExist) {
      const cat = await categoryRepo.create({ tag })
      categoryId = cat.id
      log.info("new category created")
    } else {
      categoryId = isExist.id
      log.info("category already exist", categoryId)
    }

    const insert = await incomeRepo.insertToPivotTable("income_categories_category", { incomeId, categoryId })
    log.warn("inser to pivot:", insert)
  }

  return data;
};

export const getIncomes = async (body: any) => {
  log.info("body:", body);
  const { limit, offset, filter } = body
  let data = await incomeRepo.findAll(limit, offset, filter);
  return data;
};

export const getIncome = async (id: number) => {
  log.info("id:", id);
  const data = await incomeRepo.findOne({ id });
  return data;
};

export const update = async (id: number, body: any) => {
  log.info(`id:${id} - body:${body}`);
  const data = await incomeRepo.update(id, body);
  return data;
};

export const destroy = async (id: number) => {
  log.info("id:", id);
  const data = await incomeRepo.destroy(id)
  return data;
};
