import React from 'react';
import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 bg-white border border-slate-200 border-t-4 border-t-[#0C2340] shadow-md space-y-6">
        <div className="w-12 h-12 bg-slate-100 text-[#0C2340] flex items-center justify-center mx-auto">
          <FileQuestion className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#0C2340] bg-slate-100 px-2.5 py-1 border border-slate-200">
            404 • Resource Not Found
          </span>
          <h1 className="text-xl font-black text-slate-900">Official Page or Directive Not Found</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            The requested diplomatic resource or learning module may have moved or is under administrative update.
          </p>
        </div>

        <div className="flex gap-3 justify-center pt-2">
          <Link href="/">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Go to Portal Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
