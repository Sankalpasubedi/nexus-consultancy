"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search, Sparkles, Rocket, ArrowRight } from "lucide-react";

/* ─── Search Tabs ─────────────────────────────────────── */

const searchTabs = [
  { id: "courses", label: "Courses" },
  { id: "scholarships", label: "Scholarships" },
  { id: "universities", label: "Universities" },
  { id: "events", label: "Events" },
  { id: "guide", label: "Guide me" },
  { id: "instant-offer", label: "Get instant offer" },
];

/* ─── Study Levels ─────────────────────────────────────── */

const studyLevels = [
  { value: "", label: "Select study level" },
  { value: "foundation", label: "Foundation" },
  { value: "diploma", label: "Diploma" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "phd", label: "PhD / Doctorate" },
  { value: "certificate", label: "Certificate Program" },
];

/* ─── Destinations ─────────────────────────────────────── */

const destinations = [
  { value: "", label: "Select a study destination" },
  { value: "australia", label: "Australia" },
  { value: "canada", label: "Canada" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "new-zealand", label: "New Zealand" },
  { value: "japan", label: "Japan" },
  { value: "south-korea", label: "South Korea" },
  { value: "europe", label: "Europe" },
];

/* ─── Cities ─────────────────────────────────────────── */

const cities = [
  { value: "", label: "Select city" },
  { value: "kathmandu", label: "Kathmandu" },
  { value: "pokhara", label: "Pokhara" },
  { value: "chitwan", label: "Chitwan" },
  { value: "online", label: "Online" },
];

/* ─── Months ─────────────────────────────────────────── */

const months = [
  { value: "", label: "Select month" },
  { value: "march", label: "March 2026" },
  { value: "april", label: "April 2026" },
  { value: "may", label: "May 2026" },
  { value: "june", label: "June 2026" },
  { value: "july", label: "July 2026" },
  { value: "august", label: "August 2026" },
];

/* ─── Trending Searches ─────────────────────────────────── */

const trendingSearches = [
  { label: "MBA", query: "MBA" },
  { label: "Nursing", query: "Nursing" },
  { label: "Business", query: "Business" },
  { label: "Engineering", query: "Engineering" },
  { label: "Data Science", query: "Data Science" },
];

/* ─── Animation Variants ─────────────────────────────────── */

const contentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" as const }
  }
};

export default function HeroSearchSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("courses");
  const [subject, setSubject] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [studyLevel, setStudyLevel] = useState("");
  const [destination, setDestination] = useState("");
  const [city, setCity] = useState("");
  const [month, setMonth] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("tab", activeTab);
    if (subject) params.set("q", subject);
    if (universityName) params.set("q", universityName);
    if (studyLevel) params.set("level", studyLevel);
    if (destination) params.set("destination", destination);
    if (city) params.set("city", city);
    if (month) params.set("month", month);
    
    router.push(`/search?${params.toString()}`);
  };

  const handleTrendingClick = (query: string) => {
    setSubject(query);
    const params = new URLSearchParams();
    params.set("tab", activeTab);
    params.set("q", query);
    if (studyLevel) params.set("level", studyLevel);
    if (destination) params.set("destination", destination);
    
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "courses":
        return (
          <motion.div
            key="courses"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter course subject e.g. Law"
                  className="w-full px-4 py-3 sm:py-3.5 text-sm text-slate-800 placeholder:text-slate-400 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all"
                />
              </div>
              <div className="relative">
                <select
                  value={studyLevel}
                  onChange={(e) => setStudyLevel(e.target.value)}
                  className="w-full px-4 py-3 sm:py-3.5 text-sm text-slate-800 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all appearance-none cursor-pointer bg-white"
                >
                  {studyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 sm:py-3.5 text-sm text-slate-800 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all appearance-none cursor-pointer bg-white"
                >
                  {destinations.map((dest) => (
                    <option key={dest.value} value={dest.value}>
                      {dest.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-slate-700">Trending:</span>
                {trendingSearches.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTrendingClick(item.query)}
                    className="text-sm text-[#003975] hover:text-[#0052a3] hover:underline transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <motion.button
                onClick={handleSearch}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-[#003975] hover:bg-[#0052a3] text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg shadow-blue-900/20"
              >
                <Search className="w-4 h-4" />
                Search
              </motion.button>
            </div>
          </motion.div>
        );

      case "scholarships":
        return (
          <motion.div
            key="scholarships"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="relative flex-1 w-full">
                <select
                  value={studyLevel}
                  onChange={(e) => setStudyLevel(e.target.value)}
                  className="w-full px-4 py-3 sm:py-3.5 text-sm text-slate-800 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all appearance-none cursor-pointer bg-white"
                >
                  {studyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative flex-1 w-full">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 sm:py-3.5 text-sm text-slate-800 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all appearance-none cursor-pointer bg-white"
                >
                  {destinations.map((dest) => (
                    <option key={dest.value} value={dest.value}>
                      {dest.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <motion.button
                onClick={handleSearch}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-[#003975] hover:bg-[#0052a3] text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg shadow-blue-900/20 w-full sm:w-auto justify-center"
              >
                <Search className="w-4 h-4" />
                Search
              </motion.button>
            </div>
          </motion.div>
        );

      case "universities":
        return (
          <motion.div
            key="universities"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={universityName}
                  onChange={(e) => setUniversityName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search by university name"
                  className="w-full px-4 py-3 sm:py-3.5 text-sm text-slate-800 placeholder:text-slate-400 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all"
                />
              </div>
              <span className="text-sm text-slate-400 font-medium hidden sm:block">or</span>
              <div className="relative flex-1 w-full">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 sm:py-3.5 text-sm text-slate-800 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all appearance-none cursor-pointer bg-white"
                >
                  {destinations.map((dest) => (
                    <option key={dest.value} value={dest.value}>
                      {dest.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <motion.button
                onClick={handleSearch}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-[#003975] hover:bg-[#0052a3] text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg shadow-blue-900/20 w-full sm:w-auto justify-center"
              >
                <Search className="w-4 h-4" />
                Search
              </motion.button>
            </div>
          </motion.div>
        );

      case "events":
        return (
          <motion.div
            key="events"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="relative flex-1 w-full">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 sm:py-3.5 text-sm text-slate-800 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all appearance-none cursor-pointer bg-white"
                >
                  {cities.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative flex-1 w-full">
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-4 py-3 sm:py-3.5 text-sm text-slate-800 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all appearance-none cursor-pointer bg-white"
                >
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative flex-1 w-full">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 sm:py-3.5 text-sm text-slate-800 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all appearance-none cursor-pointer bg-white"
                >
                  <option value="">Study destinations</option>
                  {destinations.slice(1).map((dest) => (
                    <option key={dest.value} value={dest.value}>
                      {dest.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <motion.button
                onClick={handleSearch}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-[#003975] hover:bg-[#0052a3] text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg shadow-blue-900/20 w-full sm:w-auto justify-center"
              >
                <Search className="w-4 h-4" />
                Search
              </motion.button>
            </div>
          </motion.div>
        );

      case "guide":
        return (
          <motion.div
            key="guide"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <motion.div 
                  className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#003975]/10 to-[#00ab18]/10"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-6 h-6 text-[#003975]" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Let us help you with your search</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Simply answer 5 quick questions to see courses perfectly matched to you
                  </p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/search?tab=guide"
                  className="inline-flex items-center gap-2 bg-[#003975] hover:bg-[#0052a3] text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg shadow-blue-900/20 whitespace-nowrap"
                >
                  Start here
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        );

      case "instant-offer":
        return (
          <motion.div
            key="instant-offer"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#e8f5e9] via-[#f1f8e9] to-[#f9fbe7]">
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5">
                {/* Decorative shapes */}
                <div className="relative hidden sm:block">
                  <div className="absolute -left-8 -top-8 w-24 h-24 rounded-full bg-[#00ab18]/30" />
                  <div className="absolute -left-4 top-8 w-16 h-16 rounded-full bg-[#00ab18]/20" />
                  <motion.div 
                    className="relative z-10 w-24 h-24 rounded-xl overflow-hidden"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-[#00ab18] to-[#008f14] flex items-center justify-center">
                      <Rocket className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Get ready for the FastLane
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-md">
                    Make your university application stress free and discover in minutes if you&apos;d get into the university you&apos;ve always dreamed of.
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/search?tab=instant-offer"
                    className="inline-flex items-center gap-2 bg-[#003975] hover:bg-[#0052a3] text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg shadow-blue-900/20 whitespace-nowrap"
                  >
                    Get started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 z-20 px-4 sm:px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white/98 backdrop-blur-xl border border-white/60 shadow-2xl shadow-black/10 rounded-xl sm:rounded-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-100">
            <div className="flex items-center gap-1 px-4 sm:px-6 pt-4 overflow-x-auto scrollbar-hide">
              {searchTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative whitespace-nowrap px-3 sm:px-4 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-[#003975]"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeSearchTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003975]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
