"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useHeader } from "@/app/contexts/HeaderContext";

interface Destination {
  name: string;
  description: string;
  backgroundImages: string[];
  badges: Array<{ label: string; value: string }>;
  longDescription: string;
}

const destinationData: Record<string, Destination> = {
  australia: {
    name: "Australia",
    description: "Experience world-class education in the land down under",
    backgroundImages: [
      "/images/australia.jpg",
      "/images/australia.jpg",
      "/images/australia.jpg",
    ],
    badges: [
      { label: "Top Universities", value: "5 world-ranked" },
      { label: "Post-Study Work", value: "2-4 years Post-Study Work Visa" },
      { label: "Popular Programs", value: "6+ courses" },
      { label: "Research & Innovation", value: "100+ Research centers nationwide" },
    ],
    longDescription:
      "is home to world-renowned universities, vibrant cities, and a high quality of life. With its multicultural environment and post-study work opportunities, it's an ideal destination for international students.",
  },
};

const tabs = [
  { id: "why-study", label: "Why Study Here" },
  { id: "universities", label: "Universities" },
  { id: "courses", label: "Courses" },
  { id: "student-visa", label: "Student Visa" },
  { id: "work-jobs", label: "Work & Jobs" },
  { id: "living-cost", label: "Living Cost" },
  { id: "scholarships", label: "Scholarships" },
  { id: "rules", label: "Rules" },
  { id: "culture", label: "Culture" },
  { id: "testimonials", label: "Testimonials" },
];

export default function DestinationDetail() {
  const params = useParams();
  const router = useRouter();
  const { showSidebar, setShowSidebar } = useHeader();
  const [sidebarFullyOpen, setSidebarFullyOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("why-study");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollTriggerPoint = useRef(0);

  const country = params?.country as string;
  const destination = country ? destinationData[country.toLowerCase()] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setShowSidebar(false);
    return () => {
      setShowSidebar(true);
    };
  }, []);

  // Background image carousel
  useEffect(() => {
    if (!destination) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % destination.backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [destination]);

  useEffect(() => {
    let hasTriggered = false;

    const handleFirstScroll = (e: Event) => {
      if (hasTriggered) return;
      if (window.scrollY <= 5) {
        e.preventDefault();
        // document.body.style.overflow = "hidden";
        setShowSidebar(true); // This now updates the context
        setTimeout(() => {
          hasTriggered = true;
        }, 200);
        setTimeout(() => {
          setSidebarFullyOpen(true);
          document.body.style.overflow = "";
        }, 700);
      }
    };

    window.addEventListener("wheel", handleFirstScroll, { passive: false });
    window.addEventListener("touchmove", handleFirstScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleFirstScroll);
      window.removeEventListener("touchmove", handleFirstScroll);
      document.body.style.overflow = "";
    };
  }, [setShowSidebar]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  
    const element = sectionRefs.current[tabId];
    if (element) {
      setShowSidebar(true);
      setSidebarFullyOpen(true);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!destination) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Destination not found
          </h1>
          <button
            onClick={() => router.push("/destinations")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      {/* <Header showSidebar={showSidebar} /> */}
      {/* Hero Section with Carousel Background */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center overflow-hidden"
      >
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {destination.backgroundImages.map((img, idx) => (
            <div
              key={idx}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: idx === currentImageIndex ? 1 : 0,
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
            </div>
          ))}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 mx-auto w-full h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-center h-full w-full">
            {/* Left Side - Content */}
            <div className="text-white lg:col-span-8 pt-50 md:pt-40 pl-25 h-full ">
              <button
                onClick={() => router.push("/destinations")}
                className="text-white/90 hover:text-white flex items-center gap-2 mb-10 md:mb-30 lg:mb-50 text-sm md:text-base transition"
              >
                ← All Destinations
              </button>

              <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_127_5858)">
                  <path d="M13.3327 6.66634C13.3327 9.99501 9.64002 13.4617 8.40002 14.5323C8.2845 14.6192 8.14388 14.6662 7.99935 14.6662C7.85482 14.6662 7.7142 14.6192 7.59868 14.5323C6.35868 13.4617 2.66602 9.99501 2.66602 6.66634C2.66602 5.25185 3.22792 3.8953 4.22811 2.89511C5.22831 1.89491 6.58486 1.33301 7.99935 1.33301C9.41384 1.33301 10.7704 1.89491 11.7706 2.89511C12.7708 3.8953 13.3327 5.25185 13.3327 6.66634Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 8.66699C9.10457 8.66699 10 7.77156 10 6.66699C10 5.56242 9.10457 4.66699 8 4.66699C6.89543 4.66699 6 5.56242 6 6.66699C6 7.77156 6.89543 8.66699 8 8.66699Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_127_5858">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </span>
                <span className="text-xs md:text-sm">{destination.name}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 leading-tight">
                {destination.name}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 max-w-xl lg:max-w-2xl">
                {destination.description}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                <button className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base">
                  Start Your Application
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16602 10H15.8327" stroke="#101828" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 4.16699L15.8333 10.0003L10 15.8337" stroke="#101828" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button className="bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white/20 transition-all text-sm md:text-base">
                  Download Guide
                </button>
              </div>
            </div>

            {/* Right Side - Sidebar that slides in from left */}
            <div className="lg:col-span-4 relative flex justify-end h-full">
              {/* Navigation Links - Show before scroll */}
              <div
                className={`transition-all duration-700 ease-out w-full mt-auto mb-auto ${
                  !showSidebar
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10 pointer-events-none"
                }`}
              >
                <div className="flex flex-col gap-7 items-start w-full h-full">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className="text-white hover:text-white/80 flex items-center gap-2 text-[20px] md:text-[30px] transition group"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path 
                            d="M17.8503 9.10131C17.9995 9.0355 18.1261 8.92737 18.2144 8.79032C18.3028 8.65326 18.3489 8.49331 18.3473 8.33026C18.3456 8.16722 18.2961 8.00825 18.2049 7.87305C18.1138 7.73785 17.985 7.63236 17.8345 7.56965L10.692 4.31631C10.4749 4.21727 10.239 4.16602 10.0003 4.16602C9.76166 4.16602 9.52579 4.21727 9.30865 4.31631L2.16699 7.56631C2.01863 7.63129 1.89242 7.73809 1.80379 7.87366C1.71517 8.00923 1.66797 8.16768 1.66797 8.32965C1.66797 8.49161 1.71517 8.65007 1.80379 8.78563C1.89242 8.9212 2.01863 9.028 2.16699 9.09298L9.30865 12.3496C9.52579 12.4487 9.76166 12.4999 10.0003 12.4999C10.239 12.4999 10.4749 12.4487 10.692 12.3496L17.8503 9.10131Z" 
                            stroke="white" 
                            strokeOpacity="0.7" 
                            strokeWidth="1.66667" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                          <path 
                            d="M18.333 8.33301V13.333" 
                            stroke="white" 
                            strokeOpacity="0.7" 
                            strokeWidth="1.66667" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                          <path 
                            d="M5 10.417V13.3337C5 13.9967 5.52678 14.6326 6.46447 15.1014C7.40215 15.5703 8.67392 15.8337 10 15.8337C11.3261 15.8337 12.5979 15.5703 13.5355 15.1014C14.4732 14.6326 15 13.9967 15 13.3337V10.417" 
                            stroke="white" 
                            strokeOpacity="0.7" 
                            strokeWidth="1.66667" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      <p className="ml-4">
                        {tab.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Badge Sidebar - Show after scroll */}
              <div
                className={`absolute top-0 right-0 transition-all duration-700 ease-out h-full ${
                  showSidebar
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div className={`bg-white p-4 sm:p-6 md:p-8 lg:p-[68px] h-full ${showSidebar ? 'relative z-50' : ''}`}>
                  {/* Top 5 Badges */}
                  <div className="space-y-2 md:space-y-3 p-4 sm:p-5 md:p-6 lg:p-[32.98px] border bg-[#F9FAFB] border-[#F3F4F6] rounded-2xl md:rounded-3xl my-6 md:my-10 lg:my-18">
                    {destination.badges.slice(0, 5).map((badge, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 md:gap-3"
                      >
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                          <svg 
                            width={16} 
                            height={16} 
                            className="md:w-5 md:h-5" 
                            viewBox="0 0 20 20" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_127_6198)">
                              <path d="M10.0003 18.3337C14.6027 18.3337 18.3337 14.6027 18.3337 10.0003C18.3337 5.39795 14.6027 1.66699 10.0003 1.66699C5.39795 1.66699 1.66699 5.39795 1.66699 10.0003C1.66699 14.6027 5.39795 18.3337 10.0003 18.3337Z" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M7.5 9.99967L9.16667 11.6663L12.5 8.33301" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_127_6198">
                                <rect width="20" height="20" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] sm:text-xs md:text-[13px] lg:text-[14px] text-gray-500 uppercase tracking-wide mb-0.5">{badge.label}</p>
                          <p className="text-xs sm:text-sm md:text-base lg:text-[18px] text-gray-900">{badge.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="pt-4 md:pt-6 border-t border-gray-100 flex flex-col gap-4 md:gap-8 lg:gap-15">
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-[24px] text-end">
                      <span className="bg-gradient-to-r from-green-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                        {destination.name}
                      </span>{" "}
                      {destination.longDescription}
                    </p>
                    <button className="mt-2 md:mt-4 text-[#6c757d] font-medium text-[12px] sm:text-[16px] flex items-end justify-end gap-1.5 hover:gap-2.5 transition-all group">
                      Explore
                      <svg 
                        width={16} 
                        height={16} 
                        className="md:w-5 md:h-5" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4.16699 10H15.8337" stroke="#A1A1A1" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 4.16699L15.8333 10.0003L10 15.8337" stroke="#A1A1A1" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white relative">
                    
          <div className="absolute w-[272.61px] h-[343.31px] right-50 top-30 opacity-30 blur-64 rounded-[3.30382e+07px]">
            <div className="absolute top-8 right-6 w-60 h-60 bg-[#155DFC] blur-3xl rounded-full opacity-30 transform rotate-15"></div>
            <div className="absolute bottom-4 right-2 w-24 h-28 bg-[#155DFC] blur-3xl rounded-full transform -rotate-30"></div>
            <div className="absolute top-16 right-8 w-20 h-16 bg-[#155DFC] blur-2xl rounded-full transform rotate-30 opacity-20"></div>
          </div>


        {/* Sticky Navigation */}
        <div className="z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-10 flex flex-col justify-center items-center">
              <div className="inline-block px-5 py-2 mb-5 text-[14px] rounded-full bg-[#F5F5F5] text-slate-700">
                Explore {destination.name}
              </div>
              <h2 className="text-1xl text-[#171717]">
                Everything you need to know about {destination.name}
              </h2>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`whitespace-nowrap pb-3 px-1 text-[#525252] transition-all flex items-center gap-2`}
                >
                  <svg className="cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M17.8503 9.10131C17.9995 9.0355 18.1261 8.92737 18.2144 8.79032C18.3028 8.65326 18.3489 8.49331 18.3473 8.33026C18.3456 8.16722 18.2961 8.00825 18.2049 7.87305C18.1138 7.73785 17.985 7.63236 17.8345 7.56965L10.692 4.31631C10.4749 4.21727 10.239 4.16602 10.0003 4.16602C9.76166 4.16602 9.52579 4.21727 9.30865 4.31631L2.16699 7.56631C2.01863 7.63129 1.89242 7.73809 1.80379 7.87366C1.71517 8.00923 1.66797 8.16768 1.66797 8.32965C1.66797 8.49161 1.71517 8.65007 1.80379 8.78563C1.89242 8.9212 2.01863 9.028 2.16699 9.09298L9.30865 12.3496C9.52579 12.4487 9.76166 12.4999 10.0003 12.4999C10.239 12.4999 10.4749 12.4487 10.692 12.3496L17.8503 9.10131Z" 
                      stroke="#525252" 
                      strokeWidth="1.66667" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M18.334 8.33301V13.333" 
                      stroke="#525252" 
                      strokeWidth="1.66667" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M5 10.417V13.3337C5 13.9967 5.52678 14.6326 6.46447 15.1014C7.40215 15.5703 8.67392 15.8337 10 15.8337C11.3261 15.8337 12.5979 15.5703 13.5355 15.1014C14.4732 14.6326 15 13.9967 15 13.3337V10.417" 
                      stroke="#525252" 
                      strokeWidth="1.66667" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="cursor-pointer">
                    {tab.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* All Sections Content - with proper scroll margin for navbar */}
        <div className="mx-auto py-16 space-y-32 flex flex-col justify-center items-center">
          <div
            ref={(el) => {sectionRefs.current["universities"] = el}}
            id="universities"
            className="scroll-mt-40 w-full"
          >
            <UniversitiesSection />
          </div>

          <div
            ref={(el) => {sectionRefs.current["why-study"] = el}}
            id="why-study"
            className="scroll-mt-40 w-full"
          >
            <WhyStudyHereSection />
          </div>

          <div
            ref={(el) => {sectionRefs.current["admission-requirement"] = el}}
            id="admission-requirement"
            className="scroll-mt-40 w-full"
          >
            <AdmissionRequirements />
          </div>

          <div
            ref={(el) => {sectionRefs.current["living-cost"] = el}}
            id="living-cost"
            className="scroll-mt-40 w-full "
          >
            <LivingCostSection />
          </div>

          <div
            ref={(el) => {sectionRefs.current["student-visa"] = el}}
            id="student-visa"
            className="scroll-mt-40 w-full"
          >
            <StudentVisaSection />
          </div>
        </div>
      </section>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// Section components remain the same
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
    <div className="relative p-8 md:p-12 lg:p-16">
      <div className="absolute w-[372.61px] h-[443.31px] -left-70 -top-10 opacity-30 blur-64 rounded-[3.30382e+07px]">
        <div className="absolute top-8 right-1 w-60 h-60 bg-[#155DFC] blur-3xl rounded-full opacity-30 transform rotate-15"></div>
        <div className="absolute bottom-4 right-2 w-24 h-28 bg-[#155DFC] blur-3xl rounded-full transform -rotate-30"></div>
        <div className="absolute top-16 right-8 w-20 h-16 bg-[#155DFC] blur-2xl rounded-full transform rotate-30 opacity-20"></div>
      </div>
      {/* Header - Centered */}
      <div className="text-center mb-16">
        <h3 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
          Why Study in Australia?
        </h3>
        <p className="text-gray-600 text-lg">
          Discover what makes this destination exceptional
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, idx) => (
          <div
            key={idx}
            className="p-8 bg-white rounded-2xl shadow-md transition-all border border-gray-100 z-50"
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-[#003D7A] flex items-center justify-center mb-6">
              <div className="w-3 h-3 rounded-full bg-white"></div>
            </div>

            {/* Text */}
            <p className="text-gray-700 leading-relaxed text-base">
              {reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdmissionRequirements() {
  const [selectedLevel, setSelectedLevel] = useState("Undergraduate");

  const requirements = [
    "Completion of Year 12 or equivalent international qualification",
    "IELTS 6.0-6.5 overall (or equivalent)",
    "Academic transcripts and certificates",
    "Some courses may require additional tests (ATAR, SAT)",
  ];

  return (
    <div className="bg-gradient-to-br from-[#29FB801A] via-[#E8F9EC] to-[#00A63E4D] p-8 md:p-12 lg:p-16 relative overflow-hidden">
      <div className="absolute w-[372.61px] h-[443.31px] right-5 top-10 opacity-80 blur-64 rounded-[3.30382e+07px]">
        <div className="absolute top-8 right-1 w-60 h-60 bg-[#00A63E4D] blur-[30px] rounded-full opacity-50 transform rotate-15"></div>
        <div className="absolute bottom-4 right-2 w-24 h-28 bg-[#00A63E4D] blur-2xl rounded-full transform -rotate-30"></div>
        <div className="absolute top-16 right-8 w-20 h-16 bg-[#00A63E4D] blur-2xl rounded-full transform rotate-30 opacity-20"></div>
      </div>
      <div className="absolute w-[372.61px] h-[443.31px] left-5 bottom-10 opacity-80 blur-64 rounded-[3.30382e+07px]">
        <div className="absolute top-10 -left-10 w-150 h-150 bg-[#00A63E4D] blur-2xl rounded-full opacity-50 transform rotate-15"></div>
        <div className="absolute -bottom-20 left-1 w-150 h-150 bg-[#00A63E4D] blur-2xl rounded-full opacity-50 transform rotate-55"></div>
        <div className="absolute bottom-0 left-50 w-150 h-150 bg-[#00A63E4D] blur-2xl rounded-full opacity-50 transform rotate-25"></div>
        <div className="absolute bottom-1 left-2 w-24 h-28 bg-[#00A63E4D] blur-2xl rounded-full transform -rotate-30"></div>
        <div className="absolute bottom-1 left-8 w-20 h-16 bg-[#00A63E4D] blur-2xl rounded-full transform rotate-30 opacity-20"></div>
      </div>
      {/* Header with Dropdown */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-6">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-3xl flex md:text-4xl text-gray-900 mb-2">
              <div className="w-12 h-12 rounded-xl flex items-start justify-start flex-shrink-0">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35.7006 18.2036C35.999 18.072 36.2522 17.8557 36.4289 17.5816C36.6055 17.3075 36.6979 16.9876 36.6945 16.6615C36.6911 16.3354 36.5922 16.0175 36.4099 15.7471C36.2276 15.4767 35.97 15.2657 35.669 15.1403L21.384 8.6336C20.9497 8.43552 20.478 8.33301 20.0006 8.33301C19.5233 8.33301 19.0516 8.43552 18.6173 8.6336L4.33397 15.1336C4.03725 15.2636 3.78483 15.4772 3.60758 15.7483C3.43033 16.0194 3.33594 16.3363 3.33594 16.6603C3.33594 16.9842 3.43033 17.3011 3.60758 17.5722C3.78483 17.8434 4.03725 18.057 4.33397 18.1869L18.6173 24.7003C19.0516 24.8984 19.5233 25.0009 20.0006 25.0009C20.478 25.0009 20.9497 24.8984 21.384 24.7003L35.7006 18.2036Z" stroke="#003975" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M36.666 16.667V26.667" stroke="#003975" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 20V25.8333C10 27.1594 11.0536 28.4312 12.9289 29.3689C14.8043 30.3065 17.3478 30.8333 20 30.8333C22.6522 30.8333 25.1957 30.3065 27.0711 29.3689C28.9464 28.4312 30 27.1594 30 25.8333V20" stroke="#003975" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              Admission Requirements
            </h3>
            <p className="text-gray-700 text-base md:text-lg">
              Everything you need to apply
            </p>
          </div>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="appearance-none bg-transparent border border-gray-300 rounded-3xl px-6 py-3 pr-12 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer min-w-[200px]"
          >
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="PhD">PhD</option>
          </select>
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Description */}
        <div>
          <h4 className="text-2xl md:text-[32px] font-bold text-gray-900 mb-6 leading-tight">
            Before starting your application, make sure you have the following
            documents ready.
          </h4>
          <p className="text-[#0A0A0A] text-[32px] leading-relaxed">
            Our experts will review everything and guide you if anything is
            missing.
          </p>
        </div>

        {/* Right Column - Requirements List */}
        <div className="space-y-4 z-50">
          {requirements.map((req, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-[4px] bg-[#29FB801A]`}></div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#008236] to-[#00C950] flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.4198 10.9224C21.5988 10.8434 21.7507 10.7136 21.8567 10.5492C21.9627 10.3847 22.0181 10.1927 22.0161 9.99709C22.0141 9.80144 21.9547 9.61068 21.8454 9.44844C21.736 9.2862 21.5814 9.15961 21.4008 9.08436L12.8298 5.18036C12.5692 5.06151 12.2862 5 11.9998 5C11.7134 5 11.4304 5.06151 11.1698 5.18036L2.5998 9.08036C2.42177 9.15833 2.27031 9.28649 2.16396 9.44917C2.05761 9.61185 2.00098 9.802 2.00098 9.99636C2.00098 10.1907 2.05761 10.3809 2.16396 10.5435C2.27031 10.7062 2.42177 10.8344 2.5998 10.9124L11.1698 14.8204C11.4304 14.9392 11.7134 15.0007 11.9998 15.0007C12.2862 15.0007 12.5692 14.9392 12.8298 14.8204L21.4198 10.9224Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 10V16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 12.5V16C6 16.7956 6.63214 17.5587 7.75736 18.1213C8.88258 18.6839 10.4087 19 12 19C13.5913 19 15.1174 18.6839 16.2426 18.1213C17.3679 17.5587 18 16.7956 18 16V12.5" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <p className="text-[#171717] text-[18px] md:text-lg leading-relaxed font-semibold flex-1 pt-2">
                {req}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function UniversitiesSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 400; // Adjust based on card width

  const universities = [
    {
      rank: "#14 Global",
      name: "University of Melbourne",
      location: "Melbourne, VIC",
      scholarships: "30% Scholarship",
      accreditation: "Accredited by ABC Board",
      network: "Strong global alumni network",
      programs: ["Business", "Engineering", "Medicine"],
    },
    {
      rank: "#19 Global",
      name: "University of Sydney",
      location: "Sydney, NSW",
      scholarships: "25% Scholarship",
      accreditation: "Accredited by TEQSA",
      network: "Global research partnerships",
      programs: ["Law", "Arts", "Science"],
    },
    {
      rank: "#42 Global",
      name: "University of Queensland",
      location: "Brisbane, QLD",
      scholarships: "35% Scholarship",
      accreditation: "Accredited by AACSB",
      network: "Industry connections worldwide",
      programs: ["Engineering", "Medicine", "Business"],
    },
    {
      rank: "#45 Global",
      name: "Monash University",
      location: "Melbourne, VIC",
      scholarships: "30% Scholarship",
      accreditation: "Accredited by EQUIS",
      network: "International campus network",
      programs: ["Pharmacy", "Engineering", "IT"],
    },
    {
      rank: "#50 Global",
      name: "UNSW Sydney",
      location: "Sydney, NSW",
      scholarships: "20% Scholarship",
      accreditation: "Accredited by ABET",
      network: "Strong industry connections",
      programs: ["Engineering", "Business", "Design"],
    },
    {
      rank: "#90 Global",
      name: "University of Adelaide",
      location: "Adelaide, SA",
      scholarships: "25% Scholarship",
      accreditation: "Accredited by TEQSA",
      network: "Research intensive network",
      programs: ["Mining", "Engineering", "Medicine"],
    },
  ];

  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const max = Math.max(0, contentWidth - containerWidth);
        setMaxScroll(max);
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, []);

  const handleNext = () => {
    setScrollPosition((prev) => Math.min(prev + scrollAmount, maxScroll));
  };

  const handlePrev = () => {
    setScrollPosition((prev) => Math.max(0, prev - scrollAmount));
  };

  return (
    <div className="relative w-full px-1 mx-auto py-8 md:py-12 lg:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8 md:mb-12 gap-4 px-8 md:px-12 lg:px-16">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-10 md:h-10">
                <path d="M35.7006 18.2036C35.999 18.072 36.2522 17.8557 36.4289 17.5816C36.6055 17.3075 36.6979 16.9876 36.6945 16.6615C36.6911 16.3354 36.5922 16.0175 36.4099 15.7471C36.2276 15.4767 35.97 15.2657 35.669 15.1403L21.384 8.6336C20.9497 8.43552 20.478 8.33301 20.0006 8.33301C19.5233 8.33301 19.0516 8.43552 18.6173 8.6336L4.33397 15.1336C4.03725 15.2636 3.78483 15.4772 3.60758 15.7483C3.43033 16.0194 3.33594 16.3363 3.33594 16.6603C3.33594 16.9842 3.43033 17.3011 3.60758 17.5722C3.78483 17.8434 4.03725 18.057 4.33397 18.1869L18.6173 24.7003C19.0516 24.8984 19.5233 25.0009 20.0006 25.0009C20.478 25.0009 20.9497 24.8984 21.384 24.7003L35.7006 18.2036Z" stroke="#003975" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M36.666 16.667V26.667" stroke="#003975" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 20V25.8333C10 27.1594 11.0536 28.4312 12.9289 29.3689C14.8043 30.3065 17.3478 30.8333 20 30.8333C22.6522 30.8333 25.1957 30.3065 27.0711 29.3689C28.9464 28.4312 30 27.1594 30 25.8333V20" stroke="#003975" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0A0A0A]">Top Universities</h3>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-[#4A5565]">
            World-class institutions to shape your future
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-[#0A0A0A] rounded-full border border-gray-200 hover:bg-gray-50 transition-all self-start whitespace-nowrap">
          View All Rankings
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33301 8H12.6663" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 3.33301L12.6667 7.99967L8 12.6663" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden" ref={containerRef}>
        <div
          ref={contentRef}
          className="flex transition-transform duration-500 ease-out gap-6"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          {universities.map((uni, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 relative overflow-hidden"
              style={{ width: '380px' }} // Fixed width for cards
            >
              <div className="border border-gray-200 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-5 lg:p-6 bg-white transition-all h-full hover:shadow-lg">
                <div className="absolute w-[172.61px] h-[243.31px] right-1 bottom-1 opacity-10 blur-64 rounded-[3.30382e+07px] pointer-events-none">
                  <div className="absolute top-8 right-1 w-20 h-20 bg-[#155DFC] blur-3xl rounded-full opacity-30 transform rotate-15"></div>
                  <div className="absolute bottom-4 right-2 w-24 h-28 bg-[#155DFC] blur-3xl rounded-full transform -rotate-30"></div>
                  <div className="absolute top-16 right-8 w-20 h-16 bg-[#155DFC] blur-2xl rounded-full transform rotate-30 opacity-20"></div>
                </div>

                {/* Header with Rank and Icon */}
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className="inline-flex items-center gap-2 px-2 md:px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
                    <span className="text-xs md:text-sm font-medium text-blue-900">
                      {uni.rank}
                    </span>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#4A5565]">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-5 md:h-5">
                      <path d="M17.8503 9.10131C17.9995 9.0355 18.1261 8.92737 18.2144 8.79032C18.3028 8.65326 18.3489 8.49331 18.3473 8.33026C18.3456 8.16722 18.2961 8.00825 18.2049 7.87305C18.1138 7.73785 17.985 7.63236 17.8345 7.56965L10.692 4.31631C10.4749 4.21727 10.239 4.16602 10.0003 4.16602C9.76166 4.16602 9.52579 4.21727 9.30865 4.31631L2.16699 7.56631C2.01863 7.63129 1.89242 7.73809 1.80379 7.87366C1.71517 8.00923 1.66797 8.16768 1.66797 8.32965C1.66797 8.49161 1.71517 8.65007 1.80379 8.78563C1.89242 8.9212 2.01863 9.028 2.16699 9.09298L9.30865 12.3496C9.52579 12.4487 9.76166 12.4999 10.0003 12.4999C10.239 12.4999 10.4749 12.4487 10.692 12.3496L17.8503 9.10131Z" stroke="#4A5565" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.334 8.33301V13.333" stroke="#4A5565" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 10.417V13.3337C5 13.9967 5.52678 14.6326 6.46447 15.1014C7.40215 15.5703 8.67392 15.8337 10 15.8337C11.3261 15.8337 12.5979 15.5703 13.5355 15.1014C14.4732 14.6326 15 13.9967 15 13.3337V10.417" stroke="#4A5565" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* University Name */}
                <h4 className="text-lg md:text-xl lg:text-2xl text-[#0A0A0A] mb-3 md:mb-4 font-semibold">
                  {uni.name}
                </h4>

                {/* Location */}
                <div className="flex items-center gap-2 text-xs md:text-sm lg:text-base text-[#4A5565] mb-4 md:mb-6">
                  <svg className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{uni.location}</span>
                </div>

                {/* Info Section */}
                <div className="text-right text-[10px] md:text-xs text-[#404040] leading-relaxed space-y-1">
                  <p>{uni.scholarships}</p>
                  <p>{uni.accreditation}</p>
                  <p>{uni.network}</p>
                </div>

                {/* Popular Courses */}
                <div className="pt-4 md:pt-6">
                  <p className="text-xs md:text-sm text-[#6A7282] mb-2 md:mb-3">
                    Popular Courses:
                  </p>
                  <div className="flex gap-1.5 md:gap-2 flex-wrap">
                    {uni.programs.map((prog, pidx) => (
                      <span
                        key={pidx}
                        className="text-[10px] md:text-xs text-[#0A0A0A] px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-black/10 font-medium"
                      >
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-end gap-3 mt-8 px-4 sm:px-6 lg:px-8">
        <button
          onClick={handlePrev}
          disabled={scrollPosition === 0}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center transition-all ${
            scrollPosition === 0
              ? "bg-gray-50 text-gray-300 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={scrollPosition >= maxScroll}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center transition-all ${
            scrollPosition >= maxScroll
              ? "bg-gray-50 text-gray-300 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}


function StudentVisaSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 490; // Adjust based on card width

  const requirements = [
    {
      title: "Identity & Travel Documents",
      items: [
        "Valid passport (with sufficient validity)",
        "Passport-size photographs (as per visa specifications)",
        "National ID (if required)",
      ],
    },
    {
      title: "Financial Documents",
      items: [
        "Bank statements (last 3-6 months)",
        "Tuition fee payment proof",
        "Sponsorship letters (if applicable)",
      ],
    },
    {
      title: "Academic Documents",
      items: [
        "Academic transcripts and certificates",
        "English proficiency test scores (IELTS/TOEFL)",
        "Statement of Purpose",
      ],
    },
    {
      title: "Health Insurance",
      items: [
        "Overseas Student Health Cover (OSHC)",
        "Health examination reports",
        "Vaccination records",
      ],
    },
    {
      title: "Additional Documents",
      items: [
        "Confirmation of Enrollment (CoE)",
        "Genuine Temporary Entrant (GTE) statement",
        "Previous visa histories (if any)",
      ],
    },
    {
      title: "Additional Documents 1",
      items: [
        "Confirmation of Enrollment (CoE)",
        "Genuine Temporary Entrant (GTE) statement",
        "Previous visa histories (if any)",
      ],
    },
    {
      title: "Additional Documents 2",
      items: [
        "Confirmation of Enrollment (CoE)",
        "Genuine Temporary Entrant (GTE) statement",
        "Previous visa histories (if any)",
      ],
    },
  ];

  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const max = Math.max(0, contentWidth - containerWidth);
        setMaxScroll(max);
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, []);

  const handlePrev = () => {
    setScrollPosition((prev) => Math.max(0, prev - scrollAmount));
  };

  const handleNext = () => {
    setScrollPosition((prev) => Math.min(prev + scrollAmount, maxScroll));
  };

  return (
    <div className="relative w-full mx-auto px-1 py-8 md:py-12 lg:py-16">
      <div className="absolute w-[372.61px] h-[443.31px] left-1 top-1 opacity-10 blur-64 rounded-[3.30382e+07px] pointer-events-none">
        <div className="absolute top-8 right-1 w-60 h-60 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
        <div className="absolute top-10 right-10 w-60 h-60 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
        <div className="absolute top-15 right-15 w-60 h-60 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
        <div className="absolute bottom-4 right-2 w-24 h-28 bg-[#155DFC] blur-3xl rounded-full transform -rotate-30"></div>
        <div className="absolute top-16 right-8 w-20 h-16 bg-[#155DFC] blur-2xl rounded-full transform rotate-30 opacity-20"></div>
      </div>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8 md:mb-12 gap-4 px-8 md:px-12 lg:px-16">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl text-[#0A0A0A] mb-2 flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-7 md:h-7 lg:w-8 lg:h-8">
                  <path d="M21.6524 10.3467L19.247 17.5613C19.1161 17.9541 18.8956 18.311 18.6028 18.6038C18.31 18.8965 17.9531 19.1171 17.5604 19.248L10.3457 21.6533L12.751 14.4387C12.8819 14.0459 13.1025 13.689 13.3953 13.3962C13.688 13.1035 14.0449 12.8829 14.4377 12.752L21.6524 10.3467Z" stroke="#003975" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.9993 29.3332C23.3631 29.3332 29.3327 23.3636 29.3327 15.9998C29.3327 8.63604 23.3631 2.6665 15.9993 2.6665C8.63555 2.6665 2.66602 8.63604 2.66602 15.9998C2.66602 23.3636 8.63555 29.3332 15.9993 29.3332Z" stroke="#003975" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Student Visa
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-[#4A5565]">
              Requirement Checklist for Visa Processing
            </p>
          </div>
        </div>

        {/* Processing Badge */}
        <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-green-50 rounded-full border border-green-100 self-start whitespace-nowrap">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs md:text-sm font-medium text-green-700">
            Processing: 4-6 weeks
          </span>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden" ref={containerRef}>
        <div
          ref={contentRef}
          className="flex transition-transform duration-500 ease-out gap-6"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          {requirements.map((req, idx) => (
            <div
              key={idx}
              className="flex-shrink-0"
              style={{ width: '380px' }} // Fixed width for cards
            >
              <div className="border border-gray-200 rounded-xl md:rounded-2xl lg:rounded-3xl p-5 md:p-6 lg:p-8 bg-white transition-all h-full hover:shadow-lg z-50">
                {/* Icon */}
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl md:rounded-2xl lg:rounded-3xl bg-[#003975] flex items-center justify-center mb-4 md:mb-5 lg:mb-6">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-5 md:h-5 lg:w-6 lg:h-6">
                    <path d="M16.2398 7.75977L14.4358 13.1708C14.3376 13.4653 14.1722 13.733 13.9526 13.9526C13.733 14.1722 13.4653 14.3376 13.1708 14.4358L7.75977 16.2398L9.56377 10.8288C9.66195 10.5342 9.82737 10.2665 10.0469 10.0469C10.2665 9.82737 10.5342 9.66195 10.8288 9.56377L16.2398 7.75977Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Title */}
                <h5 className="text-base md:text-lg lg:text-xl text-[#003975] font-semibold mb-4 md:mb-5 lg:mb-6">
                  {req.title}
                </h5>

                {/* List Items */}
                <ul className="space-y-2 md:space-y-2.5">
                  {req.items.map((item, iidx) => (
                    <li
                      key={iidx}
                      className="flex items-start gap-2 text-xs md:text-sm lg:text-base text-[#525252]"
                    >
                      <span className="text-[#424242] text-sm md:text-base lg:text-lg leading-none flex-shrink-0">
                        •
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-end gap-3 mt-6 md:mt-8 px-4 sm:px-6 lg:px-8">
        <button
          onClick={handlePrev}
          disabled={scrollPosition === 0}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center transition-all ${
            scrollPosition === 0
              ? "bg-gray-50 text-gray-300 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={scrollPosition >= maxScroll}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center transition-all ${
            scrollPosition >= maxScroll
              ? "bg-gray-50 text-gray-300 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}


function LivingCostSection() {
  const [selectedCurrency, setSelectedCurrency] = useState("AUD");

  const expenses = [
    { category: "Accommodation", cost: "200 - 500 /week", percentage: 50 },
    { category: "Food & Dining", cost: "80 - 200 /week", percentage: 60 },
    { category: "Miscellaneous", cost: "50 - 150 /week", percentage: 70 },
    { category: "Transport", cost: "30 - 70 /week", percentage: 80 },
  ];

  return (
    <div className="p-8 md:p-12 lg:p-16">
      {/* Header with Currency Dropdown */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-6">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-3xl md:text-4xl text-gray-900 mb-2 flex items-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 3.33301V36.6663" stroke="#003975" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M28.3333 8.33301H15.8333C14.2862 8.33301 12.8025 8.94759 11.7085 10.0416C10.6146 11.1355 10 12.6192 10 14.1663C10 15.7134 10.6146 17.1972 11.7085 18.2911C12.8025 19.3851 14.2862 19.9997 15.8333 19.9997H24.1667C25.7138 19.9997 27.1975 20.6143 28.2915 21.7082C29.3854 22.8022 30 24.2859 30 25.833C30 27.3801 29.3854 28.8638 28.2915 29.9578C27.1975 31.0518 25.7138 31.6663 24.1667 31.6663H10" stroke="#003975" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              Cost of Living
            </h3>
            <p className="text-[#4A5565] text-[20px] md:text-lg">
              Average monthly expenses to plan your budget
            </p>
          </div>
        </div>

        {/* Currency Dropdown */}
        <div className="relative">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-3xl px-6 py-3 pr-12 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer min-w-[150px]"
          >
            <option value="AUD">AUD</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Expense Bars - Single Column Full Width */}
      <div className="bg-gray-50 p-8 md:p-12 space-y-8">
        {expenses.map((exp, idx) => (
          <div key={idx} className="space-y-3">
            {/* Category Label and Cost */}
            <div className="flex items-baseline">
              <div className="w-full">
                <label className="text-lg md:text-xl text-[#A1A1A1] font-normal">
                  {exp.category}
                </label>

                {/* Progress Bar */}
                <div className="h-3 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00A63E] rounded-full transition-all duration-1000"
                    style={{ width: `${exp.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex text-2xl md:text-3xl items-baseline gap-2">
                <span className="text-[#A1A1A1] text-2xl md:text-3xl font-normal">
                  {selectedCurrency}
                </span>
                <span className="text-2xl md:text-3xl font-normal text-[#525252] whitespace-nowrap">
                  {exp.cost}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}