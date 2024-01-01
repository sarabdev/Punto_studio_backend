import {
  IsInt,
  IsString,
  MaxLength,
  Min,
  Max,
  IsOptional,
} from "class-validator";

export class CreateLessonDto {
  @IsString()
  @MaxLength(255)
  lesson_name: string;

  @IsString()
  content: string;

  @IsInt()
  @Min(0)
  @Max(5)
  content_rating: number;

  @IsInt()
  courseId: number;
}

export class UpdateLessonDto {
  @IsString()
  @MaxLength(255)
  @IsOptional()
  lesson_name?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  content_rating?: number;
}
