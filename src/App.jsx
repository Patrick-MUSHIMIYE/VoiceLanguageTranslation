/**
 * App.jsx
 * Root component — sets up routing between the three main screens.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import TranslateScreen from './components/TranslateScreen';
import HistoryScreen from './components/HistoryScreen';
import SettingsScreen from './components/SettingsScreen';
import { useTranslation } from './hooks/useTranslation';
import './styles/globals.css';

export default function App() {
  // Single shared translation state hoisted here so all screens share it
  const translationState = useTranslation();

  return (
    <Router>
      <div className="app-shell">
        {/* Background decorations */}
        <div className="bg-grid" aria-hidden="true" />
        <div className="bg-orb bg-orb1" aria-hidden="true" />
        <div className="bg-orb bg-orb2" aria-hidden="true" />

        {/* Header */}
        <header className="app-header">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">🌐</div>
            <div>
              <h1 className="brand-name">Lingua<span>Link</span></h1>
              <p className="brand-tag">Universal Earplug Translator</p>
            </div>
          </div>
          <div className="status-pill">
            <div className={`status-dot ${translationState.isTranslating ? 'busy' : translationState.error ? 'err' : ''}`} />
            <span>{translationState.isTranslating ? 'Translating…' : translationState.isRecording ? 'Listening…' : 'Ready'}</span>
          </div>
        </header>

        {/* Nav tabs */}
        <nav className="app-nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
            🎙 Translate
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
            📋 History {translationState.history.length > 0 && <span className="nav-badge">{translationState.history.length}</span>}
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
            ⚙ Settings
          </NavLink>
        </nav>

        {/* Main content */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<TranslateScreen {...translationState} />} />
            <Route path="/history" element={<HistoryScreen {...translationState} />} />
            <Route path="/settings" element={<SettingsScreen {...translationState} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
