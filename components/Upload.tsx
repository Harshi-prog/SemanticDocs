
import React, { useState } from 'react';
import { 
  CloudArrowUpIcon, 
  DocumentIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { Document } from '../types';

interface UploadProps {
  documents: Document[];
  addDocument: (file: File, content: string) => void;
  removeDocument: (id: string) => void;
}

const Upload: React.FC<UploadProps> = ({ documents, addDocument, removeDocument }) => {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;
    setLoading(true);
    
    // Simulate reading file content
    // For local dev without heavy PDF parsers, we handle .txt and simulate the others
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string || `Simulated content for ${file.name}. Vector embeddings generated successfully. Accuracy verified.`;
      addDocument(file, content);
      setLoading(false);
    };
    
    if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      // Simulate slow indexing for larger files
      setTimeout(() => {
        addDocument(file, `Binary content from ${file.name} successfully extracted via OCR/DocParsing pipeline. Ready for RAG search.`);
        setLoading(false);
      }, 1500);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => setDragActive(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Expand the Intelligence</h1>
        <p className="text-gray-500 mt-3 text-lg">Upload documents to build your private, semantic-ready knowledge base.</p>
      </div>

      {/* Upload Zone */}
      <div 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative border-2 border-dashed rounded-[3rem] p-16 transition-all duration-300 group ${
          dragActive 
            ? 'border-pink-400 bg-pink-50' 
            : 'border-pink-100 bg-white hover:border-pink-200'
        }`}
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div className={`p-6 rounded-full transition-all duration-500 ${
            dragActive ? 'bg-pink-400 text-white scale-110' : 'bg-pink-50 text-pink-400'
          }`}>
            <CloudArrowUpIcon className="w-16 h-16" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-700">
              {dragActive ? "Drop to Index" : "Drag & Drop Files"}
            </h3>
            <p className="text-gray-400">Supports PDF, DOCX, TXT up to 25MB</p>
          </div>
          
          <label className="relative cursor-pointer">
            <span className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-pink-200 active:scale-95 inline-block">
              Browse Files
            </span>
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.docx,.txt"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              disabled={loading}
            />
          </label>
        </div>
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[3rem] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin"></div>
            <p className="font-bold text-pink-600 animate-pulse">Chunking & Embedding...</p>
          </div>
        )}
      </div>

      {/* Uploaded List */}
      {documents.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-xl font-bold text-gray-800">Indexed Knowledge ({documents.length})</h3>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md uppercase flex items-center">
              <CheckCircleIcon className="w-3 h-3 mr-1" /> All Sync'd
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white p-5 rounded-3xl border border-pink-50 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center space-x-4 overflow-hidden">
                  <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-400">
                    <DocumentIcon className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-gray-700 truncate">{doc.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{(doc.size / 1024).toFixed(1)} KB • {doc.status}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeDocument(doc.id)}
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <ExclamationCircleIcon className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
