'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import AccountingOverview from '@/components/roles/accounting/AccountingOverview';
import AccountingRevenuePage from './revenue/page';
import AccountingGatewaysPage from './gateways/page';
import AccountingSubscriptionsPage from './subscriptions/page';
import AccountingRefundsPage from './refunds/page';

export default function AccountingDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  if (activeTab === 'revenue') return <AccountingRevenuePage />;
  if (activeTab === 'gateways') return <AccountingGatewaysPage />;
  if (activeTab === 'subscriptions') return <AccountingSubscriptionsPage />;
  if (activeTab === 'refunds') return <AccountingRefundsPage />;

  return <AccountingOverview />;
}
