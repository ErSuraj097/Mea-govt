'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  Video,
  FileText,
  Headphones,
  Sparkles,
  Building2,
  ExternalLink,
  Bot
} from 'lucide-react';
import { MOCK_RESOURCE_HUB_ITEMS, ResourceHubItem } from '@/lib/mockData';

export default function ResourceHubPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const filteredItems = MOCK_RESOURCE_HUB_ITEMS.filter((item) => {
    const matchesSearch =
      item.titleEng.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleNative.includes(searchTerm) ||
      item.sourceInstitution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLang = selectedLang === 'All' || item.language === selectedLang;
    const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel;
    const matchesSkill = selectedSkill === 'All' || item.skill === selectedSkill;
    const matchesType = selectedType === 'All' || item.resourceType === selectedType;
    return matchesSearch && matchesLang && matchesLevel && matchesSkill && matchesType;
  });

  const handleAiSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    setSearchTerm(aiQuery);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-16 text-left">
      {/* Top Banner */}
      <div className="bg-[#0B3D91] text-white border-b border-[#082C6C] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <span className="px-2.5 py-0.5 rounded-sm bg-[#FF9933] text-[#051C45] text-[10px] font-black uppercase tracking-wider inline-block">
            MINISTRY OF EXTERNAL AFFAIRS • AGGREGATED CURRICULUM
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Indian Language Resource Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
            Centralized repository aggregating Indian language learning resources from leading national universities, cultural centers, and diplomatic academies.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Ask AI to Find Resources */}
        <div className="bg-white border border-[#DCE2E6] rounded-sm p-5 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B3D91]">
            <Bot className="w-4 h-4 text-[#FF9933]" />
            <span>Ask AI to Find Learning Resources</span>
          </div>
          <form onSubmit={handleAiSearch} className="flex gap-2">
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="e.g. Find beginner Hindi listening resources about Indian culture..."
              className="flex-1 bg-[#F5F5F5] border border-[#DCE2E6] focus:border-[#0B3D91] rounded-sm px-3.5 py-2 text-xs text-[#1B2A4A] font-semibold outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs rounded-sm transition shadow-2xs shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" /> AI Search
            </button>
          </form>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-[#DCE2E6] rounded-sm p-4 space-y-3 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search resources, topics..."
                className="w-full bg-[#F5F5F5] border border-[#DCE2E6] focus:border-[#0B3D91] rounded-sm pl-9 pr-3 py-1.5 text-xs text-[#1B2A4A] font-semibold outline-none"
              />
            </div>
            <span className="text-xs text-[#555555] font-semibold">
              Showing <strong>{filteredItems.length}</strong> resources
            </span>
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div>
              <label className="text-[10px] font-extrabold text-[#555555] block mb-0.5 uppercase">Language:</label>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="w-full p-1.5 rounded-sm bg-[#F5F5F5] border border-[#DCE2E6] font-bold text-[#1B2A4A]"
              >
                <option value="All">All Languages</option>
                <option value="Hindi">Hindi (Phase 1)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-extrabold text-[#555555] block mb-0.5 uppercase">Level:</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-1.5 rounded-sm bg-[#F5F5F5] border border-[#DCE2E6] font-bold text-[#1B2A4A]"
              >
                <option value="All">All Levels</option>
                <option value="A1">A1 Beginner</option>
                <option value="A2">A2 Elementary</option>
                <option value="B1">B1 Intermediate</option>
                <option value="B2">B2 Upper</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-extrabold text-[#555555] block mb-0.5 uppercase">Skill (LSRW):</label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full p-1.5 rounded-sm bg-[#F5F5F5] border border-[#DCE2E6] font-bold text-[#1B2A4A]"
              >
                <option value="All">All Skills</option>
                <option value="listening">Listening</option>
                <option value="speaking">Speaking</option>
                <option value="reading">Reading</option>
                <option value="writing">Writing</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-extrabold text-[#555555] block mb-0.5 uppercase">Resource Type:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-1.5 rounded-sm bg-[#F5F5F5] border border-[#DCE2E6] font-bold text-[#1B2A4A]"
              >
                <option value="All">All Types</option>
                <option value="Video">Video</option>
                <option value="Audio">Audio</option>
                <option value="PDF">PDF</option>
                <option value="Course">Course</option>
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((res) => (
            <div
              key={res.id}
              className="bg-white border border-[#DCE2E6] hover:border-[#0B3D91] rounded-sm p-5 space-y-3 shadow-2xs flex flex-col justify-between transition group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-sm bg-blue-50 text-[#0B3D91] text-[9px] font-black uppercase border border-blue-200">
                    {res.language} • {res.level}
                  </span>
                  <span className="px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-800 text-[9px] font-extrabold uppercase border border-emerald-200">
                    {res.isOpenResource ? 'Open Resource' : 'Free Access'}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-[#1B2A4A] group-hover:text-[#0B3D91] transition">
                    {res.titleEng}
                  </h3>
                  <p className="text-xs font-semibold text-[#0B3D91] mt-0.5">{res.titleNative}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-[11px] text-[#555555]">
                  <Building2 className="w-3.5 h-3.5 text-[#0B3D91] shrink-0" />
                  <span className="truncate font-medium">{res.sourceInstitution}</span>
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400 font-semibold">{res.resourceType} • {res.durationOrPages}</span>
                  <a
                    href={res.url}
                    className="text-[#0B3D91] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    Access Resource <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
