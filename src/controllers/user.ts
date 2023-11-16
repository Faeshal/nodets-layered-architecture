import asyncHandler from "express-async-handler";
import * as userService from "../services/user"
import { paginate } from "../utils/paginate";
import { validationResult } from "express-validator";
import { ErrorResponse } from "../middleware/errorHandler";
import _ from 'underscore'
import log4js from "log4js";
const log = log4js.getLogger("controllers:user");
log.level = "info";

// * @route GET /api/v1/users
// @desc    get users
// @access  private
export const getUsers = asyncHandler(async (req, res, next) => {
    const { role, search } = req.query
    let filter: any = {}
    if (role) {
        filter.role = role
    }


    // if (search) {
    //     let searchOption = {
    //         [Op.or]: [
    //             { email: { [Op.like]: `%${search}%` } },
    //             { id: { [Op.like]: `%${search}%` } },
    //             { username: { [Op.like]: `%${search}%` } },
    //             { fullName: { [Op.like]: `%${search}%` } },
    //         ],
    //     };
    //     filter = _.extend(searchOption, filter);
    // }


    const data = await userService.getUsers({
        limit: req.query.limit,
        offset: req.skip,
        filter
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