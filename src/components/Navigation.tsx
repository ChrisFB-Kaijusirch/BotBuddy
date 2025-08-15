import { Button } from "@/components/ui/button";
import { MessageCircle, Menu } from "lucide-react";
import botbuddyLogo from "@/assets/botbuddy-logo.png";

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border/50 z-50">
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={botbuddyLogo} 
              alt="BotBuddy Logo" 
              className="w-10 h-10 rounded-lg shadow-soft"
            />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              BotBuddy
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#help" className="text-foreground hover:text-primary transition-colors">
              Help
            </a>
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost">
              Sign In
            </Button>
            <Button 
              variant="default"
              onClick={() => window.location.href = "/create-bot"}
            >
              Start Free
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;