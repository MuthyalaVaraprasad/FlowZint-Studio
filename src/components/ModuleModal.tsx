import React from 'react';
import { X } from 'lucide-react';
import { AIAssistant } from './modules/AIAssistant';
import { TaskManager } from './modules/TaskManager';
import { DocumentHub } from './modules/DocumentHub';
import { EmailStudio } from './modules/EmailStudio';
import { MeetingAssistant } from './modules/MeetingAssistant';
import { CRM } from './modules/CRM';
import { WorkflowBuilder } from './modules/WorkflowBuilder';
import { Analytics } from './modules/Analytics';
import { SmartNotes } from './modules/SmartNotes';
import { AutomationCenter } from './modules/AutomationCenter';
import { AIDesignStudio } from './modules/AIDesignStudio';

interface ModuleModalProps {
  moduleId: string | null;
  moduleName: string;
  onClose: () => void;
  user?: {
    name: string;
    email: string;
    picture: string;
  };
  setUser?: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    picture: string;
  }>>;
}

export const ModuleModal: React.FC<ModuleModalProps> = ({ moduleId, moduleName, onClose, user, setUser }) => {
  if (!moduleId) return null;

  const renderContent = () => {
    const mockUser = user || { name: 'Admin', email: 'admin@flowzint.in', picture: '' };
    const mockSetUser = setUser || (() => {});

    switch (moduleId) {
      case '1': return <AIAssistant />;
      case '2': return <TaskManager />;
      case '3': return <DocumentHub />;
      case '4': return <EmailStudio />;
      case '5': return <MeetingAssistant />;
      case '6': return <CRM />;
      case '7': return <WorkflowBuilder />;
      case '8': return <Analytics />;
      case '9': return <SmartNotes />;
      case '10': return <AutomationCenter user={mockUser} setUser={mockSetUser} />;
      case '11': return <AIDesignStudio />;
      default:
        return <div className="text-center py-10 font-mono text-slate-500">Module workspace loading...</div>;
    }
  };

  const themeColorMap: Record<string, string> = {
    '1': 'border-purple-500/30 shadow-purple-500/10',
    '2': 'border-blue-500/30 shadow-blue-500/10',
    '3': 'border-green-500/30 shadow-green-500/10',
    '4': 'border-orange-500/30 shadow-orange-500/10',
    '5': 'border-fuchsia-500/30 shadow-fuchsia-500/10',
    '6': 'border-teal-500/30 shadow-teal-500/10',
    '7': 'border-rose-500/30 shadow-rose-500/10',
    '8': 'border-cyan-500/30 shadow-cyan-500/10',
    '9': 'border-pink-500/30 shadow-pink-500/10',
    '10': 'border-red-500/30 shadow-red-500/10',
    '11': 'border-fuchsia-500/30 shadow-fuchsia-500/10',
  };

  const activeBorder = themeColorMap[moduleId] || 'border-purple-500/30';

  return (
    <div 
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className={`glass w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl border flex flex-col ${activeBorder}`}
        style={{
          maxHeight: '90vh',
          height: '620px',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div 
          className="flex items-center justify-between px-5 py-4 bg-slate-900/80 border-b border-white/5"
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></div>
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {moduleName} WORKSPACE
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 bg-black/40">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
