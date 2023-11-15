import * as categoryRepo from "../repositories/category"
import log4js from "log4js";
const log = log4js.getLogger("service:category");
log.level = "debug";

export const addCategory = async (body: any) => {
    log.info("body:", body);
    const data = await categoryRepo.create(body)
    return data;
};

export const getCategories = async (body: any) => {
    log.info("body:", body);
    const { limit, offset, filter } = body
    let data = await categoryRepo.findAll(limit, offset, filter);
    return data;
};



export const deleteCategory = async (id: any) => {
    log.info("id:", id);
    let data = await categoryRepo.destroy({ id })
    return data;
};