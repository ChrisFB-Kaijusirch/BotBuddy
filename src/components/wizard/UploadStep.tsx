import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Upload, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { BotData } from "@/pages/CreateBot";

interface UploadStepProps {
  botData: BotData;
  updateBotData: (data: Partial<BotData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const UploadStep = ({ botData, updateBotData, onNext, onPrev }: UploadStepProps) => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type === 'application/pdf' || 
      file.type === 'application/msword' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'text/plain'
    );
    
    if (validFiles.length > 0) {
      updateBotData({ files: [...botData.files, ...validFiles] });
      toast({
        title: `Successfully uploaded ${validFiles.length} file(s)`,
        duration: 2000,
      });
    } else {
      toast({
        title: "Please upload PDF, Word, or text files only",
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [botData.files, updateBotData, toast]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      updateBotData({ files: [...botData.files, ...files] });
      toast({
        title: `Successfully uploaded ${files.length} file(s)`,
        duration: 2000,
      });
    }
  }, [botData.files, updateBotData, toast]);

  const removeFile = (index: number) => {
    const newFiles = botData.files.filter((_, i) => i !== index);
    updateBotData({ files: newFiles });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Step 1: Upload What Your Bot Should Know
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Drag and drop PDFs, Word files, or text documents here. Don't worry, BotBuddy will do the hard work of learning from them.
        </p>
      </div>

      <Card className="bg-white/10 backdrop-blur border-white/20 p-8 mb-8">
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive 
              ? 'border-secondary bg-secondary/10' 
              : 'border-white/40 hover:border-white/60'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-16 h-16 text-white/60 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-white mb-4">
            Drop your files here or click to browse
          </h3>
          <p className="text-white/70 mb-6">
            Supports: PDF, Word (.doc, .docx), Text files
          </p>
          
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="secondary" className="cursor-pointer">
              Upload Files
            </Button>
          </label>
        </div>

        {/* File List */}
        {botData.files.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Uploaded Files ({botData.files.length})
            </h4>
            <div className="space-y-2">
              {botData.files.map((file, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-white text-sm">{file.name}</span>
                    <span className="text-white/60 text-xs">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tip */}
        <div className="mt-6 bg-accent/20 border border-accent/30 rounded-lg p-4">
          <p className="text-white/90 text-sm">
            💡 <strong>Tip:</strong> The more info you give, the smarter your bot will be!
          </p>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="ghost" 
          onClick={onPrev}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button 
          variant="hero" 
          onClick={onNext}
          disabled={botData.files.length === 0}
          className="group"
        >
          Next Step
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default UploadStep;