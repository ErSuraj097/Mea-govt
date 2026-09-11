'use client';

import { useState, useEffect } from 'react';
import { getStoredUser, saveStoredUser } from '@/lib/lmsStore';
import { User } from '@/lib/mockData';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cur = getStoredUser();
    setUser(cur);
    setIsLoading(false);

    const handleUpdate = () => {
      setUser(getStoredUser());
    };

    window.addEventListener('userStateUpdated', handleUpdate);
    return () => window.removeEventListener('userStateUpdated', handleUpdate);
  }, []);

  const updateUser = (updated: User) => {
    saveStoredUser(updated);
    setUser(updated);
    window.dispatchEvent(new Event('userStateUpdated'));
  };

  return {
    user,
    isLoading,
    updateUser,
    isAuthenticated: !!user?.id,
  };
}
