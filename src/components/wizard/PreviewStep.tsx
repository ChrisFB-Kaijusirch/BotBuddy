import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Send, HelpCircle, Edit3 } from "lucide-react";
import type { BotData } from "@/pages/CreateBot";

interface PreviewStepProps {
  botData: BotData;
  onNext: () => void;
  onPrev: () => void;
}

const PreviewStep = ({ botData, onNext, onPrev }: PreviewStepProps) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      message: `Hi! I'm ${botData.name}. I've learned from your documents and I'm ready to help. Ask me anything!`
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    setChatHistory(prev => [...prev, { type: "user", message: message.trim() }]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: "bot", 
        message: "Thanks for testing me! I'm still learning from your documents. In a real scenario, I'd give you a helpful answer based on the files you uploaded." 
      }]);
    }, 1000);

    setMessage("");
  };

  const showTips = () => {
    setChatHistory(prev => [...prev, { 
      type: "bot", 
      message: "💡 Here are some tips for testing me:\n\n• Ask questions related to your uploaded documents\n• Try different ways of asking the same question\n• Ask for specific information or explanations\n• Test my personality and helpfulness!" 
    }]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-strong"
          style={{ backgroundColor: botData.color }}
        >
          🤖
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Step 4: Try Out Your Bot!
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Ask your bot a question to see how it responds. Need help? Click the "Tips" button for guidance.
        </p>
      </div>

      {/* Chat Interface */}
      <Card className="bg-white/10 backdrop-blur border-white/20 p-6 mb-8">
        <div className="h-80 overflow-y-auto mb-4 space-y-4">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                chat.type === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-white/20 text-white'
              }`}>
                {chat.type === 'bot' && (
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                      style={{ backgroundColor: botData.color }}
                    >
                      🤖
                    </div>
                    <span className="font-medium text-sm">{botData.name}</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a question here..."
            className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button 
            variant="secondary" 
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4 justify-center">
          <Button 
            variant="soft" 
            onClick={showTips}
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Tips
          </Button>
          
          <Button 
            variant="soft" 
            onClick={onPrev}
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Info
          </Button>
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
          onClick={onNext}
          className="group"
        >
          Looks Great!
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default PreviewStep;