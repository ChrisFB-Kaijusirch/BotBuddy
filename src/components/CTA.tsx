import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <MessageCircle className="w-20 h-20 text-white/80 mx-auto mb-6" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Build Your
            <br />
            <span className="bg-gradient-accent bg-clip-text text-transparent">Dream Chatbot?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you want a chatbot for customer questions, appointment scheduling, 
            or just to wow your friends, BotBuddy makes it fun, fast, and frustration-free.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              variant="secondary" 
              size="xl" 
              onClick={() => window.location.href = "/create-bot"}
              className="group shadow-strong"
            >
              Get Started - It's Free!
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button variant="soft" size="xl" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              Talk to Sales
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80 text-sm">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>Setup in 5 minutes</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-500"></div>
              <span>No technical skills needed</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-1000"></div>
              <span>Free forever plan</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
    </section>
  );
};

export default CTA;