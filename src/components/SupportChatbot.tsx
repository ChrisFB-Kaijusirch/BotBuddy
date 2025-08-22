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
    // Conversational responses
    "hello": "Hello there! 👋 I'm BotBuddy Support Assistant. How can I help you today?",
    "hi": "Hi! 😊 I'm here to help with any questions about BotBuddy. What would you like to know?",
    "hey": "Hey! 👋 Ready to help you with BotBuddy. What's on your mind?",
    "good morning": "Good morning! ☀️ Hope you're having a great day. How can I assist you with BotBuddy?",
    "good afternoon": "Good afternoon! 🌞 What can I help you with today?",
    "good evening": "Good evening! 🌙 How can I assist you this evening?",
    "thanks": "You're very welcome! 😊 Is there anything else I can help you with?",
    "thank you": "My pleasure! 🙂 Feel free to ask if you need anything else.",
    "bye": "Goodbye! 👋 Feel free to come back anytime if you need more help.",
    "goodbye": "See you later! 😊 Don't hesitate to reach out if you have more questions.",
    "awesome": "Glad I could help! 🎉 Anything else you'd like to know?",
    "great": "Wonderful! 😄 Is there anything else I can assist you with?",
    "perfect": "Excellent! ✨ Let me know if you need help with anything else.",
    
    // Technical help responses
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
    "language": "BotBuddy supports over 50 languages! Your chatbot can automatically detect the user's language and respond accordingly, or you can set a specific language.",
    "personality": "Yes! You can choose from Professional, Friendly, Casual, or Expert personalities. You can also customize the tone, style, and even add custom responses to match your brand perfectly.",
    "customize": "Yes! You can choose from Professional, Friendly, Casual, or Expert personalities. You can also customize the tone, style, and even add custom responses to match your brand perfectly.",
    "account": "Account help: You can sign in, reset your password, and manage your profile from the account menu. For login issues, try resetting your password.",
    "login": "If you can't log in, click 'Forgot password' on the sign-in page to reset it. Still stuck? I can open the contact form.",
    "password": "Reset your password from the sign-in page via 'Forgot password'. You'll receive an email with a reset link.",
    "troubleshoot": "Troubleshooting: 1) Refresh the page, 2) Clear browser cache, 3) Re-upload a small sample file, 4) Check your embed code is placed before </body>. Tell me where you're stuck.",
    "error": "Troubleshooting: 1) Refresh the page, 2) Clear browser cache, 3) Re-upload a small sample file, 4) Check your embed code is placed before </body>. Tell me where you're stuck.",
    "help": "I can help with: getting started, uploading documents, personalities, customizing, embedding, languages, account and troubleshooting. What topic should we cover?",
    "support": "I'm here to help! Ask about getting started, uploads, embedding, or technical questions. If you'd like, I can open the contact form for human support.",
    
    // Pricing redirect
    "pricing": "For pricing information, I'll connect you with our human support team who can provide detailed pricing options and answer any billing questions. Let me open the contact form for you!",
    "plan": "For information about our plans, I'll connect you with our human support team who can help you choose the best option. Let me open the contact form!",
    "cost": "For cost details, our human support team can provide the most up-to-date pricing information. I'll open the contact form for you!",
    "billing": "For billing questions, I'll connect you with our human support team who can assist with account and payment matters. Opening the contact form now!",
    "payment": "For payment-related questions, our human support team is best equipped to help. Let me open the contact form for you!"
  };

  const findBestResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase().trim();

    // Handle emojis and emoji-only messages
    if (/^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/u.test(userMessage)) {
      const responses = [
        "I see you're using emojis! 😊 How can I help you with BotBuddy today?",
        "Nice emoji! 😄 What can I assist you with?",
        "I love emojis too! 🎉 What would you like to know about BotBuddy?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Conversational patterns - check these first
    if (/(^hi$|^hello$|^hey$)/i.test(lower)) {
      return botResponses[lower] || botResponses["hello"];
    }
    if (/(good morning|good afternoon|good evening)/i.test(lower)) {
      if (lower.includes("morning")) return botResponses["good morning"];
      if (lower.includes("afternoon")) return botResponses["good afternoon"];
      if (lower.includes("evening")) return botResponses["good evening"];
    }
    if (/(thanks|thank you)/i.test(lower)) {
      return lower.includes("thank you") ? botResponses["thank you"] : botResponses["thanks"];
    }
    if (/(bye|goodbye)/i.test(lower)) {
      return lower.includes("goodbye") ? botResponses["goodbye"] : botResponses["bye"];
    }
    if (/(awesome|great|perfect|excellent|wonderful)/i.test(lower)) {
      if (lower.includes("awesome")) return botResponses["awesome"];
      if (lower.includes("great")) return botResponses["great"];
      if (lower.includes("perfect")) return botResponses["perfect"];
      return botResponses["great"];
    }

    // Quick troubleshooting detection
    if (/(not working|error|issue|bug|fail|crash)/i.test(lower)) {
      return botResponses["troubleshoot"];
    }

    // Pricing questions - redirect to human support
    if (/(pricing|price|cost|plan|plans|billing|subscription|payment|fee|money|dollar)/i.test(lower)) {
      return botResponses["pricing"];
    }

    // Score-based intent matching for technical questions
    const categories: { key: string; keywords: string[] }[] = [
      { key: "create", keywords: ["create","build","make","start","getting started","how do i use","use","using","begin"] },
      { key: "upload", keywords: ["upload","document","documents","file","files","pdf","word","text","knowledge","data"] },
      { key: "embed", keywords: ["embed","integration","integrate","website","wordpress","shopify","script","snippet"] },
      { key: "personality", keywords: ["personality","tone","style","custom","customize","behavior","character"] },
      { key: "language", keywords: ["language","languages","translate","multilingual","locale","international"] },
      { key: "account", keywords: ["account","login","sign in","signin","password","reset","user","profile"] },
      { key: "help", keywords: ["help","support","guide","tutorial","video","assistance"] },
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
        upload: "upload",
        embed: "embed",
        personality: "personality",
        language: "language",
        account: "account",
      };
      const key = map[scored.key] ?? scored.key;
      return botResponses[key] ?? botResponses["help"];
    }

    // Heuristics for common patterns
    if (lower.includes("how") && (lower.includes("create") || lower.includes("make") || lower.includes("use"))) {
      return botResponses["start"];
    }
    if (lower.includes("what") && (lower.includes("file") || lower.includes("document"))) {
      return botResponses["upload"];
    }
    if (lower.includes("website") || lower.includes("embed")) {
      return botResponses["embed"];
    }

    // Default: friendly response with topics and escalation offer
    return "I'm not quite sure about that specific question, but I'm here to help! 😊 I can assist with: Getting Started, Uploading Documents, Embedding, Languages, Account issues, and Troubleshooting. For pricing questions, I'll connect you with our human support team. What would you like to explore?";
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

      // If bot mentions human support or pricing, offer escalation
      if (botResponse.includes("connect you with our human support") || 
          botResponse.includes("human support team") || 
          botResponse.includes("contact form")) {
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