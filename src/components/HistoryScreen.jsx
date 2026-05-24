/**
 * HistoryScreen.jsx
 * Displays the last 50 translations with replay and restore functionality.
 */

import React, { useState } from 'react';

export default function HistoryScreen({
  history,
  clearHistory,
  translateInput,
  speakTranslation,
  setSrcLang,
  setTgtLang,
  settings,
}) {
  const [search, setSearch] = useState('');

  const filtered = history.filter(item =>
    !search ||
    item.srcText.toLowerCase().includes(search.toLowerCase()) ||
    item.tgtText.toLowerCase().includes(search.toLowerCase()) ||
    item.srcLang.toLowerCase().includes(search.toLowerCase()) ||
    item.tgtLang.toLowerCase().includes(search.toLowerCase())
  );

  const handleRestore = (item) => {
    setSrcLang(item.srcCode);
    setTgtLang(item.tgtCode);
    translateInput(item.srcText);
  };

  const handleReplay = (item, e) => {
    e.stopPropagation();
    // Re-speak the stored translation
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(item.tgtText);
      utt.lang = item.tgtCode;
      utt.rate = settings.ttsRate || 1.0;
      window.speechSynthesis.speak(utt);
    }
  };

  const formatTime = (ts) => {
    const date = ts instanceof Date ? ts : new Date(ts);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="history-screen">
      <div className="screen-header">
        <h2 className="screen-title">Session History</h2>
        {history.length > 0 && (
          <button className="danger-btn" onClick={clearHistory}>
            Clear all
          </button>
        )}
      </div>

      {history.length > 0 && (
        <input
          className="search-input"
          type="search"
          placeholder="Search translations…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search history"
        />
      )}

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span aria-hidden="true">🗂</span>
          <p>{history.length === 0 ? 'No translations yet. Start speaking or typing!' : 'No results match your search.'}</p>
        </div>
      ) : (
        <ul className="history-list" aria-label="Translation history">
          {filtered.map(item => (
            <li
              key={item.id}
              className="history-item"
              onClick={() => handleRestore(item)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleRestore(item)}
              aria-label={`Translation from ${item.srcLang} to ${item.tgtLang}: ${item.srcText}`}
            >
              <div className="hi-meta">
                <span className="hi-langs">
                  {item.srcLang} → {item.tgtLang}
                </span>
                <span className="hi-time">{formatTime(item.timestamp)}</span>
              </div>
              <p className="hi-src" lang={item.srcCode}>{item.srcText}</p>
              <p className="hi-tgt" lang={item.tgtCode}>{item.tgtText}</p>
              {item.romanization && (
                <p className="hi-roman">🔤 {item.romanization}</p>
              )}
              <div className="hi-actions">
                <button
                  className="hi-action-btn"
                  onClick={(e) => handleReplay(item, e)}
                  aria-label="Replay translation audio"
                >
                  ▶ Play
                </button>
                <button
                  className="hi-action-btn"
                  onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(item.tgtText); }}
                  aria-label="Copy translation"
                >
                  📋 Copy
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
