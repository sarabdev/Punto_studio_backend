// import { MemberServices } from './member.service';
import { LoginDto } from "../../dto/login.dto";
import { RegisterDto } from "../../dto/register.dto";
import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  HttpException,
  HttpStatus,
  Request,
} from "@nestjs/common";
import { AuthServices } from "./auth.service";
import * as bcrypt from "bcrypt";
import { BadRequestException } from "@nestjs/common/exceptions";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Controller("api")
export class AuthController {
  constructor(
    private readonly authservice: AuthServices,
    private jwtservice: JwtService
  ) {}

  @Post("register")
  async register(@Body() registerData: RegisterDto) {
    const existingUser = await this.authservice.findOneWithEmail(
      registerData.email
    );
    if (existingUser) {
      throw new HttpException("L'utente esiste già.", HttpStatus.BAD_REQUEST);
    }
    registerData.password = await bcrypt.hash(registerData.password, 12);
    const newUser = await this.authservice.create(registerData);
    delete newUser.password;
    return {
      message: "Registrazione avvenuta con successo.",
      user: newUser,
    };
  }

  @Post("login")
  async login(
    @Body() loginData: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.authservice.findOneWithEmail(loginData.email);

    if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
      throw new BadRequestException("Credenziali non valide.");
    }

    const jwt = await this.jwtservice.signAsync({ id: user.id });

    response.cookie("jwt", jwt, { httpOnly: true });

    return {
      message: "Accesso riuscito con successo.",
      jwt,
    };
  }

  @Get("user")
  async getMe(@Request() req) {
    const user = req.user;
    return user;
  }

  @Post("update-password")
  async updatePassword(@Body() updatePasswordDto: RegisterDto) {
    let { email, password } = updatePasswordDto;
    password = await bcrypt.hash(updatePasswordDto.password, 12);
    return this.authservice.updatePassword(email, password);
  }
}
