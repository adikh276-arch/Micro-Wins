import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SparkleDecoration from "@/components/SparkleDecoration";
import { motion } from "framer-motion";

interface IntroScreenProps {
  onLogWin: () => void;
  onViewPast: () => void;
}

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const IntroScreen: React.FC<IntroScreenProps> = ({ onLogWin, onViewPast }) => {
  return (
    <motion.div
      className="flex flex-col min-h-screen px-5 py-6"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <button className="flex items-center gap-1 text-muted-foreground mb-4 w-fit">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-body">Back</span>
      </button>

      <motion.h1 variants={fadeUp} className="text-2xl font-heading mb-2">
        Micro Wins ✨
      </motion.h1>

      <motion.div variants={fadeUp}>
        <SparkleDecoration />
      </motion.div>

      <div className="flex-1 space-y-4 mt-4">
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          You already took steps forward today — even if they felt tiny.
        </motion.p>
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          Every healthy choice you made, every urge you resisted, and every positive action you took absolutely counted. 💪
        </motion.p>
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          Let's capture those small victories so you can look back and see just how far you've come!
        </motion.p>
      </div>

      <motion.div variants={fadeUp} className="space-y-3 pb-6 mt-8">
        <Button size="lg" className="w-full" onClick={onLogWin}>
          Log a Win 🎯
        </Button>
        <Button size="lg" variant="secondary" className="w-full" onClick={onViewPast}>
          View Past Wins 📖
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;
