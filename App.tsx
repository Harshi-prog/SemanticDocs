
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useRag } from './hooks/useRag';
import Chat from './components/Chat';
import Home from './components/Home';
import About from './components/About';
import Auth from './components/Auth';
import Upload from './components/Upload';
import { User } from './types';
import { 
  ChatBubbleBottomCenterTextIcon, 
  DocumentPlusIcon, 
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  HomeIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('semantic_user');
    return saved ? JSON.parse(saved) : null;
  });
  const rag = useRag();

  useEffect(() => {
    if (user) {
      localStorage.setItem('semantic_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('semantic_user');
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <div className="flex h-screen bg-[#fff5f7]">
        {/* Sidebar */}
        <nav className="w-64 glass border-r border-pink-100 flex flex-col p-6 space-y-8 shrink-0">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-10 h-10 bg-pink-400 rounded-xl flex items-center justify-center shadow-lg shadow-pink-200">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800 tracking-tight">SemanticDocs</span>
          </div>

          <div className="flex-1 space-y-2">
            <SidebarItem to="/" icon={<HomeIcon className="w-5 h-5" />} label="Home" />
            <SidebarItem to="/search" icon={<ChatBubbleBottomCenterTextIcon className="w-5 h-5" />} label="Search Engine" />
            <SidebarItem to="/upload" icon={<DocumentPlusIcon className="w-5 h-5" />} label="Upload Docs" />
            <SidebarItem to="/about" icon={<InformationCircleIcon className="w-5 h-5" />} label="About Project" />
          </div>

          <div className="pt-6 border-t border-pink-100">
            {user ? (
              <>
                <div className="flex items-center space-x-3 px-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-semibold border border-pink-200">
                    {user.username[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium text-gray-700 leading-none truncate">{user.username}</span>
                    <span className="text-[10px] text-pink-400 font-bold uppercase mt-1">Authorized</span>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-2 w-full text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-200"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="flex items-center justify-center space-x-2 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-bold transition-all shadow-md shadow-pink-100"
              >
                <span>Login</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto custom-scrollbar">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={user ? <Navigate to="/search" /> : <Auth onLogin={setUser} />} />
            <Route path="/search" element={user ? <Chat {...rag} /> : <Navigate to="/login" />} />
            <Route path="/upload" element={user ? <Upload {...rag} /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

const SidebarItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const active = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
        active 
          ? 'bg-pink-400 text-white shadow-lg shadow-pink-200' 
          : 'text-gray-500 hover:bg-pink-50 hover:text-pink-600'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
};

export default App;
