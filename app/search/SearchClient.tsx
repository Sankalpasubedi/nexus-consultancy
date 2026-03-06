"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useHeader } from "@/app/contexts/HeaderContext";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { FlagIcon, Icon } from "@/lib/icons";
import { courseCategories } from "@/data/courses";
import { destinations as destinationsList } from "@/data";
import {
  Search,
  ChevronDown,
  Filter,
  X,
  BookOpen,
  GraduationCap,
  Building2,
  Calendar,
  Compass,
  Gift,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  Sparkles,
  Rocket,
} from "lucide-react";

/* ─── Search Tabs ─────────────────────────────────────── */

const searchTabs = [
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "scholarships", label: "Scholarships", icon: GraduationCap },
  { id: "universities", label: "Universities", icon: Building2 },
  { id: "events", label: "Events", icon: Calendar },
  { id: "guide", label: "Guide me", icon: Compass },
  { id: "instant-offer", label: "Get instant offer", icon: Gift },
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

/* ─── Study Levels ─────────────────────────────────────── */

const studyLevels = [
  { value: "", label: "All Levels" },
  { value: "foundation", label: "Foundation" },
  { value: "diploma", label: "Diploma" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "phd", label: "PhD / Doctorate" },
  { value: "certificate", label: "Certificate Program" },
];

/* ─── Destinations ─────────────────────────────────────── */

const searchDestinations = [
  { value: "", label: "All Destinations", flagCode: "" },
  { value: "australia", label: "Australia", flagCode: "au" },
  { value: "canada", label: "Canada", flagCode: "ca" },
  { value: "usa", label: "United States", flagCode: "us" },
  { value: "uk", label: "United Kingdom", flagCode: "gb" },
  { value: "new-zealand", label: "New Zealand", flagCode: "nz" },
  { value: "japan", label: "Japan", flagCode: "jp" },
  { value: "south-korea", label: "South Korea", flagCode: "kr" },
  { value: "europe", label: "Europe", flagCode: "eu" },
];

/* ─── Sample Universities Data ─────────────────────────── */

const sampleUniversities = [
  { name: "University of Melbourne", country: "Australia", flagCode: "au", ranking: "#33 QS World", image: "/destinations/Australia.png", programs: 450 },
  { name: "University of Toronto", country: "Canada", flagCode: "ca", ranking: "#21 QS World", image: "/destinations/canada.png", programs: 380 },
  { name: "University of Oxford", country: "UK", flagCode: "gb", ranking: "#4 QS World", image: "/destinations/uk.png", programs: 350 },
  { name: "MIT", country: "USA", flagCode: "us", ranking: "#1 QS World", image: "/destinations/USA.png", programs: 420 },
  { name: "University of Tokyo", country: "Japan", flagCode: "jp", ranking: "#28 QS World", image: "/destinations/japan.png", programs: 280 },
  { name: "University of Auckland", country: "New Zealand", flagCode: "nz", ranking: "#68 QS World", image: "/destinations/newzeland.png", programs: 200 },
];

/* ─── Sample Scholarships Data ─────────────────────────── */

const sampleScholarships = [
  { title: "Australia Awards Scholarships", country: "Australia", flagCode: "au", value: "Full Tuition + Living", deadline: "April 2026", eligibility: "All nationalities" },
  { title: "Chevening Scholarship", country: "UK", flagCode: "gb", value: "Full Tuition + Allowances", deadline: "November 2026", eligibility: "International students" },
  { title: "Fulbright Program", country: "USA", flagCode: "us", value: "Full Funding", deadline: "October 2026", eligibility: "Graduate students" },
  { title: "MEXT Scholarship", country: "Japan", flagCode: "jp", value: "Full Tuition + Stipend", deadline: "May 2026", eligibility: "All nationalities" },
  { title: "Vanier Canada Graduate", country: "Canada", flagCode: "ca", value: "$50,000/year", deadline: "November 2026", eligibility: "PhD students" },
  { title: "NZ Excellence Awards", country: "New Zealand", flagCode: "nz", value: "$10,000-$25,000", deadline: "March 2026", eligibility: "High achievers" },
];

/* ─── Sample Events Data ─────────────────────────────── */

const sampleEvents = [
  { title: "Study in Australia Expo 2026", date: "March 15, 2026", location: "Kathmandu", type: "Education Fair" },
  { title: "UK University Application Workshop", date: "March 20, 2026", location: "Online", type: "Workshop" },
  { title: "Canada Immigration Seminar", date: "March 25, 2026", location: "Kathmandu", type: "Seminar" },
  { title: "USA College Fair Nepal", date: "April 5, 2026", location: "Kathmandu", type: "Education Fair" },
  { title: "IELTS Preparation Masterclass", date: "April 10, 2026", location: "Online", type: "Workshop" },
  { title: "Scholarship Information Session", date: "April 15, 2026", location: "Kathmandu", type: "Info Session" },
];

export default function SearchClient() {
  const { setShowSidebar } = useHeader();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "courses");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [studyLevel, setStudyLevel] = useState(searchParams.get("level") || "");
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [month, setMonth] = useState(searchParams.get("month") || "");

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  // Update URL when filters change
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    params.set("tab", activeTab);
    if (searchQuery) params.set("q", searchQuery);
    if (studyLevel) params.set("level", studyLevel);
    if (destination) params.set("destination", destination);
    if (city) params.set("city", city);
    if (month) params.set("month", month);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [activeTab, searchQuery, studyLevel, destination, city, month, router]);

  useEffect(() => {
    updateURL();
  }, [activeTab, studyLevel, destination, city, month, updateURL]);

  const handleSearch = () => {
    updateURL();
  };

  // Filter courses based on search criteria
  const filteredCourses = useMemo(() => {
    let results: { category: string; slug: string; program: string; duration: string; tuition: string; description: string; destination?: string }[] = [];
    
    courseCategories.forEach((category) => {
      category.programsList.forEach((program) => {
        const matchesQuery = !searchQuery || 
          program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.title.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (matchesQuery) {
          category.destinations.forEach((dest) => {
            const matchesDestination = !destination || 
              dest.country.toLowerCase().includes(destination.toLowerCase());
            
            if (matchesDestination) {
              results.push({
                category: category.title,
                slug: category.slug,
                program: program.name,
                duration: program.duration,
                tuition: program.tuition,
                description: program.description,
                destination: dest.country,
              });
            }
          });
        }
      });
    });

    // Remove duplicates based on program name and destination
    const seen = new Set<string>();
    results = results.filter((item) => {
      const key = `${item.program}-${item.destination}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return results.slice(0, 20);
  }, [searchQuery, destination]);

  // Filter universities based on search criteria
  const filteredUniversities = useMemo(() => {
    return sampleUniversities.filter((uni) => {
      const matchesQuery = !searchQuery || 
        uni.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDestination = !destination || 
        uni.country.toLowerCase().includes(destination.toLowerCase());
      return matchesQuery && matchesDestination;
    });
  }, [searchQuery, destination]);

  // Filter scholarships based on search criteria
  const filteredScholarships = useMemo(() => {
    return sampleScholarships.filter((scholarship) => {
      const matchesQuery = !searchQuery || 
        scholarship.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDestination = !destination || 
        scholarship.country.toLowerCase().includes(destination.toLowerCase());
      return matchesQuery && matchesDestination;
    });
  }, [searchQuery, destination]);

  // Filter events based on search criteria
  const filteredEvents = useMemo(() => {
    return sampleEvents.filter((event) => {
      const matchesQuery = !searchQuery || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = !city || 
        event.location.toLowerCase() === city.toLowerCase();
      const matchesMonth = !month || 
        event.date.toLowerCase().startsWith(month.toLowerCase());
      return matchesQuery && matchesCity && matchesMonth;
    });
  }, [searchQuery, city, month]);

  const getResultsCount = () => {
    switch (activeTab) {
      case "courses": return filteredCourses.length;
      case "universities": return filteredUniversities.length;
      case "scholarships": return filteredScholarships.length;
      case "events": return filteredEvents.length;
      default: return 0;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-8 sm:pt-36 sm:pb-12 bg-gradient-to-br from-[#001830] via-[#002a52] to-[#003975] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Find Your Perfect Program
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Search courses, scholarships, universities, and events from top institutions worldwide
              </p>
            </div>
          </FadeUp>

          {/* Search Box */}
          <FadeUp delay={0.1}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-100 overflow-x-auto scrollbar-hide">
                  <div className="flex items-center gap-1 px-4 pt-4">
                    {searchTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative whitespace-nowrap flex items-center gap-2 px-3 sm:px-4 py-2.5 text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? "text-[#003975]"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003975]"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab-specific Search Forms */}
                <div className="p-4 sm:p-6">
                  <AnimatePresence mode="wait">
                    {/* Courses Tab */}
                    {activeTab === "courses" && (
                      <motion.div
                        key="courses-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                              placeholder="Enter course subject e.g. Law"
                              className="w-full pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all"
                            />
                          </div>
                          <div className="relative">
                            <select
                              value={studyLevel}
                              onChange={(e) => setStudyLevel(e.target.value)}
                              className="w-full appearance-none px-4 pr-10 py-3 text-sm text-slate-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all cursor-pointer bg-white"
                            >
                              {studyLevels.map((level) => (
                                <option key={level.value} value={level.value}>{level.label}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                          <div className="relative">
                            <select
                              value={destination}
                              onChange={(e) => setDestination(e.target.value)}
                              className="w-full appearance-none px-4 pr-10 py-3 text-sm text-slate-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all cursor-pointer bg-white"
                            >
                              {searchDestinations.map((dest) => (
                                <option key={dest.value} value={dest.value}>{dest.label}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-slate-700">Trending:</span>
                            {trendingSearches.map((item, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSearchQuery(item.query)}
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
                            className="flex items-center gap-2 bg-[#003975] hover:bg-[#0052a3] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                          >
                            <Search className="w-4 h-4" />
                            Search
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* Scholarships Tab */}
                    {activeTab === "scholarships" && (
                      <motion.div
                        key="scholarships-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <div className="relative flex-1 w-full">
                            <select
                              value={studyLevel}
                              onChange={(e) => setStudyLevel(e.target.value)}
                              className="w-full appearance-none px-4 pr-10 py-3 text-sm text-slate-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all cursor-pointer bg-white"
                            >
                              {studyLevels.map((level) => (
                                <option key={level.value} value={level.value}>{level.label}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                          <div className="relative flex-1 w-full">
                            <select
                              value={destination}
                              onChange={(e) => setDestination(e.target.value)}
                              className="w-full appearance-none px-4 pr-10 py-3 text-sm text-slate-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all cursor-pointer bg-white"
                            >
                              {searchDestinations.map((dest) => (
                                <option key={dest.value} value={dest.value}>{dest.label}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                          <motion.button
                            onClick={handleSearch}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 bg-[#003975] hover:bg-[#0052a3] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all w-full sm:w-auto justify-center"
                          >
                            <Search className="w-4 h-4" />
                            Search
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* Universities Tab */}
                    {activeTab === "universities" && (
                      <motion.div
                        key="universities-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                              placeholder="Search by university name"
                              className="w-full pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all"
                            />
                          </div>
                          <span className="text-sm text-slate-400 font-medium hidden sm:block">or</span>
                          <div className="relative flex-1 w-full">
                            <select
                              value={destination}
                              onChange={(e) => setDestination(e.target.value)}
                              className="w-full appearance-none px-4 pr-10 py-3 text-sm text-slate-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all cursor-pointer bg-white"
                            >
                              {searchDestinations.map((dest) => (
                                <option key={dest.value} value={dest.value}>{dest.label}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                          <motion.button
                            onClick={handleSearch}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 bg-[#003975] hover:bg-[#0052a3] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all w-full sm:w-auto justify-center"
                          >
                            <Search className="w-4 h-4" />
                            Search
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* Events Tab */}
                    {activeTab === "events" && (
                      <motion.div
                        key="events-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <div className="relative flex-1 w-full">
                            <select
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className="w-full appearance-none px-4 pr-10 py-3 text-sm text-slate-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all cursor-pointer bg-white"
                            >
                              {cities.map((c) => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                          <div className="relative flex-1 w-full">
                            <select
                              value={month}
                              onChange={(e) => setMonth(e.target.value)}
                              className="w-full appearance-none px-4 pr-10 py-3 text-sm text-slate-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all cursor-pointer bg-white"
                            >
                              {months.map((m) => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                          <div className="relative flex-1 w-full">
                            <select
                              value={destination}
                              onChange={(e) => setDestination(e.target.value)}
                              className="w-full appearance-none px-4 pr-10 py-3 text-sm text-slate-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003975]/20 focus:border-[#003975] transition-all cursor-pointer bg-white"
                            >
                              <option value="">Study destinations</option>
                              {searchDestinations.slice(1).map((dest) => (
                                <option key={dest.value} value={dest.value}>{dest.label}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                          <motion.button
                            onClick={handleSearch}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 bg-[#003975] hover:bg-[#0052a3] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all w-full sm:w-auto justify-center"
                          >
                            <Search className="w-4 h-4" />
                            Search
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* Guide Me Tab */}
                    {activeTab === "guide" && (
                      <motion.div
                        key="guide-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
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
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-[#003975] hover:bg-[#0052a3] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap"
                          >
                            Start here
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}

                    {/* Get Instant Offer Tab */}
                    {activeTab === "instant-offer" && (
                      <motion.div
                        key="instant-offer-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#e8f5e9] via-[#f1f8e9] to-[#f9fbe7]">
                          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5">
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
                            <Link
                              href="/contact"
                              className="inline-flex items-center gap-2 bg-[#003975] hover:bg-[#0052a3] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap"
                            >
                              Get started
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {activeTab === "courses" && "Courses & Programs"}
                {activeTab === "scholarships" && "Scholarships"}
                {activeTab === "universities" && "Universities"}
                {activeTab === "events" && "Events"}
                {activeTab === "guide" && "Personalized Guidance"}
                {activeTab === "instant-offer" && "Get Your Offer"}
              </h2>
              <p className="text-slate-500 mt-1">
                {getResultsCount()} results found
                {searchQuery && ` for "${searchQuery}"`}
                {destination && ` in ${searchDestinations.find(d => d.value === destination)?.label}`}
              </p>
            </div>

            {/* Clear Filters */}
            {(searchQuery || studyLevel || destination) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStudyLevel("");
                  setDestination("");
                }}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
          </div>

          {/* Results Grid */}
          <StaggerContainer key={`${activeTab}-${searchQuery}-${destination}-${studyLevel}-${city}-${month}`} className="grid gap-6">
            {/* Courses Results */}
            {activeTab === "courses" && (
              <>
                {filteredCourses.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredCourses.map((course, idx) => (
                      <StaggerItem key={`${course.program}-${course.destination}-${idx}`}>
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-5"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#003975]/10 text-[#003975] text-xs font-medium">
                              <BookOpen className="w-3.5 h-3.5" />
                              {course.category}
                            </span>
                            {course.destination && (
                              <span className="flex items-center gap-1 text-xs text-slate-500">
                                <MapPin className="w-3.5 h-3.5" />
                                {course.destination}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {course.program}
                          </h3>
                          <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                            {course.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3.5 h-3.5" />
                              {course.tuition}
                            </span>
                          </div>
                          <Link
                            href={`/courses/${course.slug}`}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#003975] hover:text-[#0052a3] transition-colors"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </div>
                ) : (
                  <EmptyState type="courses" />
                )}
              </>
            )}

            {/* Universities Results */}
            {activeTab === "universities" && (
              <>
                {filteredUniversities.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredUniversities.map((uni, idx) => (
                      <StaggerItem key={uni.name}>
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
                        >
                          <div className="relative h-32">
                            <Image
                              src={uni.image}
                              alt={uni.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                              <FlagIcon code={uni.flagCode} size={16} />
                              <span className="text-white text-sm font-medium">
                                {uni.country}
                              </span>
                            </div>
                          </div>
                          <div className="p-5">
                            <span className="inline-block px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium mb-2">
                              {uni.ranking}
                            </span>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                              {uni.name}
                            </h3>
                            <p className="text-sm text-slate-500 mb-4">
                              {uni.programs}+ programs available
                            </p>
                            <Link
                              href={`/destinations/study-in-${uni.country.toLowerCase().replace(" ", "-")}`}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#003975] hover:text-[#0052a3] transition-colors"
                            >
                              Explore University
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </div>
                ) : (
                  <EmptyState type="universities" />
                )}
              </>
            )}

            {/* Scholarships Results */}
            {activeTab === "scholarships" && (
              <>
                {filteredScholarships.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredScholarships.map((scholarship, idx) => (
                      <StaggerItem key={scholarship.title}>
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-5"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <FlagIcon code={scholarship.flagCode} size={20} />
                            <span className="text-sm text-slate-500">
                              {scholarship.country}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {scholarship.title}
                          </h3>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Gift className="w-4 h-4 text-emerald-500" />
                              <span className="text-slate-600">{scholarship.value}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-blue-500" />
                              <span className="text-slate-600">Deadline: {scholarship.deadline}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <GraduationCap className="w-4 h-4 text-purple-500" />
                              <span className="text-slate-600">{scholarship.eligibility}</span>
                            </div>
                          </div>
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#003975] hover:text-[#0052a3] transition-colors"
                          >
                            Apply Now
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </div>
                ) : (
                  <EmptyState type="scholarships" />
                )}
              </>
            )}

            {/* Events Results */}
            {activeTab === "events" && (
              <>
                {filteredEvents.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredEvents.map((event, idx) => (
                      <StaggerItem key={event.title}>
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-5"
                        >
                          <span className="inline-block px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium mb-3">
                            {event.type}
                          </span>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {event.title}
                          </h3>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-[#003975]" />
                              <span className="text-slate-600">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-[#003975]" />
                              <span className="text-slate-600">{event.location}</span>
                            </div>
                          </div>
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#003975] hover:text-[#0052a3] transition-colors"
                          >
                            Register
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </div>
                ) : (
                  <EmptyState type="events" />
                )}
              </>
            )}

            {/* Guide Me Section */}
            {activeTab === "guide" && (
              <div className="max-w-2xl mx-auto text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#003975] to-[#00ab18] flex items-center justify-center">
                  <Compass className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Need Help Deciding?
                </h3>
                <p className="text-slate-600 mb-8">
                  Our expert counselors will help you find the perfect course and university based on your profile, preferences, and career goals.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#003975] hover:bg-[#0052a3] text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg"
                >
                  Get Free Counselling
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}

            {/* Get Instant Offer Section */}
            {activeTab === "instant-offer" && (
              <div className="max-w-2xl mx-auto text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00ab18] to-[#003975] flex items-center justify-center">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Get Your Instant Admission Offer
                </h3>
                <p className="text-slate-600 mb-8">
                  Submit your academic details and receive instant admission offers from our partner universities. No waiting, no hassle.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#00ab18] hover:bg-[#00d41e] text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg"
                >
                  Check Your Eligibility
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#001830] via-[#002a52] to-[#003975]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Our expert advisors are here to help you discover the perfect opportunity for your academic journey.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#003975] px-8 py-4 rounded-full font-semibold transition-all"
          >
            Talk to an Expert
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ─── Empty State Component ─────────────────────────────── */

function EmptyState({ type }: { type: string }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
        <Search className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        No {type} found
      </h3>
      <p className="text-slate-500 mb-6">
        Try adjusting your search filters or browse all available options.
      </p>
      <Link
        href={type === "courses" ? "/courses" : "/destinations"}
        className="inline-flex items-center gap-2 text-[#003975] hover:text-[#0052a3] font-medium transition-colors"
      >
        Browse all {type}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
