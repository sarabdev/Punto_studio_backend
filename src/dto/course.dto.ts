import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsDate()
  lastOpened?: Date;
}

export class UpdateCourseDto {
  @IsOptional()
  @IsDate()
  lastOpened?: Date;

  @IsOptional()
  name: string;
}
