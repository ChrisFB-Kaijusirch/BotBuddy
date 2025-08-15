import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WelcomeStep from "@/components/wizard/WelcomeStep";
import PurposeStep from "@/components/wizard/PurposeStep";
import PersonalityStep from "@/components/wizard/PersonalityStep";
import TeachingStep from "@/components/wizard/TeachingStep";
import PreviewStep from "@/components/wizard/PreviewStep";
import FinalStep from "@/components/wizard/FinalStep";

export interface Teaching {
  id: string;
  trigger: string;
  response: string;
}

export interface BotData {
  name: string;
  purpose?: string;
  tone?: string;
  speed?: string;
  avatar: string;
  color: string;
  teachings?: Teaching[];
  files: File[];
}

const CreateBot = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [botData, setBotData] = useState<BotData>({
    name: "",
    purpose: "",
    tone: "friendly",
    speed: "quick", 
    avatar: "robot",
    color: "#3B82F6",
    teachings: [],
    files: []
  });

  const steps = [
    "Welcome",
    "Pick Purpose",
    "Build Personality", 
    "Teach Your Bot",
    "Test & Preview",
    "Ready to Share"
  ];

  const stepLabels = [
    "Getting Started",
    "Choosing Purpose",
    "Adding Personality", 
    "Teaching",
    "Testing",
    "Complete"
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      
      if (currentStep === 1) {
        toast({
          title: "Great job! Your bot is learning and getting smarter every minute.",
          duration: 3000,
        });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBotData = (data: Partial<BotData>) => {
    setBotData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} />;
      case 1:
        return <PurposeStep botData={botData} updateBotData={updateBotData} onNext={nextStep} onPrev={prevStep} />;
      case 2:
        return <PersonalityStep botData={botData} updateBotData={updateBotData} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <TeachingStep botData={botData} updateBotData={updateBotData} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <PreviewStep botData={botData} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <FinalStep botData={botData} />;
      default:
        return <WelcomeStep onNext={nextStep} />;
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-fun">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20 font-comic rounded-2xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <Button
            variant="soft"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30 font-comic rounded-2xl"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Need help? We're here for you! 🤗
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      {currentStep > 0 && (
        <div className="container mx-auto px-4 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-4">
              <div className="flex justify-between text-white/80 text-sm mb-2">
                <span>Step {currentStep} of {steps.length - 1}</span>
                <span>{stepLabels[currentStep]}</span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-white/20" />
            </div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="container mx-auto px-4 pb-12">
        {renderStep()}
      </div>
    </div>
  );
};

export default CreateBot;