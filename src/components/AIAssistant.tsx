import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { parseTransaction } from '../utils/transactionParser';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
}

interface AIAssistantProps {
  onClose: () => void;
}

export default function AIAssistant({ onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: "Hey there! 👋 I'm your money coach. Tell me about your spending or ask for financial advice!",
    sender: 'assistant'
  }]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addTransaction } = useTransactions();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Parse transaction from message
    const transaction = parseTransaction(inputText);
    if (transaction) {
      addTransaction(transaction);
    }

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      if (transaction) {
        if (transaction.type === 'income') {
          response = `🎉 Nice one! £${transaction.amount} added as ${transaction.category}. Keep that money flowing in!`;
        } else {
          response = `Hmm, spent £${transaction.amount} on ${transaction.category}? Well, at least you're being honest about it! 😏`;
        }
      } else {
        response = "I'm not quite sure what you mean. Try telling me about your spending or income in a clearer way!";
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: response,
        sender: 'assistant'
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b bg-purple-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-purple-500" />
          <div>
            <h3 className="font-medium text-gray-800">Money Coach</h3>
            <p className="text-xs text-gray-500">Your sassy financial friend</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-purple-100 rounded-lg transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-xl px-4 py-2 text-gray-800">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tell me about your spending..."
            className="flex-1 px-4 py-2 rounded-xl border focus:border-purple-400 
              focus:ring-2 focus:ring-purple-200 outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 
              transition-all hover:scale-105 active:scale-95 disabled:opacity-50
              disabled:hover:scale-100 disabled:hover:bg-purple-500"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}