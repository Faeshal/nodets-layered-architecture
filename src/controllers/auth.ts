import asyncHandler from "express-async-handler";
import * as authService from "../services/auth"
import { validationResult } from "express-validator";
import { ErrorResponse } from "../middleware/errorHandler";
import log4js from "log4js";
const log = log4js.getLogger("controllers:auth");
log.level = "info";


// * @route   POST /api/v1/auth/register
// @desc      signup new user
// @access    Public 
export const register = asyncHandler(async (req, res, next) => {
    var { username, email, password, role } = req.body;
    log.info("body:", req.body);

    // *Express Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new ErrorResponse(errors.array({ onlyFirstError: true })[0].msg, 400)
        );
    }

    const result = await authService.register({ username, email, password, role })
    if (result.success == false) {
        return next(new ErrorResponse(result.message, result.statusCode));
    }
    res.status(200).json({ success: true, message: "ok", data: result.data });
});

// * @route POST /api/v1/auth/login
// @desc    sign in user
// @access  public
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    log.info("body:", req.body);

    // *Express Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new ErrorResponse(errors.array({ onlyFirstError: true })[0].msg, 400)
        );
    }

    // * call service
    const result = await authService.login({ email, password })
    if (result.success == false) {
        return next(new ErrorResponse(result.message, result.statusCode || 500));
    }

    res.status(200).json({ success: true, message: "ok", data: result.data });
});
