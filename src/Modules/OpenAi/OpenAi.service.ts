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
        messages: [
          {
            // Always starting with a system message ensures that you are starting a new session.
            role: "system",
            content:
              "Sei ChatGPT, un grande modello di linguaggio privatizzato sviluppato da OpenAI.   ",
          },

          { role: "user", content: prompt },
        ],
        // model: "gpt-4-1106-preview",
      //  model: "gpt-3.5-turbo",
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
  async generateLessonObject(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        messages: [
          {
            // Always starting with a system message ensures that you are starting a new session.
            role: "system",
            content:
              "Sei ChatGPT, un grande modello di linguaggio privatizzato sviluppato da OpenAI. ",
          },

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
        throw new Error("Nessuna scelta valida trovata nella risposta.");
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw error;
    }
  }

  async extractCourseNameFromText(text: string): Promise<string> {
    const splitedtext = await this.splitTextByTokenLimit(text);
    const prompt = `Ecco un testo dettagliato: "${splitedtext[0]}". Qual sarebbe un nome di corso adatto basato su questo contenuto? Fornisci solo il nome del corso, senza altre informazioni. Nota: controlla la lingua del documento fornito e rispondi nella stessa lingua del documento. Solo il nome e non fornire alcun nome di corso: 'qui sarà il nome'. Il nome dovrebbe essere breve, massimo una riga.`;
    return await this.generateText(prompt);
  }

  async extractLessonNameFromText(text: string): Promise<string> {
    const splitedtext = await this.splitTextByTokenLimit(text);
    const prompt = `Ecco un testo dettagliato: "${splitedtext[0]}". Qual sarebbe un nome di lezione adatto basato su questo contenuto? Fornisci solo il nome della lezione, senza altre informazioni. Nota: controlla la lingua del documento fornito e rispondi nella stessa lingua del documento. Solo il nome e non fornire alcun nome di corso: 'qui sarà il nome'. Il nome dovrebbe essere breve, massimo una riga.`;
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
    const maxChunkSize = 2248;
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
        model: "gpt-3.5-turbo-1106",
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

  async splitTextByTokenLimit(
    text: string,
    maxTokenSize: number = 1600
  ): Promise<string[]> {
    const chunks = [];
    let currentChunk = "";
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || []; // Splits the text into sentences
    for (const sentence of sentences) {
      const sentenceWithSpace = `${sentence} `;
      const prospectiveChunk = `${currentChunk}${sentenceWithSpace}`;
      const prospectiveTokens = this.countTokens(prospectiveChunk);
      if (prospectiveTokens > maxTokenSize) {
        // If adding the next sentence exceeds the maxTokenSize, push the current chunk and start a new one
        chunks.push(currentChunk.trim());
        currentChunk = sentenceWithSpace;
      } else {
        // Otherwise, keep adding sentences to the current chunk
        currentChunk = prospectiveChunk;
      }
    }
    // Add the last chunk if it's not empty
    if (currentChunk.trim().length > 0) {
      chunks.push(currentChunk.trim());
    }
    return chunks;
  }

  // Helper function to estimate the number of tokens in a string
  countTokens(text: string): number {
    const words = text.split(/\s+/g); // Split by any whitespace
    return words.length; // A rough estimate of tokens
  }
}
