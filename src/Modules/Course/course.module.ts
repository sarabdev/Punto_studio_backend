import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { Course } from "src/typeorm/entities/course";
import { Lesson } from "src/typeorm/entities/lesson";
import { OpenAIModule } from "../OpenAi/openai.module";
import { LessonModule } from "../Lesson/lesson.module";
import { LessonService } from "../Lesson/lesson.service";
import { AuthServices } from "../Auth/auth.service";
import { User } from "src/typeorm/entities/user";

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Lesson, User]),
    LessonModule,
    OpenAIModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, AuthServices],
})
export class CourseModule {}
