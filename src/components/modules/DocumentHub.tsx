import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Network, Sparkles, Activity } from 'lucide-react';

interface AnalyzedDoc {
  name: string;
  type: string;
  size: string;
  summary: string[];
  keywords: string[];
  nodes: { id: string; label: string; x: number; y: number }[];
  links: { source: string; target: string }[];
}

const features = [
  "AI Document Classification", "AI Contract Analyzer", "AI Invoice Reader", "AI Resume Parser",
  "AI Duplicate Detection", "Watermark Generator", "Digital Signature", "QR Code Scanner",
  "AI Keyword Extraction", "AI Citation Generator", "AI Research Assistant", "AI Knowledge Graph",
  "Document Encryption", "Secure Sharing", "Document Approval Workflow", "AI Content Verification",
  "Auto Version Comparison", "AI Data Extraction", "Bulk OCR", "AI Metadata Generator",
  "Auto PDF Form Filler", "AI Document Redaction", "Smart Document Translate", "Document Semantic Compare",
  "AI Summarizer Index", "Cloud Drive Auto-Sync", "OCR Handwriting Reader", "Document Version Merging",
  "AI Document Compliance Scan", "Document Expiry Alerts"
];

export const DocumentHub: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [featureAlert, setFeatureAlert] = useState<string | null>(null);
  
  const [watermarked, setWatermarked] = useState(false);
  const [signed, setSigned] = useState(false);
  const [qrMode, setQrMode] = useState(false);

  const [activeDoc, setActiveDoc] = useState<AnalyzedDoc | null>({
    name: 'Standard_Employment_Agreement.pdf',
    type: 'Legal Contract',
    size: '142 KB',
    summary: [
      'Identifies Administrator as Lead Developer.',
      'Defines 40-hour work week commitment and IP ownership clauses.',
      'Includes typical non-disclosure terms protecting core studio repositories.'
    ],
    keywords: ['Lead Developer', 'IP Agreement', 'Non-Disclosure', 'Developer Role'],
    nodes: [
      { id: '1', label: 'Contract', x: 150, y: 100 },
      { id: '2', label: 'Lead Developer', x: 50, y: 50 },
      { id: '3', label: 'ND Clause', x: 250, y: 50 },
      { id: '4', label: 'IP Assignment', x: 150, y: 180 }
    ],
    links: [
      { source: '1', target: '2' },
      { source: '1', target: '3' },
      { source: '1', target: '4' }
    ]
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          setActiveDoc({
            name: file.name,
            type: file.type || 'Invoice Document',
            size: `${(file.size / 1024).toFixed(1)} KB`,
            summary: [
              `Document '${file.name}' successfully cataloged.`,
              'AI Classification: General business records.',
              'No duplicate records matching existing schemas detected.'
            ],
            keywords: ['Uploaded Doc', 'Audit Log', 'OCR Engine'],
            nodes: [
              { id: '1', label: file.name.substring(0, 12), x: 150, y: 100 },
              { id: '2', label: 'Metadata', x: 50, y: 60 },
              { id: '3', label: 'Security hash', x: 250, y: 60 }
            ],
            links: [
              { source: '1', target: '2' },
              { source: '1', target: '3' }
            ]
          });
          return 100;
        }
        return p + 20;
      });
    }, 200);
  };

  const triggerFeature = (feat: string) => {
    setFeatureAlert(`Feature Simulated: "${feat}". Processing state update...`);

    if (feat === "Watermark Generator") {
      setWatermarked(!watermarked);
    } else if (feat === "Digital Signature") {
      setSigned(true);
      setFeatureAlert(`Digital Signature stamped for Administrator!`);
    } else if (feat === "QR Code Scanner") {
      setQrMode(true);
      setTimeout(() => {
        setQrMode(false);
        setFeatureAlert("QR Code scanned successfully! Found link to repository.");
      }, 2500);
    } else if (feat === "Document Encryption") {
      setFeatureAlert("Document secured with SHA-256 hash envelope.");
    }

    setTimeout(() => setFeatureAlert(null), 3000);
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Main Doc App */}
      <div className="w-full flex flex-col gap-4 text-slate-200">
        {featureAlert && (
          <div className="bg-green-950/80 border border-green-500/30 p-2 text-center text-xs font-mono text-green-300 flex items-center justify-center gap-2 animate-bounce">
            <Activity size={14} className="animate-spin" />
            {featureAlert}
          </div>
        )}

        {qrMode && (
          <div className="glass p-4 border-green-500/30 bg-green-950/10 text-center animate-pulse flex flex-col items-center justify-center gap-2">
            <span className="font-mono text-xs text-green-400">📷 Accessing Web Camera QR Scanner...</span>
            <div className="w-20 h-20 border-2 border-dashed border-green-400 rounded flex items-center justify-center text-xs text-slate-500">
              [Scan Frame]
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Upload & Summary column */}
          <div className="flex flex-col gap-4">
            <div 
              className="glass p-6 text-center border-dashed border-purple-500/20 hover:border-purple-500/40 relative group cursor-pointer bg-slate-900/10"
              style={{ borderRadius: '12px' }}
            >
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleFileUpload} 
                disabled={uploading}
              />
              <Upload size={32} className="text-purple-400 mx-auto mb-3 animate-float" />
              <h4 className="font-bold text-white text-sm mb-1">AI Invoice Reader & Resume Parser</h4>
              <p className="text-slate-400 text-xs mb-3">Drag & drop files or click to parse doc</p>
              <div className="px-3 py-1 bg-white/5 rounded border border-white/5 inline-block text-[10px] text-purple-300 font-mono">
                Supports: PDF, DOCX, CSV, Image OCR
              </div>

              {uploading && (
                <div className="mt-4 w-full bg-slate-950/80 p-3 rounded border border-white/5 font-mono text-left">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>RUNNING BULK OCR ENGINE...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full transition-all" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}
            </div>

            {activeDoc && (
              <div className="glass p-4 border-white/5 bg-slate-900/15 flex flex-col gap-3 relative overflow-hidden">
                {watermarked && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none border-2 border-red-500/10">
                    <span className="text-2xl font-bold font-mono text-red-500/10 rotate-12 tracking-widest uppercase">
                      FLOW ZINT STUDIO SECURED
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <FileText className="text-purple-400" size={16} />
                  <span className="font-mono text-xs font-bold text-white truncate max-w-[180px]">{activeDoc.name}</span>
                  <span className="ml-auto text-[9px] bg-purple-950/20 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                    {activeDoc.type}
                  </span>
                </div>

                <div>
                  <h5 className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase">AI CONTENT VERIFICATION</h5>
                  <ul className="flex flex-col gap-2">
                    {activeDoc.summary.map((sum, i) => (
                      <li key={i} className="flex gap-2 items-start text-xs text-slate-300">
                        <CheckCircle size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{sum}</span>
                      </li>
                    ))}
                    {signed && (
                      <li className="flex gap-2 items-center text-xs text-green-400 font-mono bg-green-950/10 border border-green-500/20 p-1.5 rounded">
                        <CheckCircle size={12} className="flex-shrink-0" />
                        <span>Signed by Administrator</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <h5 className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase">EXTRACTED KEYWORDS</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDoc.keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-mono text-slate-300">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Knowledge Graph visualization Column */}
          <div className="glass p-4 border-white/5 bg-slate-900/15 flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Network className="text-cyan-400" size={16} />
              <span className="font-mono text-xs font-bold text-white uppercase">AI KNOWLEDGE GRAPH</span>
            </div>

            <p className="text-[9px] text-slate-400 font-mono">
              Relational entities compiled using document data extraction. Drag files to map node lines.
            </p>

            <div className="flex-grow min-h-[200px] relative border border-white/5 bg-black/45 rounded-lg overflow-hidden flex items-center justify-center">
              {activeDoc && (
                <svg className="w-full h-full absolute inset-0">
                  {activeDoc.links.map((link, idx) => {
                    const s = activeDoc.nodes.find(n => n.id === link.source);
                    const t = activeDoc.nodes.find(n => n.id === link.target);
                    if (!s || !t) return null;
                    return (
                      <line
                        key={idx}
                        x1={s.x}
                        y1={s.y}
                        x2={t.x}
                        y2={t.y}
                        stroke="rgba(139, 92, 246, 0.3)"
                        strokeWidth="1.5"
                      />
                    );
                  })}

                  {activeDoc.nodes.map((node) => (
                    <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                      <circle
                        r="16"
                        fill="rgba(15, 12, 30, 0.8)"
                        stroke={node.id === '1' ? 'hsl(var(--accent))' : 'hsl(var(--primary))'}
                        strokeWidth="2"
                        className="cursor-pointer hover:r-20 transition-all"
                      />
                      {node.id === '1' && (
                        <circle
                          r="24"
                          fill="none"
                          stroke="rgba(6, 182, 212, 0.2)"
                          strokeWidth="1.5"
                          className="animate-pulse"
                        />
                      )}
                      <text
                        y="32"
                        textAnchor="middle"
                        fill="white"
                        className="font-mono text-[9px] font-bold"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>
              )}
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
          <Sparkles size={12} className="text-green-400" />
          Document Hub Features (3-Column Grid)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {features.map((feat, idx) => (
            <button
              key={idx}
              onClick={() => triggerFeature(feat)}
              className="feature-btn flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
              <span className="truncate">{feat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
