"use client"; // Add this since it uses hooks

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation"; // Changed from react-router-dom
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Destination {
  name: string;
  description: string;
  backgroundImage: string;
  badges: Array<{ label: string; value: string }>;
  longDescription: string;
}

const destinationData: Record<string, Destination> = {
  australia: {
    name: "Australia",
    description: "Experience world-class education in the land down under",
    backgroundImage:
      "linear-gradient(135deg, #0066cc 0%, #003d7a 100%)",
    badges: [
      { label: "Top Universities", value: "5 world-ranked" },
      {
        label: "Post-Study Work",
        value: "2-4 years Post-Study Work Visa",
      },
      { label: "Popular Programs", value: "6+ courses" },
      {
        label: "Research & Innovation",
        value: "100+ Research centers nationwide",
      },
      { label: "Quality of Life", value: "Safe & welcoming" },
    ],
    longDescription:
      "Australia is home to world-renowned universities, vibrant cities, and a high quality of life. With its multicultural environment and post-study work opportunities, it's an ideal destination for international students.",
  },
  "united-states": {
    name: "United States",
    description: "Pursue excellence at the world's leading universities",
    backgroundImage:
      "linear-gradient(135deg, #0052a3 0%, #003d7a 100%)",
    badges: [
      { label: "Top Universities", value: "50+ world-ranked" },
      { label: "Scholarships", value: "$100B+ annually" },
      { label: "Popular Programs", value: "1000+ courses" },
      { label: "Career Opportunities", value: "OPT work visa" },
      { label: "Diversity", value: "1M+ international students" },
    ],
    longDescription:
      "The United States offers world-class education with diverse program options, extensive funding opportunities, and strong career prospects.",
  },
  "new-zealand": {
    name: "New Zealand",
    description: "Experience innovative education in stunning natural beauty",
    backgroundImage:
      "linear-gradient(135deg, #6b5b95 0%, #88498f 100%)",
    badges: [
      { label: "Top Universities", value: "8 world-ranked" },
      { label: "Post-Study Work", value: "3 years visa" },
      { label: "Popular Programs", value: "500+ courses" },
      { label: "Quality of Life", value: "Excellent rankings" },
      { label: "Affordability", value: "Lower tuition fees" },
    ],
    longDescription:
      "New Zealand provides innovative education in a safe, welcoming environment with strong support for international students.",
  },
};

const tabs = [
  "Why Study Here",
  "Universities",
  "Courses",
  "Student Visa",
  "Work & Jobs",
  "Living Cost",
  "Scholarships",
  "Rules",
  "Culture",
  "Testimonials",
];

export default function DestinationDetail() {
  const params = useParams(); // Changed from useParams
  const router = useRouter(); // Changed from useNavigate
  const [activeTab, setActiveTab] = useState("Why Study Here");
  const [showSidebar, setShowSidebar] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Get country from params
  const country = params?.country as string; // Changed from useParams<{ country: string }>()
  const destination = country
    ? destinationData[country.toLowerCase()]
    : null;

  if (!destination) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Destination not found
          </h1>
          <button
            onClick={() => router.push("/destinations")} // Changed from navigate
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      if (window.scrollY > 100 && !showSidebar) {
        setShowSidebar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSidebar]);

  return (
    <div className="w-full bg-white">
      {/* Hero Section with Sidebar */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center overflow-hidden"
        style={{ background: destination.backgroundImage }}
      >
        {/* Background Image Carousel Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-r from-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Content */}
            <div className="text-white">
              <div className="inline-block mb-4 px-4 py-2 bg-white/20 rounded-full">
                <span className="text-sm font-semibold">📍 {destination.name}</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold mb-4">
                {destination.name}
              </h1>
              <p className="text-xl opacity-90 mb-8">
                {destination.description}
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition">
                  Start Your Application
                </button>
                <button className="bg-white/20 border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition">
                  Download Guide
                </button>
              </div>
            </div>

            {/* Right Side - Sidebar (Appears on scroll) */}
            <div
              className={`lg:col-span-1 transition-all duration-500 ${
                showSidebar
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                pointerEvents: showSidebar ? "auto" : "none",
              }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-white text-xl font-bold mb-6">
                  Quick Facts
                </h3>
                <div className="space-y-4 mb-8">
                  {destination.badges.map((badge, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-cyan-400 flex-shrink-0 flex items-center justify-center mt-1">
                        <span className="text-xs font-bold text-blue-900">
                          ✓
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-white/80">
                          {badge.label}
                        </p>
                        <p className="text-base font-semibold text-white">
                          {badge.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/20 pt-6">
                  <p className="text-sm text-white/80 leading-relaxed">
                    {destination.longDescription}
                  </p>
                  <button className="mt-6 text-cyan-400 text-sm font-semibold flex items-center gap-2 hover:gap-3 transition">
                    Explore <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white">
        {/* Top Navigation */}
        <div className="top-20 z-40 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-6">
              <button
                onClick={() => router.push("/destinations")} // Changed from navigate
                className="text-slate-600 hover:text-slate-900 flex items-center gap-1 mb-4 transition"
              >
                ← All Destinations
              </button>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Explore {destination.name}
              </h2>
              <p className="text-slate-600">
                Everything you need to know about {destination.name}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto gap-8 pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap pb-2 font-medium transition-colors ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  📍 {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {activeTab === "Why Study Here" && <WhyStudyHereSection />}
          {activeTab === "Universities" && <UniversitiesSection />}
          {activeTab === "Student Visa" && <StudentVisaSection />}
          {activeTab === "Living Cost" && <LivingCostSection />}
          {activeTab === "Courses" && <PlaceholderSection title="Courses" />}
          {activeTab === "Work & Jobs" && <PlaceholderSection title="Work & Jobs" />}
          {activeTab === "Scholarships" && <PlaceholderSection title="Scholarships" />}
          {activeTab === "Rules" && <PlaceholderSection title="Rules" />}
          {activeTab === "Culture" && <PlaceholderSection title="Culture" />}
          {activeTab === "Testimonials" && <PlaceholderSection title="Testimonials" />}
        </div>
      </section>
    </div>
  );
}

function WhyStudyHereSection() {
  const reasons = [
    "8 universities in the top 100 globally (QS World Rankings)",
    "Post-study work visa for 2-4 years depending on qualification",
    "Safe, multicultural, and welcoming environment",
    "Part-time work rights during studies (up to 48 hours per fortnight)",
    "High quality of life with excellent healthcare",
    "Research and innovation opportunities",
  ];

  return (
    <div>
      <h3 className="text-4xl font-bold text-slate-900 mb-4">
        Why Study in Australia?
      </h3>
      <p className="text-slate-600 mb-12">
        Discover what makes this destination exceptional
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, idx) => (
          <div
            key={idx}
            className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 font-bold">
              ●
            </div>
            <p className="text-slate-900">{reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UniversitiesSection() {
  const universities = [
    {
      rank: "#14 Global",
      name: "University of Melbourne",
      location: "Melbourne, VIC",
      scholarships: "30% Scholarship",
      programs: ["Business", "Engineering", "Medicine"],
    },
    {
      rank: "#14 Global",
      name: "University of Melbourne",
      location: "Melbourne, VIC",
      scholarships: "30% Scholarship",
      programs: ["Business", "Engineering", "Medicine"],
    },
    {
      rank: "#14 Global",
      name: "University of Melbourne",
      location: "Melbourne, VIC",
      scholarships: "30% Scholarship",
      programs: ["Business", "Engineering", "Medicine"],
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h3 className="text-4xl font-bold text-slate-900 mb-2">
            Top Universities
          </h3>
          <p className="text-slate-600">
            World-class institutions to shape your future
          </p>
        </div>
        <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition">
          View All Rankings <span>→</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((uni, idx) => (
          <div
            key={idx}
            className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-slate-500 font-semibold mb-2">
                  {uni.rank}
                </p>
                <h4 className="text-lg font-bold text-slate-900">
                  {uni.name}
                </h4>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                ♡
              </button>
            </div>

            <p className="text-sm text-slate-600 mb-4 flex items-center gap-1">
              📍 {uni.location}
            </p>

            <p className="text-sm text-slate-600 mb-4">
              <span className="font-semibold text-green-600">
                {uni.scholarships}
              </span>
              <br />
              Accredited by ABC Board <br />
              Strong global alumni network
            </p>

            <div>
              <p className="text-xs text-slate-500 font-semibold mb-2">
                Popular Courses:
              </p>
              <div className="flex gap-2 flex-wrap">
                {uni.programs.map((prog, pidx) => (
                  <span
                    key={pidx}
                    className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
                  >
                    {prog}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentVisaSection() {
  const requirements = [
    "Identity & Travel Documents",
    "Financial Documents",
    "Academic Transcripts",
    "English Proficiency",
  ];

  return (
    <div>
      <div className="mb-12">
        <h3 className="text-4xl font-bold text-slate-900 mb-2">
          Student Visa
        </h3>
        <p className="text-slate-600">
          Requirement Checklist for Visa Processing
        </p>
      </div>

      {/* Visa Details */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">
              Before starting your application, make sure you have the following
              documents ready.
            </h4>
            <p className="text-slate-700">
              Our experts will review everything and guide you if anything is
              missing.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Completion of Year 12 or equivalent international qualification",
              "IELTS 6.0-6.5 overall (or equivalent)",
              "Academic transcripts and certificates",
              "Some courses may require additional tests (ATAR, SAT)",
            ].map((req, idx) => (
              <div
                key={idx}
                className="flex gap-3 bg-white rounded-xl p-4 border border-green-200"
              >
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p className="text-slate-700">{req}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements Carousel */}
      <div>
        <h4 className="text-2xl font-bold text-slate-900 mb-6">
          Requirements Checklist
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {requirements.map((req, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 font-bold">
                ●
              </div>
              <h5 className="font-semibold text-slate-900">{req}</h5>
              <ul className="text-sm text-slate-600 mt-3 space-y-1">
                <li>• Valid passport</li>
                <li>• Passport-size photos</li>
                <li>• National ID (if required)</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LivingCostSection() {
  const expenses = [
    { category: "Accommodation", cost: "AUD 200 - 500 /week" },
    { category: "Food & Dining", cost: "AUD 80 - 200 /week" },
    { category: "Miscellaneous", cost: "AUD 50 - 150 /week" },
    { category: "Transport", cost: "AUD 30 - 70 /week" },
  ];

  return (
    <div>
      <h3 className="text-4xl font-bold text-slate-900 mb-2">
        Cost of Living
      </h3>
      <p className="text-slate-600 mb-12">
        Average monthly expenses to plan your budget
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          {expenses.map((exp, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium text-slate-600">
                  {exp.category}
                </label>
                <span className="text-right font-semibold text-slate-900">
                  {exp.cost}
                </span>
              </div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                  style={{ width: `${(idx + 1) * 20}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
          <h4 className="text-xl font-bold text-slate-900 mb-4">
            Budget Planning Tips
          </h4>
          <ul className="space-y-3 text-slate-700">
            <li>• Plan for higher costs in major cities like Sydney and Melbourne</li>
            <li>• Many universities offer on-campus housing discounts</li>
            <li>• Part-time work can help offset living expenses</li>
            <li>• Scholarships often cover tuition and living costs</li>
            <li>• Public transport passes offer significant savings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="text-center py-16">
      <h3 className="text-3xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 mb-8">
        This section is being prepared. Check back soon for detailed information
        about {title.toLowerCase()}.
      </p>
      <div className="inline-block px-6 py-3 bg-slate-100 rounded-full text-slate-600">
        Coming Soon
      </div>
    </div>
  );
}