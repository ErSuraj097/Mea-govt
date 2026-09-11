'use client';

import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Receipt,
  Download,
  CheckCircle2,
  Shield,
  Tag,
  CreditCard,
  QrCode,
  User as UserIcon,
  BookOpen,
  Building2,
  Search,
  Calendar,
  FileText,
  Printer,
  Sparkles,
  Award,
  Save,
  Mail,
  Phone,
  Globe,
  MapPin,
  GraduationCap,
  Bell,
  Sliders,
  Check
} from 'lucide-react';
import { getStoredUser, saveStoredUser } from '@/lib/lmsStore';
import { User } from '@/lib/mockData';

interface PaymentTransaction {
  id: string;
  invoiceNumber: string;
  itemTitle: string;
  category: 'Indian Languages Course' | 'Global Foreign Course' | 'University Registration' | 'Certificate Fee';
  date: string;
  amount: string;
  method: 'UPI QR' | 'Credit Card' | 'Netbanking' | '100% Free Govt Subsidy';
  status: 'Paid ✓' | 'Verified & Active';
}

const AVATAR_OPTIONS = [
  { id: 'av_1', name: 'Aarav (Student)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { id: 'av_2', name: 'Ananya (Scholar)', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
  { id: 'av_3', name: 'Ramesh (Researcher)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: 'av_4', name: 'Sunita (Linguist)', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' },
  { id: 'av_5', name: 'Vikram (Ambassador)', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
  { id: 'av_6', name: 'Meera (Diplomat)', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
];

export default function DashboardAccountDetailsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'payments'>('profile');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Student Profile Form Inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [nativeLanguage, setNativeLanguage] = useState('Hindi (हिन्दी)');
  const [targetLanguage, setTargetLanguage] = useState('Sanskrit (संस्कृतम्) & French');
  const [instituteName, setInstituteName] = useState('Kendriya Vidyalaya / Delhi University');
  const [bio, setBio] = useState('Class 10 CBSE Student • Devanagari & Classical Linguistics Learner');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('New Delhi');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].url);
  const [targetCefr, setTargetCefr] = useState('B2');
  const [scriptPreference, setScriptPreference] = useState('Both Devanagari & Roman');
  const [emailNotifications, setEmailNotifications] = useState(true);

  const [transactions] = useState<PaymentTransaction[]>([
    {
      id: 'tx_1',
      invoiceNumber: 'INV-HLMS-2026-981240',
      itemTitle: 'தமிழ் மூலம் हिंदी — Tamil to Hindi Masterclass',
      category: 'Indian Languages Course',
      date: '2026-08-28',
      amount: '₹0.00 (100% Govt Subsidy Code: BHASHA2026)',
      method: '100% Free Govt Subsidy',
      status: 'Paid ✓'
    },
    {
      id: 'tx_2',
      invoiceNumber: 'INV-GLOBAL-2026-761294',
      itemTitle: 'English to All 22 Scheduled Indian Languages Masterclass',
      category: 'Global Foreign Course',
      date: '2026-08-27',
      amount: '₹0.00 (100% Scholarship Code: GLOBALBHASHA2026)',
      method: '100% Free Govt Subsidy',
      status: 'Paid ✓'
    },
    {
      id: 'tx_3',
      invoiceNumber: 'INV-UNI-2026-981240',
      itemTitle: 'Kendriya Hindi Sansthan (Central Hindi Institute), Agra Admission',
      category: 'University Registration',
      date: '2026-08-25',
      amount: '₹0.00 (Subsidized MoE Seats)',
      method: 'UPI QR',
      status: 'Verified & Active'
    },
    {
      id: 'tx_4',
      invoiceNumber: 'INV-CERT-2026-441209',
      itemTitle: 'Accredited International Diploma Verification Fee',
      category: 'Certificate Fee',
      date: '2026-08-20',
      amount: '₹499.00',
      method: 'Credit Card',
      status: 'Paid ✓'
    }
  ]);

  useEffect(() => {
    const cur = getStoredUser();
    setUser(cur);
    if (cur) {
      setName(cur.name || 'Aarav Sharma');
      setEmail(cur.email || 'aarav.sharma@lms.edu.in');
      if (cur.country) setCountry(cur.country);
      if (cur.state) setState(cur.state);
      if (cur.avatar) setSelectedAvatar(cur.avatar);
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const updatedUser: User = {
      ...user,
      name,
      email,
      country,
      state,
      avatar: selectedAvatar,
    };

    saveStoredUser(updatedUser);
    setUser(updatedUser);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('userStateUpdated'));
    }

    setToastMessage('✅ Student Profile Details updated & persisted successfully across the LMS portal!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDownloadInvoice = (tx: PaymentTransaction) => {
    alert(`📄 Downloading Official GST Invoice PDF for ${tx.invoiceNumber}...`);
  };

  const filteredTx = transactions.filter((t) => {
    return (
      t.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 max-w-8xl mx-auto pb-16">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-700 text-white font-extrabold text-xs shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-200 hover:text-white font-black text-sm">✕</button>
        </div>
      )}

      {/* Official MEA Government Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3D91] via-[#082C6C] to-[#051C45] text-white border border-[#0B3D91] shadow-md space-y-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 shrink-0 shadow-lg">
              <UserIcon className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FF9933] text-[#212121] text-[10px] font-black uppercase tracking-wider">
                  STUDENT CONSOLE & PROFILE HUB
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-amber-300 text-[10px] font-bold">
                  VERIFIED SCHOLAR
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                छात्र विवरण एवं खाता प्रबंध (Student Profile & Account Console)
              </h1>
              <p className="text-xs text-blue-100 font-medium max-w-2xl">
                Manage your personal learner credentials, mother tongue, target language goals, institute affiliations, learning preferences, and financial ledgers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'bg-[#FF9933] text-[#212121] shadow-md'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <UserIcon className="w-4 h-4" /> Edit Profile Details
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center gap-2 ${
                activeTab === 'payments'
                  ? 'bg-[#FF9933] text-[#212121] shadow-md'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Receipt className="w-4 h-4" /> Invoices & Payments
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: EDIT STUDENT PROFILE DETAILS */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Avatar & Summary Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 space-y-6 shadow-2xs text-center">
              <div className="relative inline-block mx-auto">
                <img
                  src={selectedAvatar}
                  alt={name}
                  className="w-32 h-32 rounded-3xl object-cover ring-4 ring-[#0B3D91] shadow-xl mx-auto"
                />
                <span className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px] font-bold" title="Active Scholar">✓</span>
              </div>

              <div>
                <h3 className="text-xl font-black text-[#1B2A4A]">{name || 'Aarav Sharma'}</h3>
                <p className="text-xs font-bold text-[#0B3D91]">{email}</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#EEF3F8] text-[#0B3D91] text-[10px] font-extrabold border border-[#D0DCE7]">
                  {instituteName}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#EEF3F8] border border-[#D0DCE7] text-left space-y-2 text-xs">
                <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">CHOOSE SCHOLAR AVATAR</span>
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setSelectedAvatar(av.url)}
                      className={`relative rounded-xl overflow-hidden border-2 transition p-1 ${
                        selectedAvatar === av.url ? 'border-[#0B3D91] ring-2 ring-[#FF9933] bg-white' : 'border-transparent hover:border-slate-300'
                      }`}
                    >
                      <img src={av.url} alt={av.name} className="w-12 h-12 rounded-lg object-cover mx-auto" />
                      {selectedAvatar === av.url && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF9933] text-[#212121] rounded-full text-[9px] font-black flex items-center justify-center">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-left text-xs font-semibold pt-2">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Scholarship Status:</span>
                  <span className="text-emerald-700 font-extrabold">100% Subsidized ✓</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">CEFR Target Level:</span>
                  <span className="text-[#0B3D91] font-extrabold">{targetCefr} Advanced</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Enrolled Courses:</span>
                  <span className="text-[#0B3D91] font-extrabold">{user?.enrolledCourses?.length || 3} Masterclasses</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0B3D91]/5 border border-[#0B3D91]/20 space-y-3">
              <div className="flex items-center gap-2 text-[#0B3D91] font-black text-xs uppercase">
                <Shield className="w-4 h-4 text-[#FF9933]" /> Official MEA Scholar Verification
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Your profile details are synced with the National Bhasha Registry and Ministry certificates. Ensure your official full name matches your Government ID for accredited diplomas.
              </p>
            </div>
          </div>

          {/* Right Column: Editable Profile Fields Form (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="border-b border-[#DCE2E6] pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-[#1B2A4A]">Edit Personal & Student Profile Details</h2>
                <p className="text-xs text-slate-500 font-medium">Update your student information, contact details, and language preferences.</p>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition"
              >
                <Save className="w-4 h-4 text-[#FF9933]" /> Save Profile Changes
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-semibold">
              <div className="space-y-1.5">
                <label className="text-[#1B2A4A] font-bold flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-[#0B3D91]" /> Scholar Full Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#1B2A4A] font-bold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0B3D91]" /> Official Email Address:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#1B2A4A] font-bold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0B3D91]" /> Mobile Phone Number:
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#1B2A4A] font-bold flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#0B3D91]" /> School / University Affiliation:
                </label>
                <input
                  type="text"
                  value={instituteName}
                  onChange={(e) => setInstituteName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#1B2A4A] font-bold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#0B3D91]" /> Native Language (Mother Tongue):
                </label>
                <select
                  value={nativeLanguage}
                  onChange={(e) => setNativeLanguage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
                >
                  <option value="Hindi (हिन्दी)">Hindi (हिन्दी)</option>
                  <option value="Tamil (தமிழ்)">Tamil (தமிழ்)</option>
                  <option value="Telugu (తెలుగు)">Telugu (తెలుగు)</option>
                  <option value="Bengali (বাংলা)">Bengali (বাংলা)</option>
                  <option value="Marathi (मराठी)">Marathi (मराठी)</option>
                  <option value="Gujarati (ગુજરાતી)">Gujarati (ગુજરાતી)</option>
                  <option value="Kannada (ಕನ್ನಡ)">Kannada (ಕನ್ನಡ)</option>
                  <option value="Malayalam (മലയാളം)">Malayalam (മലയാളം)</option>
                  <option value="Punjabi (ਪੰਜਾਬੀ)">Punjabi (ਪੰਜਾਬੀ)</option>
                  <option value="English">English</option>
                  <option value="French (Français)">French (Français)</option>
                  <option value="Spanish (Español)">Spanish (Español)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#1B2A4A] font-bold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#0B3D91]" /> Target Language to Master:
                </label>
                <input
                  type="text"
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#1B2A4A] font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0B3D91]" /> State / UT:
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#1B2A4A] font-bold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#0B3D91]" /> Country:
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-semibold">
              <label className="text-[#1B2A4A] font-bold block">Academic Bio & Goals:</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE2E6] font-bold text-[#1B2A4A] focus:outline-none focus:border-[#0B3D91]"
              />
            </div>

            {/* Learning Preferences */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#DCE2E6] space-y-4 text-xs">
              <span className="text-[10px] font-black uppercase text-[#0B3D91] tracking-wider block">LEARNING PREFERENCES & SETTINGS</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-semibold">
                <div className="space-y-1">
                  <label className="text-[#1B2A4A] font-bold">Script Display Preference:</label>
                  <select
                    value={scriptPreference}
                    onChange={(e) => setScriptPreference(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#DCE2E6] font-bold text-[#1B2A4A]"
                  >
                    <option value="Both Devanagari & Roman">Both Devanagari & Roman Transliteration</option>
                    <option value="Native Devanagari Only">Native Devanagari Only</option>
                    <option value="Roman Transliteration Only">Roman Transliteration Only</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#1B2A4A] font-bold">Target CEFR Benchmark:</label>
                  <select
                    value={targetCefr}
                    onChange={(e) => setTargetCefr(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#DCE2E6] font-bold text-[#1B2A4A]"
                  >
                    <option value="A1">A1 Beginner</option>
                    <option value="A2">A2 Elementary</option>
                    <option value="B1">B1 Intermediate</option>
                    <option value="B2">B2 Upper Intermediate</option>
                    <option value="C1">C1 Advanced Practitioner</option>
                    <option value="C2">C2 Master Diplomat</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition"
              >
                <Save className="w-4 h-4 text-[#FF9933]" /> Save Profile & Sync Credentials
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: PAYMENTS & INVOICES */}
      {activeTab === 'payments' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#DCE2E6] space-y-1 shadow-2xs">
              <span className="text-[10px] font-black uppercase text-slate-400">REGISTERED STUDENT</span>
              <h3 className="text-base font-black text-[#1B2A4A]">{name || 'Aarav Sharma'}</h3>
              <span className="text-[11px] font-bold text-[#0B3D91]">ID: STU-HLMS-2026-981</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DCE2E6] space-y-1 shadow-2xs">
              <span className="text-[10px] font-black uppercase text-slate-400">ENROLLED MASTERCLASSES</span>
              <h3 className="text-2xl font-black text-[#1B2A4A]">{user?.enrolledCourses?.length || 3} Courses</h3>
              <span className="text-[11px] font-bold text-emerald-600">Active Unlocked Access</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DCE2E6] space-y-1 shadow-2xs">
              <span className="text-[10px] font-black uppercase text-slate-400">SCHOLARSHIP SUBSIDY</span>
              <h3 className="text-2xl font-black text-emerald-600">100% Free</h3>
              <span className="text-[11px] font-bold text-slate-600">Govt Voucher: BHASHA2026</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DCE2E6] space-y-1 shadow-2xs">
              <span className="text-[10px] font-black uppercase text-slate-400">PAYMENT STATUS</span>
              <h3 className="text-2xl font-black text-emerald-600">Verified ✓</h3>
              <span className="text-[11px] font-bold text-slate-600">All Invoices Cleared</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DCE2E6] space-y-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#0B3D91]" />
                <h3 className="text-lg font-black text-[#1B2A4A]">Payment & Invoice History Console</h3>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search invoice number or course..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#EEF3F8] border-b border-[#D0DCE7] text-[#0B3D91] font-extrabold uppercase text-[10px]">
                    <th className="p-3.5">Invoice #</th>
                    <th className="p-3.5">Course / Service Item</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Payment Method</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                  {filteredTx.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3.5 font-mono font-bold text-[#0B3D91]">{tx.invoiceNumber}</td>
                      <td className="p-3.5 max-w-xs font-bold text-[#1B2A4A]">{tx.itemTitle}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {tx.category}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500">{tx.date}</td>
                      <td className="p-3.5">{tx.method}</td>
                      <td className="p-3.5 font-extrabold text-emerald-700">{tx.amount}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDownloadInvoice(tx)}
                          className="px-3 py-1.5 rounded-xl bg-[#EEF3F8] hover:bg-[#0B3D91] text-[#0B3D91] hover:text-white font-bold text-xs flex items-center gap-1 ml-auto transition"
                        >
                          <Download className="w-3.5 h-3.5" /> PDF Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
