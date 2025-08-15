import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Settings, Share2, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload Your Content",
    description: "Simply drag and drop your documents, PDFs, or text files. BotBuddy will read and understand your content automatically.",
    color: "bg-gradient-primary"
  },
  {
    icon: Settings,
    number: "02", 
    title: "Customize Your Bot",
    description: "Answer a few friendly questions about your bot's personality and purpose. No technical knowledge needed!",
    color: "bg-gradient-secondary"
  },
  {
    icon: Share2,
    number: "03",
    title: "Share & Deploy",
    description: "Get your shareable link instantly or embed your bot anywhere with our simple copy-paste code.",
    color: "bg-gradient-accent"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to your own AI chatbot. 
            Seriously, it's that easy!
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-8 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-0 h-full">
                  <div className="text-center">
                    {/* Step Number */}
                    <div className={`w-16 h-16 rounded-full ${step.color} text-white text-xl font-bold flex items-center justify-center mx-auto mb-6 shadow-medium`}>
                      {step.number}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-12 h-12 mx-auto mb-6 text-primary">
                      <step.icon className="w-full h-full" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </Card>
                
                {/* Arrow connector (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <Button variant="hero" size="xl" className="group">
              Start Your Free Bot Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Join thousands of happy users • No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;