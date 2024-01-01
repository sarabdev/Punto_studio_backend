import { User } from "./../typeorm/entities/user";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { Lesson } from "src/typeorm/entities/lesson";
import { Course } from "src/typeorm/entities/course";
dotenv.config();

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Lesson, Course],
  // synchronize: true,
  // dropSchema: true,
};
