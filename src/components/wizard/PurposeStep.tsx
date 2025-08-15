import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { BotData } from "@/pages/CreateBot";

interface PurposeStepProps {
  botData: BotData;
  updateBotData: (data: Partial<BotData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const purposes = [
  {
    id: "faq",
    title: "Answer FAQs",
    description: "Help customers find answers quickly",
    emoji: "❓",
    color: "bg-gradient-primary",
    examples: ["What are your hours?", "How do I return items?", "Where are you located?"]
  },
  {
    id: "reminders", 
    title: "Send Reminders",
    description: "Keep people on track with helpful nudges",
    emoji: "⏰",
    color: "bg-gradient-secondary",
    examples: ["Drink water!", "Take a break", "Meeting in 10 mins"]
  },
  {
    id: "fun",
    title: "Chat for Fun",
    description: "Entertainment and friendly conversation",
    emoji: "🎭",
    color: "bg-gradient-accent",
    examples: ["Tell me a joke", "Random fun fact", "Play 20 questions"]
  },
  {
    id: "business",
    title: "Help My Business",
    description: "Support customers and boost sales",
    emoji: "💼",
    color: "bg-gradient-fun",
    examples: ["Product recommendations", "Booking appointments", "Order status"]
  }
];

const PurposeStep = ({ botData, updateBotData, onNext, onPrev }: PurposeStepProps) => {
  const [selectedPurpose, setSelectedPurpose] = useState(botData.purpose || "");
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSelect = (purposeId: string) => {
    setSelectedPurpose(purposeId);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1000);
  };

  const handleNext = () => {
    if (selectedPurpose) {
      updateBotData({ purpose: selectedPurpose });
      onNext();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6 animate-bounce">🤔</div>
        <h2 className="text-4xl md:text-6xl font-bold font-comic text-white mb-6">
          What should your bot do?
        </h2>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-comic">
          Pick the superpower that fits your needs! 💪
        </p>
      </div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            >
              {["🎉", "✨", "🎊", "⭐", "🌟"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {purposes.map((purpose) => (
          <Card 
            key={purpose.id}
            className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 border-4 ${
              selectedPurpose === purpose.id 
                ? 'border-white shadow-playful scale-105 bg-white/20' 
                : 'border-white/30 hover:border-white/60 bg-white/10'
            } backdrop-blur rounded-3xl`}
            onClick={() => handleSelect(purpose.id)}
          >
            <div className={`w-20 h-20 rounded-full ${purpose.color} flex items-center justify-center text-4xl mb-6 mx-auto shadow-medium float`}>
              {purpose.emoji}
            </div>
            
            <h3 className="text-2xl font-bold font-comic text-white mb-3 text-center">
              {purpose.title}
            </h3>
            
            <p className="text-white/80 text-lg mb-6 text-center font-comic leading-relaxed">
              {purpose.description}
            </p>
            
            <div className="space-y-2">
              <p className="text-white/70 text-sm font-comic text-center font-bold">Example questions:</p>
              {purpose.examples.map((example, index) => (
                <div key={index} className="text-white/60 text-sm bg-white/10 rounded-xl px-3 py-2 text-center font-comic">
                  "{example}"
                </div>
              ))}
            </div>

            {selectedPurpose === purpose.id && (
              <div className="mt-4 text-center">
                <div className="text-2xl animate-bounce">✅</div>
                <p className="text-white font-comic font-bold">Perfect choice!</p>
              </div>
            )}
          </Card>
        ))}
      </div>

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
          disabled={!selectedPurpose}
          className="group font-comic text-lg rounded-2xl px-8 py-4 shadow-playful hover:scale-110 transition-all duration-300"
        >
          Next Step! 🎯
          <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
        </Button>
      </div>
    </div>
  );
};

export default PurposeStep;