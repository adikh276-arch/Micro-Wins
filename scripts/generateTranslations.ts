import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import 'dotenv/config';
import 'dotenv/config';

// The text strings that need translation
const sourceStrings = {
  intro_back: "Back",
  intro_title: "Micro Wins ✨",
  intro_p1: "You already took steps forward today — even if they felt tiny.",
  intro_p2: "Every healthy choice you made, every urge you resisted, and every positive action you took absolutely counted. 💪",
  intro_p3: "Let's capture those small victories so you can look back and see just how far you've come!",
  intro_btn_log: "Log a Win 🎯",
  intro_btn_past: "View Past Wins 📖",
  choose_title: "What did you crush today? 🏆",
  choose_p1: "Pick something awesome you did — no win is too small!",
  choose_p2: "You showed up and that already deserved a round of applause. 👏",
  choose_opt_1: "Resisted a craving",
  choose_opt_2: "Took a mindful pause",
  choose_opt_3: "Went for a walk",
  choose_opt_4: "Drank water instead",
  choose_opt_5: "Completed a small task",
  choose_opt_6: "Reached out to someone",
  choose_opt_7: "Stayed focused on work",
  choose_opt_8: "Practiced self-control",
  choose_add_own: "✏️ Add my own win",
  choose_custom_placeholder: "Type your awesome win...",
  choose_next: "Next →",
  reflect_title: "How did that feel? 🤩",
  reflect_p1: "Take a sec — you just did something great! How did that win make you feel?",
  reflect_p2: "Naming the feeling locks in the good vibes and builds stronger habits. 🧠✨",
  reflect_placeholder: "Example: Proud, unstoppable, lighter, more in control…",
  reflect_save: "Save Win 🎉",
  reinf_title: "You nailed it! 🌸🎉",
  reinf_p1: "You just locked in a micro win — that's huge!",
  reinf_p2: "Every small victory you collected built your confidence and kept the momentum going. 🚀",
  reinf_p3: "These little steps? They added up to something powerful.",
  reinf_log_title: "🏅 Win Logged",
  reinf_refl_title: "💭 Reflection",
  reinf_save: "Save Entry ✅",
  reinf_log_another: "Log Another Win 🔥",
  hist_back: "Back",
  hist_title: "Your Wins Collection 🏆",
  hist_p1: "Look at all the awesome things you accomplished! Every single one of these mattered.",
  hist_p2: "Each entry here proved you were building stronger, healthier habits. Keep it up! 💛",
  hist_empty_p1: "No wins recorded yet — let's change that!",
  hist_empty_p2: "Your first win is waiting to be captured.",
  hist_this_week: "🔥 You logged {{count}} micro win(s) this week — amazing!",
  hist_log_new: "Log New Win 🎯"
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
          q: text.replace("{{count}}", "COUNT_PLACEHOLDER"),
          target: targetLang,
          source: 'en'
        }),
      }
    );
    const data: any = await response.json();
    if (data.data && data.data.translations) {
      return data.data.translations[0].translatedText.replace("COUNT_PLACEHOLDER", "{{count}}");
    } else {
        console.error(`API response error for ${targetLang}:`, data);
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

generateTranslations();
