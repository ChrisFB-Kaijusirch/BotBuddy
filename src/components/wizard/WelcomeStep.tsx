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
        <div className="relative mb-8">
          <img 
            src={botBuddyLogo} 
            alt="BotBuddy Logo" 
            className="w-40 h-40 mx-auto rounded-full shadow-strong animate-bounce"
          />
          <div className="absolute -top-2 -right-2 text-4xl animate-bounce">👋</div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Hi! I'm{" "}
          <span className="bg-gradient-brand bg-clip-text text-transparent">
            BotBuddy
          </span>
          ! 🤖
        </h1>
        
        <div className="text-2xl md:text-3xl text-muted-foreground mb-4 font-medium">
          I'll help you build your{" "}
          <span className="bg-gradient-brand bg-clip-text text-transparent font-bold">
            first bot
          </span>
          . Ready? 🚀
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          No tech skills needed! Just pick, tap, talk, and share. 
          Your bot will be ready in 3 minutes! ⏰
        </p>
        
        <Button 
          size="xl" 
          onClick={onNext}
          className="group bg-gradient-brand hover:opacity-90 transition-opacity text-2xl py-8 px-12 rounded-3xl font-bold hover:scale-105 transition-all duration-300"
        >
          Let's Build My Bot! 🎨
          <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-2" />
        </Button>
      </div>
      
      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-muted-foreground text-lg">
        <div className="flex items-center justify-center gap-3 bg-card/50 rounded-2xl p-4 backdrop-blur border">
          <span className="text-2xl">⚡</span>
          <span>3 minutes setup</span>
        </div>
        <div className="flex items-center justify-center gap-3 bg-card/50 rounded-2xl p-4 backdrop-blur border">
          <span className="text-2xl">🎮</span>
          <span>Fun like a game</span>
        </div>
        <div className="flex items-center justify-center gap-3 bg-card/50 rounded-2xl p-4 backdrop-blur border">
          <span className="text-2xl">🎯</span>
          <span>Zero confusion</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;