
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Document } from '../types';
import { 
  PaperAirplaneIcon, 
  TrashIcon, 
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';

interface ChatProps {
  messages: ChatMessage[];
  isProcessing: boolean;
  askQuestion: (q: string) => void;
  clearChat: () => void;
  documents: Document[];
}

const Chat: React.FC<ChatProps> = ({ messages, isProcessing, askQuestion, clearChat, documents }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    askQuestion(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Semantic Search</h1>
          <p className="text-gray-500 text-sm mt-1 flex items-center">
            <InformationCircleIcon className="w-4 h-4 mr-1 text-pink-400" />
            Answers are grounded strictly in your {documents.length} uploaded document(s).
          </p>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-colors"
          title="Clear Chat"
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 px-2 custom-scrollbar pb-8">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 animate-pulse">
              <ChatBubbleBottomCenterTextIcon className="w-10 h-10" />
            </div>
            <div className="max-w-xs">
              <h3 className="text-lg font-semibold text-gray-700">Start exploring your docs</h3>
              <p className="text-sm text-gray-400 mt-1">Ask a question about your uploaded PDF, Docx, or TXT files.</p>
            </div>
            {documents.length === 0 && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-2xl text-orange-700 text-sm max-w-sm">
                <strong>Wait!</strong> You haven't uploaded any documents yet. Head to the "Upload Docs" tab first.
              </div>
            )}
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-3xl p-5 shadow-sm ${
                m.role === 'user' 
                  ? 'bg-pink-500 text-white rounded-tr-none' 
                  : 'bg-white border border-pink-100 text-gray-800 rounded-tl-none'
              }`}>
                {m.role === 'assistant' && (
                  <div className="flex items-center space-x-2 mb-3">
                    {m.status === 'refused' ? (
                      <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">
                        <ExclamationTriangleIcon className="w-3 h-3 mr-1" /> Refusal
                      </span>
                    ) : (
                      <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircleIcon className="w-3 h-3 mr-1" /> Grounded Result
                      </span>
                    )}
                    {m.confidence !== undefined && (
                      <span className="text-[10px] text-gray-400 font-mono">
                        Conf: {(m.confidence * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                )}
                
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {renderMessageText(m.text)}
                </p>

                {m.role === 'assistant' && m.status === 'success' && (
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-2">Sources Found</p>
                    <div className="flex flex-wrap gap-2">
                       {/* Mock dynamic citations from message parsing */}
                       {extractCitations(m.text).map((c, i) => (
                         <div key={i} className="px-2 py-1 bg-pink-50 text-pink-600 rounded-lg text-[10px] font-medium border border-pink-100 flex items-center">
                           <InformationCircleIcon className="w-3 h-3 mr-1" /> {c}
                         </div>
                       ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white border border-pink-100 rounded-3xl rounded-tl-none p-5 shadow-sm space-y-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <p className="text-[10px] text-pink-400 font-medium animate-pulse">Scanning vector space...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="relative glass p-2 rounded-[2rem] shadow-xl border border-pink-100 ring-4 ring-pink-50/50">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing || documents.length === 0}
            placeholder={documents.length === 0 ? "Upload documents to start search..." : "Ask me anything about your documents..."}
            className="w-full bg-transparent pl-6 pr-16 py-4 rounded-full focus:outline-none text-gray-700 placeholder:text-gray-400 disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-200 text-white rounded-full transition-all shadow-md active:scale-95"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center mt-4 text-[10px] text-gray-400">
          This system uses RAG architecture and Gemini for non-hallucinatory retrieval.
        </p>
      </form>
    </div>
  );
};

// Helper to highlight keywords (mock implementation)
const renderMessageText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-pink-600 bg-pink-50 px-1 rounded mx-0.5">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const extractCitations = (text: string) => {
  const matches = text.match(/\[(.*?)\]/g);
  if (!matches) return ["General Context"];
  return Array.from(new Set(matches.map(m => m.slice(1, -1))));
};

export default Chat;

// Simple internal icon component for empty state
function ChatBubbleBottomCenterTextIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
  );
}
