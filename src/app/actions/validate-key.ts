'use server';

import { GoogleGenAI } from '@google/genai';

export type ValidateKeyResult =
  | { valid: true }
  | { valid: false; error: string };

/**
 * Validates a Gemini API key by calling the Gemini API (list models) with the
 * official @google/genai SDK. Key is only used server-side and never logged.
 */
export async function validateGeminiKey(apiKey: string): Promise<ValidateKeyResult> {
  const key = apiKey?.trim();
  if (!key || key.length < 10) {
    return { valid: false, error: 'API key must be at least 10 characters.' };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: key });
    const pager = await ai.models.list({ config: { pageSize: 1 } });
    // Consume first page to trigger the request and validate the key
    for await (const _ of pager) {
      break;
    }
    return { valid: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : String(err);
    const lower = typeof message === 'string' ? message.toLowerCase() : '';
    if (lower.includes('api key not valid') || lower.includes('invalid api key') || lower.includes('invalid key') || lower.includes('401') || lower.includes('api_key_invalid')) {
      return { valid: false, error: 'The API key is invalid or incorrect. Please check your key at Google AI Studio.' };
    }
    if (lower.includes('403') || lower.includes('permission') || lower.includes('forbidden')) {
      return { valid: false, error: "This API key doesn't have permission to use the Gemini API. Check your key restrictions in Google AI Studio." };
    }
    if (lower.includes('404') || lower.includes('not found')) {
      return { valid: false, error: 'Invalid request. Please check that your API key is correct.' };
    }
    if (lower.includes('quota') || lower.includes('rate limit') || lower.includes('resource exhausted')) {
      return { valid: false, error: 'API quota or rate limit exceeded. Try again later or check your quota in Google AI Studio.' };
    }
    if (lower.includes('expired') || lower.includes('revoked')) {
      return { valid: false, error: 'This API key has expired or been revoked. Create a new key in Google AI Studio.' };
    }
    return { valid: false, error: 'Invalid or expired API key. Please check your key at Google AI Studio.' };
  }
}

export type TestModelResult =
  | { status: 'working' }
  | { status: 'blocked'; error: string }
  | { status: 'quota-exhausted'; error: string }
  | { status: 'error'; error: string };

/**
 * Tests whether the given API key can access the model (models.get).
 * Key is only used server-side and never logged.
 */
export async function testModelWithKey(apiKey: string, modelId: string): Promise<TestModelResult> {
  const key = apiKey?.trim();
  if (!key || key.length < 10) {
    return { status: 'error', error: 'API key is required.' };
  }
  const id = modelId?.trim();
  if (!id) {
    return { status: 'error', error: 'Model ID is required.' };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: key });
    await ai.models.get({ model: id });
    return { status: 'working' };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const lower = message.toLowerCase();
    if (lower.includes('quota') || lower.includes('resource exhausted') || lower.includes('rate limit')) {
      return { status: 'quota-exhausted', error: message };
    }
    if (lower.includes('permission') || lower.includes('not available') || lower.includes('blocked') || lower.includes('403')) {
      return { status: 'blocked', error: message };
    }
    return { status: 'error', error: message };
  }
}
