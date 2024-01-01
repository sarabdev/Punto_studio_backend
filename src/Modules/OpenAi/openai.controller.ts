// src/chat/chat.controller.ts
import { Controller, Post, Body, Res } from "@nestjs/common";
import { OpenAIService } from "../OpenAi/OpenAi.service";

@Controller("api/chat")
export class ChatController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post("message")
  async sendMessage(
    @Body()
    body: {
      conversation: { role: string; content: string }[];
      newMessage: string;
    },
    @Res() res
  ): Promise<void> {
    try {
      // Ensure newMessage is a non-empty string
      if (typeof body.newMessage === "string" && body.newMessage.trim()) {
        // Add the new message to the conversation history
        body.conversation.push({
          role: "user",
          content: body.newMessage.trim(),
        });
      }

      const botResponse = await this.openAIService.conversation(
        body.conversation
      );
      res.json({ message: botResponse, conversation: body.conversation });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
