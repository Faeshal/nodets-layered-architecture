import { ValueTransformer } from "typeorm";
import dayjs from "dayjs";

// Define a custom transformer for dates
const dateFmt: ValueTransformer = {
  to: (value: Date) => value, // store as is in the database
  from: (value: Date) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"), // format when reading from database
};

export default dateFmt;
