'use server';
/**
 * @fileOverview Generates suggested resolutions based on sensor data using AI.
 *
 * - generateSuggestedResolutions - A function that generates suggested resolutions.
 * - SuggestedResolutionsInput - The input type for the generateSuggestedResolutions function.
 * - SuggestedResolutionsOutput - The return type for the generateSuggestedResolutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestedResolutionsInputSchema = z.object({
  sensorData: z.array(
    z.object({
      cycle: z.number(),
      op1: z.number(),
      op2: z.number(),
      op3: z.number(),
      s3: z.number(),
      s4: z.number(),
      s9: z.number(),
      s11: z.number(),
      s12: z.number(),
      s13: z.number(),
      s14: z.number(),
      s15: z.number(),
      s20: z.number(),
    })
  ).describe('Array of sensor data readings.'),
  predictedRUL: z.number().describe('The predicted remaining useful life.'),
  predictionConfidence: z.number().describe('The confidence level of the RUL prediction.'),
});
export type SuggestedResolutionsInput = z.infer<typeof SuggestedResolutionsInputSchema>;

const SuggestedResolutionsOutputSchema = z.object({
  suggestedResolutions: z.array(z.string()).describe('Array of suggested resolutions to address predicted issues.'),
});
export type SuggestedResolutionsOutput = z.infer<typeof SuggestedResolutionsOutputSchema>;

export async function generateSuggestedResolutions(input: SuggestedResolutionsInput): Promise<SuggestedResolutionsOutput> {
  return generateSuggestedResolutionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestedResolutionsPrompt',
  input: {schema: SuggestedResolutionsInputSchema},
  output: {schema: SuggestedResolutionsOutputSchema},
  prompt: `You are an AI assistant specialized in providing solutions for predictive maintenance in industrial machinery.

  Based on the provided sensor data, predicted remaining useful life (RUL), and prediction confidence, generate a list of suggested resolutions to address any potential issues.

  Sensor Data:
  {{#each sensorData}}
  - Cycle: {{this.cycle}}, Op1: {{this.op1}}, Op2: {{this.op2}}, Op3: {{this.op3}}, S3: {{this.s3}}, S4: {{this.s4}}, S9: {{this.s9}}, S11: {{this.s11}}, S12: {{this.s12}}, S13: {{this.s13}}, S14: {{this.s14}}, S15: {{this.s15}}, S20: {{this.s20}}
  {{/each}}

  Predicted RUL: {{predictedRUL}}
  Prediction Confidence: {{predictionConfidence}}

  Suggested Resolutions: `,
});

const generateSuggestedResolutionsFlow = ai.defineFlow(
  {
    name: 'generateSuggestedResolutionsFlow',
    inputSchema: SuggestedResolutionsInputSchema,
    outputSchema: SuggestedResolutionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

