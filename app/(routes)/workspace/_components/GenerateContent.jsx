// import { Button } from '@/components/ui/button'
// import { Loader2Icon, WandSparkles } from 'lucide-react'
// import React, { useState } from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from '@/components/ui/input'
// import { chatSession } from '@/config/GoogleAIModel'

// const GenerateContent = ({setGenerateContent}) => {
//   const [open, setOpen] = useState(false);
//   const [userInput, setUserInput] = useState();
//   const [loading, setLoading] = useState();

//   const GenerateContent = async () => {
//     setLoading(true);
//     const prompt = "Generate content for editor.js in JSON for" + userInput;
//     const result = await chatSession.sendMessage(prompt);

//     try {
//       const output = JSON.parse(result.response.text());
//       setGenerateContent(output)
//     }
//     catch (e) {
//       setLoading(false);
//     }

//     setLoading(false);
//     setOpen(false);
//   }

//   return (
//     <div>
//       <Button className="flex gap-2 text-sm" onClick={() => setOpen(true)}>
//         <WandSparkles className='size-4' /> Generate Content
//       </Button>
//       <Dialog open={open}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Generate content</DialogTitle>
//             <DialogDescription>
//               <h2 className='mt-3'>Whatever's on your mind</h2>
//               <Input placeholder="Any ideas..." onChange={(e) => setUserInput(e?.target.value)} />
//               <div className='mt-5 flex gap-5 justify-end'>
//                 <Button variant="ghost" onClick={setOpen(false)}>Cancel</Button>
//                 <Button
//                   disabled={!userInput | loading}
//                   onClick={() => GenerateContent()}>
//                   {loading ? <Loader2Icon className='animate-spin' /> : 'Generate'}
//                 </Button>
//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>

//     </div>
//   )
// }

// export default GenerateContent

import { Button } from '@/components/ui/button'
import { Loader2Icon, WandSparkles } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { chatSession } from '@/config/GoogleAIModel'

const GenerateContent = ({ setGenerateContent }) => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  // const GenerateContent = async () => {
  //   setLoading(true);
  //   const prompt = "Generate content for editor.js in JSON for " + userInput;

  //   try {
  //     const result = await chatSession.sendMessage(prompt);
  //     const output = JSON.parse(result.response.text());
  //     setGenerateContent(output);
  //   } catch (e) {
  //     console.error("Failed to generate content:", e);
  //   } finally {
  //     setLoading(false);
  //     setOpen(false);
  //   }
  // };

  // const GenerateContent = async () => {
  //   setLoading(true);
  //   const prompt = "Generate content for editor.js in JSON for " + userInput;

  //   try {
  //     const result = await chatSession.sendMessage(prompt);
  //     const responseText = await result.response.text(); // Fetch raw response

  //     console.log("AI Response: ", responseText); // Log the AI response to check

  //     // Try to parse the response
  //     let output;
  //     try {
  //       output = JSON.parse(responseText);
  //     } catch (e) {
  //       console.error("Failed to parse AI response as JSON: ", e);
  //       output = responseText; // If it's not JSON, treat it as plain text
  //     }

  //     if (output && output.blocks && Array.isArray(output.blocks)) {
  //       // Handle checkbox lists specifically based on user input
  //       let isChecklist = userInput.toLowerCase().includes("checkbox") || userInput.toLowerCase().includes("to do");

  //       // Filter unsupported block types
  //       const filteredBlocks = output.blocks.map(block => {
  //         if (block.type === 'list' && isChecklist) {
  //           // Convert list block to checklist block
  //           return {
  //             type: 'checklist',
  //             data: {
  //               items: block.data.items // Use the same items for the checklist
  //             }
  //           };
  //         }
  //         return block; // Keep other blocks as they are
  //       });

  //       const editorContent = {
  //         ...output,
  //         blocks: filteredBlocks // Set filtered blocks to the editor
  //       };

  //       // Set the generated content to the editor
  //       setGenerateContent(editorContent);
  //     } else {
  //       console.warn("No valid content generated.");
  //     }
  //   } catch (e) {
  //     console.error("Failed to generate content: ", e);
  //   } finally {
  //     setLoading(false);
  //     setOpen(false);
  //   }
  // };

  // const GenerateContent = async () => {
  //   setLoading(true);
  //   const prompt = "Generate content for editor.js in JSON for " + userInput;

  //   try {
  //     const result = await chatSession.sendMessage(prompt);
  //     const responseText = await result.response.text(); // Fetch raw response

  //     console.log("AI Response: ", responseText); // Log the AI response to check

  //     // Try to parse the response
  //     let output;
  //     try {
  //       output = JSON.parse(responseText);
  //     } catch (e) {
  //       console.error("Failed to parse AI response as JSON: ", e);
  //       output = responseText; // If it's not JSON, treat it as plain text
  //     }

  //     if (output && output.blocks && Array.isArray(output.blocks)) {
  //       // Handle checkbox lists based on user input
  //       let isChecklist = userInput.toLowerCase().includes("checkbox") || userInput.toLowerCase().includes("to do");

  //       // Filter unsupported block types, including 'simple-input'
  //       const filteredBlocks = output.blocks
  //         .filter(block => block.type !== 'simple-input') // Remove 'simple-input' block type
  //         .map(block => {
  //           if (block.type === 'list' && isChecklist) {
  //             // Convert list block to checklist block
  //             return {
  //               type: 'checklist',
  //               data: {
  //                 items: block.data.items // Use the same items for the checklist
  //               }
  //             };
  //           }
  //           return block; // Keep other blocks as they are
  //         });

  //       const editorContent = {
  //         ...output,
  //         blocks: filteredBlocks // Set filtered blocks to the editor
  //       };

  //       // Set the filtered content to the editor
  //       setGenerateContent(editorContent);
  //     } else {
  //       console.warn("No valid content generated.");
  //     }
  //   } catch (e) {
  //     console.error("Failed to generate content: ", e);
  //   } finally {
  //     setLoading(false);
  //     setOpen(false);
  //   }
  // };

  const GenerateContent = async () => {
    setLoading(true);
    const prompt = "Generate content for editor.js in JSON for " + userInput;

    try {
      const result = await chatSession.sendMessage(prompt);
      const responseText = await result.response.text(); // Fetch raw response

      console.log("AI Response: ", responseText); // Log the AI response to check

      // Try to parse the response
      let output;
      try {
        output = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse AI response as JSON: ", e);
        output = responseText; // If it's not JSON, treat it as plain text
      }

      if (output && output.blocks && Array.isArray(output.blocks)) {
        // Handle checkbox lists based on user input
        let isChecklist = userInput.toLowerCase().includes("checkbox") || userInput.toLowerCase().includes("to do");

        // Filter unsupported block types, including 'simple-input'
        const filteredBlocks = output.blocks
          .filter(block => block.type !== 'simple-input') // Remove 'simple-input' block type
          .map(block => {
            if (block.type === 'list' && isChecklist) {
              // Convert list block to checklist block
              return {
                type: 'checklist',
                data: {
                  items: block.data.items // Use the same items for the checklist
                }
              };
            }

            // Handle the table block content properly as strings
            if (block.type === 'table' && block.data && Array.isArray(block.data.content)) {
              const sanitizedContent = block.data.content.map(row =>
                row.map(cell => typeof cell === 'object' ? JSON.stringify(cell) : String(cell))
              );

              return {
                ...block,
                data: {
                  ...block.data,
                  content: sanitizedContent // Update content with sanitized string data
                }
              };
            }

            return block; // Keep other blocks as they are
          });

        const editorContent = {
          ...output,
          blocks: filteredBlocks // Set filtered blocks to the editor
        };

        // Set the filtered content to the editor
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
              <h2 className='mt-3'>Whatever's on your mind</h2>
              <Input placeholder="Any ideas..." onChange={(e) => setUserInput(e?.target.value)} />
              <div className='mt-5 flex gap-5 justify-end'>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button
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
