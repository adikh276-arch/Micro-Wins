import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";
import { motion } from "framer-motion";

export interface MicroWinEntry {
  id: string;
  win: string;
  reflection: string;
  date: string;
}

interface HistoryScreenProps {
  entries: MicroWinEntry[];
  onLogNew: () => void;
  onBack: () => void;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMMM d");
};

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const HistoryScreen: React.FC<HistoryScreenProps> = ({ entries, onLogNew, onBack }) => {
  const thisWeekCount = entries.filter((e) => {
    const d = new Date(e.date);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  }).length;

  return (
    <motion.div
      className="flex flex-col min-h-screen px-5 py-6"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground mb-4 w-fit">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-body">Back</span>
      </button>

      <motion.h1 variants={fadeUp} className="text-2xl font-heading mb-3">
        Your Wins Collection 🏆
      </motion.h1>

      <div className="space-y-3 mb-6">
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          Look at all the awesome things you accomplished! Every single one of these mattered.
        </motion.p>
        <motion.p variants={fadeUp} className="text-justified text-foreground leading-relaxed">
          Each entry here proved you were building stronger, healthier habits. Keep it up! 💛
        </motion.p>
      </div>

      <motion.div className="flex-1 space-y-3 overflow-y-auto" variants={stagger}>
        {entries.length === 0 ? (
          <motion.div variants={fadeUp} className="text-center py-12 text-muted-foreground">
            <p className="text-3xl mb-2">🌱</p>
            <p>No wins recorded yet — let's change that!</p>
            <p className="text-sm mt-1">Your first win is waiting to be captured.</p>
          </motion.div>
        ) : (
          entries.map((entry) => (
            <motion.div
              key={entry.id}
              variants={fadeUp}
              className="bg-card rounded-xl p-4 shadow-sm border border-border"
            >
              <p className="text-xs text-muted-foreground mb-1">{formatDate(entry.date)}</p>
              <p className="font-heading font-bold text-foreground">{entry.win}</p>
              {entry.reflection && (
                <p className="text-sm text-muted-foreground mt-1 italic">
                  "{entry.reflection}"
                </p>
              )}
            </motion.div>
          ))
        )}
      </motion.div>

      {thisWeekCount > 0 && (
        <motion.p variants={fadeUp} className="text-center text-sm text-muted-foreground mt-4">
          🔥 You logged {thisWeekCount} micro win{thisWeekCount !== 1 ? "s" : ""} this week — amazing!
        </motion.p>
      )}

      <motion.div variants={fadeUp} className="pb-6 mt-4">
        <Button size="lg" className="w-full" onClick={onLogNew}>
          Log New Win 🎯
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HistoryScreen;
