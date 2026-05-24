/**
 * useSpeechRecognition.js
 * React hook wrapping the Web Speech API (SpeechRecognition).
 *
 * Supported browsers: Chrome, Edge, Safari 15+
 * Falls back gracefully when unavailable.
 *
 * Usage:
 *   const { start, stop, isRecording, transcript, interimTranscript, error, isSupported }
 *     = useSpeechRecognition({ lang: 'rw', onFinalResult, onInterimResult, continuous });
 */

import { useState, useRef, useCallback, useEffect } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export function useSpeechRecognition({
  lang = 'en',
  continuous = false,
  interimResults = true,
  maxDurationMs = 30000,
  onFinalResult,
  onInterimResult,
  onError,
} = {}) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);
  const maxTimerRef = useRef(null);
  const isSupported = Boolean(SpeechRecognition);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      clearTimeout(maxTimerRef.current);
    };
  }, []);

  const start = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    if (isRecording) return;

    setError(null);
    setTranscript('');
    setInterimTranscript('');

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognitionRef.current = recognition;

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (event) => {
      let finalText = '';
      let interimText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interimText += result[0].transcript;
        }
      }
      if (finalText) {
        setTranscript(prev => prev + finalText);
        onFinalResult?.(finalText);
      }
      if (interimText) {
        setInterimTranscript(interimText);
        onInterimResult?.(interimText);
      }
    };

    recognition.onerror = (event) => {
      const msg = errorMessage(event.error);
      setError(msg);
      setIsRecording(false);
      onError?.(msg);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setInterimTranscript('');
      clearTimeout(maxTimerRef.current);
    };

    // Safety: auto-stop after maxDurationMs
    maxTimerRef.current = setTimeout(() => {
      recognition.stop();
    }, maxDurationMs);

    try {
      recognition.start();
    } catch (e) {
      setError('Could not start microphone. Check browser permissions.');
      setIsRecording(false);
    }
  }, [lang, continuous, interimResults, maxDurationMs, isRecording, isSupported, onFinalResult, onInterimResult, onError]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    clearTimeout(maxTimerRef.current);
  }, []);

  const abort = useCallback(() => {
    recognitionRef.current?.abort();
    clearTimeout(maxTimerRef.current);
    setIsRecording(false);
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return { start, stop, abort, isRecording, transcript, interimTranscript, error, isSupported };
}

function errorMessage(code) {
  const messages = {
    'not-allowed': 'Microphone access denied. Please allow microphone permissions in your browser settings.',
    'no-speech': 'No speech detected. Try speaking louder or closer to the microphone.',
    'network': 'Network error during speech recognition. Check your connection.',
    'audio-capture': 'No microphone found. Please connect a microphone.',
    'aborted': 'Recording was cancelled.',
  };
  return messages[code] || `Speech recognition error: ${code}`;
}
