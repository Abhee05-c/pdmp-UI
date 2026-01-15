'use server';

import { generateSuggestedResolutions, SuggestedResolutionsInput } from '@/ai/flows/generate-suggested-resolutions';
import { z } from 'zod';

const sensorDataSchema = z.object({
  cycle: z.coerce.number().min(0),
  op1: z.coerce.number(),
  op2: z.coerce.number(),
  op3: z.coerce.number(),
  s3: z.coerce.number(),
  s4: z.coerce.number(),
  s9: z.coerce.number(),
  s11: z.coerce.number(),
  s12: z.coerce.number(),
  s13: z.coerce.number(),
  s14: z.coerce.number(),
  s15: z.coerce.number(),
  s20: z.coerce.number(),
});

// Action for CSV prediction
export async function getPredictionFromCsv() {
    // Since we cannot parse the CSV on the server easily in this context,
    // we will use mock data for the AI flow, simulating that it was read from the file.
    const mockSensorData = [{
        cycle: 192, op1: -0.0007, op2: -0.0004, op3: 100, s3: 1400.6, s4: 554.36, 
        s9: 9046.73, s11: 47.47, s12: 521.66, s13: 2388.02, s14: 8138.62, s15: 8.4195, s20: 392
    }];
    const mockRul = Math.floor(Math.random() * 100) + 50;
    const mockConfidence = Math.random() * (0.99 - 0.85) + 0.85;

    try {
        const aiInput: SuggestedResolutionsInput = {
            sensorData: mockSensorData,
            predictedRUL: mockRul,
            predictionConfidence: mockConfidence
        };
        const aiResult = await generateSuggestedResolutions(aiInput);

        return {
            rul: mockRul,
            confidence: mockConfidence,
            resolutions: aiResult.suggestedResolutions,
            error: null
        };
    } catch (error) {
        console.error("AI flow failed:", error);
        return {
            rul: mockRul,
            confidence: mockConfidence,
            resolutions: ["AI analysis failed. Please check system logs.", "Default suggestion: Perform standard diagnostic check."],
            error: "AI analysis failed."
        };
    }
}

// Action for live data prediction
export async function getPredictionFromLiveData(data: z.infer<typeof sensorDataSchema>) {
    const mockRul = Math.floor(Math.random() * 120) + 40;
    const mockConfidence = Math.random() * (0.98 - 0.88) + 0.88;
    
    try {
         const aiInput: SuggestedResolutionsInput = {
            sensorData: [data],
            predictedRUL: mockRul,
            predictionConfidence: mockConfidence
        };
        const aiResult = await generateSuggestedResolutions(aiInput);

        return {
            rul: mockRul,
            confidence: mockConfidence,
            resolutions: aiResult.suggestedResolutions,
            error: null
        };
    } catch (error) {
        console.error("AI flow failed:", error);
         return {
            rul: mockRul,
            confidence: mockConfidence,
            resolutions: ["AI analysis failed. Please check system logs.", "Default suggestion: Check sensor connections and data integrity."],
            error: "AI analysis failed."
        };
    }
}
