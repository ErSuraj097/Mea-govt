'use client';

import { MOCK_CURRENT_USER, MOCK_USERS_BY_ROLE, User } from './mockData';
import {
  LearningTrackType,
  GoalTrackId,
  ScriptDisplayMode,
  SkillSplitScore,
  LanguagePair,
  CONFIGURED_LANGUAGE_PAIRS,
} from './bidirectionalData';
import { SupportedUILang } from './i18nChrome';

export type { User };

// Local storage key constants
const STORE_KEY_USER = 'mea_lms_user_state';
const STORE_KEY_ROLE = 'mea_lms_active_role';
const STORE_KEY_TRACK = 'mea_lms_active_track';
const STORE_KEY_PAIR = 'mea_lms_active_pair';
const STORE_KEY_GOAL = 'mea_lms_active_goal';
const STORE_KEY_SCRIPT = 'mea_lms_script_mode';
const STORE_KEY_SKILLS = 'mea_lms_skill_split';
const STORE_KEY_UI_LANG = 'mea_lms_ui_lang';

export function getStoredUser(): User {
  if (typeof window === 'undefined') return MOCK_CURRENT_USER;
  try {
    const saved = localStorage.getItem(STORE_KEY_USER);
    return saved ? JSON.parse(saved) : MOCK_CURRENT_USER;
  } catch (e) {
    return MOCK_CURRENT_USER;
  }
}

export function saveStoredUser(user: User) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORE_KEY_USER, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user state', e);
  }
}

export function getActiveRole(): User['role'] {
  if (typeof window === 'undefined') return 'student';
  try {
    const saved = localStorage.getItem(STORE_KEY_ROLE) as User['role'];
    return saved || 'student';
  } catch (e) {
    return 'student';
  }
}

export function setActiveRoleInStore(role: User['role']) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORE_KEY_ROLE, role);
    if (MOCK_USERS_BY_ROLE[role]) {
      saveStoredUser(MOCK_USERS_BY_ROLE[role]);
    }
  } catch (e) {
    console.error('Failed to set active role', e);
  }
}

export function loginUserByRole(role: User['role']): User {
  const targetUser = MOCK_USERS_BY_ROLE[role] || MOCK_CURRENT_USER;
  setActiveRoleInStore(role);
  saveStoredUser(targetUser);
  return targetUser;
}

// Global Auth login support (Passport, Google, Email)
export function loginWithGlobalAuth(params: {
  method: 'passport' | 'google' | 'email';
  identifier: string;
  name?: string;
  country?: string;
}): User {
  const baseUser = getStoredUser();
  const updatedUser: User = {
    ...baseUser,
    id: `usr_${Math.random().toString(36).substring(2, 9)}`,
    name: params.name || (params.method === 'passport' ? 'Amb. Global Scholar' : 'International Learner'),
    email: params.method === 'email' ? params.identifier : `${params.identifier.toLowerCase().replace(/[^a-z0-9]/g, '')}@global-scholar.mea.gov.in`,
    country: params.country || 'International',
    role: 'student',
  };
  saveStoredUser(updatedUser);
  return updatedUser;
}

// Track Management (Track A: Foreigners -> Indian, Track B: Indians -> Foreign)
export function getActiveTrack(): LearningTrackType {
  if (typeof window === 'undefined') return 'trackA';
  try {
    return (localStorage.getItem(STORE_KEY_TRACK) as LearningTrackType) || 'trackA';
  } catch (e) {
    return 'trackA';
  }
}

export function setActiveTrack(track: LearningTrackType) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORE_KEY_TRACK, track);
    // Auto adjust active pair to match track
    if (track === 'trackA') {
      setActivePair('en-to-hi');
    } else {
      setActivePair('hi-to-fr');
    }
  } catch (e) {
    console.error(e);
  }
}

// Configurable Language Pair Management
export function getActivePair(): LanguagePair {
  const defaultPair = CONFIGURED_LANGUAGE_PAIRS[0];
  if (typeof window === 'undefined') return defaultPair;
  try {
    const pairId = localStorage.getItem(STORE_KEY_PAIR);
    const found = CONFIGURED_LANGUAGE_PAIRS.find((p) => p.id === pairId);
    return found || defaultPair;
  } catch (e) {
    return defaultPair;
  }
}

export function setActivePair(pairId: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORE_KEY_PAIR, pairId);
  } catch (e) {
    console.error(e);
  }
}

// Goal Track Management (Diplomatic, Trade, Travel)
export function getActiveGoalTrack(): GoalTrackId {
  if (typeof window === 'undefined') return 'diplomatic';
  try {
    return (localStorage.getItem(STORE_KEY_GOAL) as GoalTrackId) || 'diplomatic';
  } catch (e) {
    return 'diplomatic';
  }
}

export function setActiveGoalTrack(goal: GoalTrackId) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORE_KEY_GOAL, goal);
  } catch (e) {
    console.error(e);
  }
}

// Script Display Mode (Transliteration vs Native Devanagari)
export function getScriptMode(): ScriptDisplayMode {
  if (typeof window === 'undefined') return 'both';
  try {
    return (localStorage.getItem(STORE_KEY_SCRIPT) as ScriptDisplayMode) || 'both';
  } catch (e) {
    return 'both';
  }
}

export function setScriptMode(mode: ScriptDisplayMode) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORE_KEY_SCRIPT, mode);
  } catch (e) {
    console.error(e);
  }
}

// Skill-Split Scoring (LSRW)
export const DEFAULT_SKILL_SPLIT: SkillSplitScore = {
  listening: 82,
  speaking: 76,
  reading: 88,
  writing: 70,
  overallCEFR: 'B1',
  lastAssessed: '2026-08-28',
};

export function getStoredSkillSplit(): SkillSplitScore {
  if (typeof window === 'undefined') return DEFAULT_SKILL_SPLIT;
  try {
    const saved = localStorage.getItem(STORE_KEY_SKILLS);
    return saved ? JSON.parse(saved) : DEFAULT_SKILL_SPLIT;
  } catch (e) {
    return DEFAULT_SKILL_SPLIT;
  }
}

export function saveStoredSkillSplit(skills: SkillSplitScore) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORE_KEY_SKILLS, JSON.stringify(skills));
  } catch (e) {
    console.error(e);
  }
}

// UI Chrome Language Preference
export function getStoredUILang(): SupportedUILang {
  if (typeof window === 'undefined') return 'en';
  try {
    return (localStorage.getItem(STORE_KEY_UI_LANG) as SupportedUILang) || 'en';
  } catch (e) {
    return 'en';
  }
}

export function setStoredUILang(lang: SupportedUILang) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORE_KEY_UI_LANG, lang);
  } catch (e) {
    console.error(e);
  }
}

export function addXpToUser(xpAmount: number): User {
  const user = getStoredUser();
  user.xp += xpAmount;
  user.coins += Math.floor(xpAmount / 2);
  saveStoredUser(user);
  return user;
}

export function enrollInCourse(courseId: string): User {
  const user = getStoredUser();
  if (!user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses = [...user.enrolledCourses, courseId];
    saveStoredUser(user);
  }
  return user;
}

export function unenrollFromCourse(courseId: string): User {
  const user = getStoredUser();
  user.enrolledCourses = user.enrolledCourses.filter((id) => id !== courseId);
  saveStoredUser(user);
  return user;
}

