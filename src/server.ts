"use strict";
import "dotenv/config";
import PrettyError from "pretty-error";
import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./config/data-source";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import log4js from "log4js";
import { paginate } from "./middleware/paginate";
import dayjs from "dayjs";
import { errorHandler } from "./middleware/errorHandler";
import route from "./routes/index";
const PORT: any = process.env.PORT || 3000;
const pe = new PrettyError();
const app: any = express();
const log = log4js.getLogger("default");
const logError = log4js.getLogger("error");

// * Security, Compression & Parser
pe.start();
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Http Logger
morgan.token("time", (req: Request) => {
  let user = "anonym";
  if (req.user) {
    user = req.user.username || "anonym";
  }
  const time = dayjs().format("h:mm:ss A") + " - " + user;
  return time;
});
app.use(morgan("morgan: [:time] :method :url - :status"));

// * Paginate
app.use(paginate(10, 30));

// * Route
app.use(route);

// * Custom Error Handler
app.use(errorHandler);

// * Logging (console only — cloud deployments handle log aggregation themselves)
const layoutConfig = {
  type: "pattern",
  pattern: "%x{id}: [%x{info}] %p %c: %[%m%]",
  tokens: {
    id: () => Date.now(),
    info: () => dayjs().format("D/M/YYYY h:mm:ss A"),
  },
};

log4js.configure({
  appenders: {
    console: {
      type: "console",
      layout: layoutConfig,
    },
  },
  categories: {
    default: { appenders: ["console"], level: "info" },
    error: { appenders: ["console"], level: "error" },
  },
});

// * db sync + Server Listen (only when run directly, not when imported for tests)
if (require.main === module) {
  (async () => {
    try {
      await AppDataSource.initialize();
      log.info("✅ DB Connected");
    } catch (error) {
      logError.error("DB Connection Failure 🔥", error);
      process.exit(1);
    }
  })();

  app.listen(PORT, (err: any) => {
    if (err) {
      logError.error(`Error : ${err}`);
      process.exit(1);
    }
    log.info(`✅ Server is Running On Port: ${PORT}`);
  });
}

export default app;
