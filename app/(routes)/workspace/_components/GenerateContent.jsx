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

const GenerateContent = ({ setGenerateContent }) => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const GenerateContent = async () => {
    setLoading(true);
    const prompt = "Generate content for editor.js in JSON for " + userInput;

    try {
      const result = await chatSession.sendMessage(prompt);
      const responseText = await result.response.text(); 

      console.log("AI Response: ", responseText); 

      let output;
      try {
        output = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse AI response as JSON: ", e);
        output = responseText;
      }

      if (output && output.blocks && Array.isArray(output.blocks)) {
        let isChecklist = userInput.toLowerCase().includes("checkbox") || userInput.toLowerCase().includes("to do");

        const filteredBlocks = output.blocks
          .filter(block => block.type !== 'simple-input') 
          .map(block => {
            if (block.type === 'list' && isChecklist) {
              return {
                type: 'checklist',
                data: {
                  items: block.data.items 
                }
              };
            }

            if (block.type === 'table' && block.data && Array.isArray(block.data.content)) {
              const sanitizedContent = block.data.content.map(row =>
                row.map(cell => typeof cell === 'object' ? JSON.stringify(cell) : String(cell))
              );

              return {
                ...block,
                data: {
                  ...block.data,
                  content: sanitizedContent 
                }
              };
            }

            return block;
          });

        const editorContent = {
          ...output,
          blocks: filteredBlocks 
        };
        setGenerateContent(editorContent);
      } else {
        console.warn("No valid content generated.");
      }
    } catch (e) {
      console.error("Failed to generate content: ", e);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };


  return (
    <div>
      <Button className="flex gap-2 text-sm" onClick={() => setOpen(true)}>
        <WandSparkles className='size-4' /> Generate Content
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate content</DialogTitle>
            <DialogDescription>
              <h2 className='my-2'>Whatever's on your mind</h2>
              <Input placeholder="Any ideas..." onChange={(e) => setUserInput(e?.target.value)} />
              <div className='mt-5 flex gap-5 justify-end'>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button
                  className="text-sm"
                  disabled={!userInput || loading}
                  onClick={GenerateContent}>
                  {loading ? <Loader2Icon className='animate-spin' /> : 'Generate'}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default GenerateContent;
