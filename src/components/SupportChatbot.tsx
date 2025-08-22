import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, User, Bot, Mail } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface SupportChatbotProps {
  onEscalateToEmail: () => void;
  onClose?: () => void;
}

const SupportChatbot = ({ onEscalateToEmail, onClose }: SupportChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm BotBuddy Support Assistant. I'm here to help you with common questions about creating and managing your chatbots. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const botResponses: Record<string, string> = {
    "create": "To create a chatbot: 1) Click 'Start Building for Free', 2) Upload your documents (PDF, Word, or text), 3) Choose your bot's personality, 4) Customize the appearance, and 5) Deploy! The whole process takes less than 5 minutes.",
    "upload": "You can upload PDF files, Word documents, text files, or paste text directly. BotBuddy supports most common document formats and automatically extracts knowledge from your content.",
    "personality": "Yes! You can choose from Professional, Friendly, Casual, or Expert personalities. You can also customize the tone, style, and even add custom responses to match your brand perfectly.",
    "embed": "Once your chatbot is ready, you'll get a simple HTML code snippet. Just copy and paste it into your website - no technical knowledge required! You can also use our WordPress plugin or Shopify app.",
    "limit": "Free plan: 3 chatbots, 100 conversations/month. Pro plan: Unlimited chatbots, 1000 conversations/month. Enterprise: Custom limits with priority support.",
    "language": "BotBuddy supports over 50 languages! Your chatbot can automatically detect the user's language and respond accordingly, or you can set a specific language.",
    "pricing": "We offer a free plan with 3 chatbots. Pro plan is $29/month for unlimited chatbots. Enterprise plans start at $99/month with custom features and priority support.",
    "help": "I can help with: creating chatbots, uploading documents, personality settings, embedding on websites, pricing questions, language support, and troubleshooting. What specific topic interests you?"
  };

  const findBestResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Check for common question patterns
    if (lowerMessage.includes("how") && (lowerMessage.includes("create") || lowerMessage.includes("make"))) {
      return botResponses["create"];
    }
    
    if (lowerMessage.includes("what") && lowerMessage.includes("file")) {
      return botResponses["upload"];
    }
    
    if (lowerMessage.includes("can") && lowerMessage.includes("custom")) {
      return botResponses["personality"];
    }
    
    if (lowerMessage.includes("website") || lowerMessage.includes("embed")) {
      return botResponses["embed"];
    }
    
    if (lowerMessage.includes("cost") || lowerMessage.includes("price") || lowerMessage.includes("plan")) {
      return botResponses["pricing"];
    }
    
    // Default response when no match found
    return "I'm not sure about that specific question. Let me connect you with our human support team who can provide more detailed assistance. Would you like me to open the contact form?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = findBestResponse(inputValue);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // If bot can't help, offer escalation
      if (botResponse.includes("connect you with our human support")) {
        setTimeout(() => {
          const escalationMessage: Message = {
            id: Date.now() + 2,
            text: "Click the button below to contact our human support team directly:",
            isBot: true,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, escalationMessage]);
        }, 1000);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto h-96 flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <MessageCircle className="w-4 h-4" />
          BotBuddy Support
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-3">
        <ScrollArea className="flex-1 pr-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                {message.isBot && (
                  <Bot className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                )}
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    message.isBot
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {message.text}
                </div>
                {!message.isBot && (
                  <User className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-1" />
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <Bot className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="bg-muted text-foreground p-2 rounded-lg text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2 mt-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1"
          />
          <Button size="sm" onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="outline" onClick={onEscalateToEmail} className="flex-1">
            <Mail className="w-4 h-4 mr-1" />
            Contact Human Support
          </Button>
          {onClose && (
            <Button size="sm" variant="ghost" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportChatbot;