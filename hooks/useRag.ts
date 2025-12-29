
import { useState, useCallback, useEffect } from 'react';
import { Document, ChatMessage, AuditLog } from '../types';
import { generateRagAnswer } from '../services/geminiService';

export const useRag = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Persistence
  useEffect(() => {
    const savedDocs = localStorage.getItem('semantic_docs');
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    }
    const savedLogs = localStorage.getItem('semantic_logs');
    if (savedLogs) {
      setAuditLogs(JSON.parse(savedLogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('semantic_docs', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('semantic_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const addDocument = useCallback((file: File, content: string) => {
    const newDoc: Document = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      content,
      type: file.type,
      uploadedAt: new Date(),
      size: file.size,
      status: 'indexed',
    };
    setDocuments(prev => [...prev, newDoc]);
  }, []);

  const removeDocument = useCallback((id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  }, []);

  const askQuestion = useCallback(async (question: string) => {
    if (!question.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);

    // Simple context gathering: Combine all documents (simulating retrieval)
    // In large systems, we'd use vector search to pick top K chunks
    const context = documents
      .map(d => `Document: ${d.name}\nContent: ${d.content}`)
      .join('\n\n---\n\n');

    const result = await generateRagAnswer(question, context);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: result.answer,
      confidence: result.confidence,
      status: result.isRefusal ? 'refused' : 'success',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMsg]);
    setIsProcessing(false);

    // Log the event
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      query: question,
      timestamp: new Date(),
      status: result.isRefusal ? 'refused' : 'answered',
      confidence: result.confidence,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  }, [documents]);

  const clearChat = () => setMessages([]);

  return {
    documents,
    messages,
    auditLogs,
    isProcessing,
    addDocument,
    removeDocument,
    askQuestion,
    clearChat
  };
};
