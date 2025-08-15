import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Bot } from "lucide-react";
import type { BotData } from "@/pages/CreateBot";

interface NameStepProps {
  botData: BotData;
  updateBotData: (data: Partial<BotData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const NameStep = ({ botData, updateBotData, onNext, onPrev }: NameStepProps) => {
  const [name, setName] = useState(botData.name);

  const handleNext = () => {
    if (name.trim()) {
      updateBotData({ name: name.trim() });
      onNext();
    }
  };

  const suggestedNames = [
    "HelpBot",
    "CarCare Buddy", 
    "SupportAI",
    "InfoAssistant",
    "ChatHelper",
    "SmartGuide"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Bot className="w-20 h-20 text-white/80 mx-auto mb-6" />
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Step 2: Give Your Bot a Friendly Name
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Choose a name that fits your bot's personality. Something simple and easy to remember.
        </p>
      </div>

      <Card className="bg-white/10 backdrop-blur border-white/20 p-8 mb-8">
        <div className="max-w-md mx-auto">
          <label className="block text-white font-medium mb-4 text-center">
            What should we call your bot?
          </label>
          
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='e.g., "HelpBot" or "CarCare Buddy"'
            className="text-lg p-4 bg-white/20 border-white/30 text-white placeholder:text-white/60 text-center"
            onKeyDown={(e) => e.key === "Enter" && handleNext()}
          />

          {/* Suggested Names */}
          <div className="mt-6">
            <p className="text-white/80 text-sm mb-3 text-center">
              Or try one of these suggestions:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedNames.map((suggestedName) => (
                <Button
                  key={suggestedName}
                  variant="ghost"
                  size="sm"
                  onClick={() => setName(suggestedName)}
                  className="text-white/80 hover:text-white hover:bg-white/20 border border-white/30"
                >
                  {suggestedName}
                </Button>
              ))}
            </div>
          </div>

          {/* Character Count */}
          <div className="mt-4 text-center">
            <span className="text-white/60 text-xs">
              {name.length}/30 characters
            </span>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="ghost" 
          onClick={onPrev}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button 
          variant="hero" 
          onClick={handleNext}
          disabled={!name.trim()}
          className="group"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default NameStep;