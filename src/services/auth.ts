import "dotenv/config";
import * as userRepo from "../repositories/user";
import { ErrorResponse } from "../middleware/errorHandler";
import { generateToken } from "../utils/paseto";
import { LoginRequest, RegisterRequest } from "../interfaces/user";
import bcrypt from "bcrypt";
import log4js from "log4js";
const log = log4js.getLogger("service:auth");
log.level = "debug";

export const register = async (body: RegisterRequest) => {
  log.info("body:", body);
  const { username, email, password, role, gender, job, address, age } = body;

  // * call repo (check double email)
  const emailExist = await userRepo.findOne({ email });
  if (emailExist) {
    throw new ErrorResponse("email already exist", 400);
  }

  // * call repo (check double uname)
  const unameExist = await userRepo.findOne({ username });
  if (unameExist) {
    throw new ErrorResponse("username already exist", 400);
  }

  // * hash Pass
  const hashedPw = await bcrypt.hash(password, 12);

  // save profile first [old ways, separate insert operation]
  // const profile = await userRepo.createProfile({ gender, job, address, age }) // return profile.id -> then save fk to join table

  // * save user [including profile, one operation]
  const result = await userRepo.create({
    username,
    email,
    password: hashedPw,
    role,
    profile: { gender, job, address, age },
  });

  // * formating return data
  const fmtData = { id: result.id, username, email };
  return {
    success: true,
    statusCode: 200,
    message: "ok",
    data: fmtData,
  };
};

export const login = async (body: LoginRequest) => {
  log.info("body:", body);
  const { email, password } = body;

  // * check is email exist ?
  const user = await userRepo.findOne({ email });
  if (!user) {
    throw new ErrorResponse("email / password doesn't match or exists", 400);
  }

  // * compare Password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorResponse("email / password doesn't match or exists", 400);
  }

  // * generate paseto token
  const tokenPayload = {
    id: user.id,
    timestamp: Date.now(),
    role: user.role,
  };
  const accessToken = await generateToken(tokenPayload);

  // * formating data
  const fmtData = {
    isLoggedIn: true,
    accessToken: accessToken.data,
  };
  return { success: true, statusCode: 200, message: "ok", data: fmtData };
};
