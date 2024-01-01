import { ConfigModule } from "@nestjs/config";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { FileProcessingController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./Modules/Auth/auth.module";
import { DatabaseConfig } from "./Database/databaseConfig";
import { LessonModule } from "./Modules/Lesson/lesson.module";
import { CourseModule } from "./Modules/Course/course.module";
import { JwtAuthGuard } from "./Modules/Auth/auth.middleware";
import { APP_GUARD } from "@nestjs/core";
@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    AuthModule,
    CourseModule,
    LessonModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [FileProcessingController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
