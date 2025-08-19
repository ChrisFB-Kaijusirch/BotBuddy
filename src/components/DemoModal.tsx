import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { MessageCircle, Send, Upload, Settings, Sparkles } from "lucide-react";
import botBuddyMascot from "@/assets/botbuddy-mascot.png";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your new chatbot assistant. How can I help you today?", isBot: true }
  ]);
  const [userInput, setUserInput] = useState("");

  const demoSteps = [
    {
      title: "Upload Your Documents",
      description: "Simply drag and drop your files or paste your content",
      icon: Upload,
      action: () => setCurrentStep(1)
    },
    {
      title: "Customize Your Bot",
      description: "Choose personality, name, and appearance",
      icon: Settings,
      action: () => setCurrentStep(2)
    },
    {
      title: "Test Your Bot",
      description: "Try out your new AI assistant",
      icon: MessageCircle,
      action: () => setCurrentStep(3)
    }
  ];

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    const newMessages = [
      ...messages,
      { text: userInput, isBot: false },
      { text: "Thanks for your question! I can help you with that based on the knowledge I've learned from your documents.", isBot: true }
    ];
    
    setMessages(newMessages);
    setUserInput("");
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setMessages([{ text: "Hello! I'm your new chatbot assistant. How can I help you today?", isBot: true }]);
    setUserInput("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            See BotBuddy in Action
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side - Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Build Your Bot in 3 Steps:</h3>
            
            {demoSteps.map((step, index) => (
              <Card 
                key={index}
                className={`p-4 cursor-pointer transition-all ${
                  currentStep === index ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
                onClick={step.action}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    currentStep === index ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            <div className="pt-4">
              <Button onClick={resetDemo} variant="outline" className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Restart Demo
              </Button>
            </div>
          </div>

          {/* Right Side - Demo Content */}
          <div className="space-y-4">
            {currentStep === 0 && (
              <Card className="p-6 text-center">
                <Upload className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h4 className="text-lg font-semibold mb-2">Upload Your Content</h4>
                <p className="text-muted-foreground mb-4">
                  Drag and drop PDFs, Word docs, or paste text directly
                </p>
                <div className="border-2 border-dashed border-muted rounded-lg p-8">
                  <p className="text-sm text-muted-foreground">
                    📄 company-handbook.pdf<br/>
                    📄 product-guide.docx<br/>
                    📄 faq-content.txt
                  </p>
                </div>
              </Card>
            )}

            {currentStep === 1 && (
              <Card className="p-6">
                <Settings className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h4 className="text-lg font-semibold mb-4 text-center">Customize Your Bot</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Bot Name</label>
                    <div className="mt-1 p-2 bg-muted rounded">Alex Assistant</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Personality</label>
                    <div className="mt-1 p-2 bg-muted rounded">Professional & Helpful</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Purpose</label>
                    <div className="mt-1 p-2 bg-muted rounded">Customer Support</div>
                  </div>
                </div>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="p-4">
                <h4 className="text-lg font-semibold mb-4 text-center">Test Your Bot</h4>
                <div className="h-64 border rounded-lg p-4 overflow-y-auto bg-muted/20">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex gap-3 mb-3 ${message.isBot ? '' : 'justify-end'}`}>
                      {message.isBot && (
                        <img src={botBuddyMascot} alt="Bot" className="w-8 h-8 rounded-full" />
                      )}
                      <div className={`max-w-xs p-3 rounded-lg ${
                        message.isBot 
                          ? 'bg-background border' 
                          : 'bg-primary text-primary-foreground'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask something..."
                    className="flex-1 p-2 border rounded-lg"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>

        <div className="text-center pt-4 border-t">
          <Button 
            size="lg"
            onClick={() => {
              onOpenChange(false);
              window.location.href = "/create-bot";
            }}
          >
            Start Building Your Own Bot
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;