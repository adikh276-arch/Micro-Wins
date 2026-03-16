import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// The text strings that need translation
const sourceStrings = {
  welcome: "Welcome to Micro Wins",
  description: "A lovable generated project for tracking your small daily wins.",
  language: "Language",
  getStarted: "Get Started"
};

const locales = [
  "en", "es", "fr", "pt", "de", "ar", "hi", "bn", 
  "zh", "ja", "id", "tr", "vi", "ko", "ru", "it", 
  "pl", "th", "tl"
];

const API_KEY = process.env.TRANSLATE_API_KEY;

async function translateText(text: string, targetLang: string) {
  if (targetLang === 'en') return text; // don't translate english

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
          source: 'en'
        }),
      }
    );
    const data: any = await response.json();
    if (data.data && data.data.translations) {
      return data.data.translations[0].translatedText;
    }
  } catch (error) {
    console.error(`Error translating to ${targetLang}:`, error);
  }
  return text; // fallback to english
}

async function generateTranslations() {
  console.log('Starting translation generation...');
  const localesDir = path.resolve(__dirname, '../src/i18n/locales');
  
  if (!fs.existsSync(localesDir)) {
    fs.mkdirSync(localesDir, { recursive: true });
  }

  for (const locale of locales) {
    const translatedDict: Record<string, string> = {};
    for (const [key, text] of Object.entries(sourceStrings)) {
      translatedDict[key] = await translateText(text, locale);
    }
    
    fs.writeFileSync(
      path.join(localesDir, `${locale}.json`),
      JSON.stringify(translatedDict, null, 2)
    );
    console.log(`Generated translations for ${locale}`);
  }
  
  console.log('Finished translation generation.');
}

// DISABLE AFTER FIRST RUN
// generateTranslations();
