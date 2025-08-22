import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Bot, Sparkles } from "lucide-react";
import type { BotData } from "@/pages/CreateBot";

interface PersonalityStepProps {
  botData: BotData;
  updateBotData: (data: Partial<BotData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const personalities = {
  tone: [
    { id: "friendly", label: "Friendly", emoji: "🌟", description: "Warm and welcoming" },
    { id: "professional", label: "Professional", emoji: "💼", description: "Polite and formal" },
    { id: "funny", label: "Funny", emoji: "🤪", description: "Playful and humorous" },
    { id: "caring", label: "Caring", emoji: "💝", description: "Supportive and gentle" }
  ],
  speed: [
    { id: "quick", label: "Quick Replies", emoji: "⚡", description: "Instant responses" },
    { id: "thoughtful", label: "Takes Time", emoji: "🤔", description: "Considers answers carefully" }
  ],
  avatars: [
    { id: "robot", emoji: "🤖", label: "Classic Robot" },
    { id: "assistant", emoji: "👩‍💼", label: "Professional Helper" },
    { id: "buddy", emoji: "😊", label: "Friendly Buddy" },
    { id: "pet", emoji: "🐶", label: "Cute Pet" },
    { id: "expert", emoji: "👨‍🎓", label: "Smart Expert" },
    { id: "guide", emoji: "🧭", label: "Helpful Guide" }
  ]
};

const PersonalityStep = ({ botData, updateBotData, onNext, onPrev }: PersonalityStepProps) => {
  const [name, setName] = useState(botData.name || "");
  const [tone, setTone] = useState(botData.tone || "friendly");
  const [speed, setSpeed] = useState(botData.speed || "quick");
  const [avatar, setAvatar] = useState(botData.avatar || "robot");

  const handleNext = () => {
    if (name.trim()) {
      updateBotData({ 
        name: name.trim(),
        tone,
        speed,
        avatar
      });
      onNext();
    }
  };

  const suggestedNames = [
    "Buddy", "Helper", "Luna", "Max", "Spark", "Zoe"
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6 wiggle">🎭</div>
        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Give your bot a personality!
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Time to bring your bot to life! ✨
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Name Section */}
        <Card className="bg-card/50 backdrop-blur border p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="w-8 h-8 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">What's their name?</h3>
          </div>
          
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type a fun name..."
            className="text-xl p-6 text-center rounded-2xl mb-4"
            onKeyDown={(e) => e.key === "Enter" && handleNext()}
          />

          <div className="mb-4">
            <p className="text-muted-foreground text-sm mb-3 text-center">
              Or pick one of these:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedNames.map((suggestedName) => (
                <Button
                  key={suggestedName}
                  variant="ghost"
                  size="sm"
                  onClick={() => setName(suggestedName)}
                  className="border rounded-2xl"
                >
                  {suggestedName}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Avatar Section */}
        <Card className="bg-card/50 backdrop-blur border p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-accent" />
            <h3 className="text-2xl font-bold text-foreground">Pick their look!</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {personalities.avatars.map((av) => (
              <button
                key={av.id}
                onClick={() => setAvatar(av.id)}
                className={`w-full aspect-square rounded-2xl border-2 transition-all flex flex-col items-center justify-center p-3 ${
                  avatar === av.id 
                    ? "border-primary scale-110 bg-primary/10" 
                    : "border-border hover:border-primary hover:bg-muted"
                }`}
              >
                <div className="text-3xl mb-1">{av.emoji}</div>
                <div className="text-foreground text-xs text-center">{av.label}</div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Tone Section */}
        <Card className="bg-card/50 backdrop-blur border p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">How should they talk?</h3>
          
          <div className="space-y-3">
            {personalities.tone.map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                  tone === t.id 
                    ? "border-primary bg-primary/10" 
                    : "border-border hover:border-primary hover:bg-muted"
                }`}
              >
                <div className="text-2xl">{t.emoji}</div>
                <div className="text-left">
                  <div className="text-foreground font-bold">{t.label}</div>
                  <div className="text-muted-foreground text-sm">{t.description}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Speed Section */}
        <Card className="bg-card/50 backdrop-blur border p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">How fast should they think?</h3>
          
          <div className="space-y-3">
            {personalities.speed.map((s) => (
              <button
                key={s.id}
                onClick={() => setSpeed(s.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                  speed === s.id 
                    ? "border-primary bg-primary/10" 
                    : "border-border hover:border-primary hover:bg-muted"
                }`}
              >
                <div className="text-2xl">{s.emoji}</div>
                <div className="text-left">
                  <div className="text-foreground font-bold">{s.label}</div>
                  <div className="text-muted-foreground text-sm">{s.description}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Preview */}
      {name && (
        <Card className="bg-card/50 backdrop-blur border p-6 mb-8 rounded-3xl">
          <h4 className="text-lg font-bold text-foreground mb-4 text-center">Preview your bot! 👀</h4>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl shadow-medium">
              {personalities.avatars.find(a => a.id === avatar)?.emoji}
            </div>
            <div className="bg-gradient-secondary px-6 py-3 rounded-2xl text-primary-foreground shadow-medium">
              Hi! I'm {name}. {tone === "funny" ? "Ready for some fun? 😄" : tone === "professional" ? "How may I assist you today?" : tone === "caring" ? "I'm here to help! 💕" : "How can I help you? 😊"}
            </div>
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="ghost" 
          onClick={onPrev}
          className="text-lg rounded-2xl px-8 py-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!name.trim()}
          className="group text-lg rounded-2xl px-8 py-4 shadow-strong hover:scale-105 transition-all duration-300"
        >
          They look amazing! 🎉
          <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
        </Button>
      </div>
    </div>
  );
};

export default PersonalityStep;