
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  MagnifyingGlassIcon, 
  DocumentArrowUpIcon, 
  CpuChipIcon 
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fff5f7]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-xs font-bold uppercase tracking-widest mb-8 animate-bounce">
          <CpuChipIcon className="w-4 h-4" />
          <span>Next-Gen RAG Architecture</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
          Search Your Documents,<br />
          <span className="text-pink-500">Not the Internet.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl leading-relaxed mb-10">
          A secure, hallucination-free Semantic Search Engine that grounds every answer in your specific data using advanced vector embeddings.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/search" className="w-full sm:w-auto px-10 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl shadow-xl shadow-pink-200 transition-all hover:scale-105 active:scale-95 text-center">
            Start Searching
          </Link>
          <Link to="/about" className="w-full sm:w-auto px-10 py-4 bg-white text-gray-700 hover:bg-gray-50 font-bold rounded-2xl shadow-sm border border-pink-100 transition-all text-center">
            Learn More
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<ShieldCheckIcon className="w-8 h-8" />}
            title="Anti-Hallucination"
            description="Our system is hard-coded to refuse answering if the context isn't found in your documents."
          />
          <FeatureCard 
            icon={<MagnifyingGlassIcon className="w-8 h-8" />}
            title="Semantic Retrieval"
            description="Understands intent, not just keywords. Uses vector embeddings to find relevant concepts."
          />
          <FeatureCard 
            icon={<DocumentArrowUpIcon className="w-8 h-8" />}
            title="Document Grounding"
            description="Every response includes precise citations, mapping answers back to page and source."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-10 rounded-[2.5rem] border border-pink-50 shadow-sm hover:shadow-xl transition-all duration-300 group">
    <div className="w-16 h-16 bg-pink-50 text-pink-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </div>
);

export default Home;
