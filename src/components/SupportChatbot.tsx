import { useState, useEffect, useRef } from "react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const botResponses: Record<string, string> = {
    "create": "To create a chatbot: 1) Click 'Start Building for Free', 2) Upload your documents (PDF, Word, or text), 3) Choose your bot's personality, 4) Customize the appearance, and 5) Deploy! The whole process takes less than 5 minutes.",
    "build": "To create a chatbot: 1) Click 'Start Building for Free', 2) Upload your documents (PDF, Word, or text), 3) Choose your bot's personality, 4) Customize the appearance, and 5) Deploy! The whole process takes less than 5 minutes.",
    "start": "Great! To get started: 1) Click 'Start Building for Free', 2) Upload your content, 3) Choose personality, 4) Customize appearance, 5) Deploy. Need help with any specific step?",
    "begin": "Great! To get started: 1) Click 'Start Building for Free', 2) Upload your content, 3) Choose personality, 4) Customize appearance, 5) Deploy. Need help with any specific step?",
    "use": "You can use BotBuddy by creating a bot, uploading your knowledge, selecting a personality, and embedding it on your site. Say 'getting started' for the step-by-step guide.",
    "using": "You can use BotBuddy by creating a bot, uploading your knowledge, selecting a personality, and embedding it on your site. Say 'getting started' for the step-by-step guide.",
    "getting started": "Getting Started: 1) Create a bot, 2) Upload PDFs/Docs/Text, 3) Pick a personality, 4) Customize colors/widget, 5) Test in preview, 6) Embed on your site.",
    "upload": "You can upload PDF files, Word documents, text files, or paste text directly. BotBuddy supports most common document formats and automatically extracts knowledge from your content.",
    "document": "You can upload PDF files, Word documents, text files, or paste text directly. BotBuddy supports most common document formats and automatically extracts knowledge from your content.",
    "file": "You can upload PDF files, Word documents, text files, or paste text directly. BotBuddy supports most common document formats and automatically extracts knowledge from your content.",
    "embed": "Once your chatbot is ready, you'll get a simple HTML code snippet. Just copy and paste it into your website - no technical knowledge required! You can also use our WordPress plugin or Shopify app.",
    "website": "Once your chatbot is ready, you'll get a simple HTML code snippet. Just copy and paste it into your website - no technical knowledge required! You can also use our WordPress plugin or Shopify app.",
    "integrate": "Once your chatbot is ready, you'll get a simple HTML code snippet. Just copy and paste it into your website - no technical knowledge required! You can also use our WordPress plugin or Shopify app.",
    "pricing": "We offer a free plan with 3 chatbots. Pro plan is $29/month for unlimited chatbots. Enterprise plans start at $99/month with custom features and priority support.",
    "plan": "We offer a free plan with 3 chatbots. Pro plan is $29/month for unlimited chatbots. Enterprise plans start at $99/month with custom features and priority support.",
    "cost": "We offer a free plan with 3 chatbots. Pro plan is $29/month for unlimited chatbots. Enterprise plans start at $99/month with custom features and priority support.",
    "billing": "Billing: Manage your subscription in Settings > Billing. You can upgrade/downgrade anytime. For cancellations or refunds, contact support with your invoice number.",
    "cancel": "To cancel: go to Settings > Billing and choose Cancel Plan. Your access continues until the end of the billing period.",
    "refund": "For refunds within our policy window, contact support with your invoice number and reason. We'll review promptly.",
    "language": "BotBuddy supports over 50 languages! Your chatbot can automatically detect the user's language and respond accordingly, or you can set a specific language.",
    "personality": "Yes! You can choose from Professional, Friendly, Casual, or Expert personalities. You can also customize the tone, style, and even add custom responses to match your brand perfectly.",
    "customize": "Yes! You can choose from Professional, Friendly, Casual, or Expert personalities. You can also customize the tone, style, and even add custom responses to match your brand perfectly.",
    "account": "Account help: You can sign in, reset your password, and manage your profile from the account menu. For login issues, try resetting your password.",
    "login": "If you can't log in, click 'Forgot password' on the sign-in page to reset it. Still stuck? I can open the contact form.",
    "password": "Reset your password from the sign-in page via 'Forgot password'. You'll receive an email with a reset link.",
    "troubleshoot": "Troubleshooting: 1) Refresh the page, 2) Clear browser cache, 3) Re-upload a small sample file, 4) Check your embed code is placed before </body>. Tell me where you're stuck.",
    "error": "Troubleshooting: 1) Refresh the page, 2) Clear browser cache, 3) Re-upload a small sample file, 4) Check your embed code is placed before </body>. Tell me where you're stuck.",
    "help": "I can help with: getting started, uploading documents, personalities, customizing, embedding, pricing/billing, languages, account and troubleshooting. What topic should we cover?",
    "support": "I'm here to help! Ask about getting started, uploads, embedding, or pricing. If you'd like, I can open the contact form for human support."
  };

  const findBestResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();

    // Quick troubleshooting detection
    if (/(not working|error|issue|bug|fail|crash)/i.test(lower)) {
      return botResponses["troubleshoot"];
    }

    // Score-based intent matching inspired by common support flows
    const categories: { key: string; keywords: string[] }[] = [
      { key: "create", keywords: ["create","build","make","start","getting started","how do i use","use","using"] },
      { key: "upload", keywords: ["upload","document","documents","file","files","pdf","word","text","knowledge","data"] },
      { key: "embed", keywords: ["embed","integration","integrate","website","wordpress","shopify","script","snippet"] },
      { key: "pricing", keywords: ["pricing","price","cost","plan","plans","billing","subscription"] },
      { key: "personality", keywords: ["personality","tone","style","custom","customize","behavior"] },
      { key: "language", keywords: ["language","languages","translate","multilingual","locale"] },
      { key: "account", keywords: ["account","login","sign in","signin","password","reset"] },
      { key: "help", keywords: ["help","support","guide","tutorial","video"] },
    ];

    const scored = categories
      .map(c => ({
        key: c.key,
        score: c.keywords.reduce((s, k) => s + (lower.includes(k) ? 1 : 0), 0),
      }))
      .sort((a, b) => b.score - a.score)[0];

    if (scored && scored.score > 0) {
      const map: Record<string, string> = {
        create: "start",
        help: "help",
        pricing: "pricing",
        upload: "upload",
        embed: "embed",
        personality: "personality",
        language: "language",
        account: "account",
      };
      const key = map[scored.key] ?? scored.key;
      return botResponses[key] ?? botResponses["help"];
    }

    // Heuristics
    if (lower.includes("how") && (lower.includes("create") || lower.includes("make") || lower.includes("use"))) {
      return botResponses["start"];
    }
    if (lower.includes("what") && lower.includes("file")) {
      return botResponses["upload"];
    }
    if (lower.includes("website") || lower.includes("embed")) {
      return botResponses["embed"];
    }
    if (/(cost|price|plan|pricing)/.test(lower)) {
      return botResponses["pricing"];
    }

    // Default: suggest topics and offer escalation
    return "Sorry, I couldn't find an exact match. I can help with: Getting Started, Uploading Documents, Embedding, Pricing/Billing, Languages, Account, Troubleshooting. If you'd like, I can connect you with our human support team and open the contact form.";
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
    <Card className="w-full max-w-md mx-auto h-96 flex flex-col overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <MessageCircle className="w-4 h-4" />
          BotBuddy Support
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-3 min-h-0 overflow-hidden">
        <ScrollArea className="flex-1 h-full pr-3">
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
             <div ref={messagesEndRef} />
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