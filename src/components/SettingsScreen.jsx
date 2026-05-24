/**
 * SettingsScreen.jsx
 * Full settings panel — speech, audio, translation quality, accessibility.
 */

import React from 'react';

export default function SettingsScreen({ settings, updateSettings }) {
  const Toggle = ({ id, label, settingKey, description }) => (
    <div className="setting-row">
      <div className="setting-info">
        <label htmlFor={id} className="setting-label">{label}</label>
        {description && <p className="setting-desc">{description}</p>}
      </div>
      <label className="toggle-label">
        <input
          type="checkbox"
          id={id}
          checked={settings[settingKey]}
          onChange={e => updateSettings({ [settingKey]: e.target.checked })}
        />
        <span className="toggle-track"><span className="toggle-thumb" /></span>
      </label>
    </div>
  );

  return (
    <div className="settings-screen">

      {/* ── Speech Input ── */}
      <section className="settings-card" aria-labelledby="speech-heading">
        <h2 id="speech-heading" className="card-heading">🎙 Speech Input</h2>
        <Toggle
          id="auto-translate"
          label="Auto-translate on stop"
          settingKey="autoTranslate"
          description="Translate automatically when you stop recording"
        />
        <Toggle
          id="show-interim"
          label="Show live transcription"
          settingKey="showInterim"
          description="Display words as they are recognised, before the final result"
        />
        <div className="setting-row">
          <div className="setting-info">
            <label htmlFor="max-rec" className="setting-label">Max recording time</label>
            <p className="setting-desc">Recording stops automatically after this many seconds</p>
          </div>
          <div className="setting-control">
            <input
              id="max-rec"
              type="number"
              min={5} max={120}
              value={settings.maxRecordSecs}
              onChange={e => updateSettings({ maxRecordSecs: parseInt(e.target.value) || 30 })}
              className="number-input"
            />
            <span className="unit">sec</span>
          </div>
        </div>
      </section>

      {/* ── Audio Output ── */}
      <section className="settings-card" aria-labelledby="audio-heading">
        <h2 id="audio-heading" className="card-heading">🔊 Audio Output</h2>
        <Toggle
          id="auto-play"
          label="Earplug mode (auto-play)"
          settingKey="autoPlay"
          description="Play translated speech automatically after each translation"
        />
        <div className="setting-row">
          <div className="setting-info">
            <label htmlFor="tts-rate" className="setting-label">Speech speed</label>
          </div>
          <select
            id="tts-rate"
            className="setting-select"
            value={settings.ttsRate}
            onChange={e => updateSettings({ ttsRate: parseFloat(e.target.value) })}
          >
            <option value={0.6}>Very slow (0.6×)</option>
            <option value={0.8}>Slow (0.8×)</option>
            <option value={1.0}>Normal (1.0×)</option>
            <option value={1.2}>Fast (1.2×)</option>
            <option value={1.4}>Very fast (1.4×)</option>
          </select>
        </div>
        <div className="setting-row">
          <div className="setting-info">
            <label htmlFor="tts-pitch" className="setting-label">Voice pitch</label>
          </div>
          <select
            id="tts-pitch"
            className="setting-select"
            value={settings.ttsPitch}
            onChange={e => updateSettings({ ttsPitch: parseFloat(e.target.value) })}
          >
            <option value={0.8}>Low</option>
            <option value={1.0}>Normal</option>
            <option value={1.2}>High</option>
          </select>
        </div>
      </section>

      {/* ── Translation Quality ── */}
      <section className="settings-card" aria-labelledby="translation-heading">
        <h2 id="translation-heading" className="card-heading">🌐 Translation Quality</h2>
        <div className="setting-row">
          <div className="setting-info">
            <label htmlFor="formality" className="setting-label">Formality</label>
            <p className="setting-desc">Controls whether Claude uses formal or casual register</p>
          </div>
          <select
            id="formality"
            className="setting-select"
            value={settings.formality}
            onChange={e => updateSettings({ formality: e.target.value })}
          >
            <option value="auto">Auto-detect</option>
            <option value="formal">Always formal</option>
            <option value="casual">Always casual</option>
          </select>
        </div>
        <Toggle
          id="romanize"
          label="Add romanization"
          settingKey="romanize"
          description="For non-Latin scripts (Arabic, Japanese, etc.), show pronunciation guide"
        />
      </section>

      {/* ── Accessibility ── */}
      <section className="settings-card" aria-labelledby="a11y-heading">
        <h2 id="a11y-heading" className="card-heading">♿ Accessibility</h2>
        <Toggle
          id="large-text"
          label="Large text"
          settingKey="largeText"
          description="Increase font size throughout the app"
        />
        <Toggle
          id="high-contrast"
          label="High contrast"
          settingKey="highContrast"
          description="Increase text contrast for easier reading"
        />
      </section>

      {/* ── Earplug Usage Guide ── */}
      <section className="settings-card info-card" aria-labelledby="guide-heading">
        <h2 id="guide-heading" className="card-heading">🦻 How to use with earplugs</h2>
        <ol className="usage-steps">
          <li>Both speakers wear Bluetooth earbuds connected to their own device (phone, tablet, or laptop).</li>
          <li>Person A opens LinguaLink, sets language pair (e.g. English → Kinyarwanda), and enables Earplug Mode.</li>
          <li>Person A taps the microphone, speaks, and stops. The Kinyarwanda translation plays automatically in their earbuds.</li>
          <li>Person B taps ⇄ swap (now Kinyarwanda → English) and replies the same way — Person A hears English in their ear.</li>
          <li>Conversation flows naturally with no manual button-pressing after setup.</li>
        </ol>
        <div className="tech-tags">
          <span className="tech-tag active">Claude AI</span>
          <span className="tech-tag active">Web Speech API</span>
          <span className="tech-tag active">SpeechSynthesis</span>
          <span className="tech-tag">Whisper (upgrade)</span>
          <span className="tech-tag">ElevenLabs (upgrade)</span>
          <span className="tech-tag">React Native (mobile)</span>
        </div>
      </section>

    </div>
  );
}
