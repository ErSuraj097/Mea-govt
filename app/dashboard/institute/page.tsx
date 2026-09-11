'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import InstituteOverview from '@/components/roles/institute/InstituteOverview';
import InstituteBatchesPage from './batches/page';
import InstituteFeesPage from './fees/page';
import InstituteDirectoryPage from './directory/page';

export default function InstituteDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  if (activeTab === 'batches') return <InstituteBatchesPage />;
  if (activeTab === 'fees') return <InstituteFeesPage />;
  if (activeTab === 'directory' || activeTab === 'institutes') return <InstituteDirectoryPage />;

  return <InstituteOverview />;
}
