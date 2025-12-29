
export interface Document {
  id: string;
  name: string;
  content: string;
  type: string;
  uploadedAt: Date;
  size: number;
  status: 'indexed' | 'processing' | 'failed';
}

export interface Citation {
  docName: string;
  snippet: string;
  score: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  citations?: Citation[];
  confidence?: number;
  status?: 'success' | 'refused' | 'error';
  timestamp: Date;
}

export interface AuditLog {
  id: string;
  query: string;
  timestamp: Date;
  status: 'answered' | 'refused';
  confidence: number;
}

export type UserRole = 'USER';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}
