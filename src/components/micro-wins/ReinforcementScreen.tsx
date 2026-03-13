import React from "react";
import { Button } from "@/components/ui/button";

interface ReinforcementScreenProps {
  win: string;
  reflection: string;
  onDone: () => void;
  onLogAnother: () => void;
}

const CelebrationSparkles: React.FC = () => (
  <div className="relative w-full h-24 flex items-center justify-center">
    {[0, 0.3, 0.6, 0.9, 1.2].map((delay, i) => {
      const positions = [
        "top-0 left-1/4",
        "top-2 right-1/4",
        "bottom-0 left-1/3",
        "top-4 right-1/3",
        "bottom-2 left-1/2",
      ];
      return (
        <div
          key={i}
          className={`absolute ${positions[i]} animate-sparkle`}
          style={{ animationDelay: `${delay}s` }}
        >
          <svg viewBox="0 0 24 24" fill="none" className={`${i % 2 === 0 ? 'w-5 h-5 text-primary' : 'w-4 h-4 text-secondary'}`}>
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
          </svg>
        </div>
      );
    })}
  </div>
);

const ReinforcementScreen: React.FC<ReinforcementScreenProps> = ({
  win,
  reflection,
  onDone,
  onLogAnother,
}) => {
  return (
    <div className="flex flex-col min-h-screen px-5 py-6">
      <div className="animate-celebrate">
        <CelebrationSparkles />
        <h1 className="text-2xl font-heading mb-3 text-center">Nice work! 🌸</h1>
      </div>

      <div className="space-y-3 mb-6">
        <p className="text-justified text-foreground leading-relaxed">
          You just recorded a micro win.
        </p>
        <p className="text-justified text-foreground leading-relaxed">
          Small victories build confidence and momentum.
        </p>
        <p className="text-justified text-foreground leading-relaxed">
          Over time, these small steps become powerful progress.
        </p>
      </div>

      <div className="bg-card rounded-xl p-4 shadow-sm border border-border mb-4">
        <p className="text-sm text-muted-foreground mb-1">Win Logged</p>
        <p className="font-heading font-bold text-foreground">{win}</p>
        {reflection && (
          <>
            <p className="text-sm text-muted-foreground mt-3 mb-1">Reflection</p>
            <p className="text-sm text-foreground italic">"{reflection}"</p>
          </>
        )}
      </div>

      <div className="flex-1" />

      <div className="space-y-3 pb-6">
        <Button size="lg" className="w-full" onClick={onDone}>
          Save Entry
        </Button>
        <Button size="lg" variant="secondary" className="w-full" onClick={onLogAnother}>
          Log Another Win
        </Button>
      </div>
    </div>
  );
};

export default ReinforcementScreen;
