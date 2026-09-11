'use client';

import { useState, useEffect } from 'react';
import { getActiveRole, setActiveRoleInStore } from '@/lib/lmsStore';
import { UserRole } from '@/types/user';

export function useRole() {
  const [role, setRoleState] = useState<UserRole>('student');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialRole = getActiveRole() as UserRole;
    setRoleState(initialRole || 'student');
    setIsReady(true);

    const handleStorage = () => {
      const updated = getActiveRole() as UserRole;
      setRoleState(updated || 'student');
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('userStateUpdated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('userStateUpdated', handleStorage);
    };
  }, []);

  const switchRole = (newRole: UserRole) => {
    setActiveRoleInStore(newRole);
    setRoleState(newRole);
    window.dispatchEvent(new Event('userStateUpdated'));
  };

  return {
    role,
    isReady,
    switchRole,
    isStudent: role === 'student',
    isTeacher: role === 'teacher',
    isAdmin: role === 'admin',
    isCreator: role === 'creator',
    isTester: role === 'tester',
    isInstitute: role === 'institute',
    isAccounting: role === 'accounting',
  };
}
