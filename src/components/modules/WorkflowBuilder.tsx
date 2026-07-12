import React, { useState } from 'react';
import { GitCommit, Play, RefreshCw, Layers, Sparkles, Activity } from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'db';
  label: string;
  x: number;
  y: number;
  status: 'idle' | 'running' | 'success';
}

const features = [
  "AI Flow Optimizer", "Auto Workflow Suggestions", "Drag-and-Drop Templates", "API Connector Library",
  "Database Triggers", "File Automation", "Approval Chains", "Workflow Monitoring",
  "Scheduled Automation", "AI Error Prediction", "Auto Retry System", "Parallel Workflow Execution",
  "Version History", "Automation Testing", "Execution Reports", "AI Performance Analysis",
  "Integration Marketplace", "Workflow Backup", "AI Process Mining", "Automation Health Dashboard",
  "Conditional Logic Branches", "Webhook Request Tester", "Variable Scope Manager", "AI Trigger Predictor",
  "Workflow Rate Limiting", "Automation Execution Replay", "Error Alert Channels", "Encrypted State Store",
  "Workflow Export/Import", "API Response Parser"
];

export const WorkflowBuilder: React.FC = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: '1', type: 'trigger', label: 'Lead Created', x: 40, y: 100, status: 'idle' },
    { id: '2', type: 'action', label: 'Send Welcome Email', x: 180, y: 100, status: 'idle' },
    { id: '3', type: 'condition', label: 'If Email Opened', x: 320, y: 100, status: 'idle' },
    { id: '4', type: 'db', label: 'Update CRM Record', x: 460, y: 100, status: 'idle' }
  ]);
  const [simulating, setSimulating] = useState(false);
  const [featureAlert, setFeatureAlert] = useState<string | null>(null);

  const [showIntegrations, setShowIntegrations] = useState(false);
  const [parallelNodes, setParallelNodes] = useState<WorkflowNode[]>([]);

  const addNode = (type: WorkflowNode['type']) => {
    const labels = {
      trigger: 'Custom Webhook',
      action: 'SMS Notification',
      condition: 'Verify Signature',
      db: 'Cloud Sync Backup'
    };

    const newX = nodes.length > 0 ? nodes[nodes.length - 1].x + 130 : 40;
    const newNode: WorkflowNode = {
      id: Math.random().toString(),
      type,
      x: newX,
      y: 100,
      label: labels[type],
      status: 'idle'
    };

    setNodes(prev => [...prev, newNode]);
  };

  const runSimulation = () => {
    if (simulating) return;
    setSimulating(true);

    setNodes(prev => prev.map(n => ({ ...n, status: 'idle' })));
    setParallelNodes(prev => prev.map(n => ({ ...n, status: 'idle' })));

    let currentIdx = 0;
    const runNext = () => {
      if (currentIdx >= nodes.length) {
        setSimulating(false);
        return;
      }

      setNodes(prev => prev.map((n, idx) => {
        if (idx === currentIdx) return { ...n, status: 'running' };
        if (idx < currentIdx) return { ...n, status: 'success' };
        return n;
      }));

      if (parallelNodes.length > 0) {
        setParallelNodes(prev => prev.map((n, idx) => {
          if (idx === currentIdx) return { ...n, status: 'running' };
          if (idx < currentIdx) return { ...n, status: 'success' };
          return n;
        }));
      }

      setTimeout(() => {
        setNodes(prev => prev.map((n, idx) => {
          if (idx === currentIdx) return { ...n, status: 'success' };
          return n;
        }));
        if (parallelNodes.length > 0) {
          setParallelNodes(prev => prev.map((n, idx) => {
            if (idx === currentIdx) return { ...n, status: 'success' };
            return n;
          }));
        }
        currentIdx++;
        runNext();
      }, 1000);
    };

    runNext();
  };

  const triggerFeature = (feat: string) => {
    setFeatureAlert(`Feature Simulated: "${feat}". Processing state update...`);

    if (feat === "Parallel Workflow Execution") {
      setParallelNodes([
        { id: 'p1', type: 'trigger', label: 'Parallel Thread', x: 40, y: 180, status: 'idle' },
        { id: 'p2', type: 'action', label: 'Push Slack Alert', x: 180, y: 180, status: 'idle' }
      ]);
      setFeatureAlert("Parallel workflow nodes branch added!");
    } else if (feat === "API Connector Library" || feat === "Integration Marketplace") {
      setShowIntegrations(!showIntegrations);
    } else if (feat === "Drag-and-Drop Templates") {
      setNodes([
        { id: 't1', type: 'trigger', label: 'Invoice Created', x: 40, y: 100, status: 'idle' },
        { id: 't2', type: 'action', label: 'Extract OCR Text', x: 180, y: 100, status: 'idle' },
        { id: 't3', type: 'db', label: 'Stripe Payment', x: 320, y: 100, status: 'idle' }
      ]);
      setParallelNodes([]);
      setFeatureAlert("Template loaded: Stripe OCR Billing automation path.");
    }

    setTimeout(() => setFeatureAlert(null), 3000);
  };

  const getNodeColor = (n: WorkflowNode) => {
    if (n.status === 'running') return 'border-yellow-400 text-yellow-400 bg-yellow-950/20 shadow-[0_0_15px_rgba(234,179,8,0.3)]';
    if (n.status === 'success') return 'border-green-400 text-green-400 bg-green-950/20 shadow-[0_0_15px_rgba(34,197,94,0.3)]';
    
    if (n.type === 'trigger') return 'border-purple-500/30 text-purple-400 bg-purple-950/10';
    if (n.type === 'condition') return 'border-cyan-500/30 text-cyan-400 bg-cyan-950/10';
    if (n.type === 'db') return 'border-emerald-500/30 text-emerald-400 bg-emerald-950/10';
    return 'border-orange-500/30 text-orange-400 bg-orange-950/10';
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Main Workflow Builder */}
      <div className="w-full flex flex-col gap-4 text-slate-200">
        {featureAlert && (
          <div className="bg-rose-950/80 border border-rose-500/30 p-2 text-center text-xs font-mono text-rose-300 flex items-center justify-center gap-2 animate-bounce">
            <Activity size={14} className="animate-spin" />
            {featureAlert}
          </div>
        )}

        {showIntegrations && (
          <div className="glass p-4 border-rose-500/30 bg-rose-950/10 flex flex-col gap-2.5 animate-float">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h4 className="text-xs font-mono font-bold text-rose-400 uppercase">🔌 API Connector marketplace</h4>
              <button type="button" onClick={() => setShowIntegrations(false)} className="text-[10px] font-mono text-slate-500 hover:text-white">Dismiss</button>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono">
              <span className="p-1 px-2.5 rounded bg-white/5 border border-white/5">Slack Webhook</span>
              <span className="p-1 px-2.5 rounded bg-white/5 border border-white/5">Stripe Gateway</span>
              <span className="p-1 px-2.5 rounded bg-white/5 border border-white/5">MongoDB Atlas</span>
              <span className="p-1 px-2.5 rounded bg-white/5 border border-white/5">Gmail SMTP</span>
            </div>
          </div>
        )}

        {/* Simulation Controls Toolbar */}
        <div className="glass p-4 border-white/5 bg-slate-900/10 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <Layers className="text-purple-400" size={16} />
            <span className="font-mono text-xs font-bold text-white uppercase">WORKFLOW BUILDER BOARD</span>
          </div>
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={() => addNode('trigger')} 
              className="px-2.5 py-1 bg-white/5 border border-white/5 text-[10px] font-mono hover:text-white rounded transition-colors"
            >
              + Trigger
            </button>
            <button 
              type="button"
              onClick={() => addNode('action')} 
              className="px-2.5 py-1 bg-white/5 border border-white/5 text-[10px] font-mono hover:text-white rounded transition-colors"
            >
              + Action
            </button>
          </div>
          <button 
            type="button"
            onClick={runSimulation} 
            disabled={simulating}
            className="btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
          >
            {simulating ? <RefreshCw className="animate-spin" size={14} /> : <Play size={14} />}
            {simulating ? 'Executing Flow...' : 'Test Run Workflow'}
          </button>
        </div>

        {/* Visual Workflow Nodes Board */}
        <div 
          className="w-full min-h-[220px] border border-white/5 bg-black/45 rounded-lg overflow-auto relative p-6 flex flex-col justify-center gap-8"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        >
          <div className="flex items-center justify-start gap-12">
            {nodes.map((node, idx) => (
              <React.Fragment key={node.id}>
                {idx > 0 && (
                  <div className="flex-shrink-0 flex items-center text-slate-600 font-bold font-mono text-xs select-none">
                    <span>──&gt;</span>
                  </div>
                )}
                <div 
                  className={`w-32 flex-shrink-0 p-3 border rounded-xl flex flex-col items-center text-center transition-all ${getNodeColor(node)}`}
                >
                  <h5 className="text-[10px] font-bold text-white mb-1 truncate w-full">{node.label}</h5>
                  <span className="text-[8px] text-slate-400 font-mono capitalize">{node.status}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          {parallelNodes.length > 0 && (
            <div className="flex items-center justify-start gap-12 border-t border-dashed border-white/5 pt-4">
              {parallelNodes.map((node, idx) => (
                <React.Fragment key={node.id}>
                  {idx > 0 && (
                    <div className="flex-shrink-0 flex items-center text-slate-600 font-bold font-mono text-xs select-none">
                      <span>──&gt;</span>
                    </div>
                  )}
                  <div 
                    className={`w-32 flex-shrink-0 p-3 border rounded-xl flex flex-col items-center text-center transition-all ${getNodeColor(node)}`}
                  >
                    <h5 className="text-[10px] font-bold text-white mb-1 truncate w-full">{node.label}</h5>
                    <span className="text-[8px] text-slate-400 font-mono capitalize">{node.status}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center bg-purple-950/10 border border-purple-500/20 p-2.5 rounded text-[10px] font-mono text-purple-300">
          <GitCommit size={14} className="flex-shrink-0" />
          <span>AI PROCESS MINING: predictions show a bottleneck reduction of 18.5% with custom paths.</span>
        </div>
      </div>

      {/* 20 Features bottom grid layout */}
      <div 
        className="w-full glass p-4 border-white/5 bg-slate-900/20"
        style={{ borderRadius: '12px' }}
      >
        <h4 className="text-[10px] font-mono font-bold text-slate-400 mb-3 uppercase border-b border-white/5 pb-1.5 flex items-center gap-1.5">
          <Sparkles size={12} className="text-rose-400" />
          Workflow Features (3-Column Grid)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {features.map((feat, idx) => (
            <button
              key={idx}
              onClick={() => triggerFeature(feat)}
              className="feature-btn flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0"></span>
              <span className="truncate">{feat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
