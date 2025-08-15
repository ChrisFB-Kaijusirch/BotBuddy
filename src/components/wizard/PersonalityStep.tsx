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
        <h2 className="text-4xl md:text-6xl font-bold font-comic text-white mb-6">
          Give your bot a personality!
        </h2>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-comic">
          Time to bring your bot to life! ✨
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Name Section */}
        <Card className="bg-white/10 backdrop-blur border-white/20 p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="w-8 h-8 text-white" />
            <h3 className="text-2xl font-bold font-comic text-white">What's their name?</h3>
          </div>
          
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type a fun name..."
            className="text-xl p-6 bg-white/20 border-white/30 text-white placeholder:text-white/60 text-center rounded-2xl font-comic mb-4"
            onKeyDown={(e) => e.key === "Enter" && handleNext()}
          />

          <div className="mb-4">
            <p className="text-white/80 text-sm mb-3 text-center font-comic">
              Or pick one of these:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedNames.map((suggestedName) => (
                <Button
                  key={suggestedName}
                  variant="ghost"
                  size="sm"
                  onClick={() => setName(suggestedName)}
                  className="text-white/80 hover:text-white hover:bg-white/20 border border-white/30 rounded-2xl font-comic"
                >
                  {suggestedName}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Avatar Section */}
        <Card className="bg-white/10 backdrop-blur border-white/20 p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-white" />
            <h3 className="text-2xl font-bold font-comic text-white">Pick their look!</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {personalities.avatars.map((av) => (
              <button
                key={av.id}
                onClick={() => setAvatar(av.id)}
                className={`w-full aspect-square rounded-2xl border-3 transition-all flex flex-col items-center justify-center p-3 ${
                  avatar === av.id 
                    ? "border-white scale-110 bg-white/20" 
                    : "border-white/30 hover:border-white/60 hover:bg-white/10"
                }`}
              >
                <div className="text-3xl mb-1">{av.emoji}</div>
                <div className="text-white text-xs font-comic text-center">{av.label}</div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Tone Section */}
        <Card className="bg-white/10 backdrop-blur border-white/20 p-8 rounded-3xl">
          <h3 className="text-xl font-bold font-comic text-white mb-6 text-center">How should they talk?</h3>
          
          <div className="space-y-3">
            {personalities.tone.map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                  tone === t.id 
                    ? "border-white bg-white/20" 
                    : "border-white/30 hover:border-white/60 hover:bg-white/10"
                }`}
              >
                <div className="text-2xl">{t.emoji}</div>
                <div className="text-left">
                  <div className="text-white font-comic font-bold">{t.label}</div>
                  <div className="text-white/70 text-sm font-comic">{t.description}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Speed Section */}
        <Card className="bg-white/10 backdrop-blur border-white/20 p-8 rounded-3xl">
          <h3 className="text-xl font-bold font-comic text-white mb-6 text-center">How fast should they think?</h3>
          
          <div className="space-y-3">
            {personalities.speed.map((s) => (
              <button
                key={s.id}
                onClick={() => setSpeed(s.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                  speed === s.id 
                    ? "border-white bg-white/20" 
                    : "border-white/30 hover:border-white/60 hover:bg-white/10"
                }`}
              >
                <div className="text-2xl">{s.emoji}</div>
                <div className="text-left">
                  <div className="text-white font-comic font-bold">{s.label}</div>
                  <div className="text-white/70 text-sm font-comic">{s.description}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Preview */}
      {name && (
        <Card className="bg-white/10 backdrop-blur border-white/20 p-6 mb-8 rounded-3xl">
          <h4 className="text-lg font-bold font-comic text-white mb-4 text-center">Preview your bot! 👀</h4>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl shadow-medium">
              {personalities.avatars.find(a => a.id === avatar)?.emoji}
            </div>
            <div className="bg-gradient-secondary px-6 py-3 rounded-2xl text-white font-comic shadow-medium">
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
          className="text-white hover:bg-white/20 font-comic text-lg rounded-2xl px-8 py-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        
        <Button 
          variant="hero" 
          onClick={handleNext}
          disabled={!name.trim()}
          className="group font-comic text-lg rounded-2xl px-8 py-4 shadow-playful hover:scale-110 transition-all duration-300"
        >
          They look amazing! 🎉
          <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
        </Button>
      </div>
    </div>
  );
};

export default PersonalityStep;