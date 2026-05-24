/**
 * translationApi.js
 * Calls the Express backend on port 3001.
 * Hardcoded to localhost:3001 for reliable local development.
 */

const API_BASE = 'http://localhost:3001';

export async function translateText({ text, srcLang, tgtLang, formality = 'auto', romanize = false }) {
  if (!text?.trim()) throw new Error('No text provided');

  const response = await fetch(`${API_BASE}/api/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, srcLang, tgtLang, formality, romanize }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || `Server error ${response.status}`);
  }

  return response.json();
}

export async function detectLanguage(text) {
  if (!text?.trim()) return null;

  const response = await fetch(`${API_BASE}/api/detect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) return null;
  return response.json();
}