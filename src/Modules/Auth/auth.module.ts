import { Module, Post } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthServices } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "src/typeorm/entities/user";
import { JwtModule, JwtService } from "@nestjs/jwt/dist";
import { MiddlewareConsumer, NestModule } from "@nestjs/common";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "3d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthServices],
  exports: [AuthServices, JwtModule],
})
export class AuthModule {}
