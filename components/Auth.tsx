
import React, { useState } from 'react';
import { User } from '../types';
import { ShieldCheckIcon, RocketLaunchIcon, EnvelopeIcon, KeyIcon, UserIcon } from '@heroicons/react/24/solid';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) return;
    
    // In a real app, this would be an API call
    // Here we simulate successful auth
    onLogin({ 
      id: Math.random().toString(36).substr(2, 9), 
      username, 
      email, 
      role: 'USER' 
    });
  };

  return (
    <div className="min-h-screen bg-[#fff5f7] flex items-center justify-center p-6">
      <div className="max-w-md w-full glass rounded-[3rem] p-10 shadow-2xl border border-pink-100 flex flex-col items-center">
        {/* Branding */}
        <div className="w-20 h-20 bg-pink-400 rounded-[2rem] flex items-center justify-center shadow-xl shadow-pink-200 mb-6 transform -rotate-6">
          <ShieldCheckIcon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-black text-gray-800 tracking-tight text-center">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-pink-400 font-medium text-sm mt-1">SemanticDocs Secure Gateway</p>

        <form onSubmit={handleSubmit} className="w-full mt-10 space-y-5">
          {isRegister && (
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4 mb-2 block">Username</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="janesmith"
                  className="w-full bg-white border border-pink-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 transition-all shadow-sm"
                  required
                />
                <UserIcon className="w-5 h-5 text-pink-300 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          {!isRegister && (
             <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4 mb-2 block">Username / Email</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="janesmith"
                  className="w-full bg-white border border-pink-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 transition-all shadow-sm"
                  required
                />
                <UserIcon className="w-5 h-5 text-pink-300 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          {isRegister && (
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4 mb-2 block">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full bg-white border border-pink-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 transition-all shadow-sm"
                  required
                />
                <EnvelopeIcon className="w-5 h-5 text-pink-300 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4 mb-2 block">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-pink-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 transition-all shadow-sm"
                required
              />
              <KeyIcon className="w-5 h-5 text-pink-300 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-pink-200 transition-all active:scale-95 flex items-center justify-center space-x-2 mt-4"
          >
            <RocketLaunchIcon className="w-6 h-6" />
            <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {isRegister ? 'Already have an account?' : 'New to SemanticDocs?'}
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="ml-2 text-pink-500 font-bold hover:underline"
            >
              {isRegister ? 'Sign In' : 'Register Now'}
            </button>
          </p>
        </div>

        <p className="mt-8 text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
          RAG Pipeline Optimized • Secure Authentication
        </p>
      </div>
    </div>
  );
};

export default Auth;
