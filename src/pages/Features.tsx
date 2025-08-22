import Navigation from "@/components/Navigation";
import Features from "@/components/Features";
import AnimatedCircuits from "@/components/AnimatedCircuits";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedCircuits />
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-primary/10 to-transparent" />
      <div className="relative z-10">
        <Navigation />
        <main className="pt-20">
          <div className="container px-4 py-16">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Powerful Features for{" "}
                <span className="bg-gradient-brand bg-clip-text text-transparent">
                  Everyone
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover all the features that make BotBuddy the easiest way to create intelligent chatbots without any technical knowledge.
              </p>
            </div>
            <Features />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FeaturesPage;