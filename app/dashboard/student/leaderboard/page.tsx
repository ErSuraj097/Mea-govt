'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Trophy,
  Award,
  Crown,
  Flame,
  Medal,
  Sparkles,
  Zap,
  Search,
  CheckCircle2,
  Globe,
  Filter,
  Users,
  BookOpen,
  ChevronRight,
  X,
  Target,
  GraduationCap
} from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  state: string;
  track: 'Track A (Indian)' | 'Track B (Foreign)' | 'Dual Track';
  primaryLanguage: string;
  targetLanguages: string[];
  xp: number;
  streak: number;
  level: number;
  modulesCompleted: number;
  badgeTitle: string;
  isSelf?: boolean;
}

const LEADERBOARD_DATA: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Ananya Sundaram',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    state: 'Tamil Nadu',
    track: 'Dual Track',
    primaryLanguage: 'Tamil',
    targetLanguages: ['Hindi', 'French', 'Sanskrit'],
    xp: 14850,
    streak: 42,
    level: 5,
    modulesCompleted: 64,
    badgeTitle: '🥇 Bhasha Ratna Diplomat'
  },
  {
    rank: 2,
    name: 'Devendra Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    state: 'Uttar Pradesh',
    track: 'Track A (Indian)',
    primaryLanguage: 'Hindi',
    targetLanguages: ['Sanskrit', 'Telugu', 'Bengali'],
    xp: 13200,
    streak: 35,
    level: 5,
    modulesCompleted: 58,
    badgeTitle: '🥈 Devanagari Master'
  },
  {
    rank: 3,
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    state: 'Delhi NCR',
    track: 'Dual Track',
    primaryLanguage: 'Hindi',
    targetLanguages: ['English', 'German', 'Sanskrit'],
    xp: 11950,
    streak: 28,
    level: 4,
    modulesCompleted: 51,
    badgeTitle: '🥉 National Scholar',
    isSelf: true
  },
  {
    rank: 4,
    name: 'Priya Mukherjee',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    state: 'West Bengal',
    track: 'Track B (Foreign)',
    primaryLanguage: 'Bengali',
    targetLanguages: ['French', 'Spanish'],
    xp: 9840,
    streak: 21,
    level: 4,
    modulesCompleted: 44,
    badgeTitle: '⭐ Global Polyglot'
  },
  {
    rank: 5,
    name: 'Rohan Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    state: 'Gujarat',
    track: 'Track A (Indian)',
    primaryLanguage: 'Gujarati',
    targetLanguages: ['Hindi', 'Sanskrit', 'Marathi'],
    xp: 8750,
    streak: 19,
    level: 3,
    modulesCompleted: 38,
    badgeTitle: '⭐ Honor Scholar'
  },
  {
    rank: 6,
    name: 'Kavya Nair',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    state: 'Kerala',
    track: 'Track B (Foreign)',
    primaryLanguage: 'Malayalam',
    targetLanguages: ['Japanese', 'Mandarin Chinese'],
    xp: 8210,
    streak: 17,
    level: 3,
    modulesCompleted: 35,
    badgeTitle: '⭐ East Asian Specialist'
  },
  {
    rank: 7,
    name: 'Vikram Singh Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    state: 'Maharashtra',
    track: 'Track A (Indian)',
    primaryLanguage: 'Marathi',
    targetLanguages: ['Hindi', 'Kannada', 'Odia'],
    xp: 7920,
    streak: 15,
    level: 3,
    modulesCompleted: 32,
    badgeTitle: '⭐ Bhasha Fellow'
  },
  {
    rank: 8,
    name: 'Meera Chawla',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    state: 'Punjab',
    track: 'Track B (Foreign)',
    primaryLanguage: 'Punjabi',
    targetLanguages: ['Arabic', 'Persian', 'Russian'],
    xp: 7450,
    streak: 14,
    level: 3,
    modulesCompleted: 30,
    badgeTitle: '⭐ Middle Eastern Scholar'
  }
];

export default function DashboardLeaderboardPage() {
  const [filterTrack, setFilterTrack] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(null);

  const filteredUsers = LEADERBOARD_DATA.filter((user) => {
    const matchesTrack =
      filterTrack === 'ALL' ||
      (filterTrack === 'INDIAN' && user.track.includes('Indian')) ||
      (filterTrack === 'FOREIGN' && user.track.includes('Foreign')) ||
      (filterTrack === 'DUAL' && user.track.includes('Dual'));

    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.primaryLanguage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.targetLanguages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTrack && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* MEA Government Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-xl relative overflow-hidden space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <BarChart3 className="w-3.5 h-3.5" /> NATIONAL SCHOLAR LEADERBOARD 2026
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-[10px] font-bold uppercase border border-blue-400/30 flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-300" /> 22 Indian Bhashas + 15 Foreign World Languages
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              National Language Scholar Rankings
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Real-time rankings based on completed language modules, voice phonetics accuracy, live session attendance, AI speaking benchmarks, and government certification exams.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 min-w-[240px]">
            <Trophy className="w-8 h-8 text-amber-300 animate-pulse shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-blue-200 block uppercase tracking-wider">YOUR NATIONAL RANK</span>
              <span className="text-base font-black text-white">#3 Rank (11,950 XP)</span>
              <span className="text-[10px] text-emerald-300 font-extrabold block">Top 1% National Scholar</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setFilterTrack('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filterTrack === 'ALL'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🌐 All Tracks ({LEADERBOARD_DATA.length})
            </button>
            <button
              onClick={() => setFilterTrack('INDIAN')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filterTrack === 'INDIAN'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🇮🇳 Track A: Indian Bhashas
            </button>
            <button
              onClick={() => setFilterTrack('FOREIGN')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filterTrack === 'FOREIGN'
                  ? 'bg-[#FF9933] text-[#051C45] shadow-md'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              🌍 Track B: Foreign Languages
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scholar, state, or language..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 text-xs font-medium focus:outline-none focus:bg-white/20"
            />
          </div>
        </div>
      </div>

      {/* TOP 3 PODIUM SCHOLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredUsers.slice(0, 3).map((item) => (
          <div
            key={item.rank}
            onClick={() => setSelectedUser(item)}
            className={`rounded-3xl border p-6 space-y-4 text-center transition duration-300 relative cursor-pointer hover:shadow-xl ${
              item.rank === 1
                ? 'bg-gradient-to-b from-amber-500/10 via-white to-amber-50/20 border-amber-400 shadow-lg ring-2 ring-amber-400'
                : item.rank === 2
                ? 'bg-white border-slate-300 shadow-sm'
                : 'bg-white border-[#0B3D91]/30 shadow-md ring-1 ring-[#0B3D91]/20'
            }`}
          >
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 rounded-full font-black text-xs ${
                  item.rank === 1
                    ? 'bg-amber-400 text-slate-950'
                    : item.rank === 2
                    ? 'bg-slate-200 text-slate-800'
                    : 'bg-[#0B3D91] text-white'
                }`}
              >
                RANK #{item.rank}
              </span>
            </div>

            <div className="relative inline-block mx-auto pt-4">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-[#0B3D91] shadow-md mx-auto"
              />
              {item.rank === 1 && (
                <Crown className="w-8 h-8 text-amber-400 absolute -top-4 right-1/2 translate-x-1/2 drop-shadow-md" />
              )}
            </div>

            <div>
              <h3 className="font-black text-lg text-[#1B2A4A]">{item.name}</h3>
              <p className="text-xs text-[#0B3D91] font-bold">
                {item.state} • Native: {item.primaryLanguage}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-1 mt-2">
                {item.targetLanguages.map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-blue-50 text-[#0B3D91] text-[10px] font-bold border border-blue-100"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#EEF3F8] text-[#0B3D91] text-[10px] font-black">
                {item.badgeTitle}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#DCE2E6] flex justify-around text-xs font-black">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">TOTAL XP</span>
                <span className="text-[#0B3D91]">{item.xp.toLocaleString()} XP</span>
              </div>
              <div className="border-r border-slate-200" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">STREAK</span>
                <span className="text-[#FF9933] flex items-center gap-1 justify-center">
                  <Flame className="w-3.5 h-3.5" /> {item.streak} Days
                </span>
              </div>
              <div className="border-r border-slate-200" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">LEVEL</span>
                <span className="text-indigo-700">Lvl {item.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULL LEADERBOARD TABLE */}
      <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-[#1B2A4A]">National Language Scholar Roster</h3>
            <p className="text-xs text-slate-500">Showing scholars across Indian Bhashas and International Foreign Languages</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ● Real-Time Sync Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#EEF3F8] border-b border-[#D0DCE7] text-[#0B3D91] font-extrabold uppercase text-[10px]">
                <th className="p-3.5">Rank #</th>
                <th className="p-3.5">Scholar Name</th>
                <th className="p-3.5">State / UT</th>
                <th className="p-3.5">Track & Learning Languages</th>
                <th className="p-3.5">Level & Modules</th>
                <th className="p-3.5">Streak</th>
                <th className="p-3.5 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
              {filteredUsers.map((item) => (
                <tr
                  key={item.rank}
                  onClick={() => setSelectedUser(item)}
                  className={`hover:bg-slate-50 transition cursor-pointer ${
                    item.isSelf ? 'bg-[#EEF3F8] font-bold border-l-4 border-l-[#0B3D91]' : ''
                  }`}
                >
                  <td className="p-3.5 font-black text-[#0B3D91] text-sm">#{item.rank}</td>
                  <td className="p-3.5 flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200"
                    />
                    <div>
                      <span className="font-extrabold text-[#1B2A4A] block text-sm">{item.name}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{item.badgeTitle}</span>
                      {item.isSelf && (
                        <span className="ml-2 px-2 py-0.5 rounded bg-[#0B3D91] text-white text-[9px] font-black uppercase">
                          YOU
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-slate-700">{item.state}</td>
                  <td className="p-3.5 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 block">Native: {item.primaryLanguage}</span>
                    <div className="flex flex-wrap gap-1">
                      {item.targetLanguages.map((lang, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-blue-50 text-[#0B3D91] text-[10px] font-bold border border-blue-100"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 space-y-1">
                    <span className="text-xs font-black text-indigo-700 block">Level {item.level}</span>
                    <span className="text-[10px] font-semibold text-slate-500">{item.modulesCompleted} Modules</span>
                  </td>
                  <td className="p-3.5 font-bold text-[#FF9933]">{item.streak} Days 🔥</td>
                  <td className="p-3.5 text-right font-mono font-black text-[#0B3D91] text-sm">
                    {item.xp.toLocaleString()} XP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SCHOLAR PROFILE MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-[#DCE2E6] rounded-3xl p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedUser.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#0B3D91]"
                />
                <div>
                  <h3 className="font-black text-base text-[#1B2A4A]">{selectedUser.name}</h3>
                  <p className="text-xs text-[#0B3D91] font-bold">
                    {selectedUser.state} • Rank #{selectedUser.rank}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Track:</span>
                  <span className="text-[#0B3D91] font-extrabold">{selectedUser.track}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Mother Tongue:</span>
                  <span className="text-slate-900 font-bold">{selectedUser.primaryLanguage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Learning Target:</span>
                  <span className="text-slate-900 font-bold">{selectedUser.targetLanguages.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Badge Honor:</span>
                  <span className="text-amber-700 font-black">{selectedUser.badgeTitle}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                  <span className="text-[10px] text-slate-500 font-bold block">XP Points</span>
                  <span className="text-sm font-black text-[#0B3D91]">{selectedUser.xp.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
                  <span className="text-[10px] text-slate-500 font-bold block">Streak</span>
                  <span className="text-sm font-black text-[#FF9933]">{selectedUser.streak} Days</span>
                </div>
                <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <span className="text-[10px] text-slate-500 font-bold block">Completed</span>
                  <span className="text-sm font-black text-indigo-700">{selectedUser.modulesCompleted} Modules</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="w-full py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md"
              >
                Close Scholar Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
