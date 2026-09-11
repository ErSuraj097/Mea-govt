'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getStoredUser } from '@/lib/lmsStore';
import { User } from '@/lib/mockData';

// Dedicated Student Role Components
import StudentOverview from '@/components/roles/student/StudentOverview';
import DashboardLessonView from '@/components/roles/student/DashboardLessonView';

// Dedicated Student Sub-pages (Folder & Subfolder Structured)
import StudentIndianLanguagesPage from './indian-languages/page';
import StudentForeignLanguagesPage from './foreign-languages/page';
import StudentForeignToIndianPage from './foreign-to-indian/page';
import StudentFreeVideosPage from './free-videos/page';
import StudentFreeAudioPage from './free-audio/page';
import StudentGuidedLearningPage from './guided-learning/page';
import StudentLibraryPage from './library/page';
import StudentLevelsPage from './levels/page';
import StudentChatbotPage from './chatbot/page';
import StudentAvatarPage from './avatar/page';
import StudentSpeakingTestPage from './speaking-test/page';
import StudentWritingTestPage from './writing-test/page';
import StudentListeningTestPage from './listening-test/page';
import StudentCompetitionsPage from './competitions/page';
import StudentLeaderboardPage from './leaderboard/page';
import StudentLiveClassesPage from './classes/live/page';
import StudentPhysicalClassesPage from './classes/physical/page';
import StudentCertificatesPage from './certificates/page';
import StudentInstitutesPage from './institutes/page';
import StudentAccountDetailsPage from './account-details/page';
import StudentExamPage from './exam/page';
import StudentSambhasiniAIPage from './bhashini-ai/page';
import StudentAICallsPage from './ai-calls/page';
import PlacementDiagnosticPage from './diagnostic/page';
import CreativeShowcasePage from './showcase/page';
import LanguageCirclesPage from './language-circles/page';
import StudentTicketsPage from './tickets/page';

export default function StudentDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  // Dedicated Student Tab Router
  if (activeTab === 'tickets' || activeTab === 'raise-ticket' || activeTab === 'support' || activeTab === 'help-tickets') return <StudentTicketsPage />;
  if (activeTab === 'ai-calls' || activeTab === 'calls' || activeTab === 'schedule' || activeTab === 'call') return <StudentAICallsPage />;
  if (activeTab === 'Sambhasini-ai' || activeTab === 'Sambhasini-tools' || activeTab === 'Sambhasini') return <StudentSambhasiniAIPage />;
  if (activeTab === 'diagnostic') return <PlacementDiagnosticPage />;
  if (activeTab === 'showcase') return <CreativeShowcasePage />;
  if (activeTab === 'language-circles' || activeTab === 'circles') return <LanguageCirclesPage />;
  if (activeTab === 'lesson') return <DashboardLessonView />;
  if (activeTab === 'indian-languages') return <StudentIndianLanguagesPage />;
  if (activeTab === 'foreign-languages') return <StudentForeignLanguagesPage />;
  if (activeTab === 'foreign-to-indian' || activeTab === 'international-to-indian') return <StudentForeignToIndianPage />;
  if (activeTab === 'free-videos') return <StudentFreeVideosPage />;
  if (activeTab === 'free-audio') return <StudentFreeAudioPage />;
  if (activeTab === 'guided-learning') return <StudentGuidedLearningPage />;
  if (activeTab === 'account-details' || activeTab === 'profile' || activeTab === 'student-profile' || activeTab === 'account' || activeTab === 'edit-profile') return <StudentAccountDetailsPage />;
  if (activeTab === 'institutes') return <StudentInstitutesPage />;
  if (activeTab === 'exam') return <StudentExamPage />;
  if (activeTab === 'levels') return <StudentLevelsPage />;
  if (activeTab === 'classes') return <StudentLiveClassesPage />;
  if (activeTab === 'competitions') return <StudentCompetitionsPage />;
  if (activeTab === 'leaderboard') return <StudentLeaderboardPage />;
  if (activeTab === 'library') return <StudentLibraryPage />;
  if (activeTab === 'chatbot') return <StudentChatbotPage />;
  if (activeTab === 'avatar') return <StudentAvatarPage />;
  if (activeTab === 'speaking-test') return <StudentSpeakingTestPage />;
  if (activeTab === 'writing-test') return <StudentWritingTestPage />;
  if (activeTab === 'listening-test') return <StudentListeningTestPage />;
  if (activeTab === 'physical') return <StudentPhysicalClassesPage />;
  if (activeTab === 'certificates') return <StudentCertificatesPage />;

  // Default Authenticated Student Hub
  return <StudentOverview user={user} />;
}
