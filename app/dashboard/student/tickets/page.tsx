'use client';

import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Send,
  Sparkles,
  Bot,
  UserCheck,
  Building2,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  MessageSquare,
  Search,
  Filter,
  Plus,
  X,
  Upload,
  ArrowRight,
  ShieldAlert,
  Zap,
  RotateCcw
} from 'lucide-react';
import { getStoredUser } from '@/lib/lmsStore';
import { User } from '@/lib/mockData';

interface SupportTicket {
  id: string;
  trackingCode: string;
  subject: string;
  category: 'Academic Question' | 'Exam & Proctoring' | 'Technical Bug' | 'Certificate Verification' | 'Billing & Scholarship';
  recipient: 'Super Admin' | 'Assigned Teacher' | 'Both Admin & Teacher';
  assignedTeacher: string;
  priority: 'High - 2h Response' | 'Normal - 24h Response' | 'Critical - Immediate';
  status: '🟢 AI Resolved' | '🟡 Pending Teacher & Admin' | '🔵 Under Investigation';
  createdDate: string;
  description: string;
  aiAutoResolution?: string;
  messages: {
    id: string;
    sender: 'Student' | 'AI Assistant' | 'Teacher (Dr. Devendra)' | 'Super Admin';
    text: string;
    timestamp: string;
  }[];
}

export default function StudentTicketsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newReplyMsg, setNewReplyMsg] = useState('');

  // Ticket Form Input State
  const [category, setCategory] = useState<SupportTicket['category']>('Academic Question');
  const [recipient, setRecipient] = useState<SupportTicket['recipient']>('Both Admin & Teacher');
  const [assignedTeacher, setAssignedTeacher] = useState('Dr. Devendra Sharma (Agra KHS)');
  const [priority, setPriority] = useState<SupportTicket['priority']>('Normal - 24h Response');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  
  // AI Resolution State
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'tkt_1',
      trackingCode: 'TKT-MEA-2026-98124',
      subject: 'Clarification on SOV Verb Conjugation in Lesson 4 Exam',
      category: 'Academic Question',
      recipient: 'Both Admin & Teacher',
      assignedTeacher: 'Dr. Devendra Sharma (Agra KHS)',
      priority: 'Normal - 24h Response',
      status: '🟡 Pending Teacher & Admin',
      createdDate: '2026-09-10 14:30',
      description: 'I need guidance on transitive verb endings when converting past tense sentences into Devanagari.',
      aiAutoResolution: 'AI Suggestion: In Hindi SOV grammar, past tense transitive verbs require the "ne" (ने) postposition attached to the subject.',
      messages: [
        {
          id: 'm1',
          sender: 'Student',
          text: 'I need guidance on transitive verb endings when converting past tense sentences into Devanagari.',
          timestamp: '14:30 PM'
        },
        {
          id: 'm2',
          sender: 'AI Assistant',
          text: '⚡ Instant AI Diagnosis: Transitive past tense verbs require the ergative case marker "ne" (ने) on the subject. The verb then agrees with the object.',
          timestamp: '14:31 PM'
        },
        {
          id: 'm3',
          sender: 'Teacher (Dr. Devendra)',
          text: 'Namaste Aarav! The AI diagnosis is accurate. See page 42 of the library manual for additional sample exercises.',
          timestamp: '15:10 PM'
        }
      ]
    },
    {
      id: 'tkt_2',
      trackingCode: 'TKT-MEA-2026-44109',
      subject: 'QR Code Verification Issue on International B2 Certificate PDF',
      category: 'Certificate Verification',
      recipient: 'Super Admin',
      assignedTeacher: 'Central Administration Desk',
      priority: 'High - 2h Response',
      status: '🟢 AI Resolved',
      createdDate: '2026-09-08 09:15',
      description: 'The QR code on my downloaded diploma PDF was returning a 404 error during employer verification.',
      aiAutoResolution: 'AI Resolution: Re-indexed QR registry. Updated verified link to https://mea.gov.in/verify/STU-HLMS-2026-981.',
      messages: [
        {
          id: 'm1',
          sender: 'Student',
          text: 'The QR code on my downloaded diploma PDF was returning a 404 error during employer verification.',
          timestamp: '09:15 AM'
        },
        {
          id: 'm2',
          sender: 'AI Assistant',
          text: '✅ AI Auto-Fix Executed: Re-indexed QR registry and regenerated signed SSL diploma URL. Verification now active.',
          timestamp: '09:16 AM'
        }
      ]
    }
  ]);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  // AI Auto-Resolve Simulation
  const handleTryAiAutoResolve = () => {
    if (!description.trim()) {
      alert('Please enter your issue description first so AI can analyze it!');
      return;
    }
    setAiAnalyzing(true);
    setAiSuggestion(null);

    setTimeout(() => {
      setAiAnalyzing(false);
      setAiSuggestion(
        `⚡ AI Instant Solution: Based on your issue description ("${description.slice(0, 40)}..."), here is the automated fix:\n\n1. Ensure your browser microphone permissions are allowed.\n2. Clear cache and reload the proctored exam portal.\n3. If issue persists, submit ticket directly to Admin & Teacher below.`
      );
    }, 1200);
  };

  // Submit Ticket & Send to Admin and Teacher
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      alert('Please enter both subject title and description text.');
      return;
    }

    const newCode = 'TKT-MEA-2026-' + Math.floor(10000 + Math.random() * 90000);
    const newTicket: SupportTicket = {
      id: 'tkt_' + Date.now(),
      trackingCode: newCode,
      subject: subject.trim(),
      category,
      recipient,
      assignedTeacher,
      priority,
      status: '🟡 Pending Teacher & Admin',
      createdDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
      description: description.trim(),
      aiAutoResolution: aiSuggestion || undefined,
      messages: [
        {
          id: 'msg_1',
          sender: 'Student',
          text: description.trim(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: 'msg_2',
          sender: 'AI Assistant',
          text: `⚡ Automated AI Intake: Ticket recorded and dispatched to ${recipient}. Priority level: ${priority}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    setTickets((prev) => [newTicket, ...prev]);
    alert(`✅ SUPPORT TICKET SUBMITTED & DISPATCHED!\n\nTracking Code: ${newCode}\nDispatched To: ${recipient} (${assignedTeacher})\nPriority: ${priority}\n\nA copy of this support ticket has been sent to the Ministry Admin and your assigned Faculty Evaluator.`);

    setSubject('');
    setDescription('');
    setAiSuggestion(null);
    setActiveTab('history');
  };

  const handleSendReply = () => {
    if (!newReplyMsg.trim() || !selectedTicket) return;
    const reply = {
      id: 'reply_' + Date.now(),
      sender: 'Student' as const,
      text: newReplyMsg.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, reply]
    };

    setTickets((prev) => prev.map((t) => (t.id === selectedTicket.id ? updated : t)));
    setSelectedTicket(updated);
    setNewReplyMsg('');
  };

  const filteredTickets = tickets.filter((t) => {
    return (
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.trackingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Official MEA Government Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-md space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#212121] text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <HelpCircle className="w-3.5 h-3.5" /> LIVE HELP DESK & TICKET SUPPORT PORTAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Support & Help Tickets Console
            </h1>
            <p className="text-xs text-blue-100 font-medium max-w-2xl">
              Raise live support tickets for academic, proctoring, or technical issues. Resolve instantly via AI Auto-Resolver or dispatch directly to Ministry Admins & assigned Faculty Evaluators.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center gap-2 ${
                activeTab === 'create' ? 'bg-[#FF9933] text-[#212121] shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              <Plus className="w-4 h-4" /> Raise Support Ticket
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center gap-2 ${
                activeTab === 'history' ? 'bg-[#FF9933] text-[#212121] shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              <FileText className="w-4 h-4" /> My Tickets ({tickets.length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: RAISE SUPPORT TICKET & AI AUTO-RESOLVER */}
      {activeTab === 'create' && (
        <form onSubmit={handleCreateTicket} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
          {/* Left Column: Ticket Creation Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="border-b border-[#DCE2E6] pb-3">
              <h2 className="text-xl font-black text-[#1B2A4A]">Raise New Support Ticket</h2>
              <p className="text-xs text-slate-500 font-medium">Select issue details and choose recipients for admin & faculty dispatch.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="space-y-1.5">
                <label className="text-[#1B2A4A] font-bold block">Issue Category:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
                >
                  <option value="Academic Question">Academic Question / SOV Grammar</option>
                  <option value="Exam & Proctoring">Exam & Proctoring Unlock</option>
                  <option value="Technical Bug">Technical Bug / Audio Speech</option>
                  <option value="Certificate Verification">Certificate Verification</option>
                  <option value="Billing & Scholarship">Billing & Scholarship Subsidy</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#1B2A4A] font-bold block">Dispatch Recipient Target:</label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
                >
                  <option value="Both Admin & Teacher">Both Super Admin & Assigned Teacher</option>
                  <option value="Assigned Teacher">Assigned Faculty Evaluator Only</option>
                  <option value="Super Admin">Ministry Super Admin Only</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#1B2A4A] font-bold block">Assigned Faculty / Teacher:</label>
                <select
                  value={assignedTeacher}
                  onChange={(e) => setAssignedTeacher(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
                >
                  <option value="Dr. Devendra Sharma (Agra KHS)">Dr. Devendra Sharma (Kendriya Hindi Sansthan)</option>
                  <option value="Prof. Ananya Sen (CIIL Mysuru)">Prof. Ananya Sen (CIIL Mysuru)</option>
                  <option value="Prof. Ramesh Sharma (BHU Varanasi)">Prof. Ramesh Sharma (BHU Varanasi)</option>
                  <option value="Central Administration Desk">Central Administration Desk</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#1B2A4A] font-bold block">Urgency Priority Level:</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
                >
                  <option value="Normal - 24h Response">Normal (24h Standard Response)</option>
                  <option value="High - 2h Response">High Priority (2h Fast-Track)</option>
                  <option value="Critical - Immediate">Critical (Immediate Live Alert)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-semibold">
              <label className="text-[#1B2A4A] font-bold block">Subject / Issue Title:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your question or technical issue..."
                required
                className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
              />
            </div>

            <div className="space-y-1.5 text-xs font-semibold">
              <label className="text-[#1B2A4A] font-bold block">Detailed Description & Steps to Reproduce:</label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what happened or type your exact question for the teacher and admin..."
                required
                className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-semibold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleTryAiAutoResolve}
                className="px-5 py-3 rounded-xl bg-[#EEF3F8] hover:bg-[#0B3D91] text-[#0B3D91] hover:text-white font-extrabold text-xs transition flex items-center gap-1.5 border border-[#D0DCE7]"
              >
                <Zap className="w-4 h-4 text-[#FF9933]" /> Try Instant AI Auto-Resolution
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition"
              >
                <Send className="w-4 h-4 text-[#FF9933]" /> Submit & Send to Admin & Teacher
              </button>
            </div>
          </div>

          {/* Right Column: AI Auto-Resolver & Dispatch Info Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-5 shadow-2xs">
              <div className="flex items-center gap-3 border-b border-[#DCE2E6] pb-3">
                <div className="w-10 h-10 rounded-xl bg-[#EEF3F8] text-[#0B3D91] flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">AI AUTO-RESOLVER ASSISTANT</span>
                  <h3 className="text-base font-black text-[#1B2A4A]">Instant Problem Diagnosis</h3>
                </div>
              </div>

              {aiAnalyzing && (
                <div className="p-6 rounded-2xl bg-[#EEF3F8] border border-[#D0DCE7] text-center space-y-2 text-xs font-bold text-[#0B3D91]">
                  <RotateCcw className="w-6 h-6 animate-spin mx-auto text-[#FF9933]" />
                  <span>AI Analyzing Issue & Knowledge Base...</span>
                </div>
              )}

              {aiSuggestion ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 text-xs text-emerald-950 font-semibold animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold">
                    <Sparkles className="w-4 h-4 text-emerald-600" /> AI Instant Solution Found!
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed">{aiSuggestion}</pre>
                  <p className="text-[10px] text-emerald-700 font-bold">
                    Did this resolve your issue? If not, click "Submit & Send to Admin & Teacher" on the left to dispatch your ticket.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Type your issue description on the left and click <strong>"Try Instant AI Auto-Resolution"</strong> for immediate AI diagnosis before dispatching to human staff.
                </p>
              )}
            </div>

            <div className="p-6 rounded-3xl bg-[#0B3D91]/5 border border-[#0B3D91]/20 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-[#0B3D91] font-black uppercase">
                <ShieldCheck className="w-4 h-4 text-[#FF9933]" /> Official Escalation SLA Guarantee
              </div>
              <p className="text-slate-600 font-medium leading-relaxed">
                Tickets submitted here are automatically delivered to the <strong>Ministry Super Admin Desk</strong> and <strong>Assigned Faculty Evaluator</strong>. You will receive real-time notifications when your teacher replies.
              </p>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: MY SUPPORT TICKETS HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0B3D91]" />
                <h3 className="text-lg font-black text-[#1B2A4A]">My Support Tickets Log</h3>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search tracking code or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTickets.map((tkt) => (
                <div
                  key={tkt.id}
                  className="bg-white rounded-3xl border border-[#DCE2E6] p-6 space-y-4 shadow-2xs hover:shadow-xl transition duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-[#0B3D91]">{tkt.trackingCode}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-black">
                        {tkt.status}
                      </span>
                    </div>

                    <h4 className="font-black text-base text-[#1B2A4A] leading-snug">{tkt.subject}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2 font-medium">{tkt.description}</p>

                    <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#DCE2E6] space-y-1 text-xs font-semibold">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Recipient:</span>
                        <span className="text-[#0B3D91] font-bold">{tkt.recipient}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Assigned Faculty:</span>
                        <span className="text-slate-800">{tkt.assignedTeacher}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Priority:</span>
                        <span className="text-emerald-700 font-bold">{tkt.priority}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
                    <span className="text-[11px] font-bold text-slate-400">{tkt.createdDate}</span>
                    <button
                      onClick={() => setSelectedTicket(tkt)}
                      className="px-4 py-2 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4 text-[#FF9933]" /> View Conversation Thread ({tkt.messages.length}) →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TICKET CONVERSATION THREAD MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white border border-[#DCE2E6] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left my-6">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EEF3F8] text-[#0B3D91] flex items-center justify-center font-bold">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs font-black text-[#0B3D91]">{selectedTicket.trackingCode}</span>
                  <h3 className="font-black text-base text-[#1B2A4A]">{selectedTicket.subject}</h3>
                </div>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Response Messages Thread */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {selectedTicket.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl space-y-1 text-xs font-semibold ${
                    msg.sender === 'Student'
                      ? 'bg-[#0B3D91] text-white ml-6 shadow-md'
                      : msg.sender === 'AI Assistant'
                      ? 'bg-amber-50 border border-amber-200 text-amber-950 mr-6'
                      : 'bg-[#F8FAFC] border border-[#DCE2E6] text-[#1B2A4A] mr-6 shadow-2xs'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-extrabold opacity-80 border-b border-slate-200/20 pb-1">
                    <span className={msg.sender === 'Student' ? 'text-amber-300' : 'text-[#0B3D91]'}>{msg.sender}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="text-xs leading-relaxed font-sans">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Reply Bar */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <input
                type="text"
                placeholder="Type a follow-up reply for Admin or Teacher..."
                value={newReplyMsg}
                onChange={(e) => setNewReplyMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                className="flex-1 p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-semibold text-xs text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
              />
              <button
                onClick={handleSendReply}
                className="px-5 py-3 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <Send className="w-4 h-4 text-[#FF9933]" /> Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
