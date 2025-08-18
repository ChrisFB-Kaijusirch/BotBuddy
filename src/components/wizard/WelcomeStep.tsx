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
            className="w-40 h-40 mx-auto rounded-full shadow-playful bounce-fun bg-transparent"
          />
          <div className="absolute -top-2 -right-2 text-4xl animate-bounce">👋</div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-comic text-white mb-6 leading-tight">
          Hi! I'm{" "}
          <span className="bg-gradient-fun bg-clip-text text-transparent drop-shadow-lg">
            BotBuddy
          </span>
          ! 🤖
        </h1>
        
        <div className="text-2xl md:text-3xl text-white/90 mb-4 font-comic">
          I'll help you build your{" "}
          <span className="bg-gradient-secondary bg-clip-text text-transparent font-bold">
            first bot
          </span>
          . Ready? 🚀
        </div>
        
        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-comic">
          No tech skills needed! Just pick, tap, talk, and share. 
          Your bot will be ready in 3 minutes! ⏰
        </p>
        
        <Button 
          variant="hero" 
          size="xl" 
          onClick={onNext}
          className="group shadow-playful text-2xl py-8 px-12 rounded-3xl font-comic font-bold wiggle hover:scale-110 transition-all duration-300"
        >
          Let's Build My Bot! 🎨
          <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-2" />
        </Button>
      </div>
      
      {/* Fun feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90 text-lg font-comic">
        <div className="flex items-center justify-center gap-3 bg-white/10 rounded-2xl p-4 backdrop-blur">
          <span className="text-2xl">⚡</span>
          <span>3 minutes setup</span>
        </div>
        <div className="flex items-center justify-center gap-3 bg-white/10 rounded-2xl p-4 backdrop-blur">
          <span className="text-2xl">🎮</span>
          <span>Fun like a game</span>
        </div>
        <div className="flex items-center justify-center gap-3 bg-white/10 rounded-2xl p-4 backdrop-blur">
          <span className="text-2xl">🎯</span>
          <span>Zero confusion</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;