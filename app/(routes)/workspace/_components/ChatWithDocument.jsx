import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2Icon, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatSession } from '@/config/GoogleAIModel';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const ChatWithDocument = ({ documentContent }) => {
  const [open, setOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const extractTextFromResponse = (response) => {
    try {
      const parsed = JSON.parse(response);
      return parsed.answer || parsed.content || JSON.stringify(parsed, null, 2);
    } catch (error) {
      return response;
    }
  };

  const formatDocumentContent = (content) => {
    if (typeof content === 'string') {
      return content;
    }
    try {
      if (Array.isArray(content)) {
        return content.map(doc => {
          if (typeof doc === 'string') return doc;
          return JSON.stringify(doc, null, 2);
        }).join('\n\n');
      }
      return JSON.stringify(content, null, 2);
    } catch (error) {
      return String(content);
    }
  };

  const handleChatSubmit = async (e) => {
    e?.preventDefault();

    if (!userQuery.trim() || loading) return;

    setLoading(true);
    const currentQuery = userQuery;
    setUserQuery('');

    setChatHistory(prev => [...prev, { type: 'user', content: currentQuery }]);

    try {
      const formattedContent = formatDocumentContent(documentContent);
      const formattedQuery = `Context: Here is the document content to analyze: ${formattedContent}
                              Question: ${currentQuery}
                              Unless specified, this is a draft. Keep things shortish. Do not add any supplementary text, as everything you say will be placed into a document. If you're confused however, it's okay to ask a user for info. Don't add bold styling to headings. Don't mention anything about Editor.js and please provide your answer in the following JSON format:
                              {
                                  "answer": "Your detailed answer here",
                                  "content": "Any additional content or explanations"
                              }
                              `;

      const result = await chatSession.sendMessage(formattedQuery);
      const responseText = await result.response.text();
      const formattedResponse = extractTextFromResponse(responseText);

      setChatHistory(prev => [...prev, {
        type: 'ai',
        content: formattedResponse
      }]);
    } catch (error) {
      setChatHistory(prev => [...prev, {
        type: 'error',
        content: 'Sorry, there was an error processing your request. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit();
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="flex gap-2 text-sm" onClick={() => setOpen(true)}>
              <MessageCircle className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Chat with Document</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Chat with Document</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-[calc(80vh-8rem)]">
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 mb-4">
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-4'
                        : message.type === 'error'
                          ? 'bg-destructive text-destructive-foreground'
                          : 'bg-muted'
                        }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </ScrollArea>

            <form onSubmit={handleChatSubmit} className="flex items-center gap-2 p-4 border-t bg-background">
              <Input
                placeholder="Ask something about the document..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading || !userQuery.trim()} className="min-w-[75px]">
                {loading ? <Loader2Icon className="animate-spin w-5 h-5" /> : 'Ask'}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatWithDocument;