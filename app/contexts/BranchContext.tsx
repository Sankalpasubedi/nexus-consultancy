"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Branch, branches, defaultBranch, getBranchBySlug, findNearestBranch } from '@/data/branches';

export type LocationStatus = 'idle' | 'loading' | 'success' | 'denied' | 'unavailable' | 'error';

interface BranchContextType {
  currentBranch: Branch;
  setCurrentBranch: (branch: Branch) => void;
  selectBranch: (slug: string) => void;
  branchSlug: string | null;
  // Location-based features
  locationStatus: LocationStatus;
  detectedDistance: number | null;
  detectNearestBranch: () => Promise<{ branch: Branch; distance: number } | null>;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

const STORAGE_KEY = 'nexsus-selected-branch';

export function BranchProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  
  // Initialize from localStorage or default
  const [currentBranch, setCurrentBranch] = useState<Branch>(defaultBranch);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Location-based state
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [detectedDistance, setDetectedDistance] = useState<number | null>(null);

  // Function to detect nearest branch using geolocation
  const detectNearestBranch = useCallback(async (autoDetect: boolean = false): Promise<{ branch: Branch; distance: number } | null> => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setLocationStatus('unavailable');
      return null;
    }

    setLocationStatus('loading');

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const result = findNearestBranch(latitude, longitude);
          
          setCurrentBranch(result.branch);
          setDetectedDistance(result.distance);
          setLocationStatus('success');
          resolve(result);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setLocationStatus('denied');
          } else {
            setLocationStatus('error');
          }
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes cache
        }
      );
    });
  }, []);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const branch = getBranchBySlug(stored);
      setCurrentBranch(branch);
    }
    setIsHydrated(true);
  }, []);

  // Auto-detect location on mount (every page load)
  useEffect(() => {
    if (!isHydrated) return;
    
    // Always try to detect location on page load
    // This will prompt if permission not decided, or silently work if already granted
    detectNearestBranch(true);
  }, [isHydrated, detectNearestBranch]);

  // Persist to localStorage when branch changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, currentBranch.slug);
    }
  }, [currentBranch.slug, isHydrated]);

  // Function to select a branch manually
  const selectBranch = useCallback((slug: string) => {
    const branch = getBranchBySlug(slug);
    setCurrentBranch(branch);
    setDetectedDistance(null);
  }, []);

  return (
    <BranchContext.Provider value={{ 
      currentBranch, 
      setCurrentBranch,
      selectBranch,
      branchSlug: currentBranch.slug,
      locationStatus,
      detectedDistance,
      detectNearestBranch,
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
