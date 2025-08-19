import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Book, Video, Mail } from "lucide-react";

const Help = () => {
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

  const helpCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of creating your first chatbot",
      color: "text-blue-600"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      color: "text-green-600"
    },
    {
      icon: MessageCircle,
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      color: "text-purple-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions via email",
      color: "text-orange-600"
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
              <Card key={index} className="hover:shadow-medium transition-shadow cursor-pointer">
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
              <Button size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Live Chat
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Email Support
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Help;