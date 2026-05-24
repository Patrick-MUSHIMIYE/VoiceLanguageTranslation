/**
 * LinguaLink Text-to-Speech Service
 * Uses the browser's Web Speech Synthesis API.
 *
 * Upgrade paths:
 *   - ElevenLabs API: premium, multilingual, natural voices
 *   - Google Cloud TTS: 220+ voices across 40+ languages
 *   - Azure Cognitive TTS: supports Kinyarwanda and rare languages
 */

let currentUtterance = null

/**
 * Speak text aloud using Web Speech Synthesis.
 *
 * @param {object} params
 * @param {string}   params.text     - Text to speak
 * @param {string}   params.langCode - BCP-47 language tag e.g. 'rw-RW', 'en-US'
 * @param {number}   [params.rate]   - Speech rate (0.5–2.0, default 1.0)
 * @param {number}   [params.pitch]  - Pitch (0.5–2.0, default 1.0)
 * @param {function} [params.onEnd]  - Callback when speech ends
 * @param {function} [params.onError]- Callback on error
 */
export function speak({ text, langCode, rate = 1.0, pitch = 1.0, onEnd, onError }) {
  if (!('speechSynthesis' in window)) {
    onError?.('Web Speech Synthesis is not supported in this browser.')
    return
  }

  stopSpeaking()

  const utt = new SpeechSynthesisUtterance(text)
  utt.lang = langCode
  utt.rate = rate
  utt.pitch = pitch

  // Try to find a voice matching the language
  const voices = window.speechSynthesis.getVoices()
  const match = voices.find(v => v.lang === langCode)
    || voices.find(v => v.lang.startsWith(langCode.split('-')[0]))
  if (match) utt.voice = match

  utt.onend = () => { currentUtterance = null; onEnd?.() }
  utt.onerror = (e) => { currentUtterance = null; onError?.(e.error) }

  currentUtterance = utt
  window.speechSynthesis.speak(utt)
}

/**
 * Stop any currently playing speech.
 */
export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
  currentUtterance = null
}

/**
 * Returns true if speech synthesis is currently active.
 */
export function isSpeaking() {
  return window.speechSynthesis?.speaking ?? false
}

/**
 * Get all available voices for a language code.
 * Useful for building a voice picker UI.
 *
 * @param {string} langCode - e.g. 'en', 'rw', 'fr-FR'
 * @returns {SpeechSynthesisVoice[]}
 */
export function getVoicesForLang(langCode) {
  const voices = window.speechSynthesis?.getVoices() || []
  const prefix = langCode.split('-')[0]
  return voices.filter(v => v.lang === langCode || v.lang.startsWith(prefix))
}
