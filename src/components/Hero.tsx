import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import botBuddyMascot from "@/assets/botbuddy-mascot.png";
import botBuddyLogo from "@/assets/botbuddy-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      
      {/* Content */}
      <div className="container relative z-10 text-center px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Logo & Mascot */}
          <div className="mb-8 flex justify-center items-center gap-6">
            <img 
              src={botBuddyLogo} 
              alt="BotBuddy Logo" 
              className="w-24 h-24 rounded-2xl shadow-strong"
            />
            <img 
              src={botBuddyMascot} 
              alt="BotBuddy mascot - friendly robot" 
              className="w-32 h-32 animate-bounce"
            />
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Meet{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent drop-shadow-lg">
              BotBuddy
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
            Your Friendly, No-Tech Chatbot Builder
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            Create smart chatbots in minutes, not hours. No coding required—just upload your documents, 
            answer a few questions, and your AI assistant is ready to help!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" className="group">
              Start Building for Free
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button variant="soft" size="xl" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 text-white/70 text-sm">
            <p>✨ No credit card required • 🚀 5-minute setup • 🔒 Enterprise-grade security</p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse delay-500" />
    </section>
  );
};

export default Hero;