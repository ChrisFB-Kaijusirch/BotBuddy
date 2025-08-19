import Navigation from "@/components/Navigation";
import HowItWorks from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <div className="container px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              How{" "}
              <span className="bg-gradient-brand bg-clip-text text-transparent">
                BotBuddy
              </span>{" "}
              Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Create your AI chatbot in just a few simple steps. No coding, no complexity - just results.
            </p>
            <Button 
              size="lg"
              onClick={() => window.location.href = "/create-bot"}
              className="group"
            >
              Start Building Now
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <HowItWorks />
        </div>
      </main>
    </div>
  );
};

export default HowItWorksPage;