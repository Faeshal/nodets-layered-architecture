import { Request, Response, NextFunction } from "express";

// Express 5 makes `req.query` a read-only getter, so unlike express-paginate
// (which this replaces) we cannot write normalized values back onto it.
// Normalized page/limit live on `req.pagination` instead.
function paginate(defaultLimit = 10, maxLimit = 30) {
  return (req: Request, res: Response, next: NextFunction) => {
    const rawPage = req.query.page;
    const rawLimit = req.query.limit;

    let page = typeof rawPage === "string" ? parseInt(rawPage, 10) || 1 : 1;
    if (page < 1) page = 1;

    let limit =
      typeof rawLimit === "string" ? parseInt(rawLimit, 10) || 0 : defaultLimit;
    if (limit > maxLimit) limit = maxLimit;
    if (limit < 0) limit = 0;

    req.pagination = { page, limit };
    req.skip = req.offset = page * limit - limit;

    res.locals.paginate = {
      page,
      limit,
      hasPreviousPages: page > 1,
      hasNextPages: (pageCount: number) => page < pageCount,
    };

    next();
  };
}

export { paginate };
