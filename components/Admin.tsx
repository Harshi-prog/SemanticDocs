
import React, { useMemo } from 'react';
import { Document, AuditLog } from '../types';
import { 
  EyeIcon, 
  TrashIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ShieldCheckIcon,
  ChartPieIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface AdminProps {
  documents: Document[];
  auditLogs: AuditLog[];
  removeDocument: (id: string) => void;
}

const Admin: React.FC<AdminProps> = ({ documents, auditLogs, removeDocument }) => {
  const stats = useMemo(() => {
    const totalQueries = auditLogs.length;
    const refusals = auditLogs.filter(l => l.status === 'refused').length;
    const avgConf = totalQueries > 0 
      ? auditLogs.reduce((acc, l) => acc + l.confidence, 0) / totalQueries 
      : 0;

    return { totalQueries, refusals, avgConf };
  }, [auditLogs]);

  return (
    <div className="p-10 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Monitor system performance and manage search index.</p>
        </div>
        <div className="px-4 py-2 bg-pink-50 text-pink-600 rounded-xl border border-pink-100 text-sm font-semibold flex items-center">
          <ShieldCheckIcon className="w-4 h-4 mr-2" />
          System Health: Optimal
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Knowledge Base" 
          value={`${documents.length} Docs`} 
          icon={<DocumentMagnifyingGlassIcon className="w-6 h-6" />}
          subValue={`${(documents.reduce((acc, d) => acc + d.size, 0) / 1024).toFixed(1)} KB indexed`}
        />
        <StatCard 
          label="Retrieval Success" 
          value={`${((1 - (stats.refusals / (stats.totalQueries || 1))) * 100).toFixed(0)}%`} 
          icon={<CheckCircleIcon className="w-6 h-6" />}
          subValue={`${stats.refusals} queries lacked context`}
        />
        <StatCard 
          label="Avg Confidence" 
          value={`${(stats.avgConf * 100).toFixed(1)}%`} 
          icon={<ChartPieIcon className="w-6 h-6" />}
          subValue="Vector similarity mean"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Document Management */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Index Management</h2>
            <span className="text-xs font-bold text-pink-400 bg-pink-50 px-3 py-1 rounded-full uppercase">Live</span>
          </div>
          <div className="space-y-4">
            {documents.length === 0 ? (
              <p className="text-gray-400 text-center py-10 text-sm italic">No documents indexed yet.</p>
            ) : (
              documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-pink-50 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-pink-400 font-bold text-xs">
                      {doc.name.split('.').pop()?.toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700">{doc.name}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{new Date(doc.uploadedAt).toLocaleDateString()} • {doc.status}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => removeDocument(doc.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Retrieval Audit Logs</h2>
            <span className="text-xs font-bold text-gray-400 uppercase">Recent Activity</span>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
            {auditLogs.length === 0 ? (
              <p className="text-gray-400 text-center py-10 text-sm italic">No logs found.</p>
            ) : (
              auditLogs.map(log => (
                <div key={log.id} className="p-4 border border-gray-50 rounded-2xl hover:border-pink-100 transition-all bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-medium text-gray-700 truncate pr-4 flex-1">"{log.query}"</p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      log.status === 'answered' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-[10px] text-gray-400">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="flex items-center text-[10px] text-gray-400 font-mono">
                      Conf: {(log.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; icon: React.ReactNode; subValue: string }> = ({ label, value, icon, subValue }) => (
  <div className="glass p-6 rounded-[2rem] border border-pink-50 shadow-sm relative overflow-hidden group">
    <div className="absolute -right-4 -bottom-4 text-pink-50 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
      {React.cloneElement(icon as React.ReactElement, { className: 'w-24 h-24' })}
    </div>
    <div className="relative z-10">
      <div className="w-10 h-10 bg-pink-50 text-pink-400 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <h3 className="text-3xl font-bold text-gray-800 mt-1">{value}</h3>
      <p className="text-[10px] font-bold text-pink-300 uppercase mt-2 tracking-wider">{subValue}</p>
    </div>
  </div>
);

export default Admin;
