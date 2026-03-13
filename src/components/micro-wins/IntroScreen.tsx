import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SparkleDecoration from "@/components/SparkleDecoration";

interface IntroScreenProps {
  onLogWin: () => void;
  onViewPast: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onLogWin, onViewPast }) => {
  return (
    <div className="flex flex-col min-h-screen px-5 py-6">
      <button className="flex items-center gap-1 text-muted-foreground mb-4 w-fit">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-body">Back</span>
      </button>

      <h1 className="text-2xl font-heading mb-2">Micro Wins ✨</h1>

      <SparkleDecoration />

      <div className="flex-1 space-y-4 mt-4">
        <p className="text-justified text-foreground leading-relaxed">
          Progress is built from small steps.
        </p>
        <p className="text-justified text-foreground leading-relaxed">
          Every healthy choice, every resisted urge, and every positive action counts.
        </p>
        <p className="text-justified text-foreground leading-relaxed">
          This activity helps you capture small victories so you can see how much progress you are making.
        </p>
      </div>

      <div className="space-y-3 pb-6 mt-8">
        <Button size="lg" className="w-full" onClick={onLogWin}>
          Log a Win
        </Button>
        <Button size="lg" variant="secondary" className="w-full" onClick={onViewPast}>
          View Past Wins
        </Button>
      </div>
    </div>
  );
};

export default IntroScreen;
