import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Course } from "./course";

@Entity("lessons")
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lesson_name: string;

  @Column("text")
  content: string;

  @Column({ type: "int", default: 0 })
  content_rating: number;

  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;
}
