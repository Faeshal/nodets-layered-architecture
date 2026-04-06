// Jest requires ts-node internally to parse TypeScript config files (.ts).
// Since we migrated from ts-node to tsx, ts-node is no longer installed.
// Converting to .js removes that dependency while keeping full functionality.
// Type safety is preserved via the @type JSDoc comment below.
const dotenv = require("dotenv");
dotenv.config({ path: "./.env.test.local" });

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { types: ["jest", "node"] } }],
  },
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};

module.exports = config;
