import { Card } from "@/components/ui/card";
import { Upload, Brain, Rocket, BookOpen, Shield } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Designed for Beginners",
    description: "If you can upload a file and click a button, you can build a bot. No coding, no jargon, just clear steps.",
    color: "text-primary"
  },
  {
    icon: Brain,
    title: "Smart & Simple",
    description: "BotBuddy uses AI behind the scenes to understand your data and deliver fast, helpful answers.",
    color: "text-secondary"
  },
  {
    icon: Rocket,
    title: "Instant Deployment",
    description: "Share your bot anywhere—on your website, in emails, or social media—with easy drag-and-drop widgets.",
    color: "text-accent"
  },
  {
    icon: BookOpen,
    title: "Learn as You Go",
    description: "Built-in tips and friendly guides help you every step of the way, so you feel confident and in control.",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your data stays private with enterprise-level security, even if you're just starting out.",
    color: "text-secondary"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              BotBuddy?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We've made chatbot creation so simple, even your grandma could do it. 
            Here's what makes us special:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 border-0"
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;