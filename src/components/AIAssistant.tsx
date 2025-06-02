import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  X, 
  Minimize2, 
  Maximize2,
  Sparkles,
  HelpCircle,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ 
  isOpen, 
  onClose, 
  isMinimized, 
  onToggleMinimize 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant here to help you navigate InnovateHub. I can help you create startup ideas, understand features, or answer any questions about the platform. How can I assist you today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: Lightbulb, text: "Create new idea", action: "Help me create a new startup idea" },
    { icon: TrendingUp, text: "Market analysis", action: "How do I analyze market trends?" },
    { icon: HelpCircle, text: "Platform guide", action: "Show me how to use this platform" },
    { icon: MessageCircle, text: "Get feedback", action: "How do I get feedback on my ideas?" }
  ];

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Simulate AI response - In production, this would call your AI service
      const aiResponse = await generateAIResponse(input);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Save chat session to database
      if (user) {
        const { error } = await supabase
          .from('ai_chat_sessions')
          .insert({
            user_id: user.id,
            session_title: userMessage.content.substring(0, 50) + '...',
            messages: JSON.stringify([...messages, userMessage, assistantMessage]),
            context_type: 'general'
          });

        if (error) {
          console.error('Error saving chat session:', error);
        }
      }

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get AI response. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAIResponse = async (userInput: string): Promise<string> => {
    // Simulate AI response based on input
    const input = userInput.toLowerCase();
    
    if (input.includes('create') && input.includes('idea')) {
      return "To create a new startup idea, navigate to the 'Submit Idea' page from the menu or click the '+' button on your Ideas page. I'll guide you through filling out details like your target audience, problem solved, and industry focus. Would you like me to walk you through the process step by step?";
    }
    
    if (input.includes('market') || input.includes('analysis')) {
      return "Great question! InnovateHub provides market analysis through our Analytics dashboard. You can find trending industries, success patterns, and market gaps in the 'Insights' tab. I can also help you analyze your specific idea's market potential. What industry are you interested in?";
    }
    
    if (input.includes('platform') || input.includes('how') || input.includes('use')) {
      return "I'd be happy to guide you through InnovateHub! Here are the main features:\n\n🏠 Dashboard - Your overview and analytics\n💡 Ideas - Create and manage your startup ideas\n🔍 Explore - Browse case studies and success stories\n💬 Feedback - Get community insights\n\nWhat specific feature would you like to learn about?";
    }
    
    if (input.includes('feedback')) {
      return "Getting feedback is crucial for startup success! Here's how:\n\n1. Submit your idea with detailed information\n2. Engage with the community in the social feed\n3. Share your ideas for peer review\n4. Use our AI-powered validation system\n\nWould you like help submitting your first idea for feedback?";
    }
    
    return "I understand you're asking about: " + userInput + ". While I'm here to help with InnovateHub-related questions, I can assist you with navigating the platform, creating ideas, understanding features, or getting started. Is there something specific about the platform I can help you with?";
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`bg-white border shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">AI Assistant</CardTitle>
              {!isMinimized && (
                <p className="text-xs text-blue-100">Here to help you navigate</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMinimize}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[540px]">
            {/* Quick Actions */}
            <div className="p-4 border-b bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickAction(action.action)}
                    className="h-auto p-2 justify-start text-left hover:bg-blue-50"
                  >
                    <action.icon className="w-3 h-3 mr-2 text-blue-600" />
                    <span className="text-xs truncate">{action.text}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about InnovateHub..."
                  className="flex-1 text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={loading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AIAssistant;
