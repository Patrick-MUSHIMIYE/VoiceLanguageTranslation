/**
 * TranslateScreen.jsx
 * The primary interface — mic recording, language selection,
 * output panels, and earplug mode toggle.
 */

import React, { useState, useRef, useEffect } from 'react';
import { getSortedLanguages } from '../utils/languages';

const LANGUAGES = getSortedLanguages();

export default function TranslateScreen({
  srcText, tgtText, romanization,
  isRecording, isTranslating, isSpeaking,
  sttSupported, ttsSupported,
  error,
  startRecording, stopRecording,
  translateInput,
  speakTranslation, speakSource, stopSpeaking,
  swapLanguages,
  srcLang, tgtLang, setSrcLang, setTgtLang,
  settings, updateSettings,
}) {
  const [textInput, setTextInput] = useState('');
  const [earplugsOn, setEarplugsOn] = useState(settings.autoPlay);
  const waveRef = useRef(null);
  const waveTimer = useRef(null);

  // ── Waveform animation ──────────────────────────────────────
  useEffect(() => {
    if (!waveRef.current) return;
    const bars = waveRef.current.querySelectorAll('.wbar');
    clearInterval(waveTimer.current);

    if (isRecording || isTranslating) {
      waveTimer.current = setInterval(() => {
        bars.forEach((bar, i) => {
          const h = isRecording
            ? Math.random() * 44 + 4
            : Math.abs(Math.sin(Date.now() / 180 + i * 0.3)) * 28 + 4;
          bar.style.height = `${h}px`;
          bar.style.background = isRecording ? 'var(--accent)' : 'var(--warn)';
        });
      }, 80);
    } else {
      bars.forEach(bar => { bar.style.height = '3px'; bar.style.background = 'var(--border2)'; });
    }
    return () => clearInterval(waveTimer.current);
  }, [isRecording, isTranslating]);

  // ── Handlers ────────────────────────────────────────────────
  const handleMic = () => {
    if (isTranslating) return;
    isRecording ? stopRecording() : startRecording();
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    translateInput(textInput.trim());
    setTextInput('');
  };

  const handleEarplugToggle = (checked) => {
    setEarplugsOn(checked);
    updateSettings({ autoPlay: checked });
  };

  const handleSwap = () => {
    setSrcLang(tgtLang);
    setTgtLang(srcLang);
    swapLanguages();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const micState = isTranslating ? 'processing' : isRecording ? 'recording' : 'idle';

  return (
    <div className="translate-screen">

      {/* ── Earplug Banner ── */}
      <div className="ep-banner">
        <span className="ep-icon" aria-hidden="true">🦻</span>
        <div className="ep-info">
          <strong>Earplug Mode</strong>
          <p>Auto-plays translation in your earbuds after each phrase.</p>
        </div>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={earplugsOn}
            onChange={e => handleEarplugToggle(e.target.checked)}
            aria-label="Toggle earplug mode"
          />
          <span className="toggle-track"><span className="toggle-thumb" /></span>
          <span className="toggle-text">{earplugsOn ? 'On' : 'Off'}</span>
        </label>
      </div>

      {/* ── Language Row ── */}
      <div className="lang-row" role="group" aria-label="Language selection">
        <div className="lang-box">
          <label htmlFor="src-lang">I speak</label>
          <select
            id="src-lang"
            value={srcLang}
            onChange={e => setSrcLang(e.target.value)}
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
        </div>

        <button
          className="swap-btn"
          onClick={handleSwap}
          aria-label="Swap languages"
          title="Swap languages"
        >
          ⇄
        </button>

        <div className="lang-box">
          <label htmlFor="tgt-lang">Translate to</label>
          <select
            id="tgt-lang"
            value={tgtLang}
            onChange={e => setTgtLang(e.target.value)}
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Recording Zone ── */}
      <div className={`record-zone ${isRecording ? 'recording' : ''} ${isTranslating ? 'processing' : ''}`}>
        {/* Waveform */}
        <div className="waveform" ref={waveRef} aria-hidden="true">
          {Array.from({ length: 38 }).map((_, i) => (
            <div key={i} className="wbar" style={{ height: '3px' }} />
          ))}
        </div>

        {/* Mic button */}
        <div className="mic-wrap">
          {isRecording && (
            <>
              <div className="mic-ring outer" aria-hidden="true" />
              <div className="mic-ring inner" aria-hidden="true" />
            </>
          )}
          <button
            className={`mic-btn ${micState}`}
            onClick={handleMic}
            disabled={!sttSupported || isTranslating}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            aria-pressed={isRecording}
          >
            {isTranslating ? '⏳' : isRecording ? '⏹' : '🎤'}
          </button>
        </div>

        <p className="mic-label">
          {isTranslating ? 'Translating…' : isRecording ? 'Recording — tap to stop' : 'Tap to speak'}
        </p>
        <p className="mic-hint">
          {!sttSupported
            ? 'Voice input not supported — use text input below'
            : isRecording
            ? `Auto-stops after ${settings.maxRecordSecs}s`
            : 'Speak clearly for best accuracy'}
        </p>
      </div>

      {/* ── Text Input ── */}
      <form className="text-input-row" onSubmit={handleTextSubmit}>
        <input
          className="text-input"
          type="text"
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
          placeholder="Or type text here and press Enter…"
          aria-label="Text to translate"
          disabled={isTranslating}
        />
        <button
          type="submit"
          className="go-btn"
          disabled={!textInput.trim() || isTranslating}
        >
          Translate ↗
        </button>
      </form>

      {/* ── Error display ── */}
      {error && (
        <div className="error-banner" role="alert">
          ⚠ {error}
        </div>
      )}

      {/* ── Output Panels ── */}
      <div className="out-panels">
        {/* Source panel */}
        <div className={`out-panel ${srcText ? 'lit' : ''}`}>
          <div className="op-head">
            <span className="op-label">Original</span>
            <span className="op-badge badge-src">{LANGUAGES.find(l => l.code === srcLang)?.name || srcLang}</span>
          </div>
          <div className="op-body">
            {srcText ? (
              <>
                <p className="op-text">{srcText}</p>
                <div className="op-actions">
                  <button className="op-action" onClick={() => copyToClipboard(srcText)} aria-label="Copy original text">
                    📋 Copy
                  </button>
                  {ttsSupported && (
                    <button className="op-action" onClick={speakSource} aria-label="Listen to original">
                      🔊 Listen
                    </button>
                  )}
                </div>
              </>
            ) : (
              <p className="op-placeholder">Your speech or text will appear here…</p>
            )}
          </div>
        </div>

        {/* Target panel */}
        <div className={`out-panel ${tgtText ? 'lit lit-tgt' : ''}`}>
          <div className="op-head">
            <span className="op-label">Translation</span>
            <span className="op-badge badge-tgt">{LANGUAGES.find(l => l.code === tgtLang)?.name || tgtLang}</span>
          </div>
          <div className="op-body">
            {isTranslating && (
              <div className="translating-state">
                <span className="spinner" aria-hidden="true" />
                <span>Translating…</span>
              </div>
            )}
            {!isTranslating && tgtText && (
              <>
                <p className="op-text">{tgtText}</p>
                {romanization && (
                  <p className="romanization">🔤 {romanization}</p>
                )}
                <div className="op-actions">
                  <button className="op-action" onClick={() => copyToClipboard(tgtText)} aria-label="Copy translation">
                    📋 Copy
                  </button>
                  {ttsSupported && (
                    <button
                      className={`op-action ${isSpeaking ? 'speaking' : ''}`}
                      onClick={isSpeaking ? stopSpeaking : speakTranslation}
                      aria-label={isSpeaking ? 'Stop speaking' : 'Listen to translation'}
                    >
                      {isSpeaking ? '⏸ Stop' : '🔊 Listen'}
                    </button>
                  )}
                </div>
              </>
            )}
            {!isTranslating && !tgtText && (
              <p className="op-placeholder">Translation appears here…</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Earplug play button (shown after translation) ── */}
      {tgtText && ttsSupported && (
        <div className="tts-bar">
          <button
            className={`tts-main-btn ${isSpeaking ? 'playing' : ''}`}
            onClick={isSpeaking ? stopSpeaking : speakTranslation}
            aria-label="Play translation in earplug"
          >
            {isSpeaking ? '⏸ Playing in ear…' : '🔊 Play in earplug'}
          </button>
          <div className="tts-speed-wrap">
            <label htmlFor="tts-speed">Speed</label>
            <select
              id="tts-speed"
              value={settings.ttsRate}
              onChange={e => updateSettings({ ttsRate: parseFloat(e.target.value) })}
            >
              <option value={0.7}>Slow</option>
              <option value={0.9}>Normal</option>
              <option value={1.0}>Slightly fast</option>
              <option value={1.2}>Fast</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
