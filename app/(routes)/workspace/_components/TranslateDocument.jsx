import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { chatSession } from '@/config/GoogleAIModel';

const languages = [
  { code: "hi", name: "Hindi" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese (Simplified)" },
  { code: "ar", name: "Arabic" },
];

// This is a debugging function to help us see what content we're getting
const debugLog = (label, content) => {
  console.log(`[TranslateDocument] ${label}:`, content);
};

export default function TranslateDocument() {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [originalContent, setOriginalContent] = useState("");

  // Get the document content when the dialog opens
  useEffect(() => {
    if (open) {
      // Get the content from the active element or its parent
      const activeElement = document.activeElement;
      const content = activeElement?.value || activeElement?.textContent || '';
      debugLog('Selected content', content);
      setOriginalContent(content);
    }
  }, [open]);

  const extractTextFromResponse = (jsonResponse) => {
    debugLog('Raw response', jsonResponse);
    try {
      const parsed = JSON.parse(jsonResponse);
      debugLog('Parsed response', parsed);
      
      if (parsed.data?.text) {
        return parsed.data.text;
      } else if (parsed.blocks) {
        return parsed.blocks
          .map(block => {
            if (block.type === 'paragraph') {
              return block.data?.text || '';
            } else if (block.type === 'checklist') {
              return block.data?.items
                ?.map(item => item.text)
                .filter(Boolean)
                .join(', ');
            }
            return '';
          })
          .filter(Boolean)
          .join('\n');
      }
      // If we can't find specific structure, return any text content we can find
      return typeof parsed === 'string' ? parsed : JSON.stringify(parsed);
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      // If parsing fails, try to return the raw response if it looks like text
      return typeof jsonResponse === 'string' ? jsonResponse : 'Translation failed';
    }
  };

  const handleTranslate = async () => {
    if (!selectedLanguage || !originalContent.trim()) {
      setError("Please select a language and ensure there is content to translate");
      return;
    }

    setLoading(true);
    setError("");
    debugLog('Starting translation', { language: selectedLanguage, content: originalContent });

    try {
      const languageName = languages.find(lang => lang.code === selectedLanguage)?.name;
      const prompt = `Translate the following text to ${languageName}. Return only the translated text without any explanations or formatting:\n\n${originalContent}`;
      
      debugLog('Translation prompt', prompt);
      const result = await chatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      debugLog('Translation response', responseText);

      const translatedText = extractTextFromResponse(responseText);
      debugLog('Final translated text', translatedText);

      setTranslatedContent(translatedText);
      setShowConfirmation(true);
    } catch (err) {
      console.error("Translation error:", err);
      setError("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReplacement = () => {
    // Here you would implement the logic to replace the content
    // For now, just close the dialog
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLanguage("");
    setTranslatedContent("");
    setShowConfirmation(false);
    setError("");
    setOriginalContent("");
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex gap-2 text-sm">
        <Languages className="size-4" />
        Translate Document
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Translate Document</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-full gap-4">
            <div className="flex items-center gap-4">
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
                disabled={loading}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={handleTranslate}
                disabled={!selectedLanguage || loading || !originalContent.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Translating...
                  </>
                ) : (
                  "Translate"
                )}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <h3 className="font-medium mb-2">Original Content</h3>
                <ScrollArea className="h-[calc(100%-2rem)] border rounded-lg p-4">
                  <div className="whitespace-pre-wrap">
                    {originalContent || "No content selected"}
                  </div>
                </ScrollArea>
              </div>

              <div className="flex flex-col">
                <h3 className="font-medium mb-2">Translated Content</h3>
                <ScrollArea className="h-[calc(100%-2rem)] border rounded-lg p-4">
                  <div className="whitespace-pre-wrap">
                    {translatedContent || "Translation will appear here"}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {showConfirmation && translatedContent && (
              <Alert>
                <AlertTitle>Replace original content?</AlertTitle>
                <AlertDescription>
                  Do you want to replace the original content with the translated
                  version?
                </AlertDescription>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="default"
                    onClick={handleConfirmReplacement}
                    size="sm"
                  >
                    Yes, replace
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    size="sm"
                  >
                    No, keep original
                  </Button>
                </div>
              </Alert>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}