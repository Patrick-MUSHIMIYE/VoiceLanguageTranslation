/**
 * LinguaLink Translation Service
 * Wraps the Anthropic Claude API for high-quality, real-time translation.
 *
 * Upgrade paths:
 *   - Replace with DeepL API for EU-certified privacy
 *   - Add LibreTranslate for fully offline/self-hosted mode
 *   - Add Google Cloud Translation for maximum language coverage
 */

const CLAUDE_MODEL = 'claude-sonnet-4-20250514'

/**
 * Translate text using Claude AI.
 *
 * @param {object} params
 * @param {string} params.text        - Source text to translate
 * @param {string} params.srcLangName - Human-readable source language name
 * @param {string} params.tgtLangName - Human-readable target language name
 * @param {string} params.formality   - 'auto' | 'formal' | 'casual'
 * @param {boolean} params.romanize   - Whether to append romanization for non-Latin scripts
 * @returns {Promise<string>}         - Translated text
 */
export async function translateText({ text, srcLangName, tgtLangName, formality = 'auto', romanize = false }) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('VITE_ANTHROPIC_API_KEY is not set. Add it to your .env.local file.')
  }

  const formalityInstruction =
    formality === 'auto'
      ? 'Match the formality level of the source text.'
      : `Use ${formality} register throughout.`

  const romanizeInstruction = romanize
    ? 'If the target language uses a non-Latin script, append a new line: "Romanization: [pronunciation in Latin letters]"'
    : ''

  const systemPrompt = `You are a professional real-time interpreter for a spoken earplug translation device.
Your translations are heard aloud by people — accuracy, naturalness, and speed are critical.
Always preserve the full meaning and emotional tone of the original speech.`

  const userPrompt = `Translate the following from ${srcLangName} to ${tgtLangName}.

Rules:
- Return ONLY the translated text — no explanations, no quotes, no preamble
- ${formalityInstruction}
- ${romanizeInstruction}
- If the input is already in ${tgtLangName}, return it unchanged
- Keep contractions and natural spoken rhythm intact

Text to translate:
${text}`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content[0].text.trim()
}

/**
 * Detect the language of a given text using Claude.
 * Returns the detected language name.
 *
 * @param {string} text
 * @returns {Promise<string>} e.g. "Kinyarwanda"
 */
export async function detectLanguage(text) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) return 'Unknown'

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 32,
      messages: [{
        role: 'user',
        content: `What language is this text written in? Reply with ONLY the language name, nothing else.\n\nText: ${text.slice(0, 200)}`,
      }],
    }),
  })

  if (!response.ok) return 'Unknown'
  const data = await response.json()
  return data.content[0].text.trim()
}
