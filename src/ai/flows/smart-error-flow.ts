/**
 * Genkit flow for smart error interpretation. This module is only loaded when
 * GEMINI_API_KEY or GOOGLE_API_KEY is set (via dynamic import from smart-error-interpretation).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SmartErrorInterpretationInputSchema = z.object({
  rawErrorMessage: z
    .string()
    .describe('The raw Gemini API error message that needs interpretation.'),
});

const SmartErrorInterpretationOutputSchema = z.object({
  userFriendlyMessage: z
    .string()
    .describe('A clear, concise, and actionable insight derived from the raw error message.'),
});

const smartErrorInterpretationPrompt = ai.definePrompt({
  name: 'smartErrorInterpretationPrompt',
  input: { schema: SmartErrorInterpretationInputSchema },
  output: { schema: SmartErrorInterpretationOutputSchema },
  prompt: `You are an expert in debugging and interpreting Google Gemini API error messages. Your goal is to help developers quickly understand and resolve issues.

A developer encountered the following raw Gemini API error message:

Raw Error Message: {{{rawErrorMessage}}}

Based on this raw error message, provide a user-friendly, actionable insight. Your response should be clear, concise, and offer practical steps or explanations for how to resolve the issue. Do not include the raw error message in your response. Just provide the actionable insight.`,
});

const smartErrorInterpretationFlow = ai.defineFlow(
  {
    name: 'smartErrorInterpretationFlow',
    inputSchema: SmartErrorInterpretationInputSchema,
    outputSchema: SmartErrorInterpretationOutputSchema,
  },
  async (input) => {
    const { output } = await smartErrorInterpretationPrompt(input);
    return output!;
  }
);

export type SmartErrorInterpretationInput = z.infer<typeof SmartErrorInterpretationInputSchema>;
export type SmartErrorInterpretationOutput = z.infer<typeof SmartErrorInterpretationOutputSchema>;

export async function runSmartErrorFlow(
  input: SmartErrorInterpretationInput
): Promise<SmartErrorInterpretationOutput> {
  return smartErrorInterpretationFlow(input);
}
