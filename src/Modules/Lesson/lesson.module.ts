import { Module } from "@nestjs/common";
import { LessonController } from "./lesson.controller";
import { LessonService } from "./lesson.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "src/typeorm/entities/course";
import { Lesson } from "src/typeorm/entities/lesson";

@Module({
  imports: [TypeOrmModule.forFeature([Course, Lesson])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
