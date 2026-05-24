/**
 * languages.js
 * Full language database for LinguaLink.
 * Each entry: { code, name, tts, nativeName, rtl? }
 *   code       — BCP-47 language code used for STT and translation prompts
 *   name       — English display name
 *   nativeName — Name in the language itself (shown in UI)
 *   tts        — BCP-47 locale tag passed to SpeechSynthesisUtterance.lang
 *   rtl        — true if right-to-left script
 */

export const LANGUAGES = [
  // ── African Languages (prioritised for the app's mission) ──
  { code: 'rw', name: 'Kinyarwanda',   nativeName: 'Ikinyarwanda',  tts: 'rw-RW' },
  { code: 'sw', name: 'Swahili',        nativeName: 'Kiswahili',     tts: 'sw-KE' },
  { code: 'lg', name: 'Luganda',        nativeName: 'Oluganda',      tts: 'lg-UG' },
  { code: 'am', name: 'Amharic',        nativeName: 'አማርኛ',         tts: 'am-ET' },
  { code: 'om', name: 'Oromo',          nativeName: 'Afaan Oromo',   tts: 'om-ET' },
  { code: 'ti', name: 'Tigrinya',       nativeName: 'ትግርኛ',          tts: 'ti-ER' },
  { code: 'so', name: 'Somali',         nativeName: 'Soomaali',      tts: 'so-SO' },
  { code: 'ha', name: 'Hausa',          nativeName: 'Hausa',         tts: 'ha-NG' },
  { code: 'yo', name: 'Yoruba',         nativeName: 'Yorùbá',        tts: 'yo-NG' },
  { code: 'ig', name: 'Igbo',           nativeName: 'Igbo',          tts: 'ig-NG' },
  { code: 'zu', name: 'Zulu',           nativeName: 'isiZulu',       tts: 'zu-ZA' },
  { code: 'xh', name: 'Xhosa',          nativeName: 'isiXhosa',      tts: 'xh-ZA' },
  { code: 'af', name: 'Afrikaans',      nativeName: 'Afrikaans',     tts: 'af-ZA' },
  { code: 'sn', name: 'Shona',          nativeName: 'chiShona',      tts: 'sn-ZW' },
  { code: 'ny', name: 'Chichewa',       nativeName: 'Chichewa',      tts: 'ny-MW' },
  { code: 'st', name: 'Sesotho',        nativeName: 'Sesotho',       tts: 'st-LS' },
  { code: 'ln', name: 'Lingala',        nativeName: 'Lingála',       tts: 'ln-CD' },
  { code: 'mg', name: 'Malagasy',       nativeName: 'Malagasy',      tts: 'mg-MG' },
  { code: 'ki', name: 'Kikuyu',         nativeName: 'Gĩkũyũ',       tts: 'ki-KE' },

  // ── Major World Languages ──
  { code: 'en', name: 'English',        nativeName: 'English',       tts: 'en-US' },
  { code: 'es', name: 'Spanish',        nativeName: 'Español',       tts: 'es-ES' },
  { code: 'fr', name: 'French',         nativeName: 'Français',      tts: 'fr-FR' },
  { code: 'de', name: 'German',         nativeName: 'Deutsch',       tts: 'de-DE' },
  { code: 'it', name: 'Italian',        nativeName: 'Italiano',      tts: 'it-IT' },
  { code: 'pt', name: 'Portuguese',     nativeName: 'Português',     tts: 'pt-PT' },
  { code: 'ru', name: 'Russian',        nativeName: 'Русский',       tts: 'ru-RU' },
  { code: 'zh', name: 'Chinese (Mandarin)', nativeName: '普通话',    tts: 'zh-CN' },
  { code: 'ja', name: 'Japanese',       nativeName: '日本語',         tts: 'ja-JP' },
  { code: 'ko', name: 'Korean',         nativeName: '한국어',          tts: 'ko-KR' },
  { code: 'ar', name: 'Arabic',         nativeName: 'العربية',        tts: 'ar-SA', rtl: true },
  { code: 'hi', name: 'Hindi',          nativeName: 'हिन्दी',          tts: 'hi-IN' },
  { code: 'bn', name: 'Bengali',        nativeName: 'বাংলা',          tts: 'bn-IN' },
  { code: 'tr', name: 'Turkish',        nativeName: 'Türkçe',        tts: 'tr-TR' },
  { code: 'nl', name: 'Dutch',          nativeName: 'Nederlands',    tts: 'nl-NL' },

  // ── European Languages ──
  { code: 'pl', name: 'Polish',         nativeName: 'Polski',        tts: 'pl-PL' },
  { code: 'sv', name: 'Swedish',        nativeName: 'Svenska',       tts: 'sv-SE' },
  { code: 'da', name: 'Danish',         nativeName: 'Dansk',         tts: 'da-DK' },
  { code: 'fi', name: 'Finnish',        nativeName: 'Suomi',         tts: 'fi-FI' },
  { code: 'no', name: 'Norwegian',      nativeName: 'Norsk',         tts: 'nb-NO' },
  { code: 'uk', name: 'Ukrainian',      nativeName: 'Українська',    tts: 'uk-UA' },
  { code: 'cs', name: 'Czech',          nativeName: 'Čeština',       tts: 'cs-CZ' },
  { code: 'ro', name: 'Romanian',       nativeName: 'Română',        tts: 'ro-RO' },
  { code: 'hu', name: 'Hungarian',      nativeName: 'Magyar',        tts: 'hu-HU' },
  { code: 'el', name: 'Greek',          nativeName: 'Ελληνικά',      tts: 'el-GR' },
  { code: 'bg', name: 'Bulgarian',      nativeName: 'Български',     tts: 'bg-BG' },
  { code: 'hr', name: 'Croatian',       nativeName: 'Hrvatski',      tts: 'hr-HR' },
  { code: 'sk', name: 'Slovak',         nativeName: 'Slovenčina',    tts: 'sk-SK' },
  { code: 'sl', name: 'Slovenian',      nativeName: 'Slovenščina',   tts: 'sl-SI' },
  { code: 'sr', name: 'Serbian',        nativeName: 'Српски',        tts: 'sr-RS' },
  { code: 'ca', name: 'Catalan',        nativeName: 'Català',        tts: 'ca-ES' },
  { code: 'et', name: 'Estonian',       nativeName: 'Eesti',         tts: 'et-EE' },
  { code: 'lv', name: 'Latvian',        nativeName: 'Latviešu',      tts: 'lv-LV' },
  { code: 'lt', name: 'Lithuanian',     nativeName: 'Lietuvių',      tts: 'lt-LT' },
  { code: 'mk', name: 'Macedonian',     nativeName: 'Македонски',    tts: 'mk-MK' },
  { code: 'mt', name: 'Maltese',        nativeName: 'Malti',         tts: 'mt-MT' },
  { code: 'cy', name: 'Welsh',          nativeName: 'Cymraeg',       tts: 'cy-GB' },
  { code: 'ga', name: 'Irish',          nativeName: 'Gaeilge',       tts: 'ga-IE' },
  { code: 'eu', name: 'Basque',         nativeName: 'Euskera',       tts: 'eu-ES' },
  { code: 'gl', name: 'Galician',       nativeName: 'Galego',        tts: 'gl-ES' },
  { code: 'is', name: 'Icelandic',      nativeName: 'Íslenska',      tts: 'is-IS' },
  { code: 'lb', name: 'Luxembourgish',  nativeName: 'Lëtzebuergesch', tts: 'lb-LU' },
  { code: 'be', name: 'Belarusian',     nativeName: 'Беларуская',    tts: 'be-BY' },
  { code: 'sq', name: 'Albanian',       nativeName: 'Shqip',         tts: 'sq-AL' },
  { code: 'bs', name: 'Bosnian',        nativeName: 'Bosanski',      tts: 'bs-BA' },

  // ── South/Southeast Asian ──
  { code: 'th', name: 'Thai',           nativeName: 'ภาษาไทย',        tts: 'th-TH' },
  { code: 'vi', name: 'Vietnamese',     nativeName: 'Tiếng Việt',    tts: 'vi-VN' },
  { code: 'id', name: 'Indonesian',     nativeName: 'Bahasa Indonesia', tts: 'id-ID' },
  { code: 'ms', name: 'Malay',          nativeName: 'Bahasa Melayu', tts: 'ms-MY' },
  { code: 'tl', name: 'Filipino',       nativeName: 'Filipino',      tts: 'fil-PH' },
  { code: 'ta', name: 'Tamil',          nativeName: 'தமிழ்',           tts: 'ta-IN' },
  { code: 'te', name: 'Telugu',         nativeName: 'తెలుగు',          tts: 'te-IN' },
  { code: 'pa', name: 'Punjabi',        nativeName: 'ਪੰਜਾਬੀ',          tts: 'pa-IN' },
  { code: 'gu', name: 'Gujarati',       nativeName: 'ગુજરાતી',         tts: 'gu-IN' },
  { code: 'ml', name: 'Malayalam',      nativeName: 'മലയാളം',          tts: 'ml-IN' },
  { code: 'si', name: 'Sinhala',        nativeName: 'සිංහල',           tts: 'si-LK' },
  { code: 'my', name: 'Burmese',        nativeName: 'မြန်မာဘာသာ',       tts: 'my-MM' },
  { code: 'km', name: 'Khmer',          nativeName: 'ភាសាខ្មែរ',        tts: 'km-KH' },
  { code: 'lo', name: 'Lao',            nativeName: 'ພາສາລາວ',         tts: 'lo-LA' },
  { code: 'ne', name: 'Nepali',         nativeName: 'नेपाली',           tts: 'ne-NP' },
  { code: 'ur', name: 'Urdu',           nativeName: 'اردو',             tts: 'ur-PK', rtl: true },

  // ── Middle Eastern / Central Asian ──
  { code: 'fa', name: 'Persian (Farsi)', nativeName: 'فارسی',          tts: 'fa-IR', rtl: true },
  { code: 'he', name: 'Hebrew',         nativeName: 'עברית',           tts: 'he-IL', rtl: true },
  { code: 'ka', name: 'Georgian',       nativeName: 'ქართული',          tts: 'ka-GE' },
  { code: 'hy', name: 'Armenian',       nativeName: 'Հայերեն',         tts: 'hy-AM' },
  { code: 'az', name: 'Azerbaijani',    nativeName: 'Azərbaycan',      tts: 'az-AZ' },
  { code: 'kk', name: 'Kazakh',         nativeName: 'Қазақша',         tts: 'kk-KZ' },
  { code: 'ky', name: 'Kyrgyz',         nativeName: 'Кыргызча',        tts: 'ky-KG' },
  { code: 'tg', name: 'Tajik',          nativeName: 'Тоҷикӣ',          tts: 'tg-TJ' },
  { code: 'tk', name: 'Turkmen',        nativeName: 'Türkmen',         tts: 'tk-TM' },
  { code: 'uz', name: 'Uzbek',          nativeName: "O'zbek",          tts: 'uz-UZ' },
  { code: 'mn', name: 'Mongolian',      nativeName: 'Монгол',          tts: 'mn-MN' },
  { code: 'ps', name: 'Pashto',         nativeName: 'پښتو',             tts: 'ps-AF', rtl: true },

  // ── Pacific / Other ──
  { code: 'mi', name: 'Māori',          nativeName: 'Te Reo Māori',   tts: 'mi-NZ' },
  { code: 'sm', name: 'Samoan',         nativeName: 'Gagana Samoa',   tts: 'sm-WS' },
  { code: 'ht', name: 'Haitian Creole', nativeName: 'Kreyòl ayisyen', tts: 'ht-HT' },
  { code: 'tt', name: 'Tatar',          nativeName: 'Татарча',         tts: 'tt-RU' },
];

/**
 * Get a language object by BCP-47 code.
 * Falls back gracefully if code not found.
 */
export function getLang(code) {
  return LANGUAGES.find(l => l.code === code) || { code, name: code, nativeName: code, tts: code };
}

/**
 * Returns a sorted copy of LANGUAGES for display in a <select>.
 * Kinyarwanda is pinned first, then alphabetical by English name.
 */
export function getSortedLanguages() {
  const pinned = LANGUAGES.filter(l => l.code === 'rw');
  const rest = LANGUAGES.filter(l => l.code !== 'rw').sort((a, b) => a.name.localeCompare(b.name));
  return [...pinned, ...rest];
}

export default LANGUAGES;
