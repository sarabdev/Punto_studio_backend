import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
} from "@nestjs/platform-express";

import mammoth from "mammoth";
const Tesseract = require("tesseract.js");
import { File } from "multer";
const officeParser = require("officeparser");

@Controller("file-processing")
export class FileProcessingController {
  @Post("extract-text")
  @UseInterceptors(AnyFilesInterceptor())
  async extractTextFromFiles(
    @UploadedFiles() files: Array<File>
  ): Promise<string> {
    let combinedText = "";

    if (!files || !Array.isArray(files)) {
      throw new Error("Files not provided or not in expected format");
    }

    for (const file of files) {
      if (
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        combinedText += await this.extractTextFromDOCX(file.buffer);
      } else if (file.mimetype.startsWith("image/")) {
        combinedText += await this.extractTextFromImage(file);
      } else if (
        [
          "application/vnd.ms-powerpoint", // .ppt
          "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
          "application/vnd.oasis.opendocument.text", // .odt
          "application/vnd.oasis.opendocument.presentation", // .odp
          "application/vnd.oasis.opendocument.spreadsheet", // .ods
          "application/pdf", // .pdf
        ].includes(file.mimetype)
      ) {
        combinedText += await this.extractTextUsingOfficeParser(file.buffer);
      } else if (file.mimetype === "text/plain") {
        combinedText += await this.extractTextFromTXT(file.buffer);
      }
    }

    return combinedText.trim();
  }

  private async extractTextFromDOCX(buffer: Buffer): Promise<string> {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (error) {
      throw new Error("Failed to extract text from DOCX file.");
    }
  }

  private async extractTextFromImage(file: File): Promise<string> {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(file.buffer, "eng", {
        logger: (m) => console.log(m),
      });
      return text;
    } catch (error) {
      console.error("Detailed error from Tesseract:", error); // Log the detailed error
      throw new Error("Failed to extract text from image file.");
    }
  }
  private async extractTextUsingOfficeParser(buffer: Buffer): Promise<string> {
    try {
      return await officeParser.parseOfficeAsync(buffer);
    } catch (error) {
      console.error("Failed to extract text from office file:", error);
      throw new Error("Failed to extract text from office file.");
    }
  }

  private async extractTextFromTXT(buffer: Buffer): Promise<string> {
    return buffer.toString("utf-8");
  }
}
