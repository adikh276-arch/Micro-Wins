import React, { useState, useEffect } from "react";
import IntroScreen from "@/components/micro-wins/IntroScreen";
import ChooseScreen from "@/components/micro-wins/ChooseScreen";
import ReflectScreen from "@/components/micro-wins/ReflectScreen";
import ReinforcementScreen from "@/components/micro-wins/ReinforcementScreen";
import HistoryScreen, { type MicroWinEntry } from "@/components/micro-wins/HistoryScreen";

type Screen = "intro" | "choose" | "reflect" | "reinforcement" | "history";

const STORAGE_KEY = "micro-wins-entries";

const loadEntries = (): MicroWinEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveEntries = (entries: MicroWinEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [selectedWin, setSelectedWin] = useState("");
  const [reflection, setReflection] = useState("");
  const [entries, setEntries] = useState<MicroWinEntry[]>(loadEntries);

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const handleChoose = (win: string) => {
    setSelectedWin(win);
    setScreen("reflect");
  };

  const handleReflect = (ref: string) => {
    setReflection(ref);
    setScreen("reinforcement");
  };

  const handleSave = () => {
    const newEntry: MicroWinEntry = {
      id: crypto.randomUUID(),
      win: selectedWin,
      reflection,
      date: new Date().toISOString(),
    };
    setEntries((prev) => [newEntry, ...prev]);
    setScreen("intro");
  };

  const handleLogAnother = () => {
    setSelectedWin("");
    setReflection("");
    setScreen("choose");
  };

  const renderScreen = () => {
    switch (screen) {
      case "intro":
        return (
          <IntroScreen
            onLogWin={() => setScreen("choose")}
            onViewPast={() => setScreen("history")}
          />
        );
      case "choose":
        return <ChooseScreen onNext={handleChoose} />;
      case "reflect":
        return <ReflectScreen onSave={handleReflect} />;
      case "reinforcement":
        return (
          <ReinforcementScreen
            win={selectedWin}
            reflection={reflection}
            onDone={handleSave}
            onLogAnother={handleLogAnother}
          />
        );
      case "history":
        return (
          <HistoryScreen
            entries={entries}
            onLogNew={handleLogAnother}
            onBack={() => setScreen("intro")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      {renderScreen()}
    </div>
  );
};

export default Index;
