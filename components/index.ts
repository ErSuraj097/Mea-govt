// ==========================================
// CENTRAL COMPONENT EXPORT MATRIX (ROLE-BASED & DOMAIN-BASED)
// ==========================================

// 1. Layout & Global Navigation Shell
export { default as Navbar } from './layout/Navbar';
export { default as Footer } from './layout/Footer';
export { default as GIGWHeaderBar } from './layout/GIGWHeaderBar';
export { default as DashboardSidebar } from './layout/DashboardSidebar';
export { default as NotificationCenter } from './layout/NotificationCenter';
export { default as SearchModal } from './layout/SearchModal';

// 2. Shared Selectors & Assessment Tools
export { default as GoalTrackSelector } from './shared/GoalTrackSelector';
export { default as LanguagePairSelector } from './shared/LanguagePairSelector';
export { default as TransliterationToggle } from './shared/TransliterationToggle';
export { default as SkillRadarGrade } from './shared/SkillRadarGrade';

// 3. Sovereign AI & Voice Modules
export { default as SambhasiniVoiceTutor } from './ai/SambhasiniVoiceTutor';

// 4. Role-Based Component Views
// Student Role
export { default as StudentOverview } from './roles/student/StudentOverview';
export { default as DashboardLessonView } from './roles/student/DashboardLessonView';

// Teacher Role
export { default as TeacherOverview } from './roles/teacher/TeacherOverview';

// Super Admin Role
export { default as AdminOverview } from './roles/admin/AdminOverview';

// Content Creator & Linguist Role
export { default as CreatorOverview } from './roles/creator/CreatorOverview';

// QA & Tester Role
export { default as TesterOverview } from './roles/tester/TesterOverview';

// Institute & Mission Admin Role
export { default as InstituteOverview } from './roles/institute/InstituteOverview';

// Treasury & Accounting Role
export { default as AccountingOverview } from './roles/accounting/AccountingOverview';
