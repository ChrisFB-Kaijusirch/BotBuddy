import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { MessageCircle, Send, Upload, Settings, Sparkles, Play, Pause } from "lucide-react";
import botBuddyMascot from "@/assets/botbuddy-mascot.png";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Auto-play enabled
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your new chatbot assistant. How can I help you today?", isBot: true }
  ]);
  const [userInput, setUserInput] = useState("");
  const [autoPlayTimer, setAutoPlayTimer] = useState<NodeJS.Timeout | null>(null);

  const demoSteps = [
    {
      title: "Step 1: Upload Documents",
      description: "Watch how easy it is to upload your content",
      icon: Upload,
      duration: 4000 // Longer duration for smoother experience
    },
    {
      title: "Step 2: Customize Bot",
      description: "See the bot being configured with personality",
      icon: Settings,
      duration: 4000
    },
    {
      title: "Step 3: Test & Deploy",
      description: "Experience your bot in action",
      icon: MessageCircle,
      duration: 5000 // Extra time for interaction
    }
  ];

  // Auto-play functionality with loop
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => {
          if (prev >= demoSteps.length - 1) {
            return 0; // Loop back to start for continuous play
          }
          return prev + 1;
        });
      }, demoSteps[currentStep].duration);
      setAutoPlayTimer(timer);
    }

    return () => {
      if (autoPlayTimer) clearTimeout(autoPlayTimer);
    };
  }, [isPlaying, currentStep]);

  // Start auto-play when modal opens
  useEffect(() => {
    if (open) {
      setIsPlaying(true);
      setCurrentStep(0);
    }
  }, [open]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setMessages([{ text: "Hello! I'm your new chatbot assistant. How can I help you today?", isBot: true }]);
    setUserInput("");
    if (autoPlayTimer) clearTimeout(autoPlayTimer);
  };

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] overflow-y-auto p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🎬 BotBuddy Demo - Watch It Work!
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            See how someone creates a chatbot in just 3 simple steps
          </p>
        </DialogHeader>

        {/* Video Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <Button 
            onClick={togglePlayPause} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause Demo' : 'Play Demo'}
          </Button>
          <Button onClick={resetDemo} variant="outline">
            <Sparkles className="w-4 h-4 mr-2" />
            Restart
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {demoSteps.map((step, index) => (
              <div 
                key={index}
                className={`text-xs font-medium ${
                  index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-in-out"
              style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Current Step Display */}
          <div className="space-y-6">
            <Card className="p-6 border-2 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary text-primary-foreground rounded-lg">
                  {(() => {
                    const IconComponent = demoSteps[currentStep].icon;
                    return <IconComponent className="w-6 h-6" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{demoSteps[currentStep].title}</h3>
                  <p className="text-muted-foreground">{demoSteps[currentStep].description}</p>
                </div>
              </div>
            </Card>

            {/* Step Indicators */}
            <div className="space-y-3">
              {demoSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    currentStep === index 
                      ? 'bg-primary/10 border border-primary/30' 
                      : 'bg-muted/30 hover:bg-muted/50'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className={`p-2 rounded-full ${
                    index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index <= currentStep && (
                    <div className="ml-auto text-primary">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Demo Content */}
          <div className="space-y-4">
            {currentStep === 0 && (
              <Card className="p-6 transition-all duration-500 animate-scale-in">
                <div className="text-center mb-4">
                  <Upload className="w-24 h-24 mx-auto mb-4 text-primary animate-pulse" />
                  <h4 className="text-xl font-bold mb-2">Uploading Documents...</h4>
                  <p className="text-muted-foreground">
                    Sarah is uploading her company's FAQ and product manuals
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 bg-primary/5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 animate-pulse">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span>📄 company-faq.pdf (2.3 MB)</span>
                      </div>
                      <div className="flex items-center gap-2 animate-pulse delay-300">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span>📄 product-manual.docx (1.8 MB)</span>
                      </div>
                      <div className="flex items-center gap-2 animate-pulse delay-500">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span>📄 support-guidelines.txt (0.5 MB)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    ✅ Documents processed and ready for training!
                  </div>
                </div>
              </Card>
            )}

            {currentStep === 1 && (
              <Card className="p-6 transition-all duration-500 animate-scale-in">
                <div className="text-center mb-4">
                  <Settings className="w-24 h-24 mx-auto mb-4 text-primary animate-spin" />
                  <h4 className="text-xl font-bold mb-2">Customizing Bot...</h4>
                  <p className="text-muted-foreground">
                    Setting up personality and appearance
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <label className="text-sm font-medium text-muted-foreground">Bot Name</label>
                      <div className="mt-1 p-2 bg-background rounded border">
                        <span className="typing-animation">Sarah's Support Assistant</span>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <label className="text-sm font-medium text-muted-foreground">Personality</label>
                      <div className="mt-1 p-2 bg-background rounded border">
                        <span className="typing-animation delay-1000">Friendly & Professional</span>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <label className="text-sm font-medium text-muted-foreground">Purpose</label>
                      <div className="mt-1 p-2 bg-background rounded border">
                        <span className="typing-animation delay-2000">Customer Support & FAQ</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    ⚡ Bot personality configured successfully!
                  </div>
                </div>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="p-6 transition-all duration-500 animate-scale-in">
                <div className="text-center mb-4">
                  <MessageCircle className="w-24 h-24 mx-auto mb-4 text-primary animate-pulse" />
                  <h4 className="text-xl font-bold mb-2">Testing the Bot</h4>
                  <p className="text-muted-foreground text-sm">
                    Watch Sarah test her new assistant
                  </p>
                </div>
                
                <div className="h-72 border rounded-lg p-4 overflow-y-auto bg-background">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex gap-3 mb-3 ${message.isBot ? '' : 'justify-end'}`}>
                      {message.isBot && (
                        <img src={botBuddyMascot} alt="Bot" className="w-8 h-8 rounded-full" />
                      )}
                      <div className={`max-w-xs p-3 rounded-lg ${
                        message.isBot 
                          ? 'bg-muted border' 
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
                    placeholder="Try asking: 'What are your business hours?'"
                    className="flex-1 p-2 border rounded-lg"
                  />
                  <Button onClick={handleSendMessage} className="bg-primary">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-center text-sm text-muted-foreground mt-3">
                  🎉 Bot is live and ready to help customers!
                </div>
              </Card>
            )}
          </div>
        </div>

        <div className="text-center pt-6 border-t mt-6">
          <p className="text-muted-foreground mb-4">
            Ready to create your own AI assistant like Sarah did?
          </p>
          <Button 
            size="lg"
            onClick={() => {
              onOpenChange(false);
              window.location.href = "/create-bot";
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
          >
            Start Building Your Bot Now - It's Free! 🚀
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;