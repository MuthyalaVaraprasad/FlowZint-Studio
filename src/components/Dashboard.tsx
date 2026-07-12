import React, { useState, useEffect } from 'react';
import { 
  Compass, Sparkles, Calendar, FileText, Mail, Target, Layers, 
  BarChart3, BookOpen, Settings, LogOut, Sun, Moon, Bell, Search, 
  CheckSquare, Clock, Code, Menu, Trophy
} from 'lucide-react';

// Inline import of sub-modules
import { AIAssistant } from './modules/AIAssistant';
import { TaskManager } from './modules/TaskManager';
import { DocumentHub } from './modules/DocumentHub';
import { EmailStudio } from './modules/EmailStudio';
import { MeetingAssistant } from './modules/MeetingAssistant';
import { CRM } from './modules/CRM';
import { WorkflowBuilder } from './modules/WorkflowBuilder';
import { Analytics } from './modules/Analytics';
import { SmartNotes } from './modules/SmartNotes';
import { AutomationCenter } from './modules/AutomationCenter';
import { HackathonHub } from './modules/HackathonHub';
import { PortfolioModal } from './PortfolioModal';

interface DashboardProps {
  onSignOut: () => void;
}

interface ModuleInfo {
  id: string;
  name: string;
  features: string[];
  theme: string;
  icon: React.ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSignOut }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleInfo | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  const stats = {
    tasks: 21,
    interactions: 128,
    productivity: 91,
    timeSaved: 19.2
  };

  // Theme Toggle Effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const selectTab = (tabName: string, moduleInfo?: ModuleInfo) => {
    setActiveTab(tabName);
    if (moduleInfo) {
      setSelectedModule(moduleInfo);
    } else {
      setSelectedModule(null);
    }
    setMobileSidebarOpen(false);
  };

  const modules: ModuleInfo[] = [
    {
      id: '1',
      name: 'AI Assistant',
      theme: 'border-purple-500/30 text-purple-400 bg-purple-950/5',
      icon: <Sparkles size={16} />,
      features: [
        'AI Agent Marketplace', 'Custom AI Personalities', 'AI Memory Timeline', 'Conversation Pinning',
        'Favorite Prompts', 'Prompt Sharing', 'AI Prompt Templates', 'AI Voice Cloning',
        'AI Avatar Assistant', 'Multi-language Conversations', 'Live Internet Search', 'AI Fact Checking',
        'AI Citation Generator', 'AI Workflow Suggestions', 'AI Auto Follow-up', 'AI Daily Briefing',
        'AI Context Switching', 'AI Mood Detection', 'AI Conversation Replay', 'AI Smart Recommendations',
        'AI Emotion Mirroring', 'Real-time Sentiment Gauge', 'AI Semantic Search', 'Automated Knowledge Extraction',
        'AI Summary Highlights', 'AI Text Refactoring', 'Voice Command Control', 'AI Conversational Graph',
        'Personalized Agent Training', 'AI Agent Handshake Protocol',
        'AI Teamwork Collaboration Hub', 'AI Voice Pitch Modulator', 'Multi-Agent Dialect Adaptor',
        'Neural Text Style Paraphrasing', 'Prompt Vulnerability Scanner', 'Chat Thread Export Engine',
        'AI Response Factuality Gauge', 'Vector Store Semantic Indexer', 'Agent Behavior Tree Configurator',
        'Context Token Compression', 'Live Search Relevance Scorer', 'Conversation Audio Recorder',
        'AI Agent Subprocess Spawner', 'Custom System Instruction Lock', 'Cognitive Memory Pruning Engine'
      ]
    },
    {
      id: '2',
      name: 'Task Management',
      theme: 'border-blue-500/30 text-blue-400 bg-blue-950/5',
      icon: <CheckSquare size={16} />,
      features: [
        'AI Task Priority Prediction', 'AI Deadline Prediction', 'Smart Daily Planner', 'Workload Balancer',
        'Focus Mode', 'Pomodoro Timer', 'Team Capacity View', 'Sprint Planning',
        'Sprint Retrospective', 'Task Templates', 'Task Dependencies', 'Critical Path Analysis',
        'Project Health Score', 'Milestone Tracking', 'Gantt Chart', 'AI Auto Scheduling',
        'Calendar Sync', 'Goal Progress Tracker', 'Productivity Heatmap', 'Daily Task Digest',
        'Automated Time Tracking', 'AI Resource Bottleneck Alert', 'Smart Task Delegation', 'Subtask Auto-Generation',
        'Kanban Auto-Sorting', 'AI Task Risk Assessment', 'Team Velocity Analysis', 'AI Burnup Forecasting',
        'Focus Soundscapes Sync', 'Milestone Auto-Push',
        'Kanban Dynamic Columns', 'Focus Timer Stats Export', 'Workload Easing Recommendations',
        'Auto Task Dependency Mapper', 'Critical Path Flow Visualizer', 'Gantt Timeline Chart Export',
        'Sprint Retrospective Report Bot', 'Time Tracking CSV Logger', 'Risk Predictor Priority Tag',
        'Workforce Capacity Allocator', 'Auto Subtask Generator', 'Deadlines Buffer Autotuner',
        'Pomodoro Custom Sounds Sync', 'Team Velocity Spline Plot', 'Sprint Velocity Target Slider'
      ]
    },
    {
      id: '3',
      name: 'AI Document Hub',
      theme: 'border-green-500/30 text-green-400 bg-green-950/5',
      icon: <FileText size={16} />,
      features: [
        'AI Document Classification', 'AI Contract Analyzer', 'AI Invoice Reader', 'AI Resume Parser',
        'AI Duplicate Detection', 'Watermark Generator', 'Digital Signature', 'QR Code Scanner',
        'AI Keyword Extraction', 'AI Citation Generator', 'AI Research Assistant', 'AI Knowledge Graph',
        'Document Encryption', 'Secure Sharing', 'Document Approval Workflow', 'AI Content Verification',
        'Auto Version Comparison', 'AI Data Extraction', 'Bulk OCR', 'AI Metadata Generator',
        'Auto PDF Form Filler', 'AI Document Redaction', 'Smart Document Translate', 'Document Semantic Compare',
        'AI Summarizer Index', 'Cloud Drive Auto-Sync', 'OCR Handwriting Reader', 'Document Version Merging',
        'AI Document Compliance Scan', 'Document Expiry Alerts',
        'Batch PDF Form Parser', 'OCR Handwriting Translator', 'Metadata Autoclassification Rules',
        'Contract Legal Breach Scan', 'Invoice Line Items Scraper', 'CV Skills Competence Checker',
        'Duplicate File Hash Tracker', 'Secure Watermark Layer Generator', 'Document Cryptographic Signer',
        'Visual Knowledge Node Editor', 'Auto Citation Source Auditor', 'Cloud Drive Sync Bridge',
        'Handwritten Ink Clean Filter', 'Document Version Diff Viewer', 'Compliance Validation Reports'
      ]
    },
    {
      id: '4',
      name: 'AI Email Studio',
      theme: 'border-orange-500/30 text-orange-400 bg-orange-950/5',
      icon: <Mail size={16} />,
      features: [
        'AI Email Classification', 'Inbox Priority Ranking', 'AI Spam Prediction', 'AI Tone Adjustment',
        'Email Read Time Prediction', 'Email Scheduler Calendar', 'Follow-up Automation', 'Email Signature Templates',
        'AI Subject Optimization', 'Bulk Personalization', 'CRM Integration', 'Auto Contact Suggestions',
        'AI Attachment Summary', 'AI Reply Suggestions', 'AI Campaign Scoring', 'Delivery Analytics',
        'Open Rate Tracking', 'Click Tracking', 'AI Meeting Invitation Generator', 'Auto Inbox Organization',
        'AI Email A/B Testing', 'Email Read Receipt Tracker', 'Auto Email Unsubscriber', 'Smart Signature Rotator',
        'AI Email Tone Audit', 'Draft Auto-Saver', 'CRM Contact Auto-Sync', 'Email Thread Summarizer',
        'Bulk Cold-Email Outreach', 'AI Delivery Time Optimization',
        'Tone Audit Dashboard', 'Inbox Priority Weighting', 'Auto Reply Draft Generator',
        'Campaign Analytics Spline', 'Attachment Summarizer Node', 'Smart Signature Rotator Opt',
        'A/B Subject Optimization Max', 'Spam Score Predictor Real', 'Delivery Time Autotuner Node',
        'Contact CRM Auto Sync Link', 'Email Thread Compression Node', 'Bulk Campaign Generator Suite',
        'Opt-Out Auto Unsubscriber Bot', 'Client Active Hour Predictor', 'Cold Outreach Copy Optimizer'
      ]
    },
    {
      id: '5',
      name: 'AI Meeting Assistant',
      theme: 'border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-950/5',
      icon: <Calendar size={16} />,
      features: [
        'AI Speaker Emotion Analysis', 'AI Meeting Score', 'AI Attendance Prediction', 'AI Time Optimization',
        'AI Question Detection', 'AI Decision Extraction', 'AI Action Reminder', 'AI Follow-up Generator',
        'Meeting Replay', 'Live AI Assistant', 'Auto Translation', 'Smart Agenda Builder',
        'AI Topic Detection', 'AI Keyword Search', 'Team Participation Analytics', 'Calendar Suggestions',
        'AI Meeting Insights', 'Meeting History Timeline', 'AI Noise Removal', 'AI Presentation Assistant',
        'Live Transcription Subtitles', 'AI Video Face Blur', 'Auto Screen Share Rec', 'Meeting Feedback Polls',
        'AI Speaker Identification', 'Transcript Word Cloud', 'Auto Calendar Booking', 'AI Presentation Coach',
        'Meeting Sentiment Trend', 'Smart Action Assigner',
        'Speech Emotion Trend Charts', 'Speaker Identity Matcher', 'Decisions Action List Parser',
        'Translation Subtitle Exporter', 'Active Canvas Wave Animator', 'Emotional Sentiment Radar Plot',
        'Smart Calendar Booking Bot', 'Speech Feedback Coach Stats', 'Attendance Success Predictor',
        'Transcript Keywords Cloud', 'Meeting Recap Email Sender', 'Interactive Video Blurring',
        'Audio Background Noise Gate', 'Active Screen Share Recorder', 'Smart Action Items Allocator'
      ]
    },
    {
      id: '6',
      name: 'AI CRM',
      theme: 'border-teal-500/30 text-teal-400 bg-teal-950/5',
      icon: <Target size={16} />,
      features: [
        'AI Lead Prediction', 'Customer Churn Prediction', 'Revenue Forecast', 'Customer Lifetime Value',
        'AI Opportunity Detection', 'Lead Heatmap', 'Deal Probability', 'Sales Funnel Visualization',
        'Customer Journey Mapping', 'Smart Contact Search', 'AI Customer Summary', 'AI Meeting Scheduler',
        'WhatsApp Integration', 'SMS Integration', 'CRM Mobile View', 'Duplicate Contact Detection',
        'Customer Segmentation', 'AI Sales Suggestions', 'Referral Tracking', 'Customer Satisfaction Dashboard',
        'AI Lead Scoring Engine', 'Email Outreach Tracker', 'Customer Ticket Auto-Route', 'AI Sales Pitch Helper',
        'Customer Call Sentiment', 'Automated Invoice Generation', 'Referral Link Generator', 'CRM Client History Map',
        'Sales Pipeline Audit', 'Customer Feedback Analyzer',
        'Opportunities Conversion Forecast', 'Lead Conversion Funnel Chart', 'Customer Churn Risk Analyzer',
        'Smart Client Lifetime Value', 'Lead Score Heatmap Plot', 'WhatsApp Integration Gateway',
        'SMS Templates Dispatcher', 'Referral Performance Tracker', 'Pipeline Diagnostics Audit',
        'Client Meeting Auto Scheduler', 'Invoice Automated Dispatcher', 'Client Ticket Auto Route',
        'Smart Pitch Helper Bot', 'Call Sound Sentiment Tracker', 'Referral Unique Link Engine'
      ]
    },
    {
      id: '7',
      name: 'AI Workflow Builder',
      theme: 'border-rose-500/30 text-rose-400 bg-rose-950/5',
      icon: <Layers size={16} />,
      features: [
        'AI Flow Optimizer', 'Auto Workflow Suggestions', 'Drag-and-Drop Templates', 'API Connector Library',
        'Database Triggers', 'File Automation', 'Approval Chains', 'Workflow Monitoring',
        'Scheduled Automation', 'AI Error Prediction', 'Auto Retry System', 'Parallel Workflow Execution',
        'Version History', 'Automation Testing', 'Execution Reports', 'AI Performance Analysis',
        'Integration Marketplace', 'Workflow Backup', 'AI Process Mining', 'Automation Health Dashboard',
        'Conditional Logic Branches', 'Webhook Request Tester', 'Variable Scope Manager', 'AI Trigger Predictor',
        'Workflow Rate Limiting', 'Automation Execution Replay', 'Error Alert Channels', 'Encrypted State Store',
        'Workflow Export/Import', 'API Response Parser',
        'Node Connection Drag Gateway', 'Neon Pulse Simulation Trail', 'API Connector Hub Library',
        'Database Action Webhook Node', 'Trigger Rate Limiter Logic', 'State Storage Encryption Key',
        'Workflow Execution Logs Playback', 'Version Tree Compare Viewer', 'Dry-Run Simulation Console',
        'Retry Delay Autotuner', 'Parallel Node Spawner Gateway', 'Integration Marketplace Node',
        'Workflow JSON Exporter Bridge', 'Variable Scopes Tree Map', 'Execution Success Analytics'
      ]
    },
    {
      id: '8',
      name: 'Analytics Dashboard',
      theme: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/5',
      icon: <BarChart3 size={16} />,
      features: [
        'AI Business Insights', 'KPI Dashboard', 'Executive Dashboard', 'Goal Achievement Tracker',
        'Team Comparison', 'Forecast Models', 'Revenue Heatmaps', 'User Growth Analysis',
        'Churn Analysis', 'Funnel Analytics', 'Geographic Analytics', 'AI Recommendation Cards',
        'Data Export', 'Scheduled Reports', 'Dashboard Sharing', 'Live Data Streaming',
        'AI Trend Prediction', 'Benchmark Comparison', 'Alert Center', 'AI Storytelling Reports',
        'Cohort Retention Analysis', 'Interactive Drilldown Graphs', 'Custom Metric Builder', 'AI Anomalous Data Alert',
        'Real-Time Query Console', 'Multi-Source Data Merge', 'Predictive Trend Overlay', 'Report PDF Generator',
        'SQL Query Sandbox', 'KPI Target Slider',
        'KPI Target Controller Slider', 'Spline Chart Exporter Node', 'Timeframe Range Adjuster',
        'CSV Data Exporter Gateway', 'SQL Query Sandbox Console', 'Real-Time Data Streaming Node',
        'Geographic Heatmap Plottings', 'Executive Performance Metrics', 'Anomalous Data Drift Detector',
        'Geographic Sales Map View', 'Geographic Demographic Scraper', 'Geographic User Density Plot',
        'Scheduled Email Reports Broker', 'Multi-Source Data Merge Node', 'Cohort Retention Graph Grid'
      ]
    },
    {
      id: '9',
      name: 'Smart Notes',
      theme: 'border-pink-500/30 text-pink-400 bg-pink-950/5',
      icon: <BookOpen size={16} />,
      features: [
        'AI Knowledge Base', 'Smart Tags', 'AI Flashcards', 'AI Quiz Generator',
        'Mind Maps', 'Whiteboard Mode', 'Sticky Notes', 'Voice Search',
        'AI Handwriting Recognition', 'AI Auto Formatting', 'Smart Notebook', 'Notebook Sharing',
        'Reading Mode', 'Focus Writing Mode', 'AI Citation Support', 'Markdown Preview',
        'Note Lock', 'Timeline View', 'Calendar Integration', 'AI Study Assistant',
        'Speech Dictation Voice', 'Note Backlink Graph', 'Smart Synonyms Finder', 'AI Outline Generator',
        'Note Word Count Statistics', 'PDF Note Exporter', 'Whiteboard Sketch Tools', 'AI Note Translator',
        'Audio Voice Recorder', 'Smart Note Merging',
        'Speech Recognition Voice Compiler', 'Markdown Layout Live Renderer', 'Smart Note Tags Organizer',
        'PDF Note Compiler Exporter', 'Voice Dictation Wave Sync', 'Note Backlink Graph Node',
        'Synonyms Neural Dictionary', 'Quiz Flashcard Auto Generator', 'Mind Map SVG Canvas Node',
        'Study Guide Layout Compiler', 'Whiteboard Sketch Panel Vector', 'Note Encryption Password Lock',
        'Speech Voice Output Playback', 'Notes Merge Operations Tool', 'Multi-Language Note Translator'
      ]
    },
    {
      id: '10',
      name: 'Automation Center',
      theme: 'border-red-500/30 text-red-400 bg-red-950/5',
      icon: <Settings size={16} />,
      features: [
        'AI Workflow Templates', 'Backup Automation', 'Cloud Synchronization', 'Notification Rules',
        'API Automation', 'AI Script Generator', 'File Synchronization', 'Event Monitoring',
        'Smart Alerts', 'Automation Logs', 'Error Recovery', 'Performance Dashboard',
        'AI Maintenance Scheduler', 'Auto Cleanup', 'Storage Optimization', 'AI Resource Monitoring',
        'Security Automation', 'Compliance Checks', 'Automation Marketplace', 'Custom Automation Builder',
        'Custom Cron Scheduler', 'API Webhook Listener', 'Log Retention Policy', 'Resource Throttle Rules',
        'Automation Dry-Run Test', 'Multi-Cloud Sync Bridge', 'Database Auto-Index Scan', 'SSL Certificate Monitor',
        'Docker Node Sync Alert', 'Encryption Key Rotator',
        'Scheduled Backups Broker', 'Server System CPU Load Monitor', 'Server System RAM Load Monitor',
        'Cron Scheduler Syntax Builder', 'Log Event Storage Rotator', 'Cloud Drive Sync Bridge Node',
        'SSL Expiration Date Monitor', 'System Node Synchronizer Alert', 'Encryption Key Rotate Cycle',
        'Auto-Cleanup Temp File Broker', 'Webhooks Response Endpoint Node', 'Throttling Load Balancer Node',
        'Docker Node Deploy Orchestration', 'Backup Restores Verification Suite', 'Server Node Diagnostic Report'
      ]
    }
  ];

  const searchResults = searchQuery.trim()
    ? modules.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const resultsCount = () => searchResults.length;

  const renderActiveWorkspace = () => {
    switch (activeTab) {
      case 'hackathon': return <HackathonHub />;
      case 'AI Assistant': return <AIAssistant />;
      case 'Task Management': return <TaskManager />;
      case 'AI Document Hub': return <DocumentHub />;
      case 'AI Email Studio': return <EmailStudio />;
      case 'AI Meeting Assistant': return <MeetingAssistant />;
      case 'AI CRM': return <CRM />;
      case 'AI Workflow Builder': return <WorkflowBuilder />;
      case 'Analytics Dashboard': return <Analytics />;
      case 'Smart Notes': return <SmartNotes />;
      case 'Automation Center': return <AutomationCenter />;
      default: return null;
    }
  };

  return (
    <div className="dashboard-grid">
      {/* 1. Left Sidebar Navigation */}
      <aside 
        className={`glass sidebar-aside ${mobileSidebarOpen ? 'mobile-open' : ''}`}
      >
        {/* Sidebar Logo */}
        <div className="flex items-center gap-2 mb-8">
          <svg className="w-8 h-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v3m0 0h.01M12 21h3m-3 0H9m3-6v-3m0 0H9m3 0h3m-3-6a9 9 0 019 9c0 1.25-.25 2.44-.71 3.53M12 3a9 9 0 00-9 9c0 1.25.25 2.44.71 3.53M19.5 12a7.5 7.5 0 01-7.5 7.5M4.5 12A7.5 7.5 0 0112 4.5" />
          </svg>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 900, color: 'white', letterSpacing: '1px' }}>
            Flow Zint
          </span>
        </div>

        {/* Sidebar Items */}
        <nav className="flex flex-col gap-1.5 flex-1">
          <button 
            onClick={() => selectTab('overview')}
            className={`sidebar-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <Compass size={14} className="sidebar-nav-icon" /> <span className="sidebar-nav-label">Overview</span>
          </button>

          <button 
            onClick={() => selectTab('hackathon')}
            className={`sidebar-nav-btn ${activeTab === 'hackathon' ? 'active' : ''}`}
          >
            <Trophy size={14} className="sidebar-nav-icon text-yellow-500" /> <span className="sidebar-nav-label">Hackathon Hub</span>
          </button>
          
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => selectTab(m.name, m)}
              className={`sidebar-nav-btn ${activeTab === m.name ? 'active' : ''}`}
            >
              <span className="sidebar-nav-icon">{m.icon}</span> <span className="sidebar-nav-label">{m.name}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-white/5 pt-4 mt-auto flex flex-col gap-2">
          <button 
            onClick={onSignOut}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-mono text-red-400 hover:bg-red-950/20 transition-colors"
          >
            <LogOut size={14} /> <span className="sidebar-nav-label">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Dashboard Content Column */}
      <main className="flex flex-col min-h-screen overflow-y-auto">
        {/* Top Header Bar */}
        <header 
          className="glass sticky top-0 px-6 py-4 flex items-center justify-between z-20"
          style={{
            borderRadius: '0px',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderBottom: '1px solid hsl(var(--border))'
          }}
        >
          {/* Mobile Hamburger menu */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="hamburger-btn header-action-btn p-2 rounded-lg mr-2"
          >
            <Menu size={16} />
          </button>

          {/* Autocomplete Search Bar */}
          <div className="relative w-full max-w-[140px] sm:max-w-[220px] md:max-w-[320px]">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search anything... (e.g. AI CRM)"
              className="form-input w-full pl-9 py-1.5 text-xs"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            />
            
            {searchFocused && resultsCount() > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 glass p-2 bg-slate-950/90 flex flex-col gap-1 border border-purple-500/20">
                {searchResults.map(m => (
                  <button
                    key={m.id}
                    onClick={() => {
                      selectTab(m.name, m);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-2 rounded text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    🚀 {m.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Hackathon Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/15 text-[10px] font-mono font-bold text-purple-300 animate-pulse">
              <Trophy size={11} className="text-yellow-400" />
              <span>AI Entry: Open Innovation</span>
            </div>

            <button 
              onClick={toggleTheme}
              className="theme-toggle-btn header-action-btn p-2 rounded-lg"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Notification bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="header-action-btn p-2 rounded-lg relative"
              >
                <Bell size={15} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-72 glass p-4 bg-slate-950/90 border border-purple-500/20 flex flex-col gap-3 text-left">
                  <h4 className="text-xs font-mono font-bold text-white border-b border-white/5 pb-2 uppercase tracking-wide">
                    Live Operations Stream
                  </h4>
                  <ul className="flex flex-col gap-2 font-mono text-[10px] text-slate-400">
                    <li>• MongoDB cluster synced in 14ms</li>
                    <li>• AI model citation indices loaded</li>
                    <li>• CRM workflow pipeline updated (+12%)</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Admin Profile link */}
            <div 
              onClick={() => setPortfolioOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-purple-500/20 bg-purple-950/10 hover:border-purple-500/50 cursor-pointer transition-all active:scale-95"
            >
              <div className="w-6 h-6 rounded-full bg-slate-800 text-purple-400 flex items-center justify-center font-mono text-xs font-bold">
                AD
              </div>
              <span className="text-xs font-semibold text-white font-mono hidden md:inline">Admin</span>
            </div>
          </div>
        </header>

        {/* Primary Page Content Workspace */}
        <div className="flex-1 p-6 flex flex-col gap-6">
          {activeTab !== 'overview' ? (
            /* Inline Workspace Rendering */
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded bg-purple-950/20 text-purple-400 border border-purple-500/20">
                    {activeTab === 'hackathon' ? <Trophy size={16} className="text-yellow-500" /> : (selectedModule?.icon || <Sparkles size={16} />)}
                  </span>
                  <h2 className="text-xl font-bold text-white font-mono uppercase tracking-wider">
                    {activeTab === 'hackathon' ? 'Hackathon Hub' : `${activeTab} Workspace`}
                  </h2>
                </div>
                <button
                  onClick={() => selectTab('overview')}
                  className="btn-primary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                >
                  Return to Overview
                </button>
              </div>
              <div className="flex-1">
                {renderActiveWorkspace()}
              </div>
            </div>
          ) : (
            /* Default Overview Dashboard Grid layout */
            <>
              {/* Welcome Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
                    Welcome back, Admin! <span className="animate-bounce">👋</span>
                  </h2>
                  <p className="text-slate-400 text-sm mt-0.5">Here's what's happening today in your workspace.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 glass text-xs font-mono text-slate-300">
                  <Clock size={14} className="text-purple-400" />
                  <span>Session Active: 1.2 hrs</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass p-4 border-white/5 flex flex-col gap-1.5 hover:scale-[1.02]">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                    <CheckSquare size={12} className="text-purple-400" /> Tasks Completed
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold font-mono text-white">{stats.tasks}</span>
                    <span className="text-[10px] text-green-400 font-mono">+12% from yesterday</span>
                  </div>
                </div>

                <div className="glass p-4 border-white/5 flex flex-col gap-1.5 hover:scale-[1.02]">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles size={12} className="text-cyan-400" /> AI Interactions
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold font-mono text-white">{stats.interactions}</span>
                    <span className="text-[10px] text-green-400 font-mono">+18% from yesterday</span>
                  </div>
                </div>

                <div className="glass p-4 border-white/5 flex flex-col gap-1.5 hover:scale-[1.02]">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Compass size={12} className="text-yellow-400" /> Productivity Score
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold font-mono text-white">{stats.productivity}%</span>
                    <span className="text-[10px] text-yellow-400 font-mono">Excellent</span>
                  </div>
                </div>

                <div className="glass p-4 border-white/5 flex flex-col gap-1.5 hover:scale-[1.02]">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Clock size={12} className="text-emerald-400" /> Time Saved
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold font-mono text-white">{stats.timeSaved} hrs</span>
                    <span className="text-[10px] text-green-400 font-mono">+25% from yesterday</span>
                  </div>
                </div>
              </div>

              {/* 1. AI Resource Neural Matrix Grid, System Status Diagnostics, and Synergy Output Trend */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Resource Neural Matrix Grid */}
                <div className="glass p-4 border-white/5 flex flex-col gap-3">
                  <h3 className="text-xs font-mono font-bold text-white border-b border-white/5 pb-2 uppercase tracking-wider flex items-center gap-2">
                    <Layers size={14} className="text-purple-400" /> AI NEURAL MATRIX LOAD
                  </h3>
                  <div className="flex-grow min-h-[160px] flex flex-col justify-between font-mono text-[10px]">
                    <div className="flex justify-between items-center bg-white/5 p-2 rounded border border-white/5 mb-1.5">
                      <span className="text-slate-400">Neural Throughput:</span>
                      <span className="text-purple-400 font-bold">45.2 GigaOPS</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-2 rounded border border-white/5">
                      <span className="text-slate-400">Model Sync Latency:</span>
                      <span className="text-cyan-400 font-bold">12ms</span>
                    </div>
                    {/* SVG Matrix Node Map */}
                    <div className="flex-grow mt-2.5 flex items-center justify-center">
                      <svg className="w-full h-16" viewBox="0 0 100 30">
                        <circle cx="20" cy="15" r="3" fill="#A855F7" />
                        <circle cx="50" cy="8" r="3" fill="#06B6D4" />
                        <circle cx="50" cy="22" r="3" fill="#10B981" />
                        <circle cx="80" cy="15" r="3" fill="#EC4899" />
                        
                        <line x1="20" y1="15" x2="50" y2="8" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                        <line x1="20" y1="15" x2="50" y2="22" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                        <line x1="50" y1="8" x2="80" y2="15" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                        <line x1="50" y1="22" x2="80" y2="15" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                        
                        <circle cx="35" cy="11.5" r="1.5" fill="#FFF" className="animate-ping" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Cyberpunk Console Logs */}
                <div className="glass p-4 border-white/5 flex flex-col gap-3">
                  <h3 className="text-xs font-mono font-bold text-white border-b border-white/5 pb-2 uppercase tracking-wider flex items-center gap-2">
                    <Code size={14} className="text-cyan-400" /> SYSTEM STATUS DIAGNOSTICS
                  </h3>
                  <div className="flex-grow bg-black/40 p-2.5 rounded font-mono text-[9px] text-cyan-400/90 h-[150px] overflow-y-auto flex flex-col gap-1 leading-normal border border-white/5">
                    <div>[sys-info] Node Cluster init: SUCCESS</div>
                    <div>[sys-info] MongoDB replica status: SYNCED (14ms)</div>
                    <div>[sys-info] Socket server active on port 3000</div>
                    <div>[sys-info] Memory buffer: 12.8% allocated</div>
                    <div>[sys-info] CPU thermal load: 38°C (Normal)</div>
                    <div className="animate-pulse">[sys-info] Ready to execute AI suggestions...</div>
                  </div>
                </div>

                {/* Productivity Spline Chart */}
                <div className="glass p-4 border-white/5 flex flex-col gap-3">
                  <h3 className="text-xs font-mono font-bold text-white border-b border-white/5 pb-2 uppercase tracking-wider flex items-center gap-2">
                    <BarChart3 size={14} className="text-green-400" /> SYNERGY OUTPUT TREND
                  </h3>
                  <div className="flex-grow min-h-[160px] flex flex-col justify-between">
                    <div className="flex-grow flex items-center justify-center p-2">
                      <svg className="w-full h-16" viewBox="0 0 100 30">
                        <path d="M5,25 Q25,5 45,20 T85,5" fill="none" stroke="#10B981" strokeWidth="1.5" />
                        <circle cx="85" cy="5" r="2" fill="#10B981" />
                      </svg>
                    </div>
                    <div className="flex justify-between font-mono text-[9px] text-slate-500 border-t border-white/5 pt-1.5">
                      <span>Mon</span>
                      <span>Wed</span>
                      <span>Fri</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Flow Zint Studio? Section */}
              <div className="mt-4">
                <h3 className="text-xs font-mono font-bold text-white mb-4 uppercase tracking-widest">
                  Why Flow Zint Studio? Value Propositions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                  {[
                    { title: 'AI-Powered', desc: 'Smart assistant integrations.' },
                    { title: 'Automation', desc: 'Auto daily task planners.' },
                    { title: 'All-in-One', desc: 'Unified productivity core.' },
                    { title: 'Smart Analytics', desc: 'Live operations charting.' },
                    { title: 'Secure & Private', desc: 'Enterprise data sandbox.' },
                    { title: 'Scalable', desc: 'MongoDB and API extensions.' }
                  ].map((val, idx) => (
                    <div key={idx} className="glass p-3 border-white/5 bg-slate-900/10 hover:border-purple-500/20">
                      <h4 className="text-xs font-mono font-bold text-white mb-1">{val.title}</h4>
                      <p className="text-[10px] text-slate-400 leading-snug">{val.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-auto px-6 py-4 border-t border-white/5 text-[10px] text-slate-500 font-mono flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex gap-4 flex-wrap">
            <span>Modern UI/UX Glassmorphism</span>
            <span>•</span>
            <span>Fully Responsive</span>
            <span>•</span>
            <span>Speech Synthesizer</span>
            <span>•</span>
            <span>Theme customization active</span>
          </div>
          <div>
            © 2026 Flow Zint Studio. All rights reserved.
          </div>
        </footer>
      </main>

      {/* Developer Portfolio Modal */}
      <PortfolioModal isOpen={portfolioOpen} onClose={() => setPortfolioOpen(false)} />
    </div>
  );
};
