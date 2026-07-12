import React, { useState, useEffect, useRef } from 'react';
import { Video, Play, Pause, AlertCircle, Smile, Sparkles, Activity } from 'lucide-react';

interface TranscriptItem {
  speaker: string;
  role: string;
  text: string;
  emotion: string;
  time: string;
}

const features = [
  "AI Speaker Emotion Analysis", "AI Meeting Score", "AI Attendance Prediction", "AI Time Optimization",
  "AI Question Detection", "AI Decision Extraction", "AI Action Reminder", "AI Follow-up Generator",
  "Meeting Replay", "Live AI Assistant", "Auto Translation", "Smart Agenda Builder",
  "AI Topic Detection", "AI Keyword Search", "Team Participation Analytics", "Calendar Suggestions",
  "AI Meeting Insights", "Meeting History Timeline", "AI Noise Removal", "AI Presentation Assistant",
  "Live Transcription Subtitles", "AI Video Face Blur", "Auto Screen Share Rec", "Meeting Feedback Polls",
  "AI Speaker Identification", "Transcript Word Cloud", "Auto Calendar Booking", "AI Presentation Coach",
  "Meeting Sentiment Trend", "Smart Action Assigner"
];

export const MeetingAssistant: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [featureAlert, setFeatureAlert] = useState<string | null>(null);

  const [showParticipation, setShowParticipation] = useState(false);
  const [noiseRemovalActive, setNoiseRemovalActive] = useState(false);
  const [showTranslator, setShowTranslator] = useState(false);

  const transcripts: TranscriptItem[] = [
    { speaker: 'Lead Developer', role: 'Dev Core', text: 'I completed scaffolding the global HSL theme templates and integrated the 3D plexus nodes.', emotion: 'Confident', time: '09:02 AM' },
    { speaker: 'Sarah Connor', role: 'Product Manager', text: 'Excellent progress! Did we check if the local canvas rendering supports light mode transition states?', emotion: 'Satisfied', time: '09:03 AM' }
  ];

  const actions: string[] = [
    'Dev team to bundle lucide-react icons for dashboard panels.',
    'Align CRM workspace templates with the lead prediction charts.'
  ];

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      ctx.strokeStyle = noiseRemovalActive ? '#10B981' : '#D946EF';
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < w; x++) {
        let amplitude = isPlaying ? 25 : 4;
        if (noiseRemovalActive) amplitude = amplitude * 0.4;
        const frequency = 0.05;
        const y = h / 2 + Math.sin(x * frequency + phase) * amplitude * Math.sin(x * 0.005);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      phase += isPlaying ? 0.15 : 0.02;
      animId = requestAnimationFrame(drawWave);
    };

    drawWave();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, noiseRemovalActive]);

  const triggerFeature = (feat: string) => {
    setFeatureAlert(`Feature Simulated: "${feat}". Processing state update...`);

    if (feat === "AI Noise Removal") {
      setNoiseRemovalActive(!noiseRemovalActive);
      setFeatureAlert(`AI Noise Cancellation ${!noiseRemovalActive ? 'ENABLED' : 'DISABLED'}. Signal filter active.`);
    } else if (feat === "Team Participation Analytics") {
      setShowParticipation(true);
      setShowTranslator(false);
    } else if (feat === "Auto Translation") {
      setShowTranslator(true);
      setShowParticipation(false);
    } else if (feat === "AI Question Detection") {
      setFeatureAlert("Detected 1 Question: 'Did we check if local canvas rendering supports light mode?'");
    }

    setTimeout(() => setFeatureAlert(null), 3000);
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Main meeting app */}
      <div className="w-full flex flex-col gap-4 text-slate-200">
        {featureAlert && (
          <div className="bg-fuchsia-950/80 border border-fuchsia-500/30 p-2 text-center text-xs font-mono text-fuchsia-300 flex items-center justify-center gap-2 animate-bounce">
            <Activity size={14} className="animate-spin" />
            {featureAlert}
          </div>
        )}

        {showParticipation && (
          <div className="glass p-4 border-fuchsia-500/30 bg-fuchsia-950/10 flex flex-col gap-2.5 animate-float">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h4 className="text-xs font-mono font-bold text-fuchsia-400 uppercase">📊 Team Participation Metrics</h4>
              <button type="button" onClick={() => setShowParticipation(false)} className="text-[10px] font-mono text-slate-500 hover:text-white">Dismiss</button>
            </div>
            <div className="flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span>Lead Developer:</span>
                <span className="text-fuchsia-400 font-bold">58% speaker share</span>
              </div>
              <div className="flex justify-between">
                <span>Sarah Connor:</span>
                <span className="text-fuchsia-400 font-bold">42% speaker share</span>
              </div>
            </div>
          </div>
        )}

        {showTranslator && (
          <div className="glass p-4 border-green-500/30 bg-green-950/10 flex flex-col gap-2 animate-float">
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <h4 className="text-xs font-mono font-bold text-green-400 uppercase">🌐 Auto Translation Model</h4>
              <button type="button" onClick={() => setShowTranslator(false)} className="text-[10px] font-mono text-slate-500 hover:text-white">Dismiss</button>
            </div>
            <div className="text-xs leading-relaxed text-slate-300">
              <div className="font-semibold text-white">[Translated Spanish]:</div>
              "Lead Dev: Completé el borrador del diseño y la plexus 3D..."
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Transcript timeline */}
          <div className="glass p-4 border-white/5 bg-slate-900/10 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <Video className="text-pink-400" size={16} />
                <span className="font-mono text-xs font-bold text-white uppercase">LIVE MEETING FEED</span>
              </div>
              <button 
                type="button"
                onClick={() => setIsPlaying(!isPlaying)} 
                className={`p-1 px-3 rounded text-[10px] font-mono border transition-all flex items-center gap-1.5 ${
                  isPlaying 
                    ? 'bg-pink-950/20 text-pink-400 border-pink-500/40' 
                    : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                }`}
              >
                {isPlaying ? <Pause size={10} /> : <Play size={10} />}
                {isPlaying ? 'Pause Stream' : 'Stream Audio'}
              </button>
            </div>

            <div className="bg-black/45 p-2 rounded-lg border border-white/5 flex items-center justify-center">
              <canvas ref={canvasRef} width={320} height={60} className="w-full h-[60px]" />
            </div>

            <div className="flex-grow flex flex-col gap-3 overflow-y-auto max-h-[160px] pr-1">
              {transcripts.map((t, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-950/30 border border-white/5 flex flex-col gap-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 items-center">
                      <span className="text-white font-bold">{t.speaker}</span>
                      <span className="text-[9px] text-slate-500 font-mono">({t.role})</span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono">{t.time}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{t.text}</p>
                  <div className="flex gap-1 items-center mt-1 text-[9px] font-mono text-pink-400">
                    <Smile size={10} />
                    <span>Emotion: {t.emotion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Action extractions */}
          <div className="glass p-4 border-white/5 bg-slate-900/15 flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <AlertCircle className="text-pink-400" size={16} />
              <span className="font-mono text-xs font-bold text-white uppercase">AI DECISION EXTRACTIONS</span>
            </div>

            <div className="flex-grow flex flex-col gap-3 bg-black/45 p-3 rounded-lg border border-white/5 justify-between">
              <div>
                <h5 className="text-[9px] text-slate-400 font-mono tracking-wider mb-1 uppercase">ACTION ITEMS</h5>
                <ul className="flex flex-col gap-2">
                  {actions.map((act, i) => (
                    <li key={i} className="flex gap-2 items-start text-xs text-slate-300">
                      <span className="text-pink-400 font-mono mt-0.5">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/5 pt-3 mt-4">
                <h5 className="text-[9px] text-slate-400 font-mono tracking-wider mb-2 uppercase">AI MEETING SCORE</h5>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white/5 p-2 rounded border border-white/5">
                    <span className="block text-base font-bold text-white font-mono">92/100</span>
                    <span className="text-[9px] text-slate-400 font-mono">Participation</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded border border-white/5">
                    <span className="block text-base font-bold text-white font-mono">Excellent</span>
                    <span className="text-[9px] text-slate-400 font-mono">Team Harmony</span>
                  </div>
                </div>
              </div>
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
          <Sparkles size={12} className="text-pink-400" />
          Meeting Assistant Features (3-Column Grid)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {features.map((feat, idx) => (
            <button
              key={idx}
              onClick={() => triggerFeature(feat)}
              className="feature-btn flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 flex-shrink-0"></span>
              <span className="truncate">{feat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
