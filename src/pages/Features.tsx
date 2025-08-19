import Navigation from "@/components/Navigation";
import Features from "@/components/Features";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen">
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
  );
};

export default FeaturesPage;