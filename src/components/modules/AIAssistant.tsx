import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Volume2, VolumeX, ShieldAlert, BookOpen, Share2, Activity, Users, Bot, Play, Code, CheckSquare, FileText, ChevronRight } from 'lucide-react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface TeamLog {
  agent: 'Product Owner' | 'UI/UX Designer' | 'Software Developer' | 'QA Tester';
  text: string;
  color: string;
  avatar: string;
}

const features = [
  "AI Agent Marketplace", "Custom AI Personalities", "AI Memory Timeline", "Conversation Pinning",
  "Favorite Prompts", "Prompt Sharing", "AI Prompt Templates", "AI Voice Cloning",
  "AI Avatar Assistant", "Multi-language Conversations", "Live Internet Search", "AI Fact Checking",
  "AI Citation Generator", "AI Workflow Suggestions", "AI Auto Follow-up", "AI Daily Briefing",
  "AI Context Switching", "AI Mood Detection", "AI Conversation Replay", "AI Smart Recommendations",
  "AI Emotion Mirroring", "Real-time Sentiment Gauge", "AI Semantic Search", "Automated Knowledge Extraction",
  "AI Summary Highlights", "AI Text Refactoring", "Voice Command Control", "AI Conversational Graph",
  "Personalized Agent Training", "AI Agent Handshake Protocol"
];

export const AIAssistant: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'chat' | 'teamwork'>('chat');
  
  // Standard Chat states
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Welcome to your Flow Zint AI Core. Select a personality or prompt, or ask me anything directly.', timestamp: '12:00 PM' }
  ]);
  const [input, setInput] = useState('');
  const [personality, setPersonality] = useState<'standard' | 'developer' | 'designer' | 'advisor'>('standard');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [featureAlert, setFeatureAlert] = useState<string | null>(null);

  // Multi-agent Teamwork states
  const [teamPrompt, setTeamPrompt] = useState('Build a glassmorphic calendar scheduler in React');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [teamLogs, setTeamLogs] = useState<TeamLog[]>([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);
  const [generatedRequirements, setGeneratedRequirements] = useState<string[]>([]);
  
  const teamworkEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeMode === 'teamwork') {
      teamworkEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [teamLogs, activeMode]);

  // Standard Chat Bot logic
  const getSystemResponse = (prompt: string) => {
    const text = prompt.toLowerCase();
    
    if (personality === 'developer') {
      if (text.includes('hello') || text.includes('hi')) return 'System initialized. Ready to compile code or design systems. What module are we building?';
      if (text.includes('code') || text.includes('react')) return 'Here is a premium boilerplate snippet:\n\n```tsx\nexport const CoreModule = () => {\n  return <div className="glass neon-glow">AI Ready</div>;\n};\n```\nLet me know if we need DB schema integrations.';
      return 'Command understood. Compiling architectural suggestions. Refactoring options are ready.';
    }

    if (personality === 'designer') {
      if (text.includes('hello') || text.includes('hi')) return 'Hey there! Let\'s curate some stunning aurora color systems and premium glassmorphism mockups. What\'s our theme?';
      return 'For a sleek premium UI, I recommend: HSL(263, 80%, 58%) with backdrop filter blur(12px) and 0.45 opacity borders.';
    }

    if (personality === 'advisor') {
      return 'Analyzing business workflows. Productivity scores are trending up 12% following calendar automations. Optimize CRM pipelines for max conversion.';
    }

    // Standard
    if (text.includes('hello') || text.includes('hi')) return 'Hello! How can I assist you in Flow Zint Studio today?';
    if (text.includes('task')) return 'I recommend setting Focus Mode in your Task Manager to clear that milestone ahead of the deadline.';
    return 'Analyzing request. I have queried our memory indexes and updated workflow recommendations.';
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const responseText = getSystemResponse(userMsg.text);
      const aiMsg: Message = {
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);

      if (speechEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(responseText.replace(/```[\s\S]*?```/g, 'code block'));
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    }, 600);
  };

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const triggerFeature = (feat: string) => {
    setFeatureAlert(`Feature Simulated: "${feat}". Processing state update...`);
    
    if (feat === "Live Internet Search") {
      setInput("Querying Google search API indices...");
    } else if (feat === "AI Prompt Templates") {
      setInput("Draft layout design patterns template");
    } else if (feat === "AI Voice Cloning") {
      setSpeechEnabled(true);
      setFeatureAlert(`Cloned Voice Active! Text-to-speech output redirected.`);
    }

    setTimeout(() => setFeatureAlert(null), 3000);
  };

  // Teamwork Simulation execution steps
  useEffect(() => {
    if (!isSimulating) return;

    let timer: number;
    
    if (simStep === 0) {
      // Step 1: Product Owner scoping
      timer = window.setTimeout(() => {
        setTeamLogs(prev => [
          ...prev,
          {
            agent: 'Product Owner',
            text: `Analyzing project prompt: "${teamPrompt}". Let's define the scope. We'll require a modular glassmorphic component layout, responsive flex styling, and active state hooks.`,
            color: 'text-purple-400 border-purple-500/20 bg-purple-950/5',
            avatar: 'PO'
          }
        ]);
        setGeneratedRequirements([
          `1. Construct fully responsive glass container overlay`,
          `2. Connect useState hooks to bind calendar grid days`,
          `3. Build dynamic micro-animations on event tags hover`
        ]);
        setSimStep(1);
      }, 1000);
    } else if (simStep === 1) {
      // Step 2: Designer planning aesthetics
      timer = window.setTimeout(() => {
        setTeamLogs(prev => [
          ...prev,
          {
            agent: 'UI/UX Designer',
            text: `Perfect. For the styling system, let's map a satin finish outline: border 1px solid rgba(255,255,255,0.08) with backdrop-filter blur(15px). The calendar grid should adjust dynamically on active hover.`,
            color: 'text-pink-400 border-pink-500/20 bg-pink-950/5',
            avatar: 'UX'
          }
        ]);
        setSimStep(2);
      }, 1200);
    } else if (simStep === 2) {
      // Step 3: Developer generating code
      timer = window.setTimeout(() => {
        setTeamLogs(prev => [
          ...prev,
          {
            agent: 'Software Developer',
            text: `Understood. Scaffolding component code. Setting up standard grid alignment. Exposing properties for parent data binds. Code is compiled!`,
            color: 'text-cyan-400 border-cyan-500/20 bg-cyan-950/5',
            avatar: 'DEV'
          }
        ]);
        setGeneratedCode(`import React, { useState } from 'react';\n\nexport const CalendarScheduler = () => {\n  const [events, setEvents] = useState([]);\n  \n  return (\n    <div className="glass p-5 border-white/10 max-w-md w-full">\n      <h3 className="font-mono text-sm text-white mb-3">📅 Scheduler</h3>\n      <div className="grid grid-cols-7 gap-1 font-mono text-xs">\n        {Array.from({ length: 31 }).map((_, i) => (\n          <button key={i} className="p-2 border border-white/5 hover:bg-purple-500/20 text-slate-300 transition-colors">\n            {i + 1}\n          </button>\n        ))}\n      </div>\n    </div>\n  );\n};`);
        setGeneratedTasks([
          `Design Scheduler layout container`,
          `Implement 31-day reactive grid mapping`,
          `Hook up event click handlers`
        ]);
        setSimStep(3);
      }, 1500);
    } else if (simStep === 3) {
      // Step 4: QA testing code
      timer = window.setTimeout(() => {
        setTeamLogs(prev => [
          ...prev,
          {
            agent: 'QA Tester',
            text: `Running virtual validation checks on compiled code... Standard grids checked: PASS. Transition hover speeds: PASS. State hook cycles: PASS. Component is robust and certified for dashboard integration.`,
            color: 'text-green-400 border-green-500/20 bg-green-950/5',
            avatar: 'QA'
          }
        ]);
        setIsSimulating(false);
        setSimStep(4);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [isSimulating, simStep, teamPrompt]);

  const handleStartSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamPrompt.trim() || isSimulating) return;

    setIsSimulating(true);
    setSimStep(0);
    setTeamLogs([
      {
        agent: 'Product Owner',
        text: `Starting multi-agent software collaboration thread for: "${teamPrompt}"...`,
        color: 'text-slate-400 border-white/5 bg-slate-900/10',
        avatar: 'SYS'
      }
    ]);
    setGeneratedCode('');
    setGeneratedTasks([]);
    setGeneratedRequirements([]);
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* 1. Toggle Mode buttons */}
      <div className="flex justify-between items-center bg-slate-900/60 p-3 rounded-lg border border-white/5">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveMode('chat')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              activeMode === 'chat'
                ? 'bg-purple-950/30 text-purple-400 border-purple-500/40 font-bold'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            <Bot size={12} className="inline mr-1.5" /> AI Chat Assistant
          </button>
          <button
            onClick={() => setActiveMode('teamwork')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              activeMode === 'teamwork'
                ? 'bg-purple-950/30 text-purple-400 border-purple-500/40 font-bold'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            <Users size={12} className="inline mr-1.5" /> AI Teamwork Collaboration Hub
          </button>
        </div>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden md:inline">
          {activeMode === 'chat' ? 'Personal Assistant Console' : 'Multi-Agent Team Matrix'}
        </span>
      </div>

      {activeMode === 'chat' ? (
        /* Chat View Mode */
        <div className="w-full flex flex-col bg-slate-950/20 rounded-xl overflow-hidden border border-white/5" style={{ minHeight: '400px' }}>
          {featureAlert && (
            <div className="bg-purple-950/80 border border-purple-500/30 p-2 text-center text-xs font-mono text-purple-300 flex items-center justify-center gap-2 animate-bounce">
              <Activity size={14} className="animate-spin" />
              {featureAlert}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900/60 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Sparkles className="text-purple-400 animate-pulse" size={18} />
              <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">AI AGENT MODULE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 mr-1 font-mono">Agent:</span>
              {(['standard', 'developer', 'designer', 'advisor'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPersonality(p)}
                  className={`px-3 py-1 rounded text-xs font-mono capitalize transition-all border ${
                    personality === p 
                      ? 'bg-purple-950/30 text-purple-400 border-purple-500/40' 
                      : 'bg-transparent text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button 
                onClick={toggleSpeech}
                className={`p-1.5 rounded border transition-colors ${speechEnabled ? 'text-green-400 border-green-500/30' : 'text-slate-400 border-white/5'}`}
                title="Toggle speech synthesis voice output"
              >
                {speechEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 p-3 bg-slate-900/25 border-b border-white/5">
            <button type="button" onClick={() => { setInput('Suggest a workflow automation'); }} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-slate-300 rounded font-mono flex items-center gap-1.5 transition-colors">
              <Share2 size={12} className="text-purple-400" /> Auto Workflow Suggestions
            </button>
            <button type="button" onClick={() => { setInput('How is my project health score?'); }} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-slate-300 rounded font-mono flex items-center gap-1.5 transition-colors">
              <ShieldAlert size={12} className="text-cyan-400" /> Fact Check Health Score
            </button>
            <button type="button" onClick={() => { setInput('Explain neural grid components'); }} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-slate-300 rounded font-mono flex items-center gap-1.5 transition-colors">
              <BookOpen size={12} className="text-emerald-400" /> Context Switch Brain
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 max-h-[300px]">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col max-w-[80%] ${m.sender === 'user' ? 'align-self-end ml-auto items-end' : 'align-self-start mr-auto items-start'}`}
                style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <div 
                  className={`p-3 rounded-lg text-sm leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-purple-600 text-white rounded-tr-none' 
                      : 'glass text-slate-200 rounded-tl-none border-white/5'
                  }`}
                >
                  {m.text.includes('```') ? (
                    <div className="font-mono text-xs bg-black/40 p-2.5 rounded border border-white/5 mt-1 overflow-x-auto whitespace-pre">
                      {m.text.replace(/```tsx\n|```/g, '')}
                    </div>
                  ) : m.text}
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1">{m.timestamp}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-slate-900/40 flex gap-2">
            <input 
              type="text" 
              className="form-input flex-1"
              placeholder="Ask Zint AI Assistant..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.2rem' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        /* Multi-agent Collaboration Hub Mode */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Main prompt input bar */}
          <form onSubmit={handleStartSimulation} className="glass p-4 border-purple-500/20 bg-purple-950/5 flex gap-3 flex-wrap md:flex-nowrap">
            <div className="flex-1 min-w-[200px] flex items-center gap-2">
              <Users size={16} className="text-purple-400 flex-shrink-0" />
              <input 
                type="text" 
                value={teamPrompt}
                onChange={e => setTeamPrompt(e.target.value)}
                disabled={isSimulating}
                className="form-input flex-1 bg-transparent border-none outline-none font-mono text-xs"
                placeholder="What project requirements should the AI team build?"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSimulating}
              className="btn-primary flex items-center gap-1.5"
              style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              <Play size={12} /> {isSimulating ? 'Collaborating...' : 'Start Teamwork'}
            </button>
          </form>

          {/* Collaboration Split screen workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            {/* Left Col: Dialogue stream */}
            <div className="glass p-4 border-white/5 lg:col-span-2 flex flex-col gap-3">
              <h3 className="text-xs font-mono font-bold text-white border-b border-white/5 pb-2 uppercase tracking-wide flex items-center gap-2">
                <Activity size={14} className="text-purple-400" /> Dialogue Stream
              </h3>
              <div 
                className="flex-grow bg-black/45 p-3 rounded border border-white/5 flex flex-col gap-3 overflow-y-auto max-h-[350px] min-h-[300px]"
              >
                {teamLogs.map((log, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col p-2.5 rounded border ${log.color} animate-fade-in`}
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1.5">
                      <span className="text-[10px] font-mono font-bold flex items-center gap-1.5 uppercase tracking-wide">
                        <Bot size={11} /> {log.agent}
                      </span>
                      <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] font-bold font-mono flex items-center justify-center border border-white/10 text-white">
                        {log.avatar}
                      </span>
                    </div>
                    <p className="text-xs font-sans leading-relaxed text-slate-200">{log.text}</p>
                  </div>
                ))}
                <div ref={teamworkEndRef} />
              </div>
            </div>

            {/* Right Col: Output panels (Requirements, tasks, code) */}
            <div className="flex flex-col gap-4">
              
              {/* Product Requirements */}
              <div className="glass p-4 border-white/5 flex flex-col gap-2">
                <h3 className="text-xs font-mono font-bold text-white border-b border-white/5 pb-1.5 uppercase tracking-wide flex items-center gap-2">
                  <FileText size={13} className="text-purple-400" /> Scoped Requirements
                </h3>
                {generatedRequirements.length === 0 ? (
                  <span className="text-[10px] font-mono text-slate-500 italic">No scoped requirements.</span>
                ) : (
                  <div className="flex flex-col gap-2 font-mono text-[10px] text-slate-300">
                    {generatedRequirements.map((req, i) => (
                      <div key={i} className="flex gap-2">
                        <ChevronRight size={10} className="text-purple-500 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Development tasks */}
              <div className="glass p-4 border-white/5 flex flex-col gap-2">
                <h3 className="text-xs font-mono font-bold text-white border-b border-white/5 pb-1.5 uppercase tracking-wide flex items-center gap-2">
                  <CheckSquare size={13} className="text-cyan-400" /> Generated Tasks
                </h3>
                {generatedTasks.length === 0 ? (
                  <span className="text-[10px] font-mono text-slate-500 italic">No tasks created yet.</span>
                ) : (
                  <div className="flex flex-col gap-2 font-mono text-[10px] text-slate-300">
                    {generatedTasks.map((tsk, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="accent-purple-500" />
                        <span className="line-through text-slate-400">{tsk}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Bottom Code Block */}
          {generatedCode && (
            <div className="glass p-4 border-purple-500/20 bg-slate-950/60 flex flex-col gap-2">
              <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5 uppercase">
                  <Code size={13} className="text-cyan-400" /> Compiled React Component Output
                </span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCode);
                    setFeatureAlert("React component copied to clipboard!");
                    setTimeout(() => setFeatureAlert(null), 3000);
                  }}
                  className="px-2 py-0.5 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded text-[9px] font-mono text-slate-300"
                >
                  Copy Code
                </button>
              </div>
              <pre className="p-3 bg-black/40 rounded border border-white/5 overflow-x-auto text-[10.5px] font-mono text-cyan-300/90 leading-relaxed max-h-[160px] whitespace-pre">
                {generatedCode}
              </pre>
            </div>
          )}

        </div>
      )}

      {/* 20 Features bottom grid layout */}
      <div 
        className="w-full glass p-4 border-white/5 bg-slate-900/20"
        style={{ borderRadius: '12px' }}
      >
        <h4 className="text-[10px] font-mono font-bold text-slate-400 mb-3 uppercase border-b border-white/5 pb-1.5 flex items-center gap-1.5">
          <Sparkles size={12} className="text-purple-400" />
          AI Assistant Features (3-Column Grid)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {features.map((feat, idx) => (
            <button
              key={idx}
              onClick={() => triggerFeature(feat)}
              className="feature-btn flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></span>
              <span className="truncate">{feat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
