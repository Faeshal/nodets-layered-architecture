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
const log = log4js.getLogger("default");
const logError = log4js.getLogger("error");

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
    express: {
      // Appender for general express logs
      type: "dateFile",
      filename: "./logs/express.log",
      numBackups: 3,
      maxLogSize: 2097152, // 2MB (adjust as needed)
      layout: layoutConfig,
    },
    errorFile: {
      // Appender for error logs
      type: "dateFile",
      filename: "./logs/errors.log",
      numBackups: 7,
      maxLogSize: 10485760, // 10MB (adjust as needed)
      layout: layoutConfig,
    },
    console: {
      // for showing the log to terminal
      type: "console",
      layout: layoutConfig,
    },
  },
  categories: {
    default: { appenders: ["express", "console"], level: "info" }, // Log all non-error messages to express
    error: { appenders: ["errorFile", "console"], level: "error" }, // Log errors to errorFile
  },
});

// * db sync
(async () => {
  try {
    await AppDataSource.initialize();
    log.info("✅ Database Connected");
  } catch (error) {
    logError.error("Maria Connection Failure 🔥", error);
    process.exit(1);
  }
})();

// * Server Listen
app.listen(PORT, (err: any) => {
  if (err) {
    logError.error(`Error : ${err}`);
    process.exit(1);
  }
  log.info(`✅ Server is Running On Port: ${PORT}`);
});

export default app;
