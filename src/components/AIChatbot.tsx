
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, X, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: 'Hello! I\'m your TravelGo assistant. How can I help with your travel plans today?'
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          prompt: "You are a helpful travel assistant for TravelGo. Help users plan their trips, suggest destinations, provide transport options, and answer travel-related questions. Be friendly and concise."
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      
      // Add AI response to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || "I'm sorry, I couldn't process your request at the moment."
      }]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to connect to the AI assistant. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 flex items-center justify-center shadow-lg bg-travel-500 hover:bg-travel-600 text-white"
        aria-label="Open chat assistant"
      >
        <MessageCircle size={24} />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] shadow-xl flex flex-col rounded-lg overflow-hidden z-50">
      {/* Header */}
      <div className="bg-travel-500 text-white p-3 flex justify-between items-center">
        <div className="font-medium">TravelGo Assistant</div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 p-0 rounded-full text-white hover:bg-travel-600"
        >
          <X size={18} />
        </Button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-3 max-w-[85%] ${
              message.role === 'user' 
                ? 'ml-auto bg-travel-100 text-gray-800' 
                : 'mr-auto bg-white text-gray-800'
            } rounded-lg p-3 shadow-sm`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="mr-auto bg-white text-gray-800 rounded-lg p-3 shadow-sm flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '600ms'}}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-3 bg-white border-t">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about travel plans..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()}
            className="bg-travel-500 hover:bg-travel-600"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIChatbot;
