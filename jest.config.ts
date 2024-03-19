// js version
// /** @type {import('ts-jest').JestConfigWithTsJest} */
// require("dotenv").config({
//   path: "./.env.test.local",
// });
// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   testMatch: ["**/**/*.test.ts"],
//   verbose: true,
//   forceExit: true,
//   clearMocks: true,
//   resetMocks: true,
//   restoreMocks: true,
// };

import type { Config } from "@jest/types";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env.test.local",
});

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};

export default config;
