import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.test.local" });

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/tests/**/*.test.ts"],
    globals: false,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    // Integration tests share one real DB connection — keep file execution
    // serial, same as Jest's --runInBand.
    fileParallelism: false,
  },
});
