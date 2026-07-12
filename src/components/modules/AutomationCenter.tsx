import React, { useState, useEffect } from 'react';
import { Settings, Cpu, Database, Sparkles, Activity, User, Upload } from 'lucide-react';

interface BackupRule {
  id: string;
  name: string;
  schedule: string;
  target: string;
  status: 'active' | 'paused';
}

interface AutomationCenterProps {
  user: {
    name: string;
    email: string;
    picture: string;
  };
  setUser: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    picture: string;
  }>>;
}

const features = [
  "AI Workflow Templates", "Backup Automation", "Cloud Synchronization", "Notification Rules",
  "API Automation", "AI Script Generator", "File Synchronization", "Event Monitoring",
  "Smart Alerts", "Automation Logs", "Error Recovery", "Performance Dashboard",
  "AI Maintenance Scheduler", "Auto Cleanup", "Storage Optimization", "AI Resource Monitoring",
  "Security Automation", "Compliance Checks", "Automation Marketplace", "Custom Automation Builder",
  "Custom Cron Scheduler", "API Webhook Listener", "Log Retention Policy", "Resource Throttle Rules",
  "Automation Dry-Run Test", "Multi-Cloud Sync Bridge", "Database Auto-Index Scan", "SSL Certificate Monitor",
  "Docker Node Sync Alert", "Encryption Key Rotator"
];

export const AutomationCenter: React.FC<AutomationCenterProps> = ({ user, setUser }) => {
  const [rules, setRules] = useState<BackupRule[]>([
    { id: '1', name: 'Database Cloud Sync', schedule: 'Every 5 mins', target: 'MongoDB Cluster A', status: 'active' },
    { id: '2', name: 'File Automation cleanup', schedule: 'Daily at 02:00 AM', target: 'Temporary Uploads Directory', status: 'active' },
    { id: '3', name: 'Security Audit Scan', schedule: 'Weekly on Sundays', target: 'Core Session API Keys', status: 'paused' }
  ]);
  const [logs, setLogs] = useState<string[]>([
    '[15:20:00] Cloud Sync started successfully.',
    '[15:20:02] Synced 12 new document index tables.',
    '[15:20:03] Session connection verify: PASS.',
    '[15:25:00] Cloud Sync started successfully.',
    '[15:25:01] Database clean flags checked.'
  ]);

  const [cpuUsage, setCpuUsage] = useState<number[]>([15, 20, 18, 30, 25, 45, 35, 40, 28, 32]);
  const [ramUsage, setRamUsage] = useState<number[]>([42, 45, 43, 44, 46, 45, 48, 47, 49, 48]);
  const [featureAlert, setFeatureAlert] = useState<string | null>(null);

  const [scriptLog, setScriptLog] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser(prev => ({ ...prev, picture: reader.result as string }));
      setFeatureAlert("Profile photo updated successfully!");
      setTimeout(() => setFeatureAlert(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage(prev => {
        const next = [...prev.slice(1)];
        const newVal = Math.max(10, Math.min(95, prev[prev.length - 1] + (Math.random() - 0.5) * 15));
        next.push(Math.round(newVal));
        return next;
      });

      setRamUsage(prev => {
        const next = [...prev.slice(1)];
        const newVal = Math.max(30, Math.min(90, prev[prev.length - 1] + (Math.random() - 0.5) * 5));
        next.push(Math.round(newVal));
        return next;
      });

      if (Math.random() > 0.7) {
        const now = new Date().toLocaleTimeString();
        const templates = [
          'Resource audit check: OK.',
          'Cloud sync completed in 320ms.',
          'API webhook status returned 200.',
          'Warning: Memory threshold reached 48%.'
        ];
        const log = `[${now}] ${templates[Math.floor(Math.random() * templates.length)]}`;
        setLogs(prev => [...prev.slice(-8), log]);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'active' ? 'paused' : 'active' } : r));
  };

  const triggerFeature = (feat: string) => {
    setFeatureAlert(`Feature Simulated: "${feat}". Processing state update...`);

    if (feat === "AI Script Generator") {
      setScriptLog(`#!/bin/bash\n# Flow Zint Auto Backup\nmongodump --uri="mongodb://localhost:27017/flow_zint"\naws s3 cp /dump s3://flowzint-backups/ --recursive`);
    } else if (feat === "Compliance Checks") {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] COMPLIANCE SECURITY AUDIT: PASS (HIPAA/GDPR)`]);
    } else if (feat === "Auto Cleanup") {
      setLogs([]);
      setFeatureAlert("Execution logs cleared. Temporary upload directories purged.");
    }

    setTimeout(() => setFeatureAlert(null), 3000);
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Main Automation App */}
      <div className="w-full flex flex-col gap-4 text-slate-200">
        {featureAlert && (
          <div className="bg-red-950/80 border border-red-500/30 p-2 text-center text-xs font-mono text-red-300 flex items-center justify-center gap-2 animate-bounce">
            <Activity size={14} className="animate-spin" />
            {featureAlert}
          </div>
        )}

        {scriptLog && (
          <div className="glass p-4 border-red-500/30 bg-red-950/10 flex flex-col gap-2.5 animate-float font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h4 className="text-[10px] font-bold text-red-400 uppercase">💻 AI Generated Bash Script</h4>
              <button type="button" onClick={() => setScriptLog(null)} className="text-[10px] text-slate-500 hover:text-white">Dismiss</button>
            </div>
            <pre className="p-2.5 rounded bg-black/45 text-[10px] text-emerald-400 overflow-x-auto leading-relaxed">
              {scriptLog}
            </pre>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Scheduled Automation lists */}
          <div className="glass p-4 border-white/5 bg-slate-900/10 flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Settings className="text-red-400" size={16} />
              <span className="font-mono text-xs font-bold text-white uppercase">AUTOMATION RULES</span>
            </div>

            <div className="flex-grow flex flex-col gap-3 overflow-y-auto max-h-[160px]">
              {rules.map(rule => (
                <div 
                  key={rule.id}
                  className="p-3 rounded-lg border bg-slate-900/40 border-white/5 flex justify-between items-center gap-3"
                >
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-xs font-bold text-white font-mono">{rule.name}</span>
                    <span className="text-[10px] text-slate-400">{rule.schedule} • Target: {rule.target}</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => toggleRule(rule.id)}
                    className={`px-3 py-1 rounded text-[10px] font-mono border capitalize transition-all ${
                      rule.status === 'active' 
                        ? 'bg-red-950/20 text-red-400 border-red-500/30' 
                        : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {rule.status}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Live system resources CPU/RAM monitors */}
          <div className="glass p-4 border-white/5 bg-slate-900/15 flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Cpu className="text-red-400" size={16} />
              <span className="font-mono text-xs font-bold text-white uppercase">LIVE SERVER RESOURCE MONITOR</span>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-grow">
              <div className="bg-black/45 p-3 rounded-lg border border-white/5 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>CPU LOADING</span>
                  <span className="text-red-400 font-bold">{cpuUsage[cpuUsage.length - 1]}%</span>
                </div>
                <svg className="w-full h-16 mt-2" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                    points={cpuUsage.map((val, i) => `${(i / (cpuUsage.length - 1)) * 100},${40 - (val / 100) * 35}`).join(' ')}
                  />
                </svg>
              </div>

              <div className="bg-black/45 p-3 rounded-lg border border-white/5 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>RAM ALLOCATION</span>
                  <span className="text-cyan-400 font-bold">{ramUsage[ramUsage.length - 1]}%</span>
                </div>
                <svg className="w-full h-16 mt-2" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="1.5"
                    points={ramUsage.map((val, i) => `${(i / (ramUsage.length - 1)) * 100},${40 - (val / 100) * 35}`).join(' ')}
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* User Profile Config Card */}
          <div className="glass p-4 border-white/5 bg-slate-900/10 flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <User className="text-red-400" size={16} />
              <span className="font-mono text-xs font-bold text-white uppercase">User Identity Config</span>
            </div>

            <div className="flex flex-col items-center gap-2 flex-grow justify-center py-1">
              <div className="relative group cursor-pointer w-12 h-12 rounded-full overflow-hidden border border-purple-500/30 bg-slate-800 flex items-center justify-center">
                {user.picture ? (
                  <img src={user.picture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-mono text-sm font-bold text-purple-400">
                    {user.name ? user.name.substring(0, 2).toUpperCase() : 'AD'}
                  </span>
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Upload size={12} className="text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
              </div>

              <div className="w-full flex flex-col gap-2 font-mono text-[9px]">
                <div className="flex flex-col gap-0.5 text-left">
                  <label className="text-slate-400">DisplayName:</label>
                  <input
                    type="text"
                    className="form-input text-[9px] py-1 px-2.5 w-full bg-black/45 border-white/5"
                    value={user.name}
                    onChange={e => setUser(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-0.5 text-left">
                  <label className="text-slate-400">Email Address:</label>
                  <span className="p-1 px-2 rounded bg-white/5 text-slate-300 truncate w-full block border border-white/5 select-none">
                    {user.email || 'guest@flowzint.in'}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Execution Logs Terminal */}
        <div className="w-full glass p-4 border-white/5 bg-slate-900/10 flex flex-col gap-2">
          <span className="font-mono text-[10px] font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <Database size={12} className="text-red-400" />
            AUTOMATION RUN EVENT LOGS
          </span>
          <div 
            className="bg-black/45 p-3 rounded border border-white/5 font-mono text-xs text-red-400/90 h-[90px] overflow-y-auto leading-relaxed"
          >
            {logs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </div>
        </div>
      </div>

      {/* 20 Features bottom grid layout */}
      <div 
        className="w-full glass p-4 border-white/5 bg-slate-900/20"
        style={{ borderRadius: '12px' }}
      >
        <h4 className="text-[10px] font-mono font-bold text-slate-400 mb-3 uppercase border-b border-white/5 pb-1.5 flex items-center gap-1.5">
          <Sparkles size={12} className="text-red-400" />
          Automation Features (3-Column Grid)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {features.map((feat, idx) => (
            <button
              key={idx}
              onClick={() => triggerFeature(feat)}
              className="feature-btn flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="truncate">{feat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
