import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";

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

const HistoryScreen: React.FC<HistoryScreenProps> = ({ entries, onLogNew, onBack }) => {
  const thisWeekCount = entries.filter((e) => {
    const d = new Date(e.date);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  }).length;

  return (
    <div className="flex flex-col min-h-screen px-5 py-6">
      <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground mb-4 w-fit">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-body">Back</span>
      </button>

      <h1 className="text-2xl font-heading mb-3">Your Micro Wins</h1>

      <div className="space-y-3 mb-6">
        <p className="text-justified text-foreground leading-relaxed">
          Here are the small victories you have recorded.
        </p>
        <p className="text-justified text-foreground leading-relaxed">
          Each one represents progress toward stronger habits.
        </p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {entries.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No wins recorded yet.</p>
            <p className="text-sm mt-1">Start by logging your first win!</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-card rounded-xl p-4 shadow-sm border border-border"
            >
              <p className="text-xs text-muted-foreground mb-1">{formatDate(entry.date)}</p>
              <p className="font-heading font-bold text-foreground">{entry.win}</p>
              {entry.reflection && (
                <p className="text-sm text-muted-foreground mt-1 italic">
                  "{entry.reflection}"
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {thisWeekCount > 0 && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          You logged {thisWeekCount} micro win{thisWeekCount !== 1 ? "s" : ""} this week.
        </p>
      )}

      <div className="pb-6 mt-4">
        <Button size="lg" className="w-full" onClick={onLogNew}>
          Log New Win
        </Button>
      </div>
    </div>
  );
};

export default HistoryScreen;
