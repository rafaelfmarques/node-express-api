import { TreatmenteForAI } from "./enums/enumTreatmentForAI";

export function getFlaggedCategories(
  treatment: Record<string, boolean>,
): string | undefined {
  for (const [category, flagged] of Object.entries(treatment)) {
    if (flagged) {
      const translation =
        TreatmenteForAI[category as keyof typeof TreatmenteForAI];
      if (translation) return translation;
    }
  }
}
