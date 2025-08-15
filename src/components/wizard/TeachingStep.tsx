import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Plus, Trash2, Lightbulb, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { BotData } from "@/pages/CreateBot";

interface TeachingStepProps {
  botData: BotData;
  updateBotData: (data: Partial<BotData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface Teaching {
  id: string;
  trigger: string;
  response: string;
}

const TeachingStep = ({ botData, updateBotData, onNext, onPrev }: TeachingStepProps) => {
  const { toast } = useToast();
  const [teachings, setTeachings] = useState<Teaching[]>(
    botData.teachings || [
      { id: "1", trigger: "", response: "" },
      { id: "2", trigger: "", response: "" },
      { id: "3", trigger: "", response: "" }
    ]
  );
  const [isRecording, setIsRecording] = useState<string | null>(null);

  const quickHacks = [
    {
      title: "FAQ Master 🤔",
      description: "Answer 5 common questions",
      teachings: [
        { trigger: "What are your hours?", response: "We're open Monday-Friday 9AM-6PM!" },
        { trigger: "How do I contact you?", response: "You can email us at hello@company.com or call (555) 123-4567!" },
        { trigger: "Where are you located?", response: "We're located at 123 Main Street, Your City!" }
      ]
    },
    {
      title: "Motivation Bot 💪",
      description: "Daily dose of positivity",
      teachings: [
        { trigger: "I need motivation", response: "You've got this! Every small step counts towards your big goals! 🌟" },
        { trigger: "I'm feeling down", response: "It's okay to have tough days. You're stronger than you know! 💝" },
        { trigger: "Give me energy", response: "⚡ BOOM! You're amazing and today is YOUR day to shine! ⚡" }
      ]
    },
    {
      title: "Fun Friend 🎭",
      description: "Entertainment and jokes",
      teachings: [
        { trigger: "Tell me a joke", response: "Why don't scientists trust atoms? Because they make up everything! 😄" },
        { trigger: "I'm bored", response: "How about we play 20 questions? Think of something and I'll try to guess! 🎲" },
        { trigger: "Random fact", response: "Did you know? Honey never spoils! Archaeologists have found edible honey in ancient Egyptian tombs! 🍯" }
      ]
    }
  ];

  const updateTeaching = (id: string, field: 'trigger' | 'response', value: string) => {
    setTeachings(prev => prev.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const addTeaching = () => {
    const newTeaching = {
      id: Date.now().toString(),
      trigger: "",
      response: ""
    };
    setTeachings(prev => [...prev, newTeaching]);
  };

  const removeTeaching = (id: string) => {
    if (teachings.length > 1) {
      setTeachings(prev => prev.filter(t => t.id !== id));
    }
  };

  const applyQuickHack = (hack: any) => {
    const newTeachings = hack.teachings.map((t: any, index: number) => ({
      id: Date.now() + index + "",
      trigger: t.trigger,
      response: t.response
    }));
    setTeachings(newTeachings);
    toast({
      title: `${hack.title} applied! 🎉`,
      description: "Your bot just got smarter!",
      duration: 2000,
    });
  };

  const startVoiceInput = (id: string, field: 'trigger' | 'response') => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsRecording(`${id}-${field}`);
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        updateTeaching(id, field, transcript);
        setIsRecording(null);
      };
      
      recognition.onerror = () => {
        setIsRecording(null);
        toast({
          title: "Voice input failed",
          description: "Please try again or type manually",
          variant: "destructive",
          duration: 2000,
        });
      };
      
      recognition.onend = () => {
        setIsRecording(null);
      };
      
      recognition.start();
    } else {
      toast({
        title: "Voice input not supported",
        description: "Please type manually",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleNext = () => {
    const validTeachings = teachings.filter(t => t.trigger.trim() && t.response.trim());
    if (validTeachings.length > 0) {
      updateBotData({ teachings: validTeachings });
      onNext();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6 bounce-fun">🧠</div>
        <h2 className="text-4xl md:text-6xl font-bold font-comic text-white mb-6">
          Teach it 3 things to say!
        </h2>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-comic">
          When someone says this → your bot says that! 💬
        </p>
      </div>

      {/* Quick Hacks */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-8 h-8 text-white wiggle" />
          <h3 className="text-2xl font-bold font-comic text-white">Bot Hacks Library 🚀</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {quickHacks.map((hack, index) => (
            <Card 
              key={index}
              className="bg-white/10 backdrop-blur border-white/20 p-6 rounded-3xl hover:scale-105 transition-all cursor-pointer"
              onClick={() => applyQuickHack(hack)}
            >
              <h4 className="text-lg font-bold font-comic text-white mb-2">{hack.title}</h4>
              <p className="text-white/80 text-sm font-comic mb-4">{hack.description}</p>
              <Button variant="secondary" size="sm" className="w-full rounded-2xl font-comic">
                Use This! ✨
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Teaching Interface */}
      <div className="space-y-6 mb-8">
        {teachings.map((teaching, index) => (
          <Card key={teaching.id} className="bg-white/10 backdrop-blur border-white/20 p-6 rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold font-comic">
                {index + 1}
              </div>
              <h4 className="text-lg font-bold font-comic text-white">Teaching #{index + 1}</h4>
              {teachings.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTeaching(teaching.id)}
                  className="ml-auto text-white/60 hover:text-white hover:bg-white/10 rounded-2xl"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/90 font-comic font-bold mb-2">
                  When someone says: 🗣️
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={teaching.trigger}
                    onChange={(e) => updateTeaching(teaching.id, 'trigger', e.target.value)}
                    placeholder="e.g., 'Hi' or 'What are your hours?'"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-2xl font-comic pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startVoiceInput(teaching.id, 'trigger')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {isRecording === `${teaching.id}-trigger` ? (
                      <MicOff className="w-4 h-4 text-red-400 animate-pulse" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-white/90 font-comic font-bold mb-2">
                  Your bot says: 🤖
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={teaching.response}
                    onChange={(e) => updateTeaching(teaching.id, 'response', e.target.value)}
                    placeholder="e.g., 'Hey there! I'm Luna!'"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-2xl font-comic pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startVoiceInput(teaching.id, 'response')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {isRecording === `${teaching.id}-response` ? (
                      <MicOff className="w-4 h-4 text-red-400 animate-pulse" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {teaching.trigger && teaching.response && (
              <div className="mt-4 p-4 bg-white/5 rounded-2xl">
                <p className="text-white/70 text-sm font-comic mb-2">Preview:</p>
                <div className="flex items-start gap-3">
                  <div className="text-white bg-white/20 px-3 py-2 rounded-2xl font-comic text-sm">
                    {teaching.trigger}
                  </div>
                  <div className="text-white bg-gradient-primary px-3 py-2 rounded-2xl font-comic text-sm">
                    {teaching.response}
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Add More Button */}
      <div className="text-center mb-8">
        <Button
          variant="secondary"
          onClick={addTeaching}
          className="font-comic text-lg rounded-2xl px-8 py-4 shadow-medium hover:scale-110 transition-all duration-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          Teach it more! 🎓
        </Button>
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
          disabled={!teachings.some(t => t.trigger.trim() && t.response.trim())}
          className="group font-comic text-lg rounded-2xl px-8 py-4 shadow-playful hover:scale-110 transition-all duration-300"
        >
          My bot is getting smart! 🧠✨
          <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
        </Button>
      </div>
    </div>
  );
};

export default TeachingStep;