 (MEA Govt LMS) — Sovereign Language Learning & Academic Management System

Official sovereign language learning platform built for the **Ministry of External Affairs (MEA), Government of India**. **VedSarthi** facilitates bidirectional language acquisition, AI-assisted speech and writing evaluations, accredited CEFR certification, and multi-role academic governance for diplomats, international scholars, faculty members, and administrative controllers.

---

## 📌 Executive Summary & Key Highlights

- **Sovereign & Diplomatic Purpose**: Engineered to empower foreign envoys, international scholars, and Indian diplomats with high-precision language training aligned with **CEFR (A1–C2)** standards.
- **7-Tier Role-Based Access Control (RBAC)**: Fine-grained access control tailored for **Students**, **Teachers**, **Course Creators**, **Quality Testers**, **Institute Admins**, **Finance Controllers**, and **Super Admins**.
- **Bidirectional Language Tracks**:
  - **Track A (Foreign → Indian)**: International scholars & diplomats learning Hindi and 22 Official Eighth Schedule Indian Languages.
  - **Track B (Indian → Foreign)**: Indian delegates & students mastering French, Spanish, German, Japanese, Arabic, Russian, Mandarin Chinese, and Portuguese.
- **22 Eighth Schedule Indian Languages (Bhasha)**: Full support for *Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, Sanskrit, Urdu, Maithili, Santali, Kashmiri, Nepali, Sindhi, Konkani, Dogri, Manipuri (Meitei), and Bodo*.
- **Domain-Specific Goal Tracks**: Specialized pathways focused on **Diplomatic Protocol**, **International Trade & Commerce**, and **Cultural Exchange & Travel**.
- **VedSarthi Native AI Ecosystem**:
  - **JETHAT AI Practice Call**: Live interactive voice practice over simulated diplomatic phone calls.
  - **Sambhasini Voice Tutor**: Real-time acoustic phoneme analyzer with Devanagari waveform feedback.
  - **Sovereign Multilingual Neural Engine**: Automated translation, speech synthesis, and script transliteration across Indian regional dialects.
  - **AI Placement Diagnostic**: Dynamic assessment algorithm calibrating baseline CEFR levels.
- **Script & Transliteration Modes**: Dynamic toggle between **Native Script (e.g. Devanagari)**, **Romanized Transliteration**, or **Dual Display**.
- **Government Compliance**: Design and accessibility compliant with **GIGW 3.0 (Guidelines for Indian Government Websites)**, **CERT-In Security Protocols**, and **DPDP Act 2023 (Digital Personal Data Protection)**.

---

## 🔐 Role-Based Access Control (RBAC) Matrix

The system implements strict Role-Based Access Control managed through persistent client state (`lmsStore.ts`) and custom hooks (`useRole.ts`, `useAuth.ts`).

| Role ID | Console Name | Target Audience | Primary Responsibilities & Capabilities | Accessible Route Prefix |
| :--- | :--- | :--- | :--- | :--- |
| `student` | **Student Console** | International Scholars, Envoys, Learners | Course pathways (Tracks A & B), AI practice tools, exams, certificates, live language circles, leaderboard, and avatar selection. | `/dashboard/student` |
| `teacher` | **Teacher Console** | Senior Faculty, Linguists, Evaluators | Live class scheduling, assignment grading, student roster management, and AI speech/writing reviews. | `/dashboard/teacher` |
| `creator` | **Course Creator Studio** | Curriculum Authors, Studio Editors | Multilingual lesson authoring, quiz builder, module sequencing, and publishing workflow pipeline. | `/dashboard/creator` |
| `tester` | **Quality Testing Hub** | QA Auditors, Speech Calibration Engineers | Content quality assurance queue, Devanagari font/spelling inspection, audio synthesis validation, and final approval portal. | `/dashboard/tester` |
| `institute` | **Institute Admin** | Mission Officers, SVCC Centre Directors | Physical center location management, student batch allocation, seat quotas, and fee collections. | `/dashboard/institute` |
| `accounting` | **Accounting & Finance** | ICCR Fellowship & Grants Officers, Accountants | Revenue ledgers, payment gateway health, pro subscription ledgers, refund request audits, and fiscal reporting. | `/dashboard/accounting` |
| `admin` | **Super Admin** | System Chief Administrator | Platform governance, user RBAC matrix management, publishing finalization, AI gateway API configurations, and CERT-In audit logs. | `/dashboard/admin` |

---

## 📂 File and Folder Architecture

```text
Mea-govt-default/
├── app/                        # Next.js 14 App Router Directory
│   ├── about/                  # Platform Vision & MEA Leadership Page
│   ├── api/                    # Serverless API Endpoints
│   │   ├── ai/                 # AI Chat, Adaptive Quiz, & Assessment APIs
│   │   ├── audit-log/          # Immutable System Audit Logger
│   │   ├── bhashini/           # Multilingual Speech & Translation API Gateway
│   │   └── certificates/       # PDF/SVG Certificate Generator & Verification
│   ├── certificates/           # Public Certificate Verification Portal
│   ├── compliance/             # GIGW 3.0 & CERT-In Compliance Disclosures
│   ├── dashboard/              # Protected RBAC Console Dashboards
│   │   ├── accounting/         # Finance & Revenue Console Pages
│   │   ├── admin/              # Super Admin & Governance Pages
│   │   ├── creator/            # Course Builder & Quiz Authoring Pages
│   │   ├── institute/          # Center & Batch Management Pages
│   │   ├── student/            # Learner Console (26 Sub-modules & AI Tools)
│   │   ├── teacher/            # Faculty Roster & Grading Pages
│   │   ├── tester/             # Quality Audit & Font Inspection Pages
│   │   ├── layout.tsx          # Main Dashboard Layout with Dynamic Topbar & Sidebar
│   │   └── page.tsx            # Console Router / Redirection Handler
│   ├── how-to-use/             # Platform User Guide & Video Tutorials
│   ├── login/                  # Single Sign-On (SSO) & Passport Authentication
│   ├── resources/              # Open Curriculum Downloads & Guidelines
│   ├── globals.css             # Tailwind CSS & Sovereign Color Token Definitions
│   ├── layout.tsx              # Root HTML Layout with GIGW Accessibility Header/Footer
│   ├── loading.tsx             # Global Page Loading Fallback UI
│   ├── not-found.tsx           # Custom Sovereign 404 Page
│   └── page.tsx                # Public Landing Page with News Marquee & Carousels
│
├── components/                 # React UI Component Library
│   ├── ai/                     # Sambhasini & AI Voice Tutor Interfaces
│   ├── home/                   # Landing Page Sub-components (Hero, Timelines, Showcase)
│   ├── layout/                 # Navigation, Sidebar, Notifications, Search Modal, GIGW Bar
│   ├── roles/                  # Role-Specific Dashboard Overview Widgets
│   │   ├── accounting/
│   │   ├── admin/
│   │   ├── creator/
│   │   ├── institute/
│   │   ├── student/
│   │   ├── teacher/
│   │   └── tester/
│   ├── shared/                 # Reusable Track Selectors, Transliteration Toggles, Skill Radars
│   └── ui/                     # Primitives (Button, Card, Badge, Input, Skeleton, Animations)
│
├── config/                     # Application Constants & Global Configuration
│   ├── routes.ts               # Centralized Route Registry Map
│   └── site.ts                 # Site Metadata, Sovereign Contact Info & Theme Settings
│
├── hooks/                      # Custom React Hooks
│   ├── index.ts                # Hook Exports
│   ├── useAuth.ts              # Authentication & Session Hook
│   ├── useGIGWAccessibility.ts # Font Resizing & High Contrast Accessibility Hook
│   └── useRole.ts              # Active Role & Switcher Hook
│
├── lib/                        # Core Utilities, Services & State Store
│   ├── SambhasiniService.ts    # Voice Tutor Audio Processing Gateway
│   ├── adaptiveEngine.ts       # Dynamic CEFR Level Calibration & Placement Algorithm
│   ├── bhashiniService.ts      # Multilingual Translation & Speech Service Module
│   ├── bidirectionalData.ts    # Language Pair Datasets (22 Indian + 8 Foreign) & Lessons
│   ├── i18nChrome.ts           # Multilingual UI Interface Translations
│   ├── lmsStore.ts             # Client-side State Manager & LocalStorage Persistence
│   ├── mockData.ts             # Mock Users, Enrolled Courses, & Academic Datasets
│   └── useReducedMotion.ts     # Accessibility Motion Reduction Utility
│
├── public/                     # Static Assets (Logos, Emblems, Audio Files, Icons)
├── types/                      # TypeScript Interfaces & Type Declarations
│   ├── Sambhasini.ts
│   ├── accounting.ts
│   ├── api.ts
│   ├── bhashini.ts
│   ├── course.ts
│   ├── index.ts
│   ├── institution.ts
│   └── user.ts
│
├── next.config.js              # Next.js Framework Configuration
├── package.json                # Project Dependencies & Build Scripts
├── postcss.config.js           # PostCSS Configuration
├── tailwind.config.js          # Sovereign Color Palette & Custom Utility Config
└── tsconfig.json               # TypeScript Compiler Configuration
```

---

## 🛠️ Deep-Dive Feature Modules

### 1. Learner Ecosystem (`/dashboard/student`)
- **Courses & Masterclasses**: Separate tracks for *Indian ➔ Foreign*, *Foreign ➔ Indian*, and *22 Eighth Schedule Indian Languages*.
- **Free Learning Resources**: Access to free video lectures, audio pronunciation files, and downloadable PDF study guides.
- **AI Assessment Suite**:
  - **JETHAT AI Practice Call**: Interactive voice dialogue in real-time.
  - **AI Speaking Test**: Audio pitch, phoneme accuracy, and fluency score.
  - **AI Writing Test**: Real-time Devanagari grammar & sentence syntax analysis.
  - **AI Listening Test**: Comprehension drills across speed tiers.
  - **AI Teacher Hub**: 24/7 AI tutor for instant grammar and vocabulary queries.
- **Competitions & Gamification**: Daily streak tracking, XP rewards, level badges, and national leaderboards.
- **Certificates**: Accredited CEFR digital certificate generation with verifiable QR codes.

### 2. Faculty & Evaluation Hub (`/dashboard/teacher`)
- **Class Scheduler**: Setup live virtual sessions or log offline physical classes.
- **Assignment Evaluator**: Grade student essays, audio recordings, and grammar submissions.
- **AI Review Queue**: Review AI-generated speech and writing scores with instructor override capabilities.
- **Student Roster**: Track individual LSRW (Listening, Speaking, Reading, Writing) progress.

### 3. Authoring & QA Infrastructure (`/dashboard/creator` & `/dashboard/tester`)
- **Module Builder**: Drag-and-drop lesson structure creator with vocabulary cards and audio alignment.
- **Devanagari Font Inspector**: Verifies font rendering, glyph correctness, and conjunct consonants.
- **Acoustic Model Tester**: Audits synthesized voice models against regional accent baselines.

### 4. Enterprise & Financial Management (`/dashboard/institute` & `/dashboard/accounting`)
- **Center Locator & Batches**: Track foreign mission SVCC centers, class capacities, and student seats.
- **Fee Collections & Grants**: Monitor ICCR fellowship grants, subscription plans, and refund requests.

---

## ⚙️ State Persistence & Key Store Constants

Client state is synchronized via `lib/lmsStore.ts` using `localStorage` keys to persist active sessions across page reloads:

- `STORE_KEY_USER` (`mea_lms_user_state`): Active user profile data.
- `STORE_KEY_ROLE` (`mea_lms_active_role`): Active console role (`student`, `teacher`, `admin`, etc.).
- `STORE_KEY_TRACK` (`mea_lms_active_track`): Selected learning track (`trackA` vs `trackB`).
- `STORE_KEY_PAIR` (`mea_lms_active_pair`): Active language pair (e.g., `en-to-hi`, `hi-to-fr`).
- `STORE_KEY_GOAL` (`mea_lms_active_goal`): Chosen goal track (`diplomatic`, `trade`, `travel`).
- `STORE_KEY_SCRIPT` (`mea_lms_script_mode`): Active script view mode (`roman`, `native`, `both`).
- `STORE_KEY_SKILLS` (`mea_lms_skill_split`): LSRW breakdown scores and CEFR grade.
- `STORE_KEY_UI_LANG` (`mea_lms_ui_lang`): System interface language preference.

---

## 💻 Tech Stack & Dependencies

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with PostCSS & Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & FX**: [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Utilities**: `clsx`, `tailwind-merge`, `isomorphic-git`

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.x or v20.x recommended
- **npm**: v9.x or later

### Installation & Local Development

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ErSuraj097/Mea-govt.git
   cd Mea-govt
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the portal.

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 📜 Sovereign Compliance & Standards

- **GIGW 3.0**: Adheres to Guidelines for Indian Government Websites including high contrast mode, screen reader support, keyboard accessibility (`⌘K` search, focus rings), and dynamic text resizing.
- **Security**: Designed for zero external tracking, sanitized inputs, and CERT-In audit logging readiness.
- **DPDP Act 2023**: Encrypted local session storage and sovereign data handling protocols.

---

*Developed for the Ministry of External Affairs (MEA), Government of India.*
