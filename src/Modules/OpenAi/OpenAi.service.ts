import { Injectable } from "@nestjs/common";
import { OpenAI } from "openai";
import { ConfigService } from "@nestjs/config";
import { generateStructuredAnalysis } from "../Lesson/lessonPrompt";

@Injectable()
export class OpenAIService {
  private openai;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("OPENAI_3_API_KEY");
    if (!apiKey) {
      throw new Error("The OPENAI_API_KEY environment variable is not set.");
    }
    this.openai = new OpenAI({ apiKey: apiKey });
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4-1106-preview",
        // model: "gpt-3.5-turbo",
      });

      const { choices } = response;
      if (choices && choices.length > 0 && choices[0].message) {
        return choices[0].message.content.trim();
      } else {
        throw new Error("No valid choices found in the response.");
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw error;
    }
  }
  async generateLessonObject(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        messages: [
          { role: "user", content: generateStructuredAnalysis(prompt) },
        ],
        // model: "gpt-3.5-turbo",
        // model: "gpt-4-1106-preview",
        model: "gpt-3.5-turbo-1106",
      });

      const { choices } = response;
      if (choices && choices.length > 0 && choices[0].message) {
        return choices[0].message.content.trim();
      } else {
        throw new Error("No valid choices found in the response.");
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw error;
    }
  }

  async extractCourseNameFromText(text: string): Promise<string> {
    const splitedtext = await this.splitTextforCourseName(text);
    const prompt = `Here is a detailed text: "${splitedtext[0]}". What would be a suitable course name based on this content?. Provide just course name not any ather information.Note:Please check the language of the provide document and and also reply in language in which the document is!.Just name and also not provide course name:"" just a "here will be the name"`;
    return await this.generateText(prompt);
  }

  async extractLessonNameFromText(text: string): Promise<string> {
    const splitedtext = await this.splitTextforCourseName(text);
    const prompt = `Here is a detailed text: "${splitedtext[0]}". What would be a suitable lesson name based on this content?. Provide just lesson name not any ather information.Note:Please check the language of the provide document and and also reply in language in which the document is!. Just name and also not provide course name:"" just a "here will be the name"`;
    return await this.generateText(prompt);
  }

  async splitTextIntoLessons(text: string): Promise<string[]> {
    const maxChunkSize = 2040;
    const words = text.split(/\s+/);
    const numberOfChunks = Math.ceil(words.length / maxChunkSize);
    const newMaxChunkSize = Math.ceil(words.length / numberOfChunks);
    let chunks = [];
    for (let i = 0; i < words.length; i += newMaxChunkSize) {
      let chunk = words.slice(i, i + newMaxChunkSize).join(" ");
      chunks.push(chunk);
    }
    return chunks;
  }

  async splitTextforCourseName(text: string): Promise<string[]> {
    const maxChunkSize = 35048;
    const words = text.split(/\s+/);
    const numberOfChunks = Math.ceil(words.length / maxChunkSize);
    const newMaxChunkSize = Math.ceil(words.length / numberOfChunks);
    let chunks = [];
    for (let i = 0; i < words.length; i += newMaxChunkSize) {
      let chunk = words.slice(i, i + newMaxChunkSize).join(" ");
      chunks.push(chunk);
    }
    return chunks;
  }

  splitTextBySize(text: string, maxChunkSize: number): string[] {
    let chunks = [];
    let index = 0;
    while (index < text.length) {
      let chunk = text.slice(index, index + maxChunkSize);

      let lastPeriodIndex = chunk.lastIndexOf(".");
      if (lastPeriodIndex !== -1 && lastPeriodIndex !== chunk.length - 1) {
        chunk = chunk.slice(0, lastPeriodIndex + 1);
      }

      chunks.push(chunk);
      index += chunk.length;
    }
    return chunks;
  }

  async generateLesson(textPart: string): Promise<string> {
    return await this.generateLessonObject(textPart);
  }

  async conversation(
    conversation: { role: string; content: string }[]
  ): Promise<string> {
    if (conversation.length === 0) {
      throw new Error("'conversation' array must contain at least one message");
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: conversation,
      });

      const { choices } = response;
      if (choices && choices.length > 0 && choices[0].message) {
        return choices[0].message.content.trim();
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw error;
    }
  }
}
