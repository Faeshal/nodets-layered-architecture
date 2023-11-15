import pagination from "express-paginate";
import log4js from "log4js";
const log = log4js.getLogger("utils:paginate");
log.level = "info";

async function paginate(options: any) {
  try {
    const totalPage = Math.ceil(options.length / options.limit);
    let currentPage = parseInt(options.page) || 1;
    if (currentPage > totalPage) {
      currentPage = totalPage;
    }
    const nextPage = pagination.hasNextPages(options.req)(totalPage);
    return {
      totalPage,
      currentPage,
      nextPage,
    };
  } catch (err: any) {
    log.error(err);
    return;
  }
}

export { paginate };
