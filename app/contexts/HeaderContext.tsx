"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface HeaderContextType {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isDestinationDetailPage = pathname ? /^\/destinations\/[^\/]+\/?$/.test(pathname) : false;
  const [showSidebar, setShowSidebar] = useState(!isDestinationDetailPage);
  
  useEffect(() => {
    const isDestDetail = pathname ? /^\/destinations\/[^\/]+\/?$/.test(pathname) : false;
    setShowSidebar(!isDestDetail);
  }, [pathname]);

  return (
    <HeaderContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}