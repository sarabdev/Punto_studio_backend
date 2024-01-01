// openai.module.ts

import { Module, Global } from "@nestjs/common";
import { OpenAIService } from "./OpenAi.service";
import { ConfigModule } from "@nestjs/config";
import { ChatController } from "./openai.controller";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [OpenAIService],
  controllers: [ChatController],
  exports: [OpenAIService],
})
export class OpenAIModule {}
