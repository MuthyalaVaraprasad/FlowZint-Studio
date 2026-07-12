import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ListTodo, Sparkles, Activity } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  column: 'todo' | 'progress' | 'review' | 'done';
  deadline: string;
}

const features = [
  "AI Task Priority Prediction", "AI Deadline Prediction", "Smart Daily Planner", "Workload Balancer",
  "Focus Mode", "Pomodoro Timer", "Team Capacity View", "Sprint Planning",
  "Sprint Retrospective", "Task Templates", "Task Dependencies", "Critical Path Analysis",
  "Project Health Score", "Milestone Tracking", "Gantt Chart", "AI Auto Scheduling",
  "Calendar Sync", "Goal Progress Tracker", "Productivity Heatmap", "Daily Task Digest",
  "Automated Time Tracking", "AI Resource Bottleneck Alert", "Smart Task Delegation", "Subtask Auto-Generation",
  "Kanban Auto-Sorting", "AI Task Risk Assessment", "Team Velocity Analysis", "AI Burnup Forecasting",
  "Focus Soundscapes Sync", "Milestone Auto-Push"
];

export const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete Flow Zint architecture draft', priority: 'high', column: 'done', deadline: 'Today' },
    { id: '2', title: 'Connect MongoDB schema models', priority: 'high', column: 'progress', deadline: 'Tomorrow' },
    { id: '3', title: 'Integrate Web Speech dictation in Notes', priority: 'medium', column: 'todo', deadline: '2 days' },
    { id: '4', title: 'Refactor canvas frame loop for performance', priority: 'low', column: 'review', deadline: 'Expired' }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [featureAlert, setFeatureAlert] = useState<string | null>(null);
  
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(1500); 
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [showGantt, setShowGantt] = useState(false);

  useEffect(() => {
    let timer: number;
    if (pomodoroActive && pomodoroTime > 0) {
      timer = window.setInterval(() => {
        setPomodoroTime(t => t - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setPomodoroActive(false);
      setFeatureAlert("Focus session complete! Time to rest.");
    }
    return () => clearInterval(timer);
  }, [pomodoroActive, pomodoroTime]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Math.random().toString(),
      title: newTaskTitle,
      priority: newTaskPriority,
      column: 'todo',
      deadline: '3 days'
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
  };

  const moveTask = (id: string, newColumn: Task['column']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, column: newColumn } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const getPriorityColor = (p: Task['priority']) => {
    if (p === 'high') return 'text-red-400 border-red-500/30 bg-red-950/20';
    if (p === 'medium') return 'text-yellow-400 border-yellow-500/30 bg-yellow-950/20';
    return 'text-blue-400 border-blue-500/30 bg-blue-950/20';
  };

  const triggerFeature = (feat: string) => {
    setFeatureAlert(`Feature Simulated: "${feat}". Processing state update...`);

    if (feat === "Pomodoro Timer") {
      setShowPomodoro(true);
      setShowGantt(false);
      setPomodoroTime(1500);
      setPomodoroActive(true);
    } else if (feat === "Gantt Chart") {
      setShowGantt(true);
      setShowPomodoro(false);
    } else if (feat === "AI Deadline Prediction") {
      setTasks(prev => prev.map(t => {
        if (t.column === 'todo') return { ...t, deadline: 'Predicted: 18 hours remaining' };
        if (t.column === 'progress') return { ...t, deadline: 'Predicted: 32 hours remaining' };
        return t;
      }));
    } else if (feat === "Smart Daily Planner") {
      setNewTaskTitle("Review today's high priority milestones");
    }

    setTimeout(() => setFeatureAlert(null), 3000);
  };

  const columns: { id: Task['column']; title: string; color: string }[] = [
    { id: 'todo', title: 'Daily Planner', color: 'border-blue-500/20 text-blue-400' },
    { id: 'progress', title: 'In Progress', color: 'border-yellow-500/20 text-yellow-400' },
    { id: 'review', title: 'Focus Review', color: 'border-purple-500/20 text-purple-400' },
    { id: 'done', title: 'Completed', color: 'border-green-500/20 text-green-400' }
  ];

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Main Task App */}
      <div className="w-full flex flex-col gap-4 text-slate-200">
        {featureAlert && (
          <div className="bg-blue-950/80 border border-blue-500/30 p-2 text-center text-xs font-mono text-blue-300 flex items-center justify-center gap-2 animate-bounce">
            <Activity size={14} className="animate-spin" />
            {featureAlert}
          </div>
        )}

        {/* Feature Widget - Pomodoro Timer */}
        {showPomodoro && (
          <div className="glass p-4 border-yellow-500/30 bg-yellow-950/10 flex items-center justify-between gap-4 animate-float">
            <div>
              <h4 className="text-xs font-mono font-bold text-yellow-400 uppercase">🍅 Focus Timer Mode</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Stay focused. Silent notification trigger active.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-2xl font-bold text-white">{formatTime(pomodoroTime)}</span>
              <button 
                type="button"
                onClick={() => setPomodoroActive(!pomodoroActive)} 
                className="px-3 py-1 rounded border border-yellow-500/30 text-xs font-mono text-yellow-400 hover:text-white"
              >
                {pomodoroActive ? 'Pause' : 'Start'}
              </button>
              <button 
                type="button"
                onClick={() => { setShowPomodoro(false); setPomodoroActive(false); }} 
                className="text-[10px] font-mono text-slate-500 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Feature Widget - Gantt Chart */}
        {showGantt && (
          <div className="glass p-4 border-cyan-500/30 bg-cyan-950/10 flex flex-col gap-3 animate-float">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase">📊 Gantt Project Timeline</h4>
              <button type="button" onClick={() => setShowGantt(false)} className="text-[10px] font-mono text-slate-500 hover:text-white">Dismiss</button>
            </div>
            <svg className="w-full h-24" viewBox="0 0 100 30" preserveAspectRatio="none">
              <line x1="20" y1="0" x2="20" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              <line x1="45" y1="0" x2="45" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              <line x1="70" y1="0" x2="70" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              <rect x="5" y="4" width="30" height="4" rx="1" fill="rgba(139, 92, 246, 0.4)" stroke="hsl(var(--primary))" strokeWidth="0.3" />
              <text x="6" y="7" fill="white" fontSize="2.5" fontFamily="var(--font-mono)">Architecture</text>
              <rect x="25" y="12" width="40" height="4" rx="1" fill="rgba(6, 182, 212, 0.4)" stroke="hsl(var(--accent))" strokeWidth="0.3" />
              <text x="26" y="15" fill="white" fontSize="2.5" fontFamily="var(--font-mono)">MongoDB Sync</text>
              <rect x="60" y="20" width="35" height="4" rx="1" fill="rgba(16, 185, 129, 0.4)" stroke="#10B981" strokeWidth="0.3" />
              <text x="61" y="23" fill="white" fontSize="2.5" fontFamily="var(--font-mono)">QA Deploy</text>
            </svg>
          </div>
        )}

        {/* Create Task Form */}
        <form onSubmit={handleAddTask} className="glass p-4 border-white/5 flex flex-wrap gap-3 items-end bg-slate-900/20">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-mono text-slate-400 mb-1">TASK NAME</label>
            <input
              type="text"
              className="form-input w-full"
              placeholder="Implement priority models..."
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
            />
          </div>
          <div className="w-36">
            <label className="block text-xs font-mono text-slate-400 mb-1">AI DEADLINE</label>
            <select
              className="form-input w-full cursor-pointer bg-slate-950 text-slate-200 text-xs"
              value={newTaskPriority}
              onChange={e => setNewTaskPriority(e.target.value as Task['priority'])}
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" style={{ height: '42px', padding: '0 1.2rem' }}>
            <Plus size={16} /> Add Task
          </button>
        </form>

        {/* Kanban Board Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map(col => {
            const colTasks = tasks.filter(t => t.column === col.id);
            return (
              <div key={col.id} className="glass p-3 flex flex-col gap-3 border-white/5 bg-slate-900/10 min-h-[200px]">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className={`text-xs font-mono font-bold tracking-wide flex items-center gap-1.5 ${col.color.split(' ')[1]}`}>
                    <ListTodo size={14} />
                    {col.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-slate-400">
                    {colTasks.length}
                  </span>
                </div>

                <div className="flex-grow flex flex-col gap-3 overflow-y-auto max-h-[220px] pr-1">
                  {colTasks.map(t => (
                    <div 
                      key={t.id} 
                      className="p-3 rounded-lg border bg-slate-900/60 border-white/5 flex flex-col gap-2 group transition-all hover:border-purple-500/20"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-medium text-slate-200 leading-snug">{t.title}</span>
                        <button 
                          type="button"
                          onClick={() => deleteTask(t.id)} 
                          className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-1">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono border uppercase tracking-wider ${getPriorityColor(t.priority)}`}>
                          {t.priority}
                        </span>
                        <div className="text-[9px] text-slate-400 font-mono truncate max-w-[100px]" title={t.deadline}>
                          {t.deadline}
                        </div>
                      </div>

                      <div className="flex gap-1 border-t border-white/5 pt-2 mt-1">
                        {col.id !== 'todo' && (
                          <button 
                            type="button"
                            onClick={() => {
                              const steps: Task['column'][] = ['todo', 'progress', 'review', 'done'];
                              const prevCol = steps[steps.indexOf(col.id) - 1];
                              moveTask(t.id, prevCol);
                            }}
                            className="text-[9px] font-mono text-slate-500 hover:text-slate-300 bg-transparent border-0 outline-none cursor-pointer"
                          >
                            &lt; Prev
                          </button>
                        )}
                        <div className="flex-grow"></div>
                        {col.id !== 'done' && (
                          <button 
                            type="button"
                            onClick={() => {
                              const steps: Task['column'][] = ['todo', 'progress', 'review', 'done'];
                              const nextCol = steps[steps.indexOf(col.id) + 1];
                              moveTask(t.id, nextCol);
                            }}
                            className="text-[9px] font-mono text-purple-400 hover:text-purple-300 ml-auto bg-transparent border-0 outline-none cursor-pointer"
                          >
                            Next &gt;
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 20 Features bottom grid layout */}
      <div 
        className="w-full glass p-4 border-white/5 bg-slate-900/20"
        style={{ borderRadius: '12px' }}
      >
        <h4 className="text-[10px] font-mono font-bold text-slate-400 mb-3 uppercase border-b border-white/5 pb-1.5 flex items-center gap-1.5">
          <Sparkles size={12} className="text-blue-400" />
          Task Management Features (3-Column Grid)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {features.map((feat, idx) => (
            <button
              key={idx}
              onClick={() => triggerFeature(feat)}
              className="feature-btn flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
              <span className="truncate">{feat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
