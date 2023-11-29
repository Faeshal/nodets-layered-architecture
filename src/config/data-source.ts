import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Income } from "../entities/Income";
import { Category } from "../entities/Category";
import { Profile } from "../entities/Profile";

console.log(process.env.DB_PORT);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Income, Category, Profile],
  migrations: [],
  subscribers: [],
});
