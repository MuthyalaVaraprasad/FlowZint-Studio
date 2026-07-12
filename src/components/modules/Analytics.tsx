import React, { useState } from 'react';
import { BarChart3, LineChart, Download, FileSpreadsheet, Activity, Sparkles } from 'lucide-react';

const features = [
  "AI Business Insights", "KPI Dashboard", "Executive Dashboard", "Goal Achievement Tracker",
  "Team Comparison", "Forecast Models", "Revenue Heatmaps", "User Growth Analysis",
  "Churn Analysis", "Funnel Analytics", "Geographic Analytics", "AI Recommendation Cards",
  "Data Export", "Scheduled Reports", "Dashboard Sharing", "Live Data Streaming",
  "AI Trend Prediction", "Benchmark Comparison", "Alert Center", "AI Storytelling Reports",
  "Cohort Retention Analysis", "Interactive Drilldown Graphs", "Custom Metric Builder", "AI Anomalous Data Alert",
  "Real-Time Query Console", "Multi-Source Data Merge", "Predictive Trend Overlay", "Report PDF Generator",
  "SQL Query Sandbox", "KPI Target Slider"
];

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
  const [metric, setMetric] = useState<'users' | 'requests'>('users');
  const [featureAlert, setFeatureAlert] = useState<string | null>(null);

  const [showGeo, setShowGeo] = useState(false);
  const [showKPIs, setShowKPIs] = useState(false);

  const chartData = {
    '7d': {
      users: [120, 150, 180, 190, 220, 250, 310],
      requests: [1200, 1340, 1560, 1890, 2100, 2300, 2890],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    '30d': {
      users: [80, 110, 140, 170, 200, 240, 290, 330, 380, 420, 480, 520],
      requests: [900, 1100, 1250, 1500, 1800, 2100, 2450, 2700, 3000, 3300, 3800, 4100],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  const data = chartData[timeRange][metric];
  const labels = chartData[timeRange].labels;
  const maxVal = Math.max(...data) * 1.15;

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Label,Value\n" 
      + labels.map((l, i) => `${l},${data[i]}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `flow_zint_analytics_${metric}_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerFeature = (feat: string) => {
    setFeatureAlert(`Feature Simulated: "${feat}". Processing state update...`);

    if (feat === "Geographic Analytics") {
      setShowGeo(!showGeo);
      setShowKPIs(false);
    } else if (feat === "KPI Dashboard" || feat === "Executive Dashboard") {
      setShowKPIs(!showKPIs);
      setShowGeo(false);
    } else if (feat === "Live Data Streaming") {
      setFeatureAlert("Live WebSockets operational. Refresh interval set to 150ms.");
    } else if (feat === "Alert Center") {
      setFeatureAlert("Warning: CRM lead conversion probability is down 2%. Check pipelines.");
    }

    setTimeout(() => setFeatureAlert(null), 3000);
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Main Analytics App */}
      <div className="w-full flex flex-col gap-4 text-slate-200">
        {featureAlert && (
          <div className="bg-cyan-950/80 border border-cyan-500/30 p-2 text-center text-xs font-mono text-cyan-300 flex items-center justify-center gap-2 animate-bounce">
            <Activity size={14} className="animate-spin" />
            {featureAlert}
          </div>
        )}

        {showGeo && (
          <div className="glass p-4 border-cyan-500/30 bg-cyan-950/10 flex flex-col gap-2.5 animate-float">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase">🌐 Geographic user breakdown</h4>
              <button type="button" onClick={() => setShowGeo(false)} className="text-[10px] font-mono text-slate-500 hover:text-white">Dismiss</button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <div>North America</div>
                <strong className="text-white mt-1 block">45%</strong>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <div>Europe</div>
                <strong className="text-white mt-1 block">30%</strong>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <div>Asia-Pacific</div>
                <strong className="text-white mt-1 block">25%</strong>
              </div>
            </div>
          </div>
        )}

        {showKPIs && (
          <div className="glass p-4 border-purple-500/30 bg-purple-950/10 flex flex-col gap-2.5 animate-float">
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <h4 className="text-xs font-mono font-bold text-purple-400 uppercase">📊 Executive KPI Targets</h4>
              <button type="button" onClick={() => setShowKPIs(false)} className="text-[10px] font-mono text-slate-500 hover:text-white">Dismiss</button>
            </div>
            <div className="grid grid-cols-2 gap-3 font-mono text-[10px] text-slate-300">
              <div className="flex justify-between">
                <span>Revenue Target:</span>
                <span className="text-emerald-400 font-bold">$500K / $450K</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Active Users:</span>
                <span className="text-emerald-400 font-bold">12K / 10K</span>
              </div>
            </div>
          </div>
        )}

        {/* Top Filter Bar */}
        <div className="glass p-4 border-white/5 bg-slate-900/10 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="text-cyan-400" size={16} />
            <span className="font-mono text-xs font-bold text-white uppercase">STATS REPORT PANEL</span>
          </div>
          <div className="flex gap-2 items-center">
            <select 
              className="bg-slate-950 text-slate-300 border border-white/5 rounded px-2.5 py-1 text-xs cursor-pointer outline-none"
              value={metric}
              onChange={e => setMetric(e.target.value as 'users' | 'requests')}
            >
              <option value="users">Active Users</option>
              <option value="requests">AI Prompt Queries</option>
            </select>

            <div className="flex bg-white/5 border border-white/5 rounded p-0.5">
              <button 
                type="button"
                onClick={() => setTimeRange('7d')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-mono transition-all border-0 outline-none cursor-pointer ${timeRange === '7d' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-transparent text-slate-400 hover:text-white'}`}
              >
                7 Days
              </button>
              <button 
                type="button"
                onClick={() => setTimeRange('30d')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-mono transition-all border-0 outline-none cursor-pointer ${timeRange === '30d' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-transparent text-slate-400 hover:text-white'}`}
              >
                12 Months
              </button>
            </div>

            <button 
              type="button"
              onClick={handleExportCSV}
              className="p-1 px-2.5 bg-white/5 border border-white/5 text-[10px] font-mono hover:text-white rounded flex items-center gap-1.5 transition-colors"
            >
              <Download size={12} /> CSV Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* SVG Sparkline Charts */}
          <div className="glass p-4 border-white/5 bg-slate-900/10 lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <LineChart size={14} className="text-cyan-400" />
              Productivity Trend Chart
            </h4>
            <div className="flex-grow min-h-[160px] relative flex items-end">
              <svg className="w-full h-full min-h-[140px]" viewBox="0 0 500 200" preserveAspectRatio="none">
                {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
                  <line key={i} x1={30} y1={20 + p * 150} x2={490} y2={20 + p * 150} stroke="rgba(255,255,255,0.03)" strokeWidth={0.8} />
                ))}

                {(() => {
                  const points = data.map((val, idx) => {
                    const x = 30 + (idx / (data.length - 1)) * 450;
                    const y = 170 - (val / maxVal) * 150;
                    return { x, y };
                  });

                  const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                  const areaD = `${pathD} L ${points[points.length - 1].x} 170 L 30 170 Z`;

                  return (
                    <>
                      <path d={areaD} fill="url(#cyanGlow)" />
                      <path d={pathD} fill="none" stroke="hsl(var(--accent))" strokeWidth="2.5" />
                      {points.map((p, i) => (
                        <g key={i}>
                          <circle cx={p.x} cy={p.y} r="4" fill="hsl(var(--accent))" className="cursor-pointer" />
                        </g>
                      ))}
                      <defs>
                        <linearGradient id="cyanGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(6, 182, 212, 0.2)" />
                          <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                        </linearGradient>
                      </defs>
                    </>
                  );
                })()}
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6 text-[9px] font-mono text-slate-500">
                {labels.map((l, idx) => <span key={idx}>{l}</span>)}
              </div>
            </div>
          </div>

          {/* AI Insight report */}
          <div className="glass p-4 border-white/5 bg-slate-900/15 flex flex-col gap-3 justify-between">
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Activity size={14} className="text-cyan-400" />
                AI Trend Prediction
              </h4>

              <div className="flex flex-col gap-3 justify-center">
                <div className="p-3 rounded bg-white/5 border border-white/5">
                  <span className="block text-[9px] text-slate-400 font-mono">KPI INSIGHTS SCORE</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">+34.8%</span>
                </div>

                <div className="p-3 rounded bg-white/5 border border-white/5">
                  <span className="block text-[9px] text-slate-400 font-mono">CHURN INDEX THRESHOLD</span>
                  <span className="text-lg font-bold text-purple-400 font-mono">4.2%</span>
                </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleExportCSV}
              className="btn-primary w-full justify-center text-xs mt-4"
              style={{ padding: '0.6rem' }}
            >
              <FileSpreadsheet size={14} /> Download CSV Report
            </button>
          </div>
        </div>
      </div>

      {/* 20 Features bottom grid layout */}
      <div 
        className="w-full glass p-4 border-white/5 bg-slate-900/20"
        style={{ borderRadius: '12px' }}
      >
        <h4 className="text-[10px] font-mono font-bold text-slate-400 mb-3 uppercase border-b border-white/5 pb-1.5 flex items-center gap-1.5">
          <Sparkles size={12} className="text-cyan-400" />
          Analytics Features (3-Column Grid)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {features.map((feat, idx) => (
            <button
              key={idx}
              onClick={() => triggerFeature(feat)}
              className="feature-btn flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0"></span>
              <span className="truncate">{feat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
