'use server';
/**
 * Server action to interpret raw Gemini API errors. Uses Genkit only when
 * GEMINI_API_KEY or GOOGLE_API_KEY is set; otherwise returns the raw message
 * so the app does not require an env key to run.
 */

export type SmartErrorInterpretationInput = {
  rawErrorMessage: string;
};

export type SmartErrorInterpretationOutput = {
  userFriendlyMessage: string;
};

export async function interpretGeminiError(
  input: SmartErrorInterpretationInput
): Promise<SmartErrorInterpretationOutput> {
  const hasEnvKey = !!(
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim()
  );

  if (!hasEnvKey) {
    return {
      userFriendlyMessage: input.rawErrorMessage,
    };
  }

  try {
    const { runSmartErrorFlow } = await import('./smart-error-flow');
    return runSmartErrorFlow(input);
  } catch (e) {
    console.error('Smart error interpretation failed:', e);
    return {
      userFriendlyMessage: input.rawErrorMessage,
    };
  }
}
