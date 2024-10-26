import { Button } from '@/components/ui/button'
import { Loader2Icon, WandSparkles } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { chatSession } from '@/config/GoogleAIModel'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const GenerateContent = ({ setGenerateContent }) => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sanitizeTableCell = (cell) => {
    if (cell === null || cell === undefined) return '';
    
    if (typeof cell === 'object') {
      try {
        return JSON.stringify(cell).replace(/[{}\[\]"]/g, '').trim();
      } catch {
        return String(cell);
      }
    }
    return String(cell);
  };

  const validateBlock = (block) => {
    if (!block || typeof block !== 'object') return null;
    if (!block.type || typeof block.type !== 'string') return null;
    if (!block.data) return null;
    return block;
  };

  const generateContent = async () => {
    if (!userInput.trim()) {
      setError('Please enter some text');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const prompt = `Generate editor.js compatible JSON content for "${userInput}". 
        If generating a table, please use simple text or numbers for cell values, not nested objects. 
        If generating a list, use simple text items.`;

      const result = await chatSession.sendMessage(prompt);
      const responseText = await result.response.text();

      let output;
      try {
        output = JSON.parse(responseText);
      } catch (e) {
        throw new Error('Invalid JSON response from AI');
      }

      if (!output?.blocks || !Array.isArray(output.blocks)) {
        throw new Error('Invalid content structure');
      }

      const processedBlocks = output.blocks
        .map(validateBlock)
        .filter(Boolean)
        .map(block => {
          if (block.type === 'list' && 
              (userInput.toLowerCase().includes("checkbox") || 
               userInput.toLowerCase().includes("to do"))) {
            return {
              type: 'checklist',
              data: {
                items: Array.isArray(block.data.items) 
                  ? block.data.items.map(String) 
                  : []
              }
            };
          }

          if (block.type === 'table') {
            if (!Array.isArray(block.data?.content)) {
              return null;
            }

            return {
              type: 'table',
              data: {
                withHeadings: block.data.withHeadings || false,
                content: block.data.content.map(row => {
                  if (!Array.isArray(row)) return [];
                  return row.map(sanitizeTableCell);
                })
              }
            };
          }

          return block;
        })
        .filter(Boolean);

      if (processedBlocks.length === 0) {
        throw new Error('No valid content blocks generated');
      }

      setGenerateContent({
        ...output,
        blocks: processedBlocks
      });
      
      setOpen(false);
    } catch (error) {
      console.error('Generation error:', error);
      setError(error.message || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              className="flex gap-2 text-sm" 
              onClick={() => {
                setOpen(true);
                setError('');
                setUserInput('');
              }}
            >
              <WandSparkles className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Generate content</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={open} onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setError('');
          setUserInput('');
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate content</DialogTitle>
            <DialogDescription>
              <h2 className="my-2">Whatever's on your mind</h2>
              <Input 
                placeholder="Any ideas..." 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading) {
                    generateContent();
                  }
                }}
              />
              {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
              )}
              <div className="mt-5 flex gap-5 justify-end">
                <Button 
                  variant="ghost" 
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  className="text-sm"
                  disabled={!userInput.trim() || loading}
                  onClick={generateContent}
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin mr-2" />
                  ) : 'Generate'}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateContent;