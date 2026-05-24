/**
 * useTextToSpeech.js
 * React hook wrapping the Web Speech Synthesis API.
 *
 * Plays translated text through the device speaker / connected earbuds.
 * Works with all supported SpeechSynthesis voices installed on the OS.
 *
 * Usage:
 *   const { speak, stop, isSpeaking, isSupported } = useTextToSpeech();
 *   speak({ text: 'Muraho!', lang: 'rw-RW', rate: 1.0, pitch: 1.0 });
 */

import { useState, useRef, useCallback, useEffect } from 'react';

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const utteranceRef = useRef(null);
  const isSupported = 'speechSynthesis' in window;

  // Load available voices (they load async in some browsers)
  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      setAvailableVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, [isSupported]);

  const speak = useCallback(({ text, lang = 'en-US', rate = 1.0, pitch = 1.0, volume = 1.0, onEnd } = {}) => {
    if (!isSupported || !text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    // Try to find the best matching voice for the language
    const bestVoice = findBestVoice(availableVoices, lang);
    if (bestVoice) utterance.voice = bestVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;

    // Workaround: Chrome pauses synthesis on long strings — resume if paused
    window.speechSynthesis.speak(utterance);
    const resumeTimer = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(resumeTimer);
        return;
      }
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }, 5000);
  }, [isSupported, availableVoices]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  return { speak, stop, isSpeaking, availableVoices, isSupported };
}

/**
 * Find the best available TTS voice for a given BCP-47 locale.
 * Tries exact match first, then language-only match, then any voice.
 */
function findBestVoice(voices, lang) {
  if (!voices.length) return null;

  const langBase = lang.split('-')[0].toLowerCase();

  // Exact locale match (e.g. "rw-RW")
  const exact = voices.find(v => v.lang.toLowerCase() === lang.toLowerCase());
  if (exact) return exact;

  // Language-only match (e.g. "rw")
  const partial = voices.find(v => v.lang.toLowerCase().startsWith(langBase));
  if (partial) return partial;

  // No matching voice — browser will use its default for that lang tag
  return null;
}
