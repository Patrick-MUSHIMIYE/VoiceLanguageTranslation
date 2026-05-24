require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ─────────────────────────────────────────────────
// Allow ALL localhost origins in development
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (curl, Postman) or any localhost port
    if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '1mb' }));

// ── Anthropic client ───────────────────────────────────────────
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ── Health check ───────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Translation endpoint ───────────────────────────────────────
app.post('/api/translate', async (req, res) => {
  const { text, srcLang, tgtLang, formality = 'auto', romanize = false } = req.body;

  if (!text?.trim()) return res.status(400).json({ message: 'No text provided' });
  if (!srcLang || !tgtLang) return res.status(400).json({ message: 'srcLang and tgtLang are required' });

  const formalityNote = formality === 'auto'
    ? 'Match the register (formal/casual) of the source text.'
    : `Use ${formality} register.`;

  const romanizeNote = romanize
    ? `\nIf the target script is non-Latin, add a second line:\nRomanization: [pronunciation in Latin script]`
    : '';

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: 'You are a professional interpreter for real-time spoken language translation. Translations are used in an earplug device — be natural, accurate, and conversational.',
      messages: [{
        role: 'user',
        content: `Translate from ${srcLang} to ${tgtLang}.\nRules:\n- Return ONLY the translated text (no explanations, quotes, or labels)\n- ${formalityNote}${romanizeNote}\n\nText: ${text}`
      }],
    });

    const raw = response.content[0].text.trim();
    const lines = raw.split('\n');
    const translation = lines[0].trim();
    let romanization = null;
    const romanLine = lines.find(l => l.toLowerCase().startsWith('romanization:'));
    if (romanLine) romanization = romanLine.replace(/^romanization:\s*/i, '').trim();

    return res.json({ translation, romanization });
  } catch (err) {
    console.error('Translation error:', err.message);
    return res.status(err.status || 500).json({ message: err.message || 'Translation failed' });
  }
});

// ── Language detection endpoint ────────────────────────────────
app.post('/api/detect', async (req, res) => {
  const { text } = req.body;
  if (!text?.trim()) return res.status(400).json({ message: 'No text provided' });

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: `Identify the language. Respond with JSON only, no markdown: {"code":"<bcp47>","name":"<English name>","confidence":<0.0-1.0>}\n\nText: ${text.slice(0, 200)}`
      }],
    });
    const clean = response.content[0].text.trim().replace(/```json\n?|\n?```/g, '').trim();
    return res.json(JSON.parse(clean));
  } catch (err) {
    console.error('Detection error:', err.message);
    return res.status(500).json({ message: 'Language detection failed' });
  }
});

// ── Start ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌐 LinguaLink server running on http://localhost:${PORT}`);
  console.log(`   Translate:  POST /api/translate`);
  console.log(`   Detect:     POST /api/detect`);
  console.log(`   Health:     GET  /api/health\n`);
  console.log(`   API Key set: ${process.env.ANTHROPIC_API_KEY ? '✅ Yes' : '❌ NO - check your .env file'}\n`);
});