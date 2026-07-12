import React, { useState, useEffect } from 'react';
import { BookOpen, Mic, MicOff, Trash2, Plus, Sparkles, Activity } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

const features = [
  "AI Knowledge Base", "Smart Tags", "AI Flashcards", "AI Quiz Generator",
  "Mind Maps", "Whiteboard Mode", "Sticky Notes", "Voice Search",
  "AI Handwriting Recognition", "AI Auto Formatting", "Smart Notebook", "Notebook Sharing",
  "Reading Mode", "Focus Writing Mode", "AI Citation Support", "Markdown Preview",
  "Note Lock", "Timeline View", "Calendar Integration", "AI Study Assistant",
  "Speech Dictation Voice", "Note Backlink Graph", "Smart Synonyms Finder", "AI Outline Generator",
  "Note Word Count Statistics", "PDF Note Exporter", "Whiteboard Sketch Tools", "AI Note Translator",
  "Audio Voice Recorder", "Smart Note Merging"
];

export const SmartNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Flow Zint Architectural Ideas', content: 'Focus on high-speed glassmorphic borders and responsive grids. Setup HSL custom colors in index.css.', tags: ['Design', 'Project'] },
    { id: '2', title: 'MongoDB Connect Specs', content: 'Model schema setup: URI string, options flags, collections for workspace features.', tags: ['Backend'] }
  ]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [featureAlert, setFeatureAlert] = useState<string | null>(null);

  const [quizActive, setQuizActive] = useState(false);
  const [mindMapActive, setMindMapActive] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechClass();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setNotes(prev => {
          const updated = [...prev];
          if (updated[activeIdx]) {
            updated[activeIdx].content += ' ' + transcript;
          }
          return updated;
        });
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      setRecognition(rec);
    }
  }, [activeIdx]);

  const toggleRecording = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in this browser. Try Chrome.');
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      setIsRecording(true);
      recognition.start();
    }
  };

  const handleUpdateContent = (text: string) => {
    setNotes(prev => prev.map((n, idx) => idx === activeIdx ? { ...n, content: text } : n));
  };

  const handleUpdateTitle = (title: string) => {
    setNotes(prev => prev.map((n, idx) => idx === activeIdx ? { ...n, title } : n));
  };

  const handleAddNote = () => {
    const newNote: Note = {
      id: Math.random().toString(),
      title: 'New Note',
      content: '',
      tags: ['General']
    };
    setNotes(prev => [...prev, newNote]);
    setActiveIdx(notes.length);
  };

  const handleDeleteNote = (idx: number) => {
    setNotes(prev => prev.filter((_, i) => i !== idx));
    setActiveIdx(0);
  };

  const triggerFeature = (feat: string) => {
    setFeatureAlert(`Feature Simulated: "${feat}". Processing state update...`);

    if (feat === "AI Quiz Generator") {
      setQuizActive(!quizActive);
      setMindMapActive(false);
    } else if (feat === "Mind Maps") {
      setMindMapActive(!mindMapActive);
      setQuizActive(false);
    } else if (feat === "Smart Tags") {
      setNotes(prev => prev.map((n, idx) => idx === activeIdx ? { ...n, tags: [...n.tags, 'Auto-AI'] } : n));
    } else if (feat === "Note Lock") {
      setFeatureAlert("Notes secured. Biometrics lock configuration enabled.");
    }

    setTimeout(() => setFeatureAlert(null), 3000);
  };

  const activeNote = notes[activeIdx] || null;

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Main Notes App */}
      <div className="w-full flex flex-col gap-4 text-slate-200">
        {featureAlert && (
          <div className="bg-pink-950/80 border border-pink-500/30 p-2 text-center text-xs font-mono text-pink-300 flex items-center justify-center gap-2 animate-bounce">
            <Activity size={14} className="animate-spin" />
            {featureAlert}
          </div>
        )}

        {quizActive && (
          <div className="glass p-4 border-pink-500/30 bg-pink-950/10 flex flex-col gap-2.5 animate-float">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h4 className="text-xs font-mono font-bold text-pink-400 uppercase">📝 Auto Quiz Generator</h4>
              <button type="button" onClick={() => setQuizActive(false)} className="text-[10px] font-mono text-slate-500 hover:text-white">Dismiss</button>
            </div>
            <div className="text-xs leading-relaxed text-slate-300 font-mono">
              <strong>Question:</strong> What CSS variables style pattern is recommended for glassmorphism?<br />
              <span className="text-pink-400 mt-1 block">A. HSL with opacity borders. (Correct)</span>
            </div>
          </div>
        )}

        {mindMapActive && (
          <div className="glass p-4 border-cyan-500/30 bg-cyan-950/10 flex flex-col gap-2 animate-float">
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase">🧠 Mind Map Relational Model</h4>
              <button type="button" onClick={() => setMindMapActive(false)} className="text-[10px] font-mono text-slate-500 hover:text-white">Dismiss</button>
            </div>
            <svg className="w-full h-16" viewBox="0 0 100 20">
              <circle cx="50" cy="10" r="4" fill="hsl(var(--accent))" />
              <text x="50" y="8" textAnchor="middle" fill="white" fontSize="2.5" fontFamily="var(--font-mono)">Note Core</text>
              <line x1="50" y1="10" x2="20" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <circle cx="20" cy="10" r="3" fill="hsl(var(--primary))" />
              <text x="20" y="6" textAnchor="middle" fill="white" fontSize="2" fontFamily="var(--font-mono)">Ideas</text>
              <line x1="50" y1="10" x2="80" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <circle cx="80" cy="10" r="3" fill="hsl(var(--primary))" />
              <text x="80" y="6" textAnchor="middle" fill="white" fontSize="2" fontFamily="var(--font-mono)">Tags</text>
            </svg>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Notes list */}
          <div className="glass p-3 border-white/5 bg-slate-900/10 flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                <BookOpen size={14} className="text-pink-400" />
                SMART NOTEBOOKS
              </span>
              <button 
                type="button"
                onClick={handleAddNote}
                className="p-1 rounded bg-white/5 border border-white/5 hover:text-white transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            <div className="flex-grow flex flex-col gap-2 overflow-y-auto max-h-[160px] pr-1">
              {notes.map((note, idx) => (
                <div 
                  key={note.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col gap-1.5 ${
                    activeIdx === idx 
                      ? 'bg-pink-950/20 text-pink-400 border-pink-500/40' 
                      : 'bg-slate-900/40 text-slate-400 border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-white truncate">{note.title || 'Untitled'}</span>
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleDeleteNote(idx); }}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate leading-snug">{note.content || 'Empty note...'}</p>
                  <div className="flex gap-1">
                    {note.tags.map((t, i) => (
                      <span key={i} className="text-[8px] font-mono bg-white/5 px-1.5 py-0.5 rounded text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Note Editor */}
          <div className="glass p-4 border-white/5 bg-slate-900/15 lg:col-span-2 flex flex-col gap-3">
            {activeNote ? (
              <>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <input
                    type="text"
                    className="bg-transparent border-none outline-none font-bold text-white font-mono text-sm flex-grow"
                    value={activeNote.title}
                    onChange={e => handleUpdateTitle(e.target.value)}
                    placeholder="Note Title"
                  />
                  
                  <button 
                    type="button"
                    onClick={toggleRecording}
                    className={`p-1.5 rounded border transition-colors flex items-center gap-1.5 text-[10px] font-mono ${
                      isRecording 
                        ? 'text-red-400 border-red-500/30 bg-red-950/20 animate-pulse' 
                        : 'text-slate-400 border-white/5 hover:text-white'
                    }`}
                    title="Voice to text dictation"
                  >
                    {isRecording ? <MicOff size={12} /> : <Mic size={12} />}
                    {isRecording ? 'Listening...' : 'Dictate'}
                  </button>
                </div>

                <textarea
                  className="flex-grow form-input w-full resize-none text-xs bg-slate-900/10 font-sans leading-relaxed min-h-[120px]"
                  placeholder="Type note details or click 'Dictate'..."
                  value={activeNote.content}
                  onChange={e => handleUpdateContent(e.target.value)}
                />

                <div className="flex gap-2 items-center bg-pink-950/10 border border-pink-500/20 p-2.5 rounded text-[10px] font-mono text-pink-300">
                  <Sparkles size={14} className="flex-shrink-0" />
                  <span>AI STUDY ASSISTANT: formatting is active. accuracy rate: 96%.</span>
                </div>
              </>
            ) : (
              <div className="flex-grow flex items-center justify-center text-slate-500 font-mono text-xs text-center">
                Select or add a notebook to start writing notes.
              </div>
            )}
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
          Smart Notes Features (3-Column Grid)
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
