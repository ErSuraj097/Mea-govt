'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import AdminOverview from '@/components/roles/admin/AdminOverview';
import AdminRBACPage from './rbac/page';
import AdminPublishingPage from './publishing/page';
import AdminAISettingsPage from './ai-settings/page';
import AdminAuditPage from './audit/page';
import AdminLevelsPage from './levels/page';
import AdminInstitutesPage from './institutes/page';
import AdminLeaderboardPage from './leaderboard/page';

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  if (activeTab === 'rbac') return <AdminRBACPage />;
  if (activeTab === 'publishing') return <AdminPublishingPage />;
  if (activeTab === 'ai-settings') return <AdminAISettingsPage />;
  if (activeTab === 'audit') return <AdminAuditPage />;
  if (activeTab === 'levels') return <AdminLevelsPage />;
  if (activeTab === 'institutes') return <AdminInstitutesPage />;
  if (activeTab === 'leaderboard') return <AdminLeaderboardPage />;

  return <AdminOverview />;
}
