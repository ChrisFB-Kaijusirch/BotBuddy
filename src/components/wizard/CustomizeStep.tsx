import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Palette, User, SkipForward } from "lucide-react";
import type { BotData } from "@/pages/CreateBot";

interface CustomizeStepProps {
  botData: BotData;
  updateBotData: (data: Partial<BotData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CustomizeStep = ({ botData, updateBotData, onNext, onPrev }: CustomizeStepProps) => {
  const [selectedColor, setSelectedColor] = useState(botData.color);
  const [selectedAvatar, setSelectedAvatar] = useState(botData.avatar);

  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#10B981" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Orange", value: "#F59E0B" },
    { name: "Red", value: "#EF4444" },
  ];

  const avatars = [
    { name: "Robot", value: "robot", emoji: "🤖" },
    { name: "Assistant", value: "assistant", emoji: "👩‍💼" },
    { name: "Helper", value: "helper", emoji: "🙋‍♂️" },
    { name: "Guide", value: "guide", emoji: "🧭" },
    { name: "Buddy", value: "buddy", emoji: "😊" },
    { name: "Expert", value: "expert", emoji: "👨‍🎓" },
  ];

  const handleNext = () => {
    updateBotData({ color: selectedColor, avatar: selectedAvatar });
    onNext();
  };

  const handleSkip = () => {
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl" 
             style={{ backgroundColor: selectedColor + "40" }}>
          {avatars.find(a => a.value === selectedAvatar)?.emoji || "🤖"}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Step 3: Make Your Bot Your Own
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Pick a color and avatar to match your style. Or skip this step and keep it classic!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Color Selection */}
        <Card className="bg-white/10 backdrop-blur border-white/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-white" />
            <h3 className="text-xl font-semibold text-white">Choose Color</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`w-full aspect-square rounded-lg border-2 transition-all ${
                  selectedColor === color.value 
                    ? "border-white scale-110" 
                    : "border-white/30 hover:border-white/60"
                }`}
                style={{ backgroundColor: color.value }}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            ))}
          </div>
          
          <p className="text-white/80 text-sm mt-4 text-center">
            Selected: {colors.find(c => c.value === selectedColor)?.name}
          </p>
        </Card>

        {/* Avatar Selection */}
        <Card className="bg-white/10 backdrop-blur border-white/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-white" />
            <h3 className="text-xl font-semibold text-white">Pick Avatar</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {avatars.map((avatar) => (
              <button
                key={avatar.value}
                onClick={() => setSelectedAvatar(avatar.value)}
                className={`w-full aspect-square rounded-lg border-2 transition-all flex items-center justify-center text-2xl bg-white/5 ${
                  selectedAvatar === avatar.value 
                    ? "border-white scale-110" 
                    : "border-white/30 hover:border-white/60"
                }`}
              >
                {avatar.emoji}
              </button>
            ))}
          </div>
          
          <p className="text-white/80 text-sm mt-4 text-center">
            Selected: {avatars.find(a => a.value === selectedAvatar)?.name}
          </p>
        </Card>
      </div>

      {/* Preview */}
      <Card className="bg-white/10 backdrop-blur border-white/20 p-6 mb-8">
        <h4 className="text-lg font-semibold text-white mb-4 text-center">Preview</h4>
        <div className="flex items-center justify-center gap-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
            style={{ backgroundColor: selectedColor }}
          >
            {avatars.find(a => a.value === selectedAvatar)?.emoji || "🤖"}
          </div>
          <div 
            className="px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: selectedColor }}
          >
            Hi! I'm {botData.name}. How can I help you today?
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
        
        <div className="flex gap-3">
          <Button 
            variant="soft" 
            onClick={handleSkip}
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Skip
          </Button>
          
          <Button 
            variant="hero" 
            onClick={handleNext}
            className="group"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeStep;