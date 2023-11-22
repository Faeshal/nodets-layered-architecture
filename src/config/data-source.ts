import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Income } from "../entities/Income"
import { Category } from "../entities/Category"
import { Profile } from "../entities/Profile"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Income, Category, Profile],
    migrations: [],
    subscribers: [],
    timezone: "+07:00" // wib
})