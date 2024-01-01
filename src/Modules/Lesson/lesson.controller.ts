import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { LessonService } from "./lesson.service";

@Controller("lesson")
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post()
  async createLesson(@Body("text") lessonText: string) {}

  @Get("get-lesson/:lessonId/getLesson")
  async getCourse(@Param("lessonId") lessonId: number) {
    return this.lessonService.getLessonById(lessonId);
  }
}
