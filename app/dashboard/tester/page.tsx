'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import TesterOverview from '@/components/roles/tester/TesterOverview';
import TesterQueuePage from './queue/page';
import TesterAudioPage from './audio/page';
import TesterSpellingPage from './spelling/page';
import TesterApprovalsPage from './approvals/page';

export default function TesterDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  if (activeTab === 'queue') return <TesterQueuePage />;
  if (activeTab === 'audio') return <TesterAudioPage />;
  if (activeTab === 'spelling') return <TesterSpellingPage />;
  if (activeTab === 'approvals') return <TesterApprovalsPage />;

  return <TesterOverview />;
}
