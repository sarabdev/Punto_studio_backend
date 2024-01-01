// src/lesson/lesson.service.ts
import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/typeorm/entities/course";
import { Lesson } from "src/typeorm/entities/lesson";
import { Repository } from "typeorm";

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
  ) {}

  async createLesson(details: {
    name: string;
    content: string;
    course: Course;
  }): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      lesson_name: details.name,
      content: details.content,
      course: details.course,
    });
    await this.lessonRepository.save(lesson);
    return lesson;
  }

  async getLessonById(id: number): Promise<Lesson | undefined> {
    return this.lessonRepository.findOne({ where: { id } });
  }
}
