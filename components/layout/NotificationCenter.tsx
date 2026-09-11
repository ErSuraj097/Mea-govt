'use client';

import React, { useState } from 'react';
import { Bell, CheckCircle2, Award, Calendar, BookOpen, Trophy, Sparkles, X } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'class' | 'cert' | 'comp' | 'assignment';
  read: boolean;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Live Class Reminder',
      desc: 'Dr. Devendra Sharma live lecture on SOV Grammar starts in 15 minutes!',
      time: '5m ago',
      type: 'class',
      read: false,
    },
    {
      id: 'n2',
      title: 'International Diploma Ready!',
      desc: 'Your Kendriya Hindi Sansthan accredited Diploma in Hindi Studies is unlocked & ready to download.',
      time: '1h ago',
      type: 'cert',
      read: false,
    },
    {
      id: 'n3',
      title: '14-Day Streak Bonus!',
      desc: 'Congratulations! You earned +150 XP for completing today\'s daily lesson.',
      time: '3h ago',
      type: 'comp',
      read: false,
    },
    {
      id: 'n4',
      title: 'Global Olympiad Battle',
      desc: 'Registration open for the 2026 International Devanagari Quiz Battle.',
      time: '1d ago',
      type: 'assignment',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition font-bold"
        title="Notifications"
      >
        <Bell className="w-4 h-4 text-slate-700" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-600 rounded-full animate-ping" />
        )}
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-600 rounded-full ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-orange-600" />
              <h3 className="font-extrabold text-sm text-slate-900">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-black text-[10px]">
                  {unreadCount} NEW
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-orange-600 hover:underline font-bold"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 font-medium">
                No notifications right now.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item))}
                  className={`p-4 flex items-start gap-3 hover:bg-slate-50 cursor-pointer transition relative group ${
                    !n.read ? 'bg-orange-50/40' : ''
                  }`}
                >
                  <div className={`p-2.5 rounded-2xl shrink-0 ${
                    n.type === 'class' ? 'bg-amber-100 text-amber-800' :
                    n.type === 'cert' ? 'bg-emerald-100 text-emerald-800' :
                    n.type === 'comp' ? 'bg-orange-100 text-orange-800' : 'bg-cyan-100 text-cyan-800'
                  }`}>
                    {n.type === 'class' && <Calendar className="w-4 h-4" />}
                    {n.type === 'cert' && <Award className="w-4 h-4" />}
                    {n.type === 'comp' && <Trophy className="w-4 h-4" />}
                    {n.type === 'assignment' && <BookOpen className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 space-y-0.5 pr-4">
                    <div className="flex justify-between items-center">
                      <p className={`text-xs font-extrabold ${!n.read ? 'text-orange-950' : 'text-slate-800'}`}>
                        {n.title}
                      </p>
                      <span className="text-[10px] font-semibold text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">{n.desc}</p>
                  </div>

                  <button
                    onClick={(e) => removeNotification(n.id, e)}
                    className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 absolute right-2 top-3"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
            <span className="text-[11px] font-bold text-slate-500">
              🔔 Notifications synced with National Faculty Portal
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
