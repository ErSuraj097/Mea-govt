export type UserRole =
  | 'student'
  | 'teacher'
  | 'admin'
  | 'creator'
  | 'tester'
  | 'institute'
  | 'accounting';

export interface UserRoleDefinition {
  id: UserRole;
  label: string;
  description: string;
  badgeColor: string;
  defaultRoute: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  nativeLanguage: string;
  targetLanguage: string;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  streak: number;
  xp: number;
  avatarUrl?: string;
  instituteId?: string;
  country?: string;
  phone?: string;
  isSubscribed?: boolean;
}

export interface AuthSession {
  user: UserProfile | null;
  role: UserRole;
  token?: string;
  isAuthenticated: boolean;
}
