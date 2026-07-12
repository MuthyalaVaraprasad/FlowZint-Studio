# 🧠 Flow Zint Studio - Intelligent AI Productivity Workspace

Welcome to **Flow Zint Studio**, a premium, high-fidelity AI-powered unified productivity operating system and workspace dashboard. Built with a sleek glassmorphism aesthetic, modern micro-interactions, responsive grids, and low-latency interactive canvas animations, this project serves as a showcase for hackathons and a developer portfolio.

---

## 🚀 Key Features & Dashboards

Flow Zint Studio provides 10 core modules, each designed with 20+ features, and interactive workspaces to try them out:

1. **AI Assistant**: A live chatbot featuring voice response (Web Speech Synthesis Text-to-Speech), preset prompt suggestions, custom agent personalities (Developer, Designer, Advisor), and context-switching tools.
2. **Task Management**: A functional Kanban planner board with priority toggles, workload balancing metrics, and task movement across columns.
3. **AI Document Hub**: Upload file parser with automated OCR summary generation, entity classifications, and a custom SVG Knowledge Node Graph.
4. **AI Email Studio**: Adjusts email copy instantly depending on Selected Tones (Professional, Casual, Assertive, Friendly) with subject lines optimizer.
5. **AI Meeting Assistant**: Transcript timeline stream, active speaker tags, emotion metrics, and an active canvas audio wave animator.
6. **AI CRM**: Leads opportunities pipeline with custom conversion predictions and SVG funnels.
7. **AI Workflow Builder**: Visual automation mapping trigger nodes. Run simulation triggers a sequential neon-glowing trail across the path.
8. **Analytics Dashboard**: Dynamic metrics graphing using HSL-based SVGs, time filters, and a functional CSV data exporter.
9. **Smart Notes**: Markdown notebook compiler with smart tags and Voice-to-Text dictation using the Web Speech Recognition API.
10. **Automation Center**: Scheduled backup triggers, system event logs stream, and live CPU/RAM server resources monitors.

---

## 🎨 Design & Aesthetics

- **Glassmorphism**: Fully implemented using backdrop-filters, satin borders, and shadows.
- **Aurora Background**: Pulsing radial gradients floating in the background.
- **3D Plexus Canvas**: A custom canvas plexus network particle system that responds to cursor coordinates and spawns bursts of particles on clicks.
- **Theme Toggle**: Real-time HSL variable updates toggling between Dark and Light mode.
- **Developer Portfolio**: Muthyala Vara Prasad profile card with an interactive console terminal modal detailing bio, projects, skills, and certifications, featuring an interactive CLI shell.

---

## 📁 Folder Structure

```
Flow Zint Studio/
├── dist/                  # Compiled production files
├── src/
│   ├── components/
│   │   ├── modules/       # 10 core workspace sub-components
│   │   │   ├── AIAssistant.tsx
│   │   │   ├── TaskManager.tsx
│   │   │   ├── DocumentHub.tsx
│   │   │   ├── EmailStudio.tsx
│   │   │   ├── MeetingAssistant.tsx
│   │   │   ├── CRM.tsx
│   │   │   ├── WorkflowBuilder.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── SmartNotes.tsx
│   │   │   └── AutomationCenter.tsx
│   │   ├── Background3D.tsx
│   │   ├── Preloader.tsx
│   │   ├── SignIn.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ModuleModal.tsx
│   │   └── PortfolioModal.tsx
│   ├── App.tsx            # Main state router
│   ├── index.css          # Design system & HSL variables stylesheet
│   └── main.tsx           # React mounting client
├── index.html             # SEO header template
├── package.json
└── tsconfig.json
```

---

## 🛠️ Tech Stack & Setup

- **Core**: React 19, Vite, TypeScript
- **Icons**: Lucide React
- **Styling**: Vanilla CSS, Canvas API, Web Speech API

### Installation & Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Dev Server**:
   ```bash
   npm run dev
   ```
3. **Compile Production Bundle**:
   ```bash
   npm run build
   ```
