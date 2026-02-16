"use client";

import { useParams, useRouter } from "next/navigation"; // Changed from react-router-dom
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface University {
  id: number;
  rank: string;
  name: string;
  location: string;
  scholarship: string;
  programs: string[];
  type: "group-of-eight" | "tech-focused" | "regional";
}
const universities: University[] = [
  {
    id: 1,
    rank: "#14 Global",
    name: "University of Melbourne",
    location: "Melbourne, VIC",
    scholarship: "30% Scholarship",
    programs: ["Business", "Engineering", "Medicine"],
    type: "group-of-eight",
  },
  {
    id: 2,
    rank: "#14 Global",
    name: "University of Sydney",
    location: "Sydney, NSW",
    scholarship: "30% Scholarship",
    programs: ["Business", "Engineering", "Medicine"],
    type: "group-of-eight",
  },
  {
    id: 3,
    rank: "#14 Global",
    name: "Australian National University",
    location: "Canberra, ACT",
    scholarship: "30% Scholarship",
    programs: ["Business", "Engineering", "Medicine"],
    type: "group-of-eight",
  },
  {
    id: 4,
    rank: "#14 Global",
    name: "RMIT University",
    location: "Melbourne, VIC",
    scholarship: "30% Scholarship",
    programs: ["Business", "Engineering", "Medicine"],
    type: "tech-focused",
  },
  {
    id: 5,
    rank: "#14 Global",
    name: "University of Technology Sydney",
    location: "Sydney, NSW",
    scholarship: "30% Scholarship",
    programs: ["Business", "Engineering", "Medicine"],
    type: "tech-focused",
  },
  {
    id: 6,
    rank: "#14 Global",
    name: "Monash University",
    location: "Melbourne, VIC",
    scholarship: "30% Scholarship",
    programs: ["Business", "Engineering", "Medicine"],
    type: "regional",
  },
  {
    id: 7,
    rank: "#14 Global",
    name: "University of Queensland",
    location: "Brisbane, QLD",
    scholarship: "30% Scholarship",
    programs: ["Business", "Engineering", "Medicine"],
    type: "group-of-eight",
  },
  {
    id: 8,
    rank: "#14 Global",
    name: "Curtin University",
    location: "Perth, WA",
    scholarship: "30% Scholarship",
    programs: ["Business", "Engineering", "Medicine"],
    type: "tech-focused",
  },
  {
    id: 9,
    rank: "#14 Global",
    name: "University of Western Australia",
    location: "Perth, WA",
    scholarship: "30% Scholarship",
    programs: ["Business", "Engineering", "Medicine"],
    type: "group-of-eight",
  },
  {
    id: 10,
    rank: "#14 Global",
    name: "University of Western Australia",
    location: "Perth, WA",
    scholarship: "30% Scholarship",
    programs: ["Business", "Engineering", "Medicine"],
    type: "group-of-eight",
  },
  {
    id: 11,
    rank: "#14 Global",
    name: "University of Western Australia",
    location: "Perth, WA",
    scholarship: "30% Scholarship",
    programs: ["Business", "Engineering", "Medicine"],
    type: "group-of-eight",
  },
  {
    id: 12,
    rank: "#14 Global",
    name: "University of Western Australia",
    location: "Perth, WA",
    scholarship: "30% Scholarship",
    programs: ["Business", "Engineering", "Medicine"],
    type: "group-of-eight",
  }
];

const universityTypes = [
  {
    id: "group-of-eight",
    name: "Group of Eight",
    description: "Australia's leading research intensive universities",
    features: [
      "Highest research output",
      "Best Global Rankings",
      "Extensive alumni networks",
    ],
  },
  {
    id: "tech-focused",
    name: "Australian Technology Network",
    description: "Universities focusing on industry collaboration",
    features: [
      "Strong Industry Links",
      "Practical Learning",
      "High Employability",
    ],
  },
  {
    id: "regional",
    name: "Regional Universities",
    description: "Quality education in regional areas",
    features: [
      "Lower living costs",
      "Smaller class sizes",
      "Regional Migration benefits",
    ],
  },
];

const applySteps = [
    {
    number: "01",
    title: "Research & Shortlist",
    description: "Research universities and courses that match your profile and career goal",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" 
          stroke="#525252" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    number: "02",
    title: "Check Requirements",
    description: "Verify entry requirements, English proficiency, and document checklist",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  },
  {
    number: "03",
    title: "Prepare Documents",
    description: "Gather transcripts, recommendations, SOP, and test score",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20H21" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16.376 3.62173C16.7741 3.22364 17.314 3 17.877 3C18.44 3 18.9799 3.22364 19.378 3.62173C19.7761 4.01982 19.9997 4.55975 19.9997 5.12273C19.9997 5.68572 19.7761 6.22564 19.378 6.62373L7.36798 18.6347C7.13007 18.8726 6.836 19.0467 6.51298 19.1407L3.64098 19.9787C3.55493 20.0038 3.46372 20.0053 3.37689 19.9831C3.29006 19.9608 3.2108 19.9157 3.14742 19.8523C3.08404 19.7889 3.03887 19.7097 3.01662 19.6228C2.99437 19.536 2.99588 19.4448 3.02098 19.3587L3.85898 16.4867C3.9532 16.1641 4.12722 15.8704 4.36498 15.6327L16.376 3.62173Z" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  },
  {
    number: "04",
    title: "Submit Application",
    description: "Apply directly or through our counsellors for guidance",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.06153 12.3484C1.97819 12.1238 1.97819 11.8769 2.06153 11.6524C2.87323 9.68421 4.25104 8.0014 6.0203 6.81726C7.78955 5.63312 9.87057 5.00098 11.9995 5.00098C14.1285 5.00098 16.2095 5.63312 17.9788 6.81726C19.748 8.0014 21.1258 9.68421 21.9375 11.6524C22.0209 11.8769 22.0209 12.1238 21.9375 12.3484C21.1258 14.3165 19.748 15.9993 17.9788 17.1835C16.2095 18.3676 14.1285 18.9997 11.9995 18.9997C9.87057 18.9997 7.78955 18.3676 6.0203 17.1835C4.25104 15.9993 2.87323 14.3165 2.06153 12.3484Z" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  },
  {
    number: "05",
    title: "Receive Offer",
    description: "Get conditional/unconditional offer and accept your place",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.93743 15.5002C9.84815 15.1542 9.66777 14.8384 9.41505 14.5856C9.16232 14.3329 8.8465 14.1525 8.50043 14.0632L2.36543 12.4812C2.26076 12.4515 2.16864 12.3885 2.10304 12.3017C2.03744 12.2149 2.00195 12.1091 2.00195 12.0002C2.00195 11.8914 2.03744 11.7856 2.10304 11.6988C2.16864 11.612 2.26076 11.549 2.36543 11.5192L8.50043 9.93625C8.84638 9.84706 9.16212 9.66682 9.41483 9.41429C9.66754 9.16175 9.84799 8.84614 9.93743 8.50025L11.5194 2.36525C11.5488 2.26017 11.6118 2.16759 11.6987 2.10164C11.7857 2.0357 11.8918 2 12.0009 2C12.11 2 12.2162 2.0357 12.3031 2.10164C12.39 2.16759 12.453 2.26017 12.4824 2.36525L14.0634 8.50025C14.1527 8.84632 14.3331 9.16215 14.5858 9.41487C14.8385 9.66759 15.1544 9.84797 15.5004 9.93725L21.6354 11.5182C21.7409 11.5473 21.834 11.6103 21.9003 11.6973C21.9666 11.7844 22.0025 11.8908 22.0025 12.0002C22.0025 12.1097 21.9666 12.2161 21.9003 12.3032C21.834 12.3902 21.7409 12.4531 21.6354 12.4822L15.5004 14.0632C15.1544 14.1525 14.8385 14.3329 14.5858 14.5856C14.3331 14.8384 14.1527 15.1542 14.0634 15.5002L12.4814 21.6353C12.452 21.7403 12.389 21.8329 12.3021 21.8989C12.2152 21.9648 12.109 22.0005 11.9999 22.0005C11.8908 22.0005 11.7847 21.9648 11.6977 21.8989C11.6108 21.8329 11.5478 21.7403 11.5184 21.6353L9.93743 15.5002Z" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20 3V7" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 5H18" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 17V19" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5 18H3" stroke="#525252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  },
];

const countryNames: Record<string, string> = {
  australia: "Australia",
  "united-states": "United States",
  "new-zealand": "New Zealand",
  canada: "Canada",
  "united-kingdom": "United Kingdom",
  germany: "Germany",
  singapore: "Singapore",
  switzerland: "Switzerland",
  netherlands: "Netherlands",
};

const countryStats: Record<string, { accommodation: string; students: string; courses: string; scholarships: string }> = {
  australia: {
    accommodation: "7",
    students: "550k+",
    courses: "22,000+",
    scholarships: "$200k+",
  },
  "united-states": {
    accommodation: "50+",
    students: "1M+",
    courses: "50,000+",
    scholarships: "$100B+",
  },
  "new-zealand": {
    accommodation: "8",
    students: "150k+",
    courses: "5,000+",
    scholarships: "$50k+",
  },
  canada: {
    accommodation: "10+",
    students: "600k+",
    courses: "15,000+",
    scholarships: "$75k+",
  },
  "united-kingdom": {
    accommodation: "20+",
    students: "500k+",
    courses: "30,000+",
    scholarships: "$100k+",
  },
};

export default function UniversitiesDetail() {
  const params = useParams(); // Changed from useParams
  const router = useRouter(); // Changed from useNavigate
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const itemsPerPage = 9;

  const country = params?.country as string;
  const countryName = country ? countryNames[country.toLowerCase()] || country : "this country";
  const stats = country 
    ? countryStats[country.toLowerCase()] || countryStats.australia 
    : countryStats.australia;

  const filteredUniversities = useMemo(() => {
    let filtered = universities;

    if (selectedFilter !== "all") {
      filtered = filtered.filter((uni) => uni.type === selectedFilter);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          uni.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUniversities = filteredUniversities.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(0);
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section
        className="relative pt-20 pb-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 to-blue-900"
        style={{
          backgroundImage: `linear-gradient(135deg, rgb(12 16 20 / 80%) 0%, rgba(0, 100, 150, 0.8) 100%), url(/images/australia.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-6xl mx-auto relative z-10 pt-5">
          <div className="w-full flex justify-between mb-7">
            <button
              onClick={() => router.push(`/destinations/${country}`)}
              className="text-white text-[14px] flex items-center gap-1 mb-6 hover:gap-2 transition"
            >
              ← Back to {countryName}
            </button>
            <div className="inline-flex text-white items-center gap-2 mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_127_5858)">
                <path d="M13.3327 6.66634C13.3327 9.99501 9.64002 13.4617 8.40002 14.5323C8.2845 14.6192 8.14388 14.6662 7.99935 14.6662C7.85482 14.6662 7.7142 14.6192 7.59868 14.5323C6.35868 13.4617 2.66602 9.99501 2.66602 6.66634C2.66602 5.25185 3.22792 3.8953 4.22811 2.89511C5.22831 1.89491 6.58486 1.33301 7.99935 1.33301C9.41384 1.33301 10.7704 1.89491 11.7706 2.89511C12.7708 3.8953 13.3327 5.25185 13.3327 6.66634Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 8.66699C9.10457 8.66699 10 7.77156 10 6.66699C10 5.56242 9.10457 4.66699 8 4.66699C6.89543 4.66699 6 5.56242 6 6.66699C6 7.77156 6.89543 8.66699 8 8.66699Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_127_5858">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
                </svg>
              </span>
              <span className="text-xs md:text-sm">{countryName}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-5xl md:text-[48px] font-bold text-white mb-3">
                Universities in {countryName}
              </h1>
              <p className="text-[20px] text-blue-100">
                Explore top-ranked universities and find your perfect match
              </p>
            </div>
            <div className="relative max-w-md flex items-end">
              <input
                type="text"
                placeholder="Search Universities..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchTerm(inputValue);
                    document.getElementById('featured-universities')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }
                }}
                className="w-100 h-[50%] px-12 py-3 text-[16px] rounded-2xl border border-[#E5E7EB] bg-white/10 text-white placeholder-[#A1A1A1] focus:outline-none focus:border-white transition"
              />
              <span className="absolute left-4 bottom-1.5 transform -translate-y-1/2 text-white/60">
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17.5003 17.5003L13.917 13.917" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* Key Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: stats.accommodation, label: "Accommodation" },
              { value: stats.students, label: "International Students" },
              { value: stats.courses, label: "Courses Available" },
              { value: stats.scholarships, label: "Scholarships" },
            ].map((stat, idx) => (
              <div key={idx} className="overflow-hidden border border-gray-200 rounded-3xl p-6 text-center bg-white hover:shadow-lg transition-all relative">
                <div className="absolute w-[372.61px] h-[443.31px] left-1 bottom-1 opacity-10 blur-64 rounded-[3.30382e+07px]">
                  <div className="absolute top-8 right-1 w-40 h-40 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
                  <div className="absolute bottom-4 right-2 w-24 h-28 bg-[#155DFC] blur-3xl rounded-full transform -rotate-30"></div>
                  <div className="absolute top-16 right-8 w-20 h-16 bg-[#155DFC] blur-2xl rounded-full transform rotate-30 opacity-20"></div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#003975] flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M28.5597 14.5625C28.7984 14.4572 29.001 14.2842 29.1423 14.0649C29.2836 13.8456 29.3575 13.5897 29.3548 13.3288C29.3521 13.0679 29.273 12.8136 29.1271 12.5973C28.9813 12.381 28.7752 12.2122 28.5344 12.1118L17.1064 6.90649C16.759 6.74802 16.3816 6.66602 15.9997 6.66602C15.6179 6.66602 15.2405 6.74802 14.8931 6.90649L3.4664 12.1065C3.22902 12.2105 3.02709 12.3813 2.88529 12.5982C2.74349 12.8152 2.66797 13.0687 2.66797 13.3278C2.66797 13.587 2.74349 13.8405 2.88529 14.0574C3.02709 14.2743 3.22902 14.4452 3.4664 14.5492L14.8931 19.7598C15.2405 19.9183 15.6179 20.0003 15.9997 20.0003C16.3816 20.0003 16.759 19.9183 17.1064 19.7598L28.5597 14.5625Z" stroke="#E5E5E5" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M29.333 13.333V21.333" stroke="#E5E5E5" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 16.667V21.3337C8 22.3945 8.84285 23.4119 10.3431 24.1621C11.8434 24.9122 13.8783 25.3337 16 25.3337C18.1217 25.3337 20.1566 24.9122 21.6569 24.1621C23.1571 23.4119 24 22.3945 24 21.3337V16.667" stroke="#E5E5E5" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-3xl md:text-4xl font-semibold text-[#003D7A] mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8fbff]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 mb-6 text-lg rounded-full bg-[#1717170D] text-[#404040]">
              Universities
            </div>
            <h2 className="text-[30px] font-bold text-[#0A0A0A] mb-5">
              University Types in {countryName}
            </h2>
            <p className="text-[#4A5565] text-[16px]">
              Understanding the different types of universities to make the right choice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {universityTypes.map((uniType) => (
              <div
                key={uniType.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 hover:shadow-lg transition"
              >
                <div className="flex justify-end">
                  <span className="text-[11px] text-[#00C853] bg-[#00C8531A] px-3 py-[0.5px] rounded-full">
                    10
                  </span>
                </div>
                <h3 className="text-[24px] font-bold text-slate-900 mb-6 mt-[-5px]">
                  {uniType.name}
                </h3>
                <p className="text-slate-600 text-[16px] mb-7 leading-5">
                  {uniType.description}
                </p>
                <div>
                  <p className="text-sm font-semibold text-[#525252] mb-3 border-t-2 border-[#E5E5E5] pt-4">
                    Key Features:
                  </p>
                  <ul className="space-y-2">
                    {uniType.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-[#4A5565] flex items-center gap-2"
                      >
                        <span className="text-green-600">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Universities Section */}
      <section id="featured-universities" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-5 text-center">
              Featured Universities
            </h2>
            <p className="text-slate-600 mb-3 text-center">
              Browse through our partner universities offering world-class education
            </p>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-end mb-8">
              <div className="relative w-full max-w-112.5">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search Universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-300 focus:outline-none placeholder-[#A1A1A1] focus:border-blue-500 transition bg-white shadow-sm"
                />
              </div>

              <button className="px-4 py-3 bg-[#0A0A0A] text-white rounded-2xl hover:bg-slate-800 transition flex items-center gap-2 shadow-sm">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_127_6625)">
                <path d="M13.9997 2.66699H9.33301" stroke="white" stroke-opacity="0.8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.66667 2.66699H2" stroke="white" stroke-opacity="0.8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 8H8" stroke="white" stroke-opacity="0.8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.33333 8H2" stroke="white" stroke-opacity="0.8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.0003 13.333H10.667" stroke="white" stroke-opacity="0.8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 13.333H2" stroke="white" stroke-opacity="0.8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.33301 1.33301V3.99967" stroke="white" stroke-opacity="0.8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.33301 6.66699V9.33366" stroke="white" stroke-opacity="0.8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.667 12V14.6667" stroke="white" stroke-opacity="0.8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_127_6625">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                Filters
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="grid grid-cols-4 gap-2 bg-[#ecedf2] rounded-full p-1">
              <button
                onClick={() => handleFilterChange("all")}
                className={`whitespace-nowrap px-2 py-1 text-[14px] rounded-full font-semibold transition text-center ${
                  selectedFilter === "all"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "bg-transparent text-slate-700 hover:text-slate-900"
                }`}
              >
                All Universities
              </button>
              <button
                onClick={() => handleFilterChange("group-of-eight")}
                className={`whitespace-nowrap px-2 py-1 text-[14px] rounded-full font-semibold transition text-center ${
                  selectedFilter === "group-of-eight"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "bg-transparent text-slate-700 hover:text-slate-900"
                }`}
              >
                Group of Eight
              </button>
              <button
                onClick={() => handleFilterChange("tech-focused")}
                className={`whitespace-nowrap px-2 py-1 text-[14px] rounded-full font-semibold transition text-center ${
                  selectedFilter === "tech-focused"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "bg-transparent text-slate-700 hover:text-slate-900"
                }`}
              >
                Tech Focused
              </button>
              <button
                onClick={() => handleFilterChange("regional")}
                className={`whitespace-nowrap px-2 py-1 text-[14px] rounded-full font-semibold transition text-center ${
                  selectedFilter === "regional"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "bg-transparent text-slate-700 hover:text-slate-900"
                }`}
              >
                Regional
              </button>
            </div>
          </div>

          {/* Universities Grid */}
          {currentUniversities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentUniversities.map((university) => (
                <div
                  key={university.id}
                  className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition bg-white relative overflow-hidden"
                >
                  <div className="absolute w-[372.61px] h-[443.31px] -right-20 -bottom-20 opacity-10 blur-64 rounded-[3.30382e+07px]">
                    <div className="absolute -bottom-1 -right-1 w-50 h-50 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-block bg-[#fafaff] text-[#003975] border border-[#155DFC1A] text-[14px] px-3 py-2 rounded-full">
                      {university.rank}
                    </div>
                    <div className="text-slate-400 bg-[#F3F4F6] w-10 h-10 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.8503 9.10131C17.9995 9.0355 18.1261 8.92737 18.2144 8.79032C18.3028 8.65326 18.3489 8.49331 18.3473 8.33026C18.3456 8.16722 18.2961 8.00825 18.2049 7.87305C18.1138 7.73785 17.985 7.63236 17.8345 7.56965L10.692 4.31631C10.4749 4.21727 10.239 4.16602 10.0003 4.16602C9.76166 4.16602 9.52579 4.21727 9.30865 4.31631L2.16699 7.56631C2.01863 7.63129 1.89242 7.73809 1.80379 7.87366C1.71517 8.00923 1.66797 8.16768 1.66797 8.32965C1.66797 8.49161 1.71517 8.65007 1.80379 8.78563C1.89242 8.9212 2.01863 9.028 2.16699 9.09298L9.30865 12.3496C9.52579 12.4487 9.76166 12.4999 10.0003 12.4999C10.239 12.4999 10.4749 12.4487 10.692 12.3496L17.8503 9.10131Z" stroke="#4A5565" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M18.333 8.33301V13.333" stroke="#4A5565" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M5 10.417V13.3337C5 13.9967 5.52678 14.6326 6.46447 15.1014C7.40215 15.5703 8.67392 15.8337 10 15.8337C11.3261 15.8337 12.5979 15.5703 13.5355 15.1014C14.4732 14.6326 15 13.9967 15 13.3337V10.417" stroke="#4A5565" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>

                    </div>
                  </div>

                  <h3 className="text-[24px] text-[#0A0A0A] mb-3">
                    {university.name}
                  </h3>

                  <p className="text-[16px] text-[#4A5565] mb-4 flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 6.66667C14 11.3333 8 15 8 15C8 15 2 11.3333 2 6.66667C2 5.07535 2.63214 3.54928 3.75736 2.42406C4.88258 1.29885 6.40866 0.666668 8 0.666668C9.59133 0.666668 11.1174 1.29885 12.2426 2.42406C13.3679 3.54928 14 5.07535 14 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {university.location}
                  </p>

                  <div className="mb-4 text-[14px] text-slate-600 text-end">
                    <p>{university.scholarship}</p>
                    <p>Accredited by ABC Board</p>
                    <p>Strong global alumni network</p>
                  </div>

                  <div>
                    <p className="text-[14px] text-[#6A7282] mb-2">
                      Popular Courses:
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {university.programs.map((prog, idx) => (
                        <span
                          key={idx}
                          className="text-[12px] font-semibold text-[#0A0A0A] px-3 py-1.5 rounded-[10px] border border-[#0000001A]"
                        >
                          {prog}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">
                No universities found matching "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Carousel Navigation */}
          {filteredUniversities.length > 0 && (
            <div className="flex items-center justify-end gap-4 mt-8">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className={`w-[50px] h-[50px] rounded-full border border-slate-300 transition flex items-center justify-center ${
                  currentPage === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-slate-100'
                }`}
                aria-label="Previous page"
              >
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 8.00001C0 8.11675 0.0238582 8.22582 0.0715747 8.3272C0.119291 8.42859 0.190866 8.52229 0.286299 8.6083L8.39469 15.7512C8.57873 15.9171 8.80027 16 9.0593 16C9.23654 16 9.39503 15.9631 9.53477 15.8894C9.67451 15.8157 9.78698 15.7159 9.87219 15.5899C9.9574 15.464 10 15.3211 10 15.1614C10 14.934 9.90798 14.7343 9.72393 14.5622L2.28016 8.00001L9.72393 1.43779C9.90798 1.26575 10 1.06605 10 0.838711C10 0.678957 9.9574 0.536099 9.87219 0.410139C9.78698 0.284179 9.67451 0.184332 9.53477 0.1106C9.39503 0.0368666 9.23654 0 9.0593 0C8.80027 0 8.57873 0.0798772 8.39469 0.239631L0.286299 7.39171C0.190866 7.47774 0.119291 7.57144 0.0715747 7.67282C0.0238582 7.77421 0 7.88327 0 8.00001Z" fill="black" fill-opacity="0.8"/>
                </svg>
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
                className={`w-[50px] h-[50px] rounded-full border border-slate-300 transition flex items-center justify-center ${
                  currentPage === totalPages - 1 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-slate-100'
                }`}
                aria-label="Next page"
              >
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 8.00001C10 7.88327 9.97444 7.77421 9.92332 7.67282C9.87219 7.57144 9.79891 7.47774 9.70348 7.39171L1.60531 0.239631C1.42127 0.0798772 1.19632 0 0.930471 0C0.760054 0 0.603272 0.0368666 0.460123 0.1106C0.316973 0.184332 0.204499 0.284179 0.1227 0.410139C0.0409 0.536099 0 0.678957 0 0.838711C0 1.06605 0.0886162 1.26575 0.265848 1.43779L7.70961 8.00001L0.265848 14.5622C0.0886162 14.7343 0 14.934 0 15.1614C0 15.3211 0.0409 15.464 0.1227 15.5899C0.204499 15.7159 0.316973 15.8157 0.460123 15.8894C0.603272 15.9631 0.760054 16 0.930471 16C1.19632 16 1.42127 15.9171 1.60531 15.7512L9.70348 8.6083C9.79891 8.52229 9.87219 8.42859 9.92332 8.3272C9.97444 8.22582 10 8.11675 10 8.00001Z" fill="black" fill-opacity="0.8"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8faff]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-12">
            <div>
              <h2 className="text-[48px] text-[#0A0A0A] mb-2 flex items-center gap-3">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35.6997 18.2036C35.998 18.072 36.2512 17.8557 36.4279 17.5816C36.6045 17.3075 36.6969 16.9876 36.6935 16.6615C36.6902 16.3354 36.5912 16.0175 36.4089 15.7471C36.2266 15.4767 35.969 15.2657 35.668 15.1403L21.383 8.6336C20.9487 8.43552 20.477 8.33301 19.9997 8.33301C19.5223 8.33301 19.0506 8.43552 18.6163 8.6336L4.333 15.1336C4.03628 15.2636 3.78386 15.4772 3.60661 15.7483C3.42936 16.0194 3.33496 16.3363 3.33496 16.6603C3.33496 16.9842 3.42936 17.3011 3.60661 17.5722C3.78386 17.8434 4.03628 18.057 4.333 18.1869L18.6163 24.7003C19.0506 24.8984 19.5223 25.0009 19.9997 25.0009C20.477 25.0009 20.9487 24.8984 21.383 24.7003L35.6997 18.2036Z" stroke="#003975" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M36.667 16.667V26.667" stroke="#003975" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 20V25.8333C10 27.1594 11.0536 28.4312 12.9289 29.3689C14.8043 30.3065 17.3478 30.8333 20 30.8333C22.6522 30.8333 25.1957 30.3065 27.0711 29.3689C28.9464 28.4312 30 27.1594 30 25.8333V20" stroke="#003975" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                How to Apply
              </h2>
              <p className="text-[#4A5565] text-[20px]">Our brief checklist on how to apply</p>
            </div>
            <button className="px-5 py-2.5 bg-transparent border border-[#D1D5DC] rounded-full hover:bg-slate-100 transition flex items-center gap-2 text-[16px] text-[#0A0A0A] font-medium">
              Download Checklist
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33301 8H12.6663" stroke="#0A0A0A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 3.33301L12.6667 7.99967L8 12.6663" stroke="#0A0A0A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[42px] top-14 bottom-14 w-[1.5px] bg-gradient-to-b from-[#BEDBFF] via-[#E9D4FF] to-[#FCCEE8]"></div>

            <div className="space-y-6">
              {applySteps.map((step, idx) => (
                <div key={idx} className="flex gap-6 relative items-center">
                  {/* Step Number */}
                  <div className="shrink-0 z-10 bg-[#FFFFFF] p-3 border-3 border-[#e5e5e5] rounded-3xl">
                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center font-semibold text-[30px]">
                      {step.number}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1">
                    <div className="bg-white border-2 border-[#E5E5E5] rounded-3xl py-4 px-7 hover:shadow-md transition">
                      <div className="flex items-start gap-3 mb-2">
                        <div>
                          <div className="flex gap-3 items-center text-[#171717] text-[24px] mb-3">
                            <span className="text-xl mt-0.5">{step.icon}</span>
                            <h3>
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-[#525252] text-[16px] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafbfd] relative overflow-hidden">
        <div className="absolute w-[372.61px] h-[443.31px] right-1 bottom-1 opacity-40 blur-64 rounded-[3.30382e+07px]">
          <div className="absolute bottom-18 right-5 w-60 h-60 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
        </div>
        <div className="absolute w-[372.61px] h-[443.31px] left-30 -bottom-30 opacity-30 blur-64 rounded-[3.30382e+07px]">
          <div className="absolute -bottom-40 left-50 w-110 h-110 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[60px] font-semibold text-[#0A0A0A] mb-10 flex items-center justify-center gap-2 leading-18">
           Need Help with <br /> Choosing a University?
          </h2>
          <p className="text-[18px] text-[#4A5565] mb-10">
            Our counsellors can help you find the perfect university based on your
            profile, budget, and career goals
          </p>
          <button className="bg-slate-900 hover:bg-slate-800 text-white text-[18px] font-semibold py-3 px-[40px] w-[340px] h-[65px] rounded-full transition flex items-center justify-end gap-[40px] mx-auto">
            Book Counselling 
            <span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16699 10H15.8337" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 4.16699L15.8333 10.0003L10 15.8337" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}