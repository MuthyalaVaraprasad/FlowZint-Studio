import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Code, Briefcase, Award, Send } from 'lucide-react';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projects = [
  {
    name: 'Flow Zint Studio',
    tech: 'React, TypeScript, Canvas, Web Speech API',
    desc: 'An intelligent unified operating workspace with 10+ AI-powered modules, interactive nodes, and voice control.'
  },
  {
    name: 'Smart Retail Analytics',
    tech: 'Python, TensorFlow, React, FastAPI',
    desc: 'Computer vision platform tracking store traffic, heatmaps, and product interactions with 94% accuracy.'
  },
  {
    name: 'Decentralized Finance Portal',
    tech: 'Next.js, Solidity, Web3.js, Tailwind',
    desc: 'Secure non-custodial crypto dashboard integrating lending pools, yield aggregation, and real-time gas tracking.'
  },
  {
    name: 'DocuQuery AI',
    tech: 'Flask, LangChain, OpenAI API, PostgreSQL',
    desc: 'Enterprise document intelligence system generating vector indexes, semantic answers, and automatic relationship graphs.'
  }
];

const skills = [
  { category: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'Redux', 'CSS Grid/Flex', 'Canvas API'] },
  { category: 'Backend & DB', items: ['Node.js', 'Express', 'Python', 'FastAPI', 'MongoDB', 'PostgreSQL', 'SQL'] },
  { category: 'AI & Tools', items: ['Gemini API', 'LangChain', 'TensorFlow', 'Git & CI/CD', 'Docker', 'Vercel'] }
];

const certifications = [
  'Google Advanced AI Agent Developer Certification',
  'DeepLearning.AI Generative AI with LLMs',
  'Meta Full Stack Professional Software Engineer',
  'AWS Certified Solutions Architect',
  'MongoDB Certified Associate Developer'
];

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'certs' | 'terminal'>('profile');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Flow Zint Studio [Version 1.0.0]',
    '(c) Muthyala Vara Prasad. All rights reserved.',
    '',
    'Type "help" to see available terminal command queries.',
    ''
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, activeTab]);

  if (!isOpen) return null;

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let reply = `Command not recognized: "${cmd}". Type "help" for a list of commands.`;

    if (cmd === 'help') {
      reply = `Available commands:
  - profile: View Developer portfolio summary.
  - projects: List full-stack software achievements.
  - skills: Output expertise matrix.
  - certs: Output list of certifications.
  - clear: Clear terminal screens logs.
  - contact: Display developer contact details.`;
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'profile') {
      reply = `Muthyala Vara Prasad - Full Stack AI Developer
Passionate about building AI-powered web applications that solve real-world productivity hurdles.
Dedication level: 100%
Technologies mastered: 10+ core technologies`;
    } else if (cmd === 'projects') {
      reply = projects.map(p => `[${p.name}] - ${p.tech}\n  ${p.desc}`).join('\n\n');
    } else if (cmd === 'skills') {
      reply = skills.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n');
    } else if (cmd === 'certs') {
      reply = certifications.map(c => `• ${c}`).join('\n');
    } else if (cmd === 'contact') {
      reply = `Email: varaprasad@example.com
LinkedIn: linkedin.com/in/vara-prasad
GitHub: github.com/vara-prasad
Location: India`;
    }

    setTerminalLogs(prev => [...prev, `vara-prasad@studio:~$ ${terminalInput}`, reply, '']);
    setTerminalInput('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="glass w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-purple-500/30 flex flex-col"
        style={{
          maxHeight: '85vh',
          height: '600px',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div 
          className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-white/5"
          style={{
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-600 cursor-pointer flex items-center justify-center text-[10px] text-red-950 font-bold">×</span>
              <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 cursor-not-allowed"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-green-500/80 cursor-not-allowed"></span>
            </div>
            <span className="text-xs text-slate-400 ml-4 flex items-center gap-1.5">
              <Terminal size={14} className="text-purple-400" />
              vara-prasad-portfolio -- bash
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div 
          className="flex border-b border-white/5 bg-slate-950/40 text-sm font-mono"
        >
          {(['profile', 'projects', 'skills', 'certs', 'terminal'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 border-r border-white/5 transition-all relative capitalize ${
                activeTab === tab 
                  ? 'bg-purple-950/20 text-purple-400 font-semibold border-b-2 border-b-purple-500' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab === 'terminal' ? 'CLI Terminal' : tab}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-black/40 text-slate-300 font-sans leading-relaxed">
          {activeTab === 'profile' && (
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-purple-500/40 shadow-lg shadow-purple-500/10">
                  {/* Visual Portrait Mockup */}
                  <svg className="w-full h-full bg-slate-800 text-purple-400 p-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                  </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-4 border-slate-900 animate-pulse"></div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-1">Muthyala Vara Prasad</h3>
                <p className="text-purple-400 font-mono text-sm mb-4">Full Stack Developer | AI Solutions Enthusiast</p>
                <p className="text-slate-400 text-sm mb-4">
                  Passionate about building AI-powered web applications that solve real-world productivity challenges. Committed to designing responsive architectures, clean schema layouts, and fluid micro-interactions.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="glass p-3 text-center border-purple-500/20">
                    <span className="block text-xl font-bold text-white font-mono">20+</span>
                    <span className="text-xs text-slate-400">Projects</span>
                  </div>
                  <div className="glass p-3 text-center border-purple-500/20">
                    <span className="block text-xl font-bold text-white font-mono">10+</span>
                    <span className="text-xs text-slate-400">Technologies</span>
                  </div>
                  <div className="glass p-3 text-center border-purple-500/20">
                    <span className="block text-xl font-bold text-white font-mono">5+</span>
                    <span className="text-xs text-slate-400">Certifications</span>
                  </div>
                  <div className="glass p-3 text-center border-purple-500/20">
                    <span className="block text-xl font-bold text-white font-mono">100%</span>
                    <span className="text-xs text-slate-400">Dedication</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Briefcase className="text-purple-400" size={18} />
                Software Architecture Showcase
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((proj, idx) => (
                  <div key={idx} className="glass p-4 border-white/5 hover:border-purple-500/30">
                    <h4 className="font-bold text-white mb-1 font-mono text-sm">{proj.name}</h4>
                    <p className="text-purple-400 text-xs mb-2 font-mono">{proj.tech}</p>
                    <p className="text-slate-400 text-xs">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="flex flex-col gap-5">
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <Code className="text-purple-400" size={18} />
                Technical Competence Matrix
              </h3>
              {skills.map((skillGroup, idx) => (
                <div key={idx}>
                  <h4 className="text-sm font-semibold text-purple-300 font-mono mb-2">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((sk, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="px-3 py-1.5 rounded-md text-xs font-mono border"
                        style={{
                          background: 'rgba(139, 92, 246, 0.05)',
                          borderColor: 'rgba(139, 92, 246, 0.15)',
                          color: 'white'
                        }}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'certs' && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Award className="text-purple-400" size={18} />
                Professional Certifications
              </h3>
              <ul className="flex flex-col gap-3 font-mono text-sm">
                {certifications.map((cert, idx) => (
                  <li key={idx} className="flex gap-3 items-start p-2 rounded bg-white/5 border border-white/5">
                    <span className="text-purple-400">0{idx + 1}.</span>
                    <span className="text-slate-200">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'terminal' && (
            <div 
              className="flex flex-col h-full font-mono text-sm bg-black/60 p-4 rounded-lg border border-purple-500/20"
              style={{ minHeight: '350px' }}
            >
              <div className="flex-1 overflow-y-auto flex flex-col gap-1 mb-4 select-text">
                {terminalLogs.map((log, idx) => (
                  <pre key={idx} className="whitespace-pre-wrap text-emerald-400/90 leading-relaxed">{log}</pre>
                ))}
                <div ref={terminalEndRef} />
              </div>
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-white/10 pt-3">
                <span className="text-purple-400 font-bold">vara-prasad@studio:~$</span>
                <input
                  type="text"
                  className="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono"
                  value={terminalInput}
                  onChange={e => setTerminalInput(e.target.value)}
                  placeholder="type command..."
                  autoFocus
                />
                <button type="submit" className="text-purple-400 hover:text-white transition-colors">
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
