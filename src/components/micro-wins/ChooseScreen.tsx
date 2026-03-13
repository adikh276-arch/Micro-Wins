import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const WIN_OPTIONS = [
  "Resisted a craving",
  "Took a mindful pause",
  "Went for a walk",
  "Drank water instead",
  "Completed a small task",
  "Reached out to someone",
  "Stayed focused on work",
  "Practiced self-control",
];

interface ChooseScreenProps {
  onNext: (win: string) => void;
}

const ChooseScreen: React.FC<ChooseScreenProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [customWin, setCustomWin] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const handleNext = () => {
    const win = showCustom ? customWin : selected;
    if (win) onNext(win);
  };

  return (
    <div className="flex flex-col min-h-screen px-5 py-6">
      <h1 className="text-2xl font-heading mb-3">What small win did you achieve?</h1>

      <div className="space-y-3 mb-4">
        <p className="text-justified text-foreground leading-relaxed">
          Select anything that feels like a positive step today.
        </p>
        <p className="text-justified text-foreground leading-relaxed">
          Even small actions deserve recognition.
        </p>
      </div>

      <div className="flex-1 space-y-2">
        {WIN_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => { setSelected(option); setShowCustom(false); }}
            className={`w-full text-left px-4 py-3 rounded-full border transition-all btn-press text-sm font-body
              ${selected === option && !showCustom
                ? "bg-secondary border-primary text-foreground shadow-sm"
                : "bg-card border-primary/30 text-foreground hover:border-primary/60"
              }`}
          >
            {option}
          </button>
        ))}

        {!showCustom ? (
          <button
            onClick={() => { setShowCustom(true); setSelected(null); }}
            className="w-full text-left px-4 py-3 rounded-full border border-dashed border-primary/40 text-muted-foreground text-sm font-body hover:border-primary/60 transition-all"
          >
            + Add my own win
          </button>
        ) : (
          <input
            autoFocus
            value={customWin}
            onChange={(e) => setCustomWin(e.target.value)}
            placeholder="Type your win..."
            className="w-full px-4 py-3 rounded-full border border-primary bg-card text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
          />
        )}
      </div>

      <div className="pb-6 mt-6">
        <Button
          size="lg"
          className="w-full"
          onClick={handleNext}
          disabled={!selected && (!showCustom || !customWin.trim())}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ChooseScreen;
