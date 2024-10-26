import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2Icon, Languages, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { model } from '@/config/GoogleAIModel';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const languages = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'hi', name: 'Hindi' }
];

const TranslateDocument = ({ documentContent }) => {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState('');
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!selectedLanguage || loading || !documentContent) return;

    setLoading(true);
    try {
      const selectedLangName = languages.find(lang => lang.code === selectedLanguage)?.name;

      const result = await model.generateContent({
        contents: [{
          parts: [{
            text: documentContent
          }],
          role: 'user'
        }, {
          parts: [{
            text: `Translate this text to ${selectedLangName}. Return only the translation, without any additional text or explanation.`
          }],
          role: 'model'
        }]
      });

      const translatedText = result.response.text();
      setTranslation(translatedText);
    } catch (error) {
      console.error("Translation failed:", error);
      setTranslation('Sorry, there was an error translating the document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!translation) return;

    try {
      await navigator.clipboard.writeText(translation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="flex gap-2 text-sm" onClick={() => setOpen(true)}>
              <Languages className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Translate document</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Translate Document</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-[calc(80vh-8rem)] p-6">
            <div className="flex items-center gap-4 mb-6">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={handleTranslate}
                disabled={!selectedLanguage || loading || !documentContent}
                className="min-w-[100px]"
              >
                {loading ? <Loader2Icon className="animate-spin w-5 h-5" /> : 'Translate'}
              </Button>
            </div>

            <ScrollArea className="flex-1 w-full rounded-md border p-4">
              {translation ? (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">Translation:</div>
                  <div className="text-base whitespace-pre-wrap">{translation}</div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground text-center py-8">
                  Translation will appear here
                </div>
              )}
            </ScrollArea>

            {translation && (
              <Button
                onClick={handleCopy}
                variant="outline"
                className="mt-4 gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TranslateDocument;