/**
 * useTranslation.js
 * High-level hook that orchestrates the full pipeline:
 *   Speech → Text  →  Claude Translation  →  Text-to-Speech
 *
 * This is the primary interface for the Translate screen.
 *
 * Usage:
 *   const {
 *     srcText, tgtText, romanization,
 *     isRecording, isTranslating, isSpeaking,
 *     startRecording, stopRecording,
 *     translateInput,
 *     speakTranslation,
 *     swapLanguages,
 *     srcLang, tgtLang, setSrcLang, setTgtLang,
 *     history, clearHistory,
 *     settings, updateSettings,
 *     error,
 *   } = useTranslation();
 */

import { useState, useCallback, useRef } from 'react';
import { useSpeechRecognition } from './useSpeechRecognition';
import { useTextToSpeech } from './useTextToSpeech';
import { translateText } from '../api/translationApi';
import { getLang } from '../utils/languages';

const DEFAULT_SETTINGS = {
  formality: 'auto',       // 'auto' | 'formal' | 'casual'
  romanize: false,          // add romanization for non-Latin scripts
  autoTranslate: true,      // translate automatically on recording stop
  autoPlay: false,          // auto-play TTS after translation (earplug mode)
  ttsRate: 1.0,             // speech speed
  ttsPitch: 1.0,            // speech pitch
  maxRecordSecs: 30,        // max recording duration
  showInterim: true,        // show interim speech results
  largeText: false,
  highContrast: false,
};

export function useTranslation() {
  const [srcLang, setSrcLang] = useState('en');
  const [tgtLang, setTgtLang] = useState('rw');
  const [srcText, setSrcText] = useState('');
  const [tgtText, setTgtText] = useState('');
  const [romanization, setRomanization] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const lastFinalRef = useRef('');

  const { speak, stop: stopSpeaking, isSpeaking, isSupported: ttsSupported } = useTextToSpeech();

  // ── Speech Recognition ──────────────────────────────────────
  const handleFinalResult = useCallback(async (text) => {
    lastFinalRef.current = text;
    setSrcText(text);
    if (settings.autoTranslate) {
      await runTranslation(text);
    }
  }, [settings.autoTranslate, srcLang, tgtLang, settings]); // eslint-disable-line

  const handleInterimResult = useCallback((text) => {
    if (settings.showInterim) setSrcText(text + ' …');
  }, [settings.showInterim]);

  const { start: startRec, stop: stopRec, isRecording, error: recError, isSupported: sttSupported }
    = useSpeechRecognition({
      lang: srcLang,
      interimResults: settings.showInterim,
      maxDurationMs: settings.maxRecordSecs * 1000,
      onFinalResult: handleFinalResult,
      onInterimResult: handleInterimResult,
      onError: (msg) => setError(msg),
    });

  // ── Translation ─────────────────────────────────────────────
  const runTranslation = useCallback(async (text) => {
    if (!text?.trim()) return;
    setIsTranslating(true);
    setError(null);
    setTgtText('');
    setRomanization('');

    try {
      const srcName = getLang(srcLang).name;
      const tgtName = getLang(tgtLang).name;
      const result = await translateText({
        text,
        srcLang: srcName,
        tgtLang: tgtName,
        formality: settings.formality,
        romanize: settings.romanize,
      });

      setTgtText(result.translation);
      if (result.romanization) setRomanization(result.romanization);

      // Save to history
      setHistory(prev => [{
        id: Date.now(),
        srcText: text,
        tgtText: result.translation,
        romanization: result.romanization || '',
        srcLang: srcName,
        tgtLang: tgtName,
        srcCode: srcLang,
        tgtCode: tgtLang,
        timestamp: new Date(),
      }, ...prev].slice(0, 50));

      // Auto-play for earplug mode
      if (settings.autoPlay && ttsSupported) {
        setTimeout(() => {
          speak({
            text: result.translation,
            lang: getLang(tgtLang).tts,
            rate: settings.ttsRate,
            pitch: settings.ttsPitch,
          });
        }, 350);
      }
    } catch (err) {
      setError(err.message || 'Translation failed. Check your connection.');
    } finally {
      setIsTranslating(false);
    }
  }, [srcLang, tgtLang, settings, speak, ttsSupported]);

  // ── Public API ───────────────────────────────────────────────
  const startRecording = useCallback(() => {
    setError(null);
    setSrcText('');
    setTgtText('');
    setRomanization('');
    startRec();
  }, [startRec]);

  const stopRecording = useCallback(() => {
    stopRec();
  }, [stopRec]);

  const translateInput = useCallback(async (text) => {
    setSrcText(text);
    await runTranslation(text);
  }, [runTranslation]);

  const speakTranslation = useCallback(() => {
    if (!tgtText) return;
    speak({
      text: tgtText,
      lang: getLang(tgtLang).tts,
      rate: settings.ttsRate,
      pitch: settings.ttsPitch,
    });
  }, [tgtText, tgtLang, settings, speak]);

  const speakSource = useCallback(() => {
    if (!srcText) return;
    speak({
      text: srcText.replace(' …', ''),
      lang: getLang(srcLang).tts,
      rate: settings.ttsRate,
      pitch: settings.ttsPitch,
    });
  }, [srcText, srcLang, settings, speak]);

  const swapLanguages = useCallback(() => {
    setSrcLang(tgtLang);
    setTgtLang(srcLang);
    setSrcText(tgtText);
    setTgtText(srcText);
    setRomanization('');
  }, [srcLang, tgtLang, srcText, tgtText]);

  const clearHistory = useCallback(() => setHistory([]), []);

  const updateSettings = useCallback((patch) => {
    setSettings(prev => ({ ...prev, ...patch }));
  }, []);

  return {
    // Text state
    srcText, tgtText, romanization,
    // Status
    isRecording, isTranslating, isSpeaking,
    sttSupported, ttsSupported,
    error: error || recError,
    // Actions
    startRecording, stopRecording,
    translateInput,
    speakTranslation, speakSource, stopSpeaking,
    swapLanguages,
    // Language
    srcLang, tgtLang, setSrcLang, setTgtLang,
    // History
    history, clearHistory,
    // Settings
    settings, updateSettings,
  };
}
