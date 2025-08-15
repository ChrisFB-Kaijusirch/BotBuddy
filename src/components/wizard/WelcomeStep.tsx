import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import botBuddyLogo from "@/assets/botbuddy-logo.png";

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <img 
          src={botBuddyLogo} 
          alt="BotBuddy Logo" 
          className="w-32 h-32 mx-auto mb-8 rounded-3xl shadow-strong"
        />
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-brand bg-clip-text text-transparent drop-shadow-lg">
            BotBuddy
          </span>
          {" "}—
          <br />
          Your Friendly Chatbot Builder!
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          No tech skills needed. Let's create your very own chatbot in just a few simple steps.
        </p>
        
        <Button 
          variant="hero" 
          size="xl" 
          onClick={onNext}
          className="group shadow-strong"
        >
          Get Started
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      
      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80 text-sm">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-secondary rounded-full"></div>
          <span>Setup in 5 minutes</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <span>No technical skills needed</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>AI-powered intelligence</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;