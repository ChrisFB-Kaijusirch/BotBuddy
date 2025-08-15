import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, Plus, HelpCircle, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { BotData } from "@/pages/CreateBot";

interface FinalStepProps {
  botData: BotData;
}

const FinalStep = ({ botData }: FinalStepProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `https://mybotbuddy.com/chat/${botData.name.toLowerCase().replace(/\s+/g, '-')}`;

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Share link copied to clipboard!",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy link",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Success Animation */}
      <div className="mb-12">
        <div className="relative">
          <div 
            className="w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center text-6xl shadow-strong animate-bounce"
            style={{ backgroundColor: botData.color }}
          >
            🎉
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Your{" "}
          <span className="bg-gradient-brand bg-clip-text text-transparent drop-shadow-lg">
            BotBuddy
          </span>
          {" "}is Ready to Chat!
        </h2>
        
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
          Share your bot on your website, social media, or anywhere with one click.
        </p>
      </div>

      {/* Bot Summary */}
      <Card className="bg-white/10 backdrop-blur border-white/20 p-8 mb-8">
        <div className="grid md:grid-cols-3 gap-6 text-white">
          <div>
            <h4 className="font-semibold mb-2">Bot Name</h4>
            <p className="text-white/80">{botData.name}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Files Uploaded</h4>
            <p className="text-white/80">{botData.files.length} documents</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Customization</h4>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: botData.color }}
              />
              <span className="text-white/80">Custom theme</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Share Link */}
      <Card className="bg-white/10 backdrop-blur border-white/20 p-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Your Bot's Share Link</h3>
        <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 bg-transparent text-white/90 text-sm"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={copyShareLink}
            className="shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <Button 
          variant="hero" 
          size="xl" 
          onClick={copyShareLink}
          className="group shadow-strong"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Get Share Link
        </Button>
        
        <Button 
          variant="secondary" 
          size="xl"
          onClick={() => window.location.href = "/create-bot"}
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Another Bot
        </Button>
        
        <Button 
          variant="soft" 
          size="xl"
          className="bg-white/20 text-white border-white/30 hover:bg-white/30"
        >
          <HelpCircle className="w-5 h-5 mr-2" />
          Help & Support
        </Button>
      </div>

      {/* Success Message */}
      <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-6">
        <p className="text-white/90">
          🎊 <strong>Congratulations!</strong> Your chatbot is now live and ready to help your users. 
          You can embed it on your website, share it on social media, or use it wherever you need instant AI assistance.
        </p>
      </div>
    </div>
  );
};

export default FinalStep;