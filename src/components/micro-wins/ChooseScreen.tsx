import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const WIN_OPTIONS = [
  { label: "Resisted a craving", emoji: "💪" },
  { label: "Took a mindful pause", emoji: "🧘" },
  { label: "Went for a walk", emoji: "🚶" },
  { label: "Drank water instead", emoji: "💧" },
  { label: "Completed a small task", emoji: "✅" },
  { label: "Reached out to someone", emoji: "💬" },
  { label: "Stayed focused on work", emoji: "🎯" },
  { label: "Practiced self-control", emoji: "🛡️" },
];

interface ChooseScreenProps {
  onNext: (win: string) => void;
}

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const ChooseScreen: React.FC<ChooseScreenProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [customWin, setCustomWin] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const handleNext = () => {
    const win = showCustom ? customWin : selected;
    if (win) onNext(win);
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen px-5 py-6"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <motion.h1 variants={fadeUp} className="text-2xl font-heading mb-3">
        What did you crush today? 🏆
      </motion.h1>

      <div className="space-y-3 mb-4">
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          Pick something awesome you did — no win is too small!
        </motion.p>
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          You showed up and that already deserved a round of applause. 👏
        </motion.p>
      </div>

      <motion.div className="flex-1 space-y-2" variants={stagger}>
        {WIN_OPTIONS.map((option) => (
          <motion.button
            key={option.label}
            variants={fadeUp}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setSelected(option.label); setShowCustom(false); }}
            className={`w-full text-left px-4 py-3 rounded-full border transition-all text-sm font-body
              ${selected === option.label && !showCustom
                ? "bg-secondary border-primary text-foreground shadow-sm"
                : "bg-card border-primary/30 text-foreground hover:border-primary/60"
              }`}
          >
            {option.emoji} {option.label}
          </motion.button>
        ))}

        <motion.div variants={fadeUp}>
          {!showCustom ? (
            <button
              onClick={() => { setShowCustom(true); setSelected(null); }}
              className="w-full text-left px-4 py-3 rounded-full border border-dashed border-primary/40 text-muted-foreground text-sm font-body hover:border-primary/60 transition-all"
            >
              ✏️ Add my own win
            </button>
          ) : (
            <input
              autoFocus
              value={customWin}
              onChange={(e) => setCustomWin(e.target.value)}
              placeholder="Type your awesome win..."
              className="w-full px-4 py-3 rounded-full border border-primary bg-card text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
            />
          )}
        </motion.div>
      </motion.div>

      <motion.div variants={fadeUp} className="pb-6 mt-6">
        <Button
          size="lg"
          className="w-full"
          onClick={handleNext}
          disabled={!selected && (!showCustom || !customWin.trim())}
        >
          Next →
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ChooseScreen;
