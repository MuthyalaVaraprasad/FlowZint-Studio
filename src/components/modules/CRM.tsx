import React, { useState } from 'react';
import { Target, TrendingUp, UserCheck, ShieldAlert, Sparkles, Activity } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  company: string;
  value: number;
  probability: number;
  status: 'new' | 'nurture' | 'negotiation' | 'closed';
  churnRisk: 'low' | 'medium' | 'high';
}

const features = [
  "AI Lead Prediction", "Customer Churn Prediction", "Revenue Forecast", "Customer Lifetime Value",
  "AI Opportunity Detection", "Lead Heatmap", "Deal Probability", "Sales Funnel Visualization",
  "Customer Journey Mapping", "Smart Contact Search", "AI Customer Summary", "AI Meeting Scheduler",
  "WhatsApp Integration", "SMS Integration", "CRM Mobile View", "Duplicate Contact Detection",
  "Customer Segmentation", "AI Sales Suggestions", "Referral Tracking", "Customer Satisfaction Dashboard",
  "AI Lead Scoring Engine", "Email Outreach Tracker", "Customer Ticket Auto-Route", "AI Sales Pitch Helper",
  "Customer Call Sentiment", "Automated Invoice Generation", "Referral Link Generator", "CRM Client History Map",
  "Sales Pipeline Audit", "Customer Feedback Analyzer"
];

export const CRM: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([
    { id: '1', name: 'James Howlett', company: 'WeaponX Logistics', value: 45000, probability: 80, status: 'negotiation', churnRisk: 'low' },
    { id: '2', name: 'Bruce Banner', company: 'Gamma Labs Inc', value: 120000, probability: 45, status: 'nurture', churnRisk: 'medium' },
    { id: '3', name: 'Tony Stark', company: 'Stark Industries', value: 500000, probability: 95, status: 'closed', churnRisk: 'low' },
    { id: '4', name: 'Peter Parker', company: 'Daily Bugle Press', value: 15000, probability: 10, status: 'new', churnRisk: 'high' }
  ]);
  const [featureAlert, setFeatureAlert] = useState<string | null>(null);

  const [showSalesSuggestions, setShowSalesSuggestions] = useState(false);
  const [showCustomerJourney, setShowCustomerJourney] = useState(false);

  const updateLeadStatus = (id: string, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        let prob = lead.probability;
        if (newStatus === 'new') prob = 10;
        else if (newStatus === 'nurture') prob = 40;
        else if (newStatus === 'negotiation') prob = 85;
        else if (newStatus === 'closed') prob = 100;
        return { ...lead, status: newStatus, probability: prob };
      }
      return lead;
    }));
  };

  const getChurnBadge = (risk: Lead['churnRisk']) => {
    if (risk === 'high') return 'text-red-400 bg-red-950/20 border-red-500/30';
    if (risk === 'medium') return 'text-yellow-400 bg-yellow-950/20 border-yellow-500/30';
    return 'text-green-400 bg-green-950/20 border-green-500/30';
  };

  const triggerFeature = (feat: string) => {
    setFeatureAlert(`Feature Simulated: "${feat}". Processing state update...`);

    if (feat === "AI Sales Suggestions") {
      setShowSalesSuggestions(!showSalesSuggestions);
      setShowCustomerJourney(false);
    } else if (feat === "Customer Journey Mapping") {
      setShowCustomerJourney(!showCustomerJourney);
      setShowSalesSuggestions(false);
    } else if (feat === "WhatsApp Integration" || feat === "SMS Integration") {
      setFeatureAlert(`Chat Gateway active. Sending follow-up templates.`);
    } else if (feat === "Customer Churn Prediction") {
      setFeatureAlert(`Warning: Peter Parker churn threat calculated at 82%.`);
    }

    setTimeout(() => setFeatureAlert(null), 3000);
  };

  const totalValue = leads.reduce((sum, l) => sum + l.value, 0);
  const weightedPipeline = leads.reduce((sum, l) => sum + (l.value * l.probability / 100), 0);

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Main CRM area */}
      <div className="w-full flex flex-col gap-4 text-slate-200">
        {featureAlert && (
          <div className="bg-teal-950/80 border border-teal-500/30 p-2 text-center text-xs font-mono text-teal-300 flex items-center justify-center gap-2 animate-bounce">
            <Activity size={14} className="animate-spin" />
            {featureAlert}
          </div>
        )}

        {showSalesSuggestions && (
          <div className="glass p-4 border-teal-500/30 bg-teal-950/10 flex flex-col gap-2.5 animate-float">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h4 className="text-xs font-mono font-bold text-teal-400 uppercase">💡 AI Sales Recommendations</h4>
              <button type="button" onClick={() => setShowSalesSuggestions(false)} className="text-[10px] font-mono text-slate-500 hover:text-white">Dismiss</button>
            </div>
            <div className="text-xs leading-relaxed text-slate-300">
              • Suggest a pricing aggregate reduction of 5% to WeaponX Logistics to secure the signed contract.<br />
              • Follow up with Gamma Labs via WhatsApp API to align schedules.
            </div>
          </div>
        )}

        {showCustomerJourney && (
          <div className="glass p-4 border-cyan-500/30 bg-cyan-950/10 flex flex-col gap-2.5 animate-float">
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase">📍 Customer Touchpoint Journey Map</h4>
              <button type="button" onClick={() => setShowCustomerJourney(false)} className="text-[10px] font-mono text-slate-500 hover:text-white">Dismiss</button>
            </div>
            <div className="flex justify-between items-center font-mono text-[10px] text-white py-2">
              <span className="p-1 rounded bg-white/5">1. Web visitor</span>
              <span className="text-slate-500">→</span>
              <span className="p-1 rounded bg-white/5">2. Demo Met</span>
              <span className="text-slate-500">→</span>
              <span className="p-1 rounded bg-purple-950/30 text-purple-400">3. Proposal Sent</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass p-3 border-white/5 bg-slate-900/10 text-center">
            <TrendingUp className="text-teal-400 mx-auto mb-1" size={16} />
            <span className="block text-[10px] font-mono text-slate-400 mb-0.5">REVENUE FORECAST</span>
            <span className="text-sm font-bold text-white font-mono">${weightedPipeline.toLocaleString()}</span>
          </div>
          <div className="glass p-3 border-white/5 bg-slate-900/10 text-center">
            <Target className="text-purple-400 mx-auto mb-1" size={16} />
            <span className="block text-[10px] font-mono text-slate-400 mb-0.5">TOTAL PIPELINE</span>
            <span className="text-sm font-bold text-white font-mono">${totalValue.toLocaleString()}</span>
          </div>
          <div className="glass p-3 border-white/5 bg-slate-900/10 text-center">
            <UserCheck className="text-cyan-400 mx-auto mb-1" size={16} />
            <span className="block text-[10px] font-mono text-slate-400 mb-0.5">AVG CONVERSION PROBABILITY</span>
            <span className="text-sm font-bold text-white font-mono">
              {Math.round(leads.reduce((sum, l) => sum + l.probability, 0) / leads.length)}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Leads Table */}
          <div className="glass p-4 border-white/5 bg-slate-900/10 flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Target className="text-teal-400" size={16} />
              <span className="font-mono text-xs font-bold text-white">AI LEAD PREDICTION</span>
            </div>

            <div className="flex-grow overflow-x-auto max-h-[220px]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-slate-400 font-mono">
                    <th className="pb-2">Client / Company</th>
                    <th className="pb-2">Deal Value</th>
                    <th className="pb-2">AI Churn Risk</th>
                    <th className="pb-2 text-right">Stage Alignment</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => (
                    <tr key={lead.id} className="border-b border-white/5">
                      <td className="py-2.5">
                        <div className="font-semibold text-white">{lead.name}</div>
                        <div className="text-[9px] text-slate-500 font-mono">{lead.company}</div>
                      </td>
                      <td className="py-2.5 font-mono text-white">${lead.value.toLocaleString()}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono border uppercase ${getChurnBadge(lead.churnRisk)}`}>
                          {lead.churnRisk}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <select
                          className="bg-slate-950 text-slate-300 border border-white/5 rounded px-2 py-1 text-[10px] cursor-pointer outline-none"
                          value={lead.status}
                          onChange={e => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                        >
                          <option value="new">New Lead ({lead.probability}%)</option>
                          <option value="nurture">Nurture</option>
                          <option value="negotiation">Negotiation</option>
                          <option value="closed">Closed Won</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Funnel SVG Visualization */}
          <div className="glass p-4 border-white/5 bg-slate-900/15 flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <TrendingUp className="text-cyan-400" size={16} />
              <span className="font-mono text-xs font-bold text-white uppercase">SALES FUNNEL VISUALIZATION</span>
            </div>

            <div className="flex-grow flex items-center justify-center p-2">
              <svg className="w-full max-w-[240px]" viewBox="0 0 100 80">
                <polygon points="10,5 90,5 80,20 20,20" fill="rgba(6, 182, 212, 0.4)" stroke="hsl(var(--accent))" strokeWidth="0.5" />
                <text x="50" y="13" textAnchor="middle" fill="white" fontSize="4" fontFamily="var(--font-mono)">
                  New Leads: {leads.filter(l => l.status === 'new').length}
                </text>

                <polygon points="20,22 80,22 70,37 30,37" fill="rgba(139, 92, 246, 0.4)" stroke="hsl(var(--primary))" strokeWidth="0.5" />
                <text x="50" y="30" textAnchor="middle" fill="white" fontSize="4" fontFamily="var(--font-mono)">
                  Nurturing: {leads.filter(l => l.status === 'nurture').length}
                </text>

                <polygon points="30,39 70,39 60,54 40,54" fill="rgba(217, 70, 239, 0.4)" stroke="#D946EF" strokeWidth="0.5" />
                <text x="50" y="47" textAnchor="middle" fill="white" fontSize="4" fontFamily="var(--font-mono)">
                  Negotiation: {leads.filter(l => l.status === 'negotiation').length}
                </text>

                <polygon points="40,56 60,56 55,71 45,71" fill="rgba(16, 185, 129, 0.4)" stroke="#10B981" strokeWidth="0.5" />
                <text x="50" y="64" textAnchor="middle" fill="white" fontSize="4" fontFamily="var(--font-mono)">
                  Closed: {leads.filter(l => l.status === 'closed').length}
                </text>
              </svg>
            </div>
            <div className="flex gap-2 items-center bg-teal-950/10 border border-teal-500/20 p-2.5 rounded text-[10px] font-mono text-teal-300">
              <ShieldAlert size={14} className="flex-shrink-0" />
              <span>AI CUSTOMER LIFETIME VALUE: average holds at $170,000.</span>
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
          <Sparkles size={12} className="text-teal-400" />
          CRM Dashboard Features (3-Column Grid)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {features.map((feat, idx) => (
            <button
              key={idx}
              onClick={() => triggerFeature(feat)}
              className="feature-btn flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
              <span className="truncate">{feat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
