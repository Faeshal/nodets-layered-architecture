"use strict";
import "dotenv/config";
import PrettyError from "pretty-error";
import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./config/data-source";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import hpp from "hpp";
import helmet from "helmet";
import log4js from "log4js";
import paginate from "express-paginate";
import dayjs from "dayjs";
import { errorHandler } from "./middleware/errorHandler";
import route from "./routes/index";
const PORT: any = process.env.PORT || 3000;
const pe = new PrettyError();
const app: any = express();
const log = log4js.getLogger("entrypoint");
log.level = "info";

// * Security, Compression & Parser
pe.start();
app.use(helmet());
app.use(hpp());
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
app.use(paginate.middleware(10, 30));

// * Route
app.use(route);

// * Custom Error Handler
app.use(errorHandler);

// * Rolliing log (optional)
let layoutConfig = {
  type: "pattern",
  pattern: "%x{id}: [%x{info}] %p %c - %[%m%]",
  tokens: {
    id: () => {
      return Date.now();
    },
    info: () => {
      const info = dayjs().format("D/M/YYYY h:mm:ss A");
      return info;
    },
  },
};
log4js.configure({
  appenders: {
    express: {
      type: "dateFile",
      filename: "./logs/express.log",
      numBackups: 7,
      layout: layoutConfig,
      maxLogSize: 7000000, // byte == 7mb
    },
    console: {
      type: "console",
      layout: layoutConfig,
    },
  },
  categories: {
    default: { appenders: ["express", "console"], level: "debug" },
  },
});

// * db sync
(async () => {
  try {
    await AppDataSource.initialize();
    log.info("✅ MariaDB Connected");
  } catch (error) {
    log.error("Maria Connection Failure 🔥", error);
    process.exit(1);
  }
})();

// * Server Listen
app.listen(PORT, (err: any) => {
  if (err) {
    log.error(`Error : ${err}`);
    process.exit(1);
  }
  log.info(`✅ Server is Running On Port: ${PORT}`);
});

export default app;
