"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Branch, branches, defaultBranch, getBranchBySlug } from '@/data/branches';

interface BranchContextType {
  currentBranch: Branch;
  setCurrentBranch: (branch: Branch) => void;
  selectBranch: (slug: string) => void;
  branchSlug: string | null;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

const STORAGE_KEY = 'nexsus-selected-branch';

export function BranchProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  
  // Initialize from localStorage or default
  const [currentBranch, setCurrentBranch] = useState<Branch>(defaultBranch);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const branch = getBranchBySlug(stored);
      setCurrentBranch(branch);
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage when branch changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, currentBranch.slug);
    }
  }, [currentBranch.slug, isHydrated]);

  // Function to select a branch
  const selectBranch = useCallback((slug: string) => {
    const branch = getBranchBySlug(slug);
    setCurrentBranch(branch);
  }, []);

  return (
    <BranchContext.Provider value={{ 
      currentBranch, 
      setCurrentBranch,
      selectBranch,
      branchSlug: currentBranch.slug
    }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const context = useContext(BranchContext);
  if (context === undefined) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
}
