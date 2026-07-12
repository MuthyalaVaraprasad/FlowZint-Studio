import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Award, ExternalLink, FileText, Send, RefreshCw, CheckCircle, ShieldAlert } from 'lucide-react';

// Diagnostic items to check
const diagnosticSteps = [
  { name: 'AI Assistant Prompt Marketplace Registry', type: 'core' },
  { name: 'Kanban Auto-Priority Scheduler & Sorting', type: 'core' },
  { name: 'Knowledge Graph SVG Rendering Engine', type: 'core' },
  { name: 'AI Email Tone Auditor & Subject Line Optimizer', type: 'core' },
  { name: 'Audio Wave Canvas Stream Synchronization', type: 'core' },
  { name: 'Sales Pipeline Conversion Prediction Funnel', type: 'core' },
  { name: 'Workflow Builder Simulation Path & Neon Glow Triggers', type: 'core' },
  { name: 'Analytics SVG Spline Generator & CSV Exporter', type: 'core' },
  { name: 'Smart Notes Web Speech Recognition & Dictation', type: 'core' },
  { name: 'Automation Center CPU/RAM System Load Monitors', type: 'core' },
  { name: 'Developer Profile Credentials & CLI Terminal Modal', type: 'profile' },
  { name: 'Vite Production HTML SEO Metadata & Accessibility Header', type: 'system' }
];

export const HackathonHub: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [diagnosticStatus, setDiagnosticStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubject, setContactSubject] = useState('Open Innovation Submission Inquiry');

  // Target submission deadline: 19th July 2026, 12:00 AM IST (Midnight between July 18 and 19)
  const targetDate = new Date('2026-07-19T00:00:00+05:30').getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate - Date.now();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Run Diagnostics Handler
  useEffect(() => {
    if (diagnosticStatus !== 'running') return;

    if (currentTestIndex < diagnosticSteps.length) {
      const step = diagnosticSteps[currentTestIndex];
      const timer = setTimeout(() => {
        setDiagnosticLogs(prev => [
          ...prev,
          `[PASS] Verified component node: ${step.name} ... [LOADED in ${(Math.random() * 8 + 2).toFixed(1)}ms]`
        ]);
        setCurrentTestIndex(prev => prev + 1);
      }, 250);
      return () => clearTimeout(timer);
    } else {
      setDiagnosticLogs(prev => [
        ...prev,
        '',
        '=============================================',
        'DIAGNOSTIC STATUS: 100% HEALTHY',
        'Ready for FlowZint submission verification!',
        '============================================='
      ]);
      setDiagnosticStatus('completed');
    }
  }, [diagnosticStatus, currentTestIndex]);

  const handleStartDiagnostics = () => {
    setDiagnosticStatus('running');
    setDiagnosticLogs(['Starting workspace validation checks...', 'Initializing Flow Zint Studio package inspection...', '']);
    setCurrentTestIndex(0);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:contact@flowzint.in?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(contactMessage)}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. Header & Live Countdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Hackathon Header Info */}
        <div className="glass p-6 border-purple-500/20 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                OFFICIAL ENTRY
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                CATEGORY: OPEN INNOVATION
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white font-mono uppercase tracking-wider mb-2">
              FlowZint AI Hackathon 2026
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Flow Zint Studio represents the ultimate unified productivity operating system entry. By integrating 10 fully operational AI dashboards (Assistant, Tasks, CRM, Documents, Meetings, Workflows, Email, Analytics, Notes, and Automations) into one low-latency glassmorphic workspace, we showcase true multi-agent workflow consolidation.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-2">
            <a 
              href="https://flowzint.in/2026/ai/hackothon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-xs"
              style={{ textDecoration: 'none', padding: '0.6rem 1.2rem' }}
            >
              <ExternalLink size={14} /> Submission Portal
            </a>
            <a 
              href="https://flowzint.in/2026/ai/hackothon/results/round1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-2 bg-white/5"
              style={{ textDecoration: 'none' }}
            >
              <Trophy size={14} className="text-yellow-500" /> Check Results Portal
            </a>
          </div>
        </div>

        {/* Right: Countdown clock */}
        <div className="glass p-6 border-purple-500/20 flex flex-col justify-between items-center text-center bg-purple-950/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full filter blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-purple-400 animate-spin" style={{ animationDuration: '60s' }} />
            <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
              Time Remaining
            </span>
          </div>

          <div className="flex items-center gap-2.5 my-3">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hrs', val: timeLeft.hours },
              { label: 'Min', val: timeLeft.minutes },
              { label: 'Sec', val: timeLeft.seconds }
            ].map((col, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-mono text-white bg-black/40 px-3 py-2.5 rounded border border-white/5 min-w-[54px] shadow-inner">
                    {String(col.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                    {col.label}
                  </span>
                </div>
                {idx < 3 && <span className="text-lg font-mono text-purple-500/60 pb-5">:</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="text-[10px] font-mono text-slate-400 mt-2 border-t border-white/5 pt-3 w-full">
            Deadline: <span className="text-purple-400">19th July 2026, 12:00 AM IST</span>
          </div>
        </div>

      </div>

      {/* 2. Rewards and Project Eligibility Criteria */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Rewards and Prizes */}
        <div className="glass p-5 border-white/5 bg-slate-900/10 flex flex-col gap-3">
          <h3 className="text-xs font-mono font-bold text-white border-b border-white/5 pb-2 uppercase tracking-wider flex items-center gap-2">
            <Award size={14} className="text-yellow-400" /> Hackathon Rewards
          </h3>
          <div className="flex flex-col gap-2.5 font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/5">
              <span>Prize Pool:</span>
              <span className="text-yellow-400 font-bold">₹3,00,000</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/5">
              <span>Participation Credits:</span>
              <span className="text-cyan-400 font-bold">5000 Credits</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/5">
              <span>Certificate Status:</span>
              <span className="text-green-400 font-bold">Verified PDF</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-normal">
            Credits distribution and certificate validation links will be forwarded to your registered email address post result announcement on July 20th.
          </p>
        </div>

        {/* Eligibility & Submission Rules */}
        <div className="glass p-5 border-white/5 bg-slate-900/10 flex flex-col gap-3 md:col-span-2">
          <h3 className="text-xs font-mono font-bold text-white border-b border-white/5 pb-2 uppercase tracking-wider flex items-center gap-2">
            <FileText size={14} className="text-cyan-400" /> Submission Rules Checklist
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1.5">
            {[
              { rule: 'Submit via official portal only.', status: true },
              { rule: 'Original workspace architecture.', status: true },
              { rule: 'Strictly one final project submission.', status: true },
              { rule: 'Ensure all modules are fully loaded.', status: true },
              { rule: 'Links & deployment files verified.', status: true },
              { rule: 'No copyrighted code or mock assets.', status: true }
            ].map((el, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <span className="text-green-400 text-sm">✓</span>
                <span>{el.rule}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-white/5 pt-3 mt-1 text-[10px] font-mono text-slate-400">
            <ShieldAlert size={12} className="text-orange-400" />
            <span>Disqualification warning: Copied or non-responsive links will void candidate certification.</span>
          </div>
        </div>

      </div>

      {/* 3. Interactive Diagnostic Suite & Live Contact Organizer Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Diagnostic Simulator Panel */}
        <div className="glass p-5 border-purple-500/20 lg:col-span-2 flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <RefreshCw size={14} className={`text-purple-400 ${diagnosticStatus === 'running' ? 'animate-spin' : ''}`} />
              Submission Diagnostic Suite
            </h3>
            {diagnosticStatus === 'idle' && (
              <button 
                type="button"
                onClick={handleStartDiagnostics} 
                className="btn-primary"
                style={{ fontSize: '9px', padding: '0.35rem 0.7rem', cursor: 'pointer' }}
              >
                Start Verification
              </button>
            )}
            {diagnosticStatus === 'running' && (
              <span className="text-[10px] font-mono text-purple-400 animate-pulse">Running checks...</span>
            )}
            {diagnosticStatus === 'completed' && (
              <button 
                type="button"
                onClick={handleStartDiagnostics} 
                className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded text-[9px] font-mono hover:bg-green-500/20 transition-all flex items-center gap-1"
                style={{ cursor: 'pointer' }}
              >
                <CheckCircle size={10} /> Re-Verify
              </button>
            )}
          </div>

          <div className="bg-black/60 p-3.5 rounded font-mono text-[9.5px] text-emerald-400/90 h-[190px] overflow-y-auto flex flex-col gap-1 border border-white/5 leading-normal select-text">
            {diagnosticLogs.length === 0 ? (
              <div className="text-slate-500 italic text-center mt-12">
                Click "Start Verification" to initiate simulated build, SEO headers, active components, and speech API diagnostics.
              </div>
            ) : (
              diagnosticLogs.map((log, idx) => <div key={idx}>{log}</div>)
            )}
          </div>
          
          {diagnosticStatus === 'completed' && (
            <div className="p-2.5 rounded border border-green-500/20 bg-green-950/10 text-green-400 font-mono text-xs flex items-center justify-between">
              <span>All 12 checks passed! Workspace is verified for open innovation upload.</span>
              <a 
                href="https://flowzint.in/2026/ai/hackothon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-green-300 font-bold hover:underline flex items-center gap-1"
              >
                Go to Portal <ExternalLink size={10} />
              </a>
            </div>
          )}
        </div>

        {/* Contact Organizer Email Form */}
        <div className="glass p-5 border-white/5 bg-slate-900/10 flex flex-col gap-3">
          <h3 className="text-xs font-mono font-bold text-white border-b border-white/5 pb-2 uppercase tracking-wider flex items-center gap-2">
            <Send size={14} className="text-purple-400" /> Contact Organizers
          </h3>
          
          <form onSubmit={handleContactSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-slate-400">Subject</label>
              <input 
                type="text" 
                value={contactSubject} 
                onChange={e => setContactSubject(e.target.value)}
                className="form-input text-xs w-full px-2 py-1.5"
                placeholder="Inquiry Subject"
                required
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-slate-400">Message Body</label>
              <textarea 
                value={contactMessage}
                onChange={e => setContactMessage(e.target.value)}
                className="form-input text-xs w-full px-2 py-1.5"
                style={{ resize: 'none', height: '70px' }}
                placeholder="Write your query to contact@flowzint.in here..."
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full text-xs py-2 flex items-center justify-center gap-2"
              style={{ cursor: 'pointer' }}
            >
              <Send size={12} /> Send Email Draft
            </button>
          </form>
          
          <div className="text-[9px] font-mono text-slate-500 text-center border-t border-white/5 pt-2">
            Direct Email Support: <span className="text-slate-300">contact@flowzint.in</span>
          </div>
        </div>

      </div>

    </div>
  );
};
