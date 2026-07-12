import React, { useState } from 'react';
import { Mail, RefreshCw, Copy, Check, Sparkles, Activity } from 'lucide-react';

const features = [
  "AI Email Classification", "Inbox Priority Ranking", "AI Spam Prediction", "AI Tone Adjustment",
  "Email Read Time Prediction", "Email Scheduler Calendar", "Follow-up Automation", "Email Signature Templates",
  "AI Subject Optimization", "Bulk Personalization", "CRM Integration", "Auto Contact Suggestions",
  "AI Attachment Summary", "AI Reply Suggestions", "AI Campaign Scoring", "Delivery Analytics",
  "Open Rate Tracking", "Click Tracking", "AI Meeting Invitation Generator", "Auto Inbox Organization",
  "AI Email A/B Testing", "Email Read Receipt Tracker", "Auto Email Unsubscriber", "Smart Signature Rotator",
  "AI Email Tone Audit", "Draft Auto-Saver", "CRM Contact Auto-Sync", "Email Thread Summarizer",
  "Bulk Cold-Email Outreach", "AI Delivery Time Optimization"
];

export const EmailStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState<'professional' | 'casual' | 'assertive' | 'friendly'>('professional');
  const [subject, setSubject] = useState('RE: Proposal Discussion');
  const [body, setBody] = useState('Hi [Name],\n\nI hope this email finds you well. I wanted to follow up on our discussion regarding the Flow Zint project proposal...\n\nBest regards,\nLead Developer');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [featureAlert, setFeatureAlert] = useState<string | null>(null);

  const [showSignature, setShowSignature] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);

      if (tone === 'casual') {
        setSubject('quick follow up on our flow zint chat ⚡');
        setBody(`Hey [Name],\n\nJust wanted to check in on the Flow Zint details we discussed. Let me know what you think when you have a sec!\n\nCheers,\nDeveloper`);
      } else if (tone === 'assertive') {
        setSubject('Urgent Action Required: Flow Zint Milestone Alignment');
        setBody(`Dear [Name],\n\nThis is a follow-up regarding the pending approvals for the Flow Zint workspace. We need to align on the deliverables by end-of-day to stay on track.\n\nSincerely,\nLead Developer`);
      } else if (tone === 'friendly') {
        setSubject('Exciting updates on Flow Zint Studio! 😊');
        setBody(`Hello [Name],\n\nHope you are having a wonderful week! I'm super excited to share some progress on Flow Zint. I would love to get your thoughts whenever you are free.\n\nWarmly,\nLead Developer`);
      } else {
        setSubject('Project Alignment: Flow Zint Studio Execution');
        setBody(`Dear [Name],\n\nI am writing to formalize our action plan for the Flow Zint project. Attached is the summary of workflows. Please review at your earliest convenience.\n\nSincerely,\nLead Developer`);
      }
      
      if (showSignature) {
        setBody(b => b + "\n\n---\nAdministrator\nLead Developer\nFlow Zint Studio");
      }
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerFeature = (feat: string) => {
    setFeatureAlert(`Feature Simulated: "${feat}". Processing state update...`);

    if (feat === "Email Signature Templates") {
      setShowSignature(!showSignature);
      setBody(b => b + "\n\n---\nAdministrator\nLead Developer\nFlow Zint Studio");
    } else if (feat === "Delivery Analytics" || feat === "AI Campaign Scoring") {
      setShowAnalytics(true);
    } else if (feat === "AI Subject Optimization") {
      setSubject("🔥 Dynamic Pitch: Flow Zint Unified Dashboard Workspace");
      setFeatureAlert("Subject line optimized for maximum opening clicks probability!");
    } else if (feat === "AI Attachment Summary") {
      setPrompt("Attach standard architecture specs document and summarize key highlights.");
    }

    setTimeout(() => setFeatureAlert(null), 3000);
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Main Email Workspace */}
      <div className="w-full flex flex-col gap-4 text-slate-200">
        {featureAlert && (
          <div className="bg-orange-950/80 border border-orange-500/30 p-2 text-center text-xs font-mono text-orange-300 flex items-center justify-center gap-2 animate-bounce">
            <Activity size={14} className="animate-spin" />
            {featureAlert}
          </div>
        )}

        {/* Feature Widget - Delivery Analytics */}
        {showAnalytics && (
          <div className="glass p-4 border-orange-500/30 bg-orange-950/10 flex items-center justify-between gap-4 animate-float">
            <div>
              <h4 className="text-xs font-mono font-bold text-orange-400 uppercase">📊 Delivery Analytics Dashboard</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Live tracking for dispatched bulk notifications.</p>
            </div>
            <div className="flex gap-4 font-mono text-xs text-white">
              <div>Open: <strong className="text-green-400">94.2%</strong></div>
              <div>Clicks: <strong className="text-cyan-400">76.8%</strong></div>
              <button type="button" onClick={() => setShowAnalytics(false)} className="text-slate-500 hover:text-white">Dismiss</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Email Creator controls */}
          <form onSubmit={handleGenerate} className="glass p-4 border-white/5 bg-slate-900/10 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Mail className="text-orange-400" size={16} />
              <span className="font-mono text-xs font-bold text-white uppercase">AI EMAIL CLASSIFICATION</span>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">EMAIL TONE ADJUSTMENT</label>
              <div className="grid grid-cols-2 gap-2">
                {(['professional', 'casual', 'assertive', 'friendly'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`px-3 py-2 rounded text-xs font-mono border capitalize transition-all ${
                      tone === t 
                        ? 'bg-orange-950/20 text-orange-400 border-orange-500/40' 
                        : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">PROMPT DETAILS</label>
              <textarea
                rows={4}
                className="form-input w-full resize-none text-xs"
                placeholder="Ask AI to write a follow up email..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
            </div>

            <button type="submit" disabled={generating} className="btn-primary w-full justify-center mt-auto" style={{ height: '40px' }}>
              {generating ? (
                <RefreshCw className="animate-spin" size={16} />
              ) : (
                <>
                  <Sparkles size={16} className="text-orange-300" />
                  Optimize Subject & Compose
                </>
              )}
            </button>
          </form>

          {/* Email Result Pane */}
          <div className="glass p-4 border-white/5 bg-slate-900/15 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="font-mono text-xs font-bold text-white">GENERATED DRAFT</span>
              <button 
                type="button"
                onClick={handleCopy} 
                className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono hover:text-white flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-green-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copy Draft
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col gap-2 font-sans text-xs bg-black/45 p-3 rounded-lg border border-white/5 flex-grow">
              <div className="border-b border-white/5 pb-2 mb-1">
                <span className="text-slate-400 font-mono">Subject: </span>
                <span className="text-white font-semibold">{subject}</span>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed text-slate-300 flex-grow overflow-y-auto max-h-[160px]">
                {body}
              </div>
            </div>

            <div className="flex gap-2 items-center bg-orange-950/10 border border-orange-500/20 p-2.5 rounded text-[10px] font-mono text-orange-300">
              <Sparkles size={14} className="flex-shrink-0" />
              <span>AI READ TIME: Est. 25s. Open score: 94%.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 20 Features bottom grid layout */}
      <div 
        className="w-full glass p-4 border-white/5 bg-slate-900/20"
        style={{ borderRadius: '12px' }}
      >
        <h4 className="text-[10px] font-mono font-bold text-slate-400 mb-3 uppercase border-b border-white/5 pb-1.5 flex items-center gap-1.5">
          <Sparkles size={12} className="text-orange-400" />
          Email Studio Features (3-Column Grid)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {features.map((feat, idx) => (
            <button
              key={idx}
              onClick={() => triggerFeature(feat)}
              className="feature-btn flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0"></span>
              <span className="truncate">{feat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
