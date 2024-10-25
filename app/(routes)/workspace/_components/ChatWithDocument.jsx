import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2Icon, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatSession } from '@/config/GoogleAIModel';

const ChatWithDocument = ({ documentContent }) => {
  const [open, setOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const extractTextFromResponse = (jsonResponse) => {
    try {
      const parsed = JSON.parse(jsonResponse);
      
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
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      return jsonResponse; 
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
      const formattedQuery = `Based on this document content: ${JSON.stringify(documentContent)}\n\nUser Question: ${currentQuery}\n\nPlease provide a clear and relevant answer based on the document content.`;

      const result = await chatSession.sendMessage(formattedQuery);
      const responseText = await result.response.text();
      
      const formattedResponse = extractTextFromResponse(responseText);

      setChatHistory(prev => [...prev, {
        type: 'ai',
        content: formattedResponse
      }]);
    } catch (error) {
      console.error("Chat response failed: ", error);
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
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2 text-sm">
        <MessageCircle className="w-4 h-4" /> Chat with Document
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Chat with Document</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-4 space-y-4 mb-4">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
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
            </ScrollArea>

            <form onSubmit={handleChatSubmit} className="flex items-center gap-2 p-4 border-t">
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