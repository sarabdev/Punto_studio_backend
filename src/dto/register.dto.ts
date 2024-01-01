import { IsNotEmpty, IsEmail, Length } from "class-validator";

export class RegisterDto {
  @IsNotEmpty({ message: "User Should have @ in email" })
  @IsEmail()
  email: string;

  @Length(6, 15, { message: "Pin Should be Equal to or more than 6" })
  @IsNotEmpty({ message: "User Should have password" })
  password: string;

  @IsNotEmpty({ message: "User Should have name" })
  name: string;
}
