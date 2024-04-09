import asyncHandler from "express-async-handler";
import * as userService from "../services/user";
import { paginate } from "../utils/paginate";
import _ from "underscore";
import log4js from "log4js";
const log = log4js.getLogger("controllers:user");
log.level = "info";

// * @route GET /api/v1/users
// @desc    get users
// @access  private
export const getUsers = asyncHandler(async (req, res, next) => {
  const { role, search } = req.query;
  let filter: any = {};
  if (role) {
    filter.role = role;
  }
  if (search) {
    filter.search = search;
  }

  const data = await userService.getUsers({
    limit: req.query.limit,
    offset: req.skip,
    filter,
  });

  // * pagination
  const pagin = await paginate({
    length: data[1],
    limit: req.query.limit,
    page: req.query.page,
    req,
  });

  res.status(200).json({
    success: true,
    totalData: data[1],
    totalPage: pagin?.totalPage,
    currentPage: pagin?.currentPage,
    nextPage: pagin?.nextPage,
    data: data[0] || [],
  });
});

// * @route POST /api/v1/users/reports/dateranges
// @desc    get users
// @access  private
export const getUsersByDateRange = asyncHandler(async (req, res, next) => {
  const { role, startDate, endDate, job } = req.body;
  let filter: any = {};
  filter.startDate = startDate;
  filter.endDate = endDate;

  if (role) {
    filter.role = role;
  }
  if (job) {
    filter.job = job;
  }

  const data = await userService.getUsersByDateRange({
    limit: req.query.limit,
    offset: req.skip,
    filter,
  });

  // * pagination
  const pagin = await paginate({
    length: data[1],
    limit: req.query.limit,
    page: req.query.page,
    req,
  });

  res.status(200).json({
    success: true,
    totalData: data[1],
    totalPage: pagin?.totalPage,
    currentPage: pagin?.currentPage,
    nextPage: pagin?.nextPage,
    data: data[0] || [],
  });
});
