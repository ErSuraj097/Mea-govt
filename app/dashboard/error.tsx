'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard Error:', error);
  }, [error]);

  return (
    <div className="p-8 max-w-2xl mx-auto my-12 bg-white border border-slate-200 border-l-4 border-l-red-600 shadow-sm space-y-4 text-left">
      <div className="flex items-center gap-3 text-red-600">
        <AlertCircle className="w-6 h-6" />
        <h2 className="text-lg font-black text-slate-900">Dashboard Workspace Temporarily Unavailable</h2>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">
        An error occurred while rendering this role-specific dashboard console. You may reset the view or switch roles.
      </p>
      <div className="pt-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => reset()}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Reload Dashboard Console
        </Button>
      </div>
    </div>
  );
}
