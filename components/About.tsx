
import React from 'react';
import { InformationCircleIcon, AcademicCapIcon, CodeBracketIcon, ServerStackIcon } from '@heroicons/react/24/outline';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-10 py-20 space-y-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-gray-800 tracking-tight">Project Documentation</h1>
        <p className="text-xl text-gray-500">Semantic Search Engine with Vector Databases (Hallucination-Free RAG)</p>
        <div className="w-20 h-1.5 bg-pink-400 rounded-full"></div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-pink-500">
            <AcademicCapIcon className="w-6 h-6" />
            <h2 className="text-xl font-bold">Academic Context</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Developed as a Final Year Engineering Project, this application addresses the critical challenge of 
            <strong> Large Language Model (LLM) hallucinations</strong> in enterprise environments. By implementing 
            a Retrieval-Augmented Generation (RAG) architecture, we bridge the gap between static AI knowledge 
            and private dynamic data.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-pink-500">
            <CodeBracketIcon className="w-6 h-6" />
            <h2 className="text-xl font-bold">The Tech Stack</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center"><span className="w-2 h-2 bg-pink-300 rounded-full mr-2"></span> <strong>Frontend:</strong> React, Tailwind CSS, Heroicons</li>
            <li className="flex items-center"><span className="w-2 h-2 bg-pink-300 rounded-full mr-2"></span> <strong>AI Engine:</strong> Gemini 3.0 Flash (Factual Reasoning)</li>
            <li className="flex items-center"><span className="w-2 h-2 bg-pink-300 rounded-full mr-2"></span> <strong>Vectorization:</strong> Simulated FAISS-style embeddings</li>
            <li className="flex items-center"><span className="w-2 h-2 bg-pink-300 rounded-full mr-2"></span> <strong>Architecture:</strong> Document-Grounded RAG</li>
          </ul>
        </div>
      </section>

      <section className="bg-white p-10 rounded-[3rem] border border-pink-100 shadow-sm space-y-8">
        <div className="flex items-center space-x-3 text-pink-500">
          <ServerStackIcon className="w-6 h-6" />
          <h2 className="text-xl font-bold">How the RAG Pipeline Works</h2>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <Step 
            number="01" 
            title="Document Ingestion" 
            desc="Users upload PDF, DOCX, or TXT files. The system cleans and normalizes the text content." 
          />
          <Step 
            number="02" 
            title="Chunking & Embedding" 
            desc="Text is broken into semantic chunks. Each chunk is converted into a multi-dimensional numerical vector." 
          />
          <Step 
            number="03" 
            title="Vector Similarity Search" 
            desc="When you ask a question, we search our vector database for chunks that are mathematically similar to your query." 
          />
          <Step 
            number="04" 
            title="Context-Bound Generation" 
            desc="The retrieved chunks are fed into Gemini as 'Grounded Context'. The AI is strictly instructed not to answer outside this box." 
          />
        </div>
      </section>

      <div className="bg-pink-50 p-8 rounded-3xl border border-pink-100 flex items-start space-x-4">
        <InformationCircleIcon className="w-6 h-6 text-pink-500 mt-1" />
        <div>
          <h4 className="font-bold text-pink-700">Strict Anti-Hallucination Rule</h4>
          <p className="text-sm text-pink-600 mt-1">
            The core objective of this project is correctness. If a query relevance score falls below the threshold, 
            the system explicitly refuses to answer rather than providing a guess.
          </p>
        </div>
      </div>
    </div>
  );
};

const Step: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
  <div className="flex items-start space-x-6 group">
    <div className="text-3xl font-black text-pink-100 group-hover:text-pink-200 transition-colors">{number}</div>
    <div>
      <h4 className="font-bold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default About;
