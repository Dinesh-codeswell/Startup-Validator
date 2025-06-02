
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AIAssistant from './AIAssistant';
import { MessageCircle, Sparkles } from 'lucide-react';

const AIAssistantToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl transition-all duration-300 hover:scale-110 group"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-white" />
            <Sparkles className="w-3 h-3 text-white absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div className="absolute -top-12 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            AI Assistant
          </div>
        </Button>
      )}
      
      <AIAssistant
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isMinimized={isMinimized}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
      />
    </>
  );
};

export default AIAssistantToggle;
