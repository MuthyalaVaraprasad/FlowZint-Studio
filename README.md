# 🧠 Flow Zint Studio - Intelligent AI Productivity Workspace

Welcome to **Flow Zint Studio**, a premium, high-fidelity AI-powered unified productivity operating system and workspace dashboard. Built with a sleek glassmorphic design language, modern micro-interactions, responsive grids, and low-latency interactive canvas animations, this project serves as a showcase for hackathons and a developer portfolio.

> **Official Submission Entry for the FlowZint AI Hackathon 2026**
>
> 🌐 **Live Demo Website**: [https://flowzint-studio.vercel.app](https://flowzint-studio.vercel.app)
> 🐙 **GitHub Repository**: [https://github.com/MuthyalaVaraprasad/FlowZint-Studio](https://github.com/MuthyalaVaraprasad/FlowZint-Studio)

---

## 👥 Hackathon Team Credentials: #JNTUH420

*   **Hackathon Event**: FlowZint AI Hackathon 2026
*   **Team Name**: `#JNTUH420`
*   **Teammates (4/4)**:
    1.  **Muthyala Vara Prasad** (Team Leader) 👑
        *   📞 Mobile: `+91 9963889086`
    2.  **Bathula Varshith** ⚡
        *   📞 Mobile: `+91 9182800206`
    3.  **Gunja Ashok** 🛠️
        *   📞 Mobile: `+91 9398872962`
    4.  **Animindula Akhil** 🔍
        *   📞 Mobile: `+91 8304840360`

---

## 🚀 Key Features & 12 Core Dashboards
Flow Zint Studio implements **340+ features** distributed across 12 highly functional workspace dashboards:

1.  **Overview Dashboard**: Real-time KPI stats cards, custom 3D plexus matrix system load monitor, diagnostic status terminal logs stream, and Synergy Output trend graphs.
2.  **AI Assistant**: Custom chatbot + Multi-Agent Team Collaboration simulator (PO -> UI/UX -> DEV -> QA compiling code). Includes Web Speech TTS voice response synthesis (**45 features**).
3.  **Task Management**: Kanban workflow planner board, dynamic task creator, Pomodoro Focus clock, and custom SVG Gantt timelines (**30 features**).
4.  **AI Document Hub**: OCR file uploader, watermark generator overlay, digital signature applier, QR web-cam scanner simulator, and custom SVG Metadata Knowledge Graph nodes (**30 features**).
5.  **AI Email Studio**: 4 Tone Rewriters (Professional, Casual, Assertive, Friendly) rewriting subjects/bodies, bulk campaign stats, and dynamic signature templates (**30 features**).
6.  **AI Meeting Assistant**: Transcripts timeline, speaker tags, HTML5 Canvas audio wave animator synchronizing on canvas frames, and Spanish subtitle translator (**30 features**).
7.  **AI CRM**: Lead prediction cards, opportunities pipeline tables, WhatsApp templates gateway dispatcher, custom conversion graphs, and client lifetime value metrics (**30 features**).
8.  **AI Workflow Builder**: Node mapping flowcharts, visual node execution highlighter, and parallel thread branch spawners (**30 features**).
9.  **Analytics Dashboard**: KPI time-series filters, SVG line graph charts, geographic demographic charts, and a functional CSV data downloader (**30 features**).
10. **Smart Notes**: Markdown preview compiler, biometrics note lock toggles, SVG Backlinks mind map, and live Web Speech Voice-to-Text dictation (**30 features**).
11. **Automation Center**: Rules manager, system logs terminal, active CPU/RAM resources graphs, Bash script exporter, and the **User Identity Config** dashboard panel (DisplayName text inputs and local picture base64 uploader) (**30 features**).
12. **AI Design Studio**: Glassmorphism customizer CSS editor (sliders for blur, background-opacity, border-opacity, hue angle shadow, and border-radius), live preview box, 4 color presets, and live copy-ready CSS stylesheets (**45 features**).

---

## 🎨 Design, Aesthetics & Visual Excellence
*   **3D Concentric Elliptical Orbit Preloader**: Loading screen renders 3D perspective rotated concentric orbit rings, 80 twinkling star particles drifting on canvas, and inter-node constellation links.
*   **Google OAuth Sign-in Portal**: Simple glassmorphic portal displaying *only* the official Google Sign-In button container overlaid on a vertical Cyber Matrix grid light stream.
*   **Glassmorphism Theme Toggle**: Real-time HSL variable updates toggling between Dark and Light mode.
*   **High-Fidelity Responsiveness**: Grids automatically reflow between mobile (1 column), tablet (2 columns), and desktop (3 columns) using media queries defined in `index.css`.

---

## 🛠️ Technology Stack & Architectures
*   **Core Framework**: React 19, TypeScript (TSX), Vite 8
*   **Icons**: Lucide React
*   **OAuth Security**: Google Identity Services (GSI) 2.0 with base64 JWT payload token decoding.
*   **Audio/Speech API**: HTML5 Web Speech Recognition (Voice-to-Text) and Speech Synthesis (Text-to-Speech).
*   **File Converter API**: Base64 FileReader API for user avatar uploads.

---

## 🚀 Installation & Local Development

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/MuthyalaVaraprasad/FlowZint-Studio.git
    cd FlowZint-Studio
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    *Starts the dev server on `http://localhost:5173`.*

4.  **Verify Linter & Code Standards**:
    ```bash
    npm run lint
    ```
5.  **Compile Production Bundle**:
    ```bash
    npm run build
    ```

---

## 🌐 Deployment to Vercel

This project is configured out-of-the-box for seamless Vercel deployment:
1.  Import your GitHub repository into [Vercel](https://vercel.com).
2.  The framework settings will auto-detect Vite. Use:
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
3.  Vercel will use [vercel.json](./vercel.json) to configure SPA routing rules, preventing 404 errors on refreshes.
4.  Once deployed, copy your live domain and add it to **Authorized JavaScript origins** in your Google Cloud Console Credentials page to enable live Google account authentication!
