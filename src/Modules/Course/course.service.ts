// src/course/course.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { OpenAIService } from "./../OpenAi/OpenAi.service";
import { LessonService } from "./../Lesson/lesson.service";
import { Course } from "src/typeorm/entities/course";
import { Lesson } from "src/typeorm/entities/lesson";
import { AuthServices } from "../Auth/auth.service";

@Injectable()
export class CourseService {
  constructor(
    private openAIService: OpenAIService,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Lesson) private lessonService: Repository<Lesson>,
    private authService: AuthServices
  ) {}

  async completion(text: string, userId: number): Promise<number> {
    const courseName = await this.openAIService.extractCourseNameFromText(text);
    const user = await this.authService.findOneWithId(userId);

    const course = this.courseRepository.create({
      name: courseName,
      user: user,
    });
    await this.courseRepository.save(course);

    const textParts = await this.openAIService.splitTextIntoLessons(text);

    // Prepare an array of promises for processing all the lessons.
    const lessonPromises = textParts.map(async (part) => {
      try {
        const lessonContent = await this.openAIService.generateLesson(part);
        const lessonname =
          await this.openAIService.extractLessonNameFromText(part);

        const lesson = this.lessonService.create({
          lesson_name: lessonname,
          content: lessonContent,
          course: course,
        });

        return this.lessonService.save(lesson);
      } catch (error) {
        console.error("Error generating or saving lesson:", error);
        return null;
      }
    });

    const results = await Promise.all(lessonPromises);
    return course.id;
  }

  // Function to get a course with its lessons by course id
  async getCourseWithLessons(courseId: number): Promise<Course> {
    const courseWithLessons = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ["lessons"],
    });

    if (!courseWithLessons) {
      throw new Error(`Corso con ID ${courseId} non trovato.`);
    }

    return courseWithLessons;
  }

  async deleteCourse(courseId: number): Promise<void> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ["lessons"],
    });

    if (!course) {
      throw new Error(`Corso con ID ${courseId}  non trovato.`);
    }
    await this.lessonService.remove(course.lessons);
    await this.courseRepository.remove(course);
  }

  // Function to get all courses  with its lessons
  async getAllUserCourses(userId: number): Promise<Course[]> {
    const userCoursesWithLessons = await this.courseRepository.find({
      where: { user: { id: userId } },
      relations: ["lessons"],
      order: {
        createdAt: "desc", // Assuming 'createdAt' is the name of the column
      },
    });
    return userCoursesWithLessons;
  }

  // async updateLastOpened(courseId: number): Promise<void> {
  //   const course = await this.courseRepository.findOne(courseId);

  //   if (!course) {
  //     throw new Error(`Course with id ${courseId} not found`);
  //   }

  //   course.lastOpened = new Date(); // Set it to the current date and time
  //   await this.courseRepository.save(course);
  // }
}
