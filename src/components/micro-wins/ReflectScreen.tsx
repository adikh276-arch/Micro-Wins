import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface ReflectScreenProps {
  onSave: (reflection: string) => void;
}

const ReflectScreen: React.FC<ReflectScreenProps> = ({ onSave }) => {
  const [reflection, setReflection] = useState("");

  return (
    <div className="flex flex-col min-h-screen px-5 py-6">
      <h1 className="text-2xl font-heading mb-3">How did that feel?</h1>

      <div className="space-y-3 mb-6">
        <p className="text-justified text-foreground leading-relaxed">
          Take a moment to notice how this small win made you feel.
        </p>
        <p className="text-justified text-foreground leading-relaxed">
          Recognizing the feeling helps reinforce positive habits.
        </p>
      </div>

      <div className="flex-1">
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Example: Proud, calmer, more in control…"
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-input bg-card text-foreground text-sm font-body resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
      </div>

      <div className="pb-6 mt-6">
        <Button size="lg" className="w-full" onClick={() => onSave(reflection)}>
          Save Win
        </Button>
      </div>
    </div>
  );
};

export default ReflectScreen;
