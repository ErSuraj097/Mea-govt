'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('System error captured by boundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-lg w-full p-8 bg-white border border-slate-200 border-t-4 border-t-red-600 shadow-md space-y-6">
        <div className="w-12 h-12 bg-red-100 text-red-700 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-red-700 bg-red-50 px-2.5 py-1 border border-red-200">
            System Resilience Recovery
          </span>
          <h1 className="text-xl font-black text-slate-900">Portal Request Could Not Be Completed</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            The sovereign server encountered a transient exception. Our engineering audit trail has logged this incident.
          </p>
          {error?.digest && (
            <p className="text-[10px] font-mono text-slate-400">Incident Digest ID: {error.digest}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => reset()}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Retry Request
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
