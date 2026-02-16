"use client";

import Link from 'next/link';
import { useHeader } from '@/app/contexts/HeaderContext';

export default function Header() {
  const { showSidebar } = useHeader();
  console.log('sidebarstatus',showSidebar);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 z-[99999] ${
      showSidebar === false
        ? 'bg-transparent border-b border-transparent backdrop-blur-sm shadow-sm'
        : 'bg-white border-b border-slate-200' 
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className={`text-2xl font-bold hover:text-blue-600 transition ${
      showSidebar === false
        ? 'text-white'
        : 'text-slate-900' 
    }`}>NEXUS</Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className={`text-sm transition ${
      showSidebar === false
      ? 'text-white'
      : 'text-slate-900' 
    }`}>About</a>
          <div className="relative group">
            <button className={`text-sm transition flex items-center gap-1 ${
      showSidebar === false
      ? 'text-white'
      : 'text-slate-900' 
    }`}>
              Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="relative group">
            <button className={`text-sm transition flex items-center gap-1 ${
      showSidebar === false
      ? 'text-white'
      : 'text-slate-900' 
    }`}>
              Study Abroad
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="relative group">
            <button className={`text-sm transition flex items-center gap-1 ${
      showSidebar === false
      ? 'text-white'
      : 'text-slate-900' 
    }`}>
              Courses
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <Link href="/destinations" className={`text-sm transition flex items-center gap-1 ${
      showSidebar === false
      ? 'text-white'
      : 'text-slate-900' 
    }`}>
            Destinations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <a href="#contact" className={`text-sm transition ${
      showSidebar === false
      ? 'text-white'
      : 'text-slate-900' 
    }`}>Contact Us</a>
        </nav>

        <button className={`px-6 text-white py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition ${
      showSidebar === false
      ? 'bg-transparent border-2 border-[#E5E5E5]'
      : 'text-slate-900 bg-slate-900' 
    }`}>
          Get Started
        </button>
      </div>
    </header>
  );
}