'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import TeacherOverview from '@/components/roles/teacher/TeacherOverview';
import TeacherAssignmentsPage from './assignments/page';
import TeacherAIReviewPage from './ai-review/page';
import TeacherRosterPage from './roster/page';
import TeacherLiveClassesPage from './classes/live/page';
import TeacherLevelsPage from './levels/page';
import TeacherLibraryPage from './library/page';
import TeacherCompetitionsPage from './competitions/page';

export default function TeacherDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  if (activeTab === 'assignments') return <TeacherAssignmentsPage />;
  if (activeTab === 'ai-review') return <TeacherAIReviewPage />;
  if (activeTab === 'roster') return <TeacherRosterPage />;
  if (activeTab === 'classes') return <TeacherLiveClassesPage />;
  if (activeTab === 'levels') return <TeacherLevelsPage />;
  if (activeTab === 'library') return <TeacherLibraryPage />;
  if (activeTab === 'competitions') return <TeacherCompetitionsPage />;

  return <TeacherOverview />;
}
