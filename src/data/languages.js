/**
 * LinguaLink Language Database
 * 100+ languages with BCP-47 codes for Web Speech API TTS
 * Kinyarwanda is listed first for easy access.
 */

export const LANGUAGES = [
  // === AFRICAN LANGUAGES (priority) ===
  { code: 'rw', name: 'Kinyarwanda',      tts: 'rw-RW' },
  { code: 'sw', name: 'Swahili',          tts: 'sw-KE' },
  { code: 'am', name: 'Amharic',          tts: 'am-ET' },
  { code: 'yo', name: 'Yoruba',           tts: 'yo-NG' },
  { code: 'ig', name: 'Igbo',             tts: 'ig-NG' },
  { code: 'ha', name: 'Hausa',            tts: 'ha-NG' },
  { code: 'zu', name: 'Zulu',             tts: 'zu-ZA' },
  { code: 'af', name: 'Afrikaans',        tts: 'af-ZA' },
  { code: 'xh', name: 'Xhosa',           tts: 'xh-ZA' },
  { code: 'st', name: 'Sesotho',          tts: 'st-LS' },
  { code: 'sn', name: 'Shona',            tts: 'sn-ZW' },
  { code: 'ny', name: 'Chichewa',         tts: 'ny-MW' },
  { code: 'ln', name: 'Lingala',          tts: 'ln-CD' },
  { code: 'lg', name: 'Luganda',          tts: 'lg-UG' },
  { code: 'ki', name: 'Kikuyu',           tts: 'ki-KE' },
  { code: 'om', name: 'Oromo',            tts: 'om-ET' },
  { code: 'ti', name: 'Tigrinya',         tts: 'ti-ER' },
  { code: 'so', name: 'Somali',           tts: 'so-SO' },
  { code: 'mg', name: 'Malagasy',         tts: 'mg-MG' },

  // === WORLD MAJOR LANGUAGES ===
  { code: 'en', name: 'English',          tts: 'en-US' },
  { code: 'es', name: 'Spanish',          tts: 'es-ES' },
  { code: 'fr', name: 'French',           tts: 'fr-FR' },
  { code: 'de', name: 'German',           tts: 'de-DE' },
  { code: 'it', name: 'Italian',          tts: 'it-IT' },
  { code: 'pt', name: 'Portuguese',       tts: 'pt-PT' },
  { code: 'ru', name: 'Russian',          tts: 'ru-RU' },
  { code: 'zh', name: 'Chinese (Mandarin)', tts: 'zh-CN' },
  { code: 'ja', name: 'Japanese',         tts: 'ja-JP' },
  { code: 'ko', name: 'Korean',           tts: 'ko-KR' },
  { code: 'ar', name: 'Arabic',           tts: 'ar-SA' },
  { code: 'hi', name: 'Hindi',            tts: 'hi-IN' },
  { code: 'bn', name: 'Bengali',          tts: 'bn-IN' },
  { code: 'tr', name: 'Turkish',          tts: 'tr-TR' },
  { code: 'nl', name: 'Dutch',            tts: 'nl-NL' },
  { code: 'pl', name: 'Polish',           tts: 'pl-PL' },
  { code: 'sv', name: 'Swedish',          tts: 'sv-SE' },
  { code: 'da', name: 'Danish',           tts: 'da-DK' },
  { code: 'fi', name: 'Finnish',          tts: 'fi-FI' },
  { code: 'no', name: 'Norwegian',        tts: 'nb-NO' },
  { code: 'uk', name: 'Ukrainian',        tts: 'uk-UA' },
  { code: 'cs', name: 'Czech',            tts: 'cs-CZ' },
  { code: 'ro', name: 'Romanian',         tts: 'ro-RO' },
  { code: 'hu', name: 'Hungarian',        tts: 'hu-HU' },
  { code: 'el', name: 'Greek',            tts: 'el-GR' },
  { code: 'th', name: 'Thai',             tts: 'th-TH' },
  { code: 'vi', name: 'Vietnamese',       tts: 'vi-VN' },
  { code: 'id', name: 'Indonesian',       tts: 'id-ID' },
  { code: 'ms', name: 'Malay',            tts: 'ms-MY' },
  { code: 'fa', name: 'Persian (Farsi)',  tts: 'fa-IR' },
  { code: 'he', name: 'Hebrew',           tts: 'he-IL' },
  { code: 'tl', name: 'Filipino',         tts: 'fil-PH' },
  { code: 'ur', name: 'Urdu',             tts: 'ur-PK' },
  { code: 'ta', name: 'Tamil',            tts: 'ta-IN' },
  { code: 'te', name: 'Telugu',           tts: 'te-IN' },
  { code: 'pa', name: 'Punjabi',          tts: 'pa-IN' },
  { code: 'gu', name: 'Gujarati',         tts: 'gu-IN' },
  { code: 'ml', name: 'Malayalam',        tts: 'ml-IN' },
  { code: 'si', name: 'Sinhala',          tts: 'si-LK' },
  { code: 'my', name: 'Burmese',          tts: 'my-MM' },
  { code: 'km', name: 'Khmer',            tts: 'km-KH' },
  { code: 'lo', name: 'Lao',              tts: 'lo-LA' },
  { code: 'ka', name: 'Georgian',         tts: 'ka-GE' },

  // === EUROPEAN LANGUAGES ===
  { code: 'sq', name: 'Albanian',         tts: 'sq-AL' },
  { code: 'hy', name: 'Armenian',         tts: 'hy-AM' },
  { code: 'az', name: 'Azerbaijani',      tts: 'az-AZ' },
  { code: 'eu', name: 'Basque',           tts: 'eu-ES' },
  { code: 'be', name: 'Belarusian',       tts: 'be-BY' },
  { code: 'bs', name: 'Bosnian',          tts: 'bs-BA' },
  { code: 'bg', name: 'Bulgarian',        tts: 'bg-BG' },
  { code: 'ca', name: 'Catalan',          tts: 'ca-ES' },
  { code: 'hr', name: 'Croatian',         tts: 'hr-HR' },
  { code: 'et', name: 'Estonian',         tts: 'et-EE' },
  { code: 'gl', name: 'Galician',         tts: 'gl-ES' },
  { code: 'is', name: 'Icelandic',        tts: 'is-IS' },
  { code: 'lv', name: 'Latvian',          tts: 'lv-LV' },
  { code: 'lt', name: 'Lithuanian',       tts: 'lt-LT' },
  { code: 'lb', name: 'Luxembourgish',    tts: 'lb-LU' },
  { code: 'mk', name: 'Macedonian',       tts: 'mk-MK' },
  { code: 'mt', name: 'Maltese',          tts: 'mt-MT' },
  { code: 'sr', name: 'Serbian',          tts: 'sr-RS' },
  { code: 'sk', name: 'Slovak',           tts: 'sk-SK' },
  { code: 'sl', name: 'Slovenian',        tts: 'sl-SI' },
  { code: 'cy', name: 'Welsh',            tts: 'cy-GB' },
  { code: 'ga', name: 'Irish',            tts: 'ga-IE' },

  // === CENTRAL & SOUTH ASIAN ===
  { code: 'kk', name: 'Kazakh',           tts: 'kk-KZ' },
  { code: 'ky', name: 'Kyrgyz',           tts: 'ky-KG' },
  { code: 'mn', name: 'Mongolian',        tts: 'mn-MN' },
  { code: 'ne', name: 'Nepali',           tts: 'ne-NP' },
  { code: 'ps', name: 'Pashto',           tts: 'ps-AF' },
  { code: 'tg', name: 'Tajik',            tts: 'tg-TJ' },
  { code: 'tk', name: 'Turkmen',          tts: 'tk-TM' },
  { code: 'uz', name: 'Uzbek',            tts: 'uz-UZ' },

  // === PACIFIC & CARIBBEAN ===
  { code: 'ht', name: 'Haitian Creole',   tts: 'ht-HT' },
  { code: 'mi', name: 'Māori',            tts: 'mi-NZ' },
  { code: 'sm', name: 'Samoan',           tts: 'sm-WS' },
  { code: 'to', name: 'Tongan',           tts: 'to-TO' },
]

/**
 * Find a language entry by its code.
 * Falls back to a minimal object if not found.
 */
export function getLang(code) {
  return LANGUAGES.find(l => l.code === code) || { code, name: code, tts: code }
}
