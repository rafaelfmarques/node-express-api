import { IAiUseCase } from "@/core/domain/use-cases/IAiUseCase";
import { AppError } from "../exceptions";

export class OpenAiUseCase implements IAiUseCase {
  async validationByAI(input: string) {
    try {
      const response = await fetch("https://api.openai.com/v1/moderations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPEN_AI_PRIVATE_KEY}`,
        },
        body: JSON.stringify({ input }),
      });
      return response.json();
    } catch (err: any) {
      throw new AppError(err?.response?.data ?? "Failed to validate input");
    }
  }
}
