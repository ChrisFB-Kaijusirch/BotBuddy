import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Book, Video, Mail, Upload, Settings, Share2, Play, FileText, Zap } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SupportChatbot from "@/components/SupportChatbot";

const Help = () => {
  const [activeModal, setActiveModal] = useState<"chat" | "email" | "getting-started" | "videos" | null>(null);
  const faqData = [
    {
      question: "How do I create my first chatbot?",
      answer: "Simply click 'Start Building for Free', upload your documents, answer a few questions about your bot's purpose and personality, and you're done! The whole process takes less than 5 minutes."
    },
    {
      question: "What types of documents can I upload?",
      answer: "You can upload PDF files, Word documents, text files, and even paste text directly. BotBuddy will automatically extract the knowledge from your content to train your chatbot."
    },
    {
      question: "Can I customize my chatbot's personality?",
      answer: "Absolutely! You can choose from different personality types like Professional, Friendly, Casual, or Expert. You can also customize the tone and style to match your brand."
    },
    {
      question: "Is there a limit to how many chatbots I can create?",
      answer: "On the free plan, you can create up to 3 chatbots. Our paid plans offer unlimited chatbot creation with additional features like custom branding and analytics."
    },
    {
      question: "How do I embed my chatbot on my website?",
      answer: "Once your chatbot is ready, you'll get a simple code snippet that you can copy and paste into your website. No technical knowledge required!"
    },
    {
      question: "Can my chatbot handle multiple languages?",
      answer: "Yes! BotBuddy supports over 50 languages. Your chatbot can automatically detect the user's language and respond accordingly."
    }
  ];

  const gettingStartedSteps = [
    {
      icon: Upload,
      title: "Step 1: Upload Your Content",
      description: "Start by clicking 'Start Building for Free' and upload your documents (PDF, Word, text files) or paste text directly. BotBuddy will automatically extract knowledge from your content."
    },
    {
      icon: Settings,
      title: "Step 2: Configure Your Bot",
      description: "Choose your bot's name, purpose, and personality. Select from Professional, Friendly, Casual, or Expert tones to match your brand voice."
    },
    {
      icon: Zap,
      title: "Step 3: Customize Appearance",
      description: "Pick colors, add your logo, and customize the chat interface to match your website's design and branding."
    },
    {
      icon: Share2,
      title: "Step 4: Deploy & Share",
      description: "Get your embed code or shareable link instantly. Copy-paste the code into your website or share the direct link with your users."
    }
  ];

  const videoTutorials = [
    {
      title: "Creating Your First Chatbot",
      duration: "3:45",
      description: "Complete walkthrough from upload to deployment",
      thumbnail: "🎬"
    },
    {
      title: "Advanced Customization",
      duration: "5:20",
      description: "Personality settings, custom responses, and branding",
      thumbnail: "🎨"
    },
    {
      title: "Website Integration",
      duration: "2:30",
      description: "How to embed your chatbot on any website",
      thumbnail: "🌐"
    },
    {
      title: "Managing Multiple Bots",
      duration: "4:15",
      description: "Tips for organizing and maintaining multiple chatbots",
      thumbnail: "⚙️"
    }
  ];

  const helpCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of creating your first chatbot",
      color: "text-blue-600",
      action: () => setActiveModal("getting-started")
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      color: "text-green-600",
      action: () => setActiveModal("videos")
    },
    {
      icon: MessageCircle,
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      color: "text-purple-600",
      action: () => setActiveModal("chat")
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions via email",
      color: "text-orange-600",
      action: () => setActiveModal("email")
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <div className="container px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              How Can We{" "}
              <span className="bg-gradient-brand bg-clip-text text-transparent">
                Help You?
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions or get in touch with our support team.
            </p>
          </div>

          {/* Help Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-medium transition-shadow cursor-pointer" onClick={category.action}>
                <CardHeader className="text-center">
                  <category.icon className={`w-12 h-12 mx-auto mb-4 ${category.color}`} />
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you succeed with BotBuddy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setActiveModal("chat")}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Live Chat
              </Button>
              <Button variant="outline" size="lg" onClick={() => setActiveModal("email")}>
                <Mail className="w-5 h-5 mr-2" />
                Email Support
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <Dialog open={activeModal === "getting-started"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Book className="w-5 h-5" />
              Getting Started Guide
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            {gettingStartedSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Quick Tips:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Upload multiple documents at once to create a comprehensive knowledge base</li>
                <li>• Test your bot thoroughly before deploying to ensure it answers correctly</li>
                <li>• Use the preview feature to see exactly how your bot will appear to users</li>
                <li>• You can always edit and update your bot after deployment</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "videos"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Video Tutorials
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            {videoTutorials.map((video, index) => (
              <Card key={index} className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center text-2xl">
                    {video.thumbnail}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{video.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{video.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Play className="w-3 h-3" />
                      {video.duration}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="mt-4 p-4 bg-muted rounded-lg text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                More video tutorials coming soon! Subscribe to our YouTube channel for updates.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "email"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent>
          <ContactForm onClose={() => setActiveModal(null)} />
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "chat"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent>
          <SupportChatbot 
            onEscalateToEmail={() => {
              setActiveModal("email");
            }}
            onClose={() => setActiveModal(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Help;