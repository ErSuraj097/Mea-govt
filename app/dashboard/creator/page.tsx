'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import CreatorOverview from '@/components/roles/creator/CreatorOverview';
import CreatorBuilderPage from './builder/page';
import CreatorLessonsPage from './lessons/page';
import CreatorQuizzesPage from './quizzes/page';
import CreatorWorkflowPage from './workflow/page';
import CreatorLevelsPage from './levels/page';
import CreatorLibraryPage from './library/page';

export default function CreatorDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  if (activeTab === 'builder') return <CreatorBuilderPage />;
  if (activeTab === 'lessons') return <CreatorLessonsPage />;
  if (activeTab === 'quizzes') return <CreatorQuizzesPage />;
  if (activeTab === 'workflow') return <CreatorWorkflowPage />;
  if (activeTab === 'levels') return <CreatorLevelsPage />;
  if (activeTab === 'library') return <CreatorLibraryPage />;

  return <CreatorOverview />;
}
