import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { CourseService } from "./course.service";

@Controller("course")
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post("create-course")
  async createCourse(@Body("text") lessonText: string, @Request() req) {
    const user = req.user;
    return this.courseService.completion(lessonText, user.id);
  }

  @Get("get-course/:courseId/getCourse")
  async getCourse(@Param("courseId") courseId: number) {
    return this.courseService.getCourseWithLessons(courseId);
  }

  @Get("getUserCourses")
  async getUserCourses(@Request() req) {
    const user = req.user;
    return this.courseService.getAllUserCourses(user.id);
  }
  @Delete(":courseId/deleteCourse")
  async deleteCourse(@Param("courseId") courseId: number) {
    return this.courseService.deleteCourse(courseId);
  }
}
