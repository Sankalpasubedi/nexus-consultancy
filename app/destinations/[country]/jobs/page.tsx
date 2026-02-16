"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const countryNames: Record<string, string> = {
  australia: "Australia",
  "united-states": "United States",
  "new-zealand": "New Zealand",
  canada: "Canada",
  "united-kingdom": "United Kingdom",
};

const countryStats: Record<string, { jobOpenings: string; avgSalary: string; growth: string; searchTime: string; costIncrease: string }> = {
  australia: {
    jobOpenings: "350k+",
    avgSalary: "AUD 75k",
    growth: "~15%",
    searchTime: "3 months",
    costIncrease: "+3.5%",
  },
};

const workRightsData = [
  {
    title: "During Semester",
    duration: "2-6 years (based on qualification)",
    subtitle: "Bachelor or higher degree graduates",
    workRights: "Unrestricted full-time work",
    hourlyRate: "$AUD 20-30/hour",
  },
  {
    title: "During Semester breaks",
    duration: "2-6 years (based on qualification)",
    subtitle: "Bachelor or higher degree graduates",
    workRights: "Unrestricted full-time work",
    hourlyRate: "$AUD 20-30/hour",
  },
  {
    title: "After Graduation",
    duration: "2-6 years (based on qualification)",
    subtitle: "Bachelor or higher degree graduates",
    workRights: "Unrestricted full-time work",
    hourlyRate: "$AUD 20-30/hour",
  },
  {
    title: "Masters",
    duration: "2-6 years (based on qualification)",
    subtitle: "Bachelor or higher degree graduates",
    workRights: "Unrestricted full-time work",
    hourlyRate: "$AUD 20-30/hour",
  },
];

const visaOptions = [
  {
    title: "Post-Study Work (485)",
    duration: "2-6 years",
    eligibility: "Bachelor or higher",
    workRights: "Unrestricted",
    pathToPR: "High",
    requirements: [
      "Complete degree in Australia",
      "Meet English requirements",
      "Apply within 6 months",
      "Health insurance",
    ],
  },
  {
    title: "Skilled Migration",
    duration: "Permanent",
    eligibility: "Points-based",
    workRights: "Unrestricted",
    pathToPR: "Direct",
    requirements: [
      "Occupation on skilled list",
      "Skills assessment",
      "Points threshold",
      "English proficiency",
    ],
  },
  {
    title: "Employee Sponsored",
    duration: "2-4 years",
    eligibility: "Job offer required",
    workRights: "Employer specific",
    pathToPR: "Medium",
    requirements: [
      "Employer sponsorship",
      "Relevant skills",
      "English requirements",
      "Health and character",
    ],
  },
];

const topEmployers = [
  { name: "Google Australia", roles: "Software, Data, Cloud", positions: "450+" },
  { name: "Commonwealth Bank", roles: "Finance, IT, Analytics", positions: "380+" },
  { name: "Deloitte", roles: "Consulting, Audit, Tech", positions: "520+" },
  { name: "Atlassian", roles: "Engineering, Product", positions: "350+" },
  { name: "Telstra", roles: "Telecom, IT, Engineering", positions: "420+" },
];

export default function WorkOpportunitiesDetail() {
  const params = useParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentWorkRightIndex, setCurrentWorkRightIndex] = useState(0);
  const [currentVisaIndex, setCurrentVisaIndex] = useState(0);
  const [selectedVisaTab, setSelectedVisaTab] = useState("post-study");

  const country = params?.country as string;
  const countryName = country ? countryNames[country.toLowerCase()] || country : "Australia";
  const stats = country 
    ? countryStats[country.toLowerCase()] || countryStats.australia 
    : countryStats.australia;

  // Employment trends chart data
  const employmentRateData = [
    { year: "2019", rate: 84 },
    { year: "2020", rate: 77 },
    { year: "2021", rate: 80 },
    { year: "2022", rate: 90 },
    { year: "2023", rate: 92 },
    { year: "2024", rate: 95 },
  ];

  const sectorGrowthData = [
    { sector: "IT", growth: 18 },
    { sector: "Healthcare", growth: 15 },
    { sector: "Engineering", growth: 12 },
    { sector: "Finance", growth: 10 },
    { sector: "Education", growth: 8 },
  ];

  const maxGrowth = Math.max(...sectorGrowthData.map(d => d.growth));

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
                  <path d="M13.3327 6.66634C13.3327 9.99501 9.64002 13.4617 8.40002 14.5323C8.2845 14.6192 8.14388 14.6662 7.99935 14.6662C7.85482 14.6662 7.7142 14.6192 7.59868 14.5323C6.35868 13.4617 2.66602 9.99501 2.66602 6.66634C2.66602 5.25185 3.22792 3.8953 4.22811 2.89511C5.22831 1.89491 6.58486 1.33301 7.99935 1.33301C9.41384 1.33301 10.7704 1.89491 11.7706 2.89511C12.7708 3.8953 13.3327 5.25185 13.3327 6.66634Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 8.66699C9.10457 8.66699 10 7.77156 10 6.66699C10 5.56242 9.10457 4.66699 8 4.66699C6.89543 4.66699 6 5.56242 6 6.66699C6 7.77156 6.89543 8.66699 8 8.66699Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="text-xs md:text-sm">{countryName}</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-[48px] font-bold text-white mb-3">
            Work & Job Opportunities in {countryName}
          </h1>
          <p className="text-[20px] text-white">
            Comprehensive guide to working while studying and post-graduation opportunities
          </p>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { value: stats.jobOpenings, label: "Annual Job Openings"},
              { value: stats.avgSalary, label: "Avg Graduate Salary"},
              { value: stats.growth, label: "Job Market Growth"},
              { value: stats.searchTime, label: "Avg Job Search Time"},
              { value: stats.costIncrease, label: "Cost Increase (YoY)"},
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

      {/* Graduate Employment Trends Section with Charts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[48px] font-semibold text-[#0A0A0A] mb-2 text-center">
            Graduate Employment Trends
          </h2>
          <p className="text-[#4A5565] text-[16px] mb-12 text-center">
            Track record of international graduate employment over the years
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Employment Rate Growth Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-[20px] font-bold text-center text-[#0A0A0A] mb-6">
                Employment Rate Growth
              </h3>
              <div className="w-full">
                <svg viewBox="0 0 500 300" className="w-full">
                  {/* Grid lines */}
                  {[240, 180, 120, 60].map((y, i) => (
                    <line key={i} x1="60" y1={y} x2="460" y2={y} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
                  ))}
                  
                  {/* Y-axis labels */}
                  <text x="35" y="245" fontSize="12" fill="#9ca3af">70</text>
                  <text x="35" y="185" fontSize="12" fill="#9ca3af">77</text>
                  <text x="35" y="125" fontSize="12" fill="#9ca3af">84</text>
                  <text x="35" y="65" fontSize="12" fill="#9ca3af">91</text>
                  <text x="35" y="35" fontSize="12" fill="#9ca3af">95</text>

                  {/* Line path */}
                  <path
                    d="M 80,110 L 140,160 L 200,140 L 260,65 L 320,55 L 380,40"
                    fill="none"
                    stroke="#0066cc"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points */}
                  {[
                    { x: 80, y: 110 },
                    { x: 140, y: 160 },
                    { x: 200, y: 140 },
                    { x: 260, y: 65 },
                    { x: 320, y: 55 },
                    { x: 380, y: 40 },
                  ].map((point, index) => (
                    <circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="5"
                      fill="#0066cc"
                      className="cursor-pointer"
                    />
                  ))}

                  {/* X-axis labels */}
                  {employmentRateData.map((item, index) => (
                    <text
                      key={index}
                      x={60 + index * 64}
                      y="265"
                      fontSize="12"
                      fill="#9ca3af"
                      textAnchor="middle"
                    >
                      {item.year}
                    </text>
                  ))}
                </svg>
                <div className="flex justify-center items-center gap-2 mt-4">
                  <div className="w-4 h-1 bg-[#0066cc]"></div>
                  <span className="text-sm text-gray-600">Employment Rate %</span>
                </div>
              </div>
            </div>

            {/* Sector-wise Job Growth Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-[20px] text-center font-bold text-[#0A0A0A] mb-6">
                Sector-wise Job Growth
              </h3>
              <div className="w-full">
                <svg viewBox="0 0 500 300" className="w-full">
                  {/* Grid lines */}
                  {[240, 180, 120, 60].map((y, i) => (
                    <line key={i} x1="80" y1={y} x2="460" y2={y} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
                  ))}

                  {/* Y-axis labels */}
                  <text x="55" y="245" fontSize="12" fill="#9ca3af">0</text>
                  <text x="55" y="185" fontSize="12" fill="#9ca3af">5</text>
                  <text x="50" y="125" fontSize="12" fill="#9ca3af">10</text>
                  <text x="50" y="65" fontSize="12" fill="#9ca3af">15</text>
                  <text x="50" y="35" fontSize="12" fill="#9ca3af">20</text>

                  {/* Bars */}
                  {sectorGrowthData.map((item, index) => {
                    const barHeight = (item.growth / maxGrowth) * 180;
                    const x = 100 + index * 70;
                    const y = 240 - barHeight;
                    
                    return (
                      <g key={index}>
                        <rect
                          x={x}
                          y={y}
                          width="50"
                          height={barHeight}
                          fill="#0066cc"
                          rx="4"
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                        />
                        <text
                          x={x + 25}
                          y="265"
                          fontSize="12"
                          fill="#4b5563"
                          textAnchor="middle"
                        >
                          {item.sector}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Rights for International Students - Carousel */}
        <section className="py-20 px-2 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
            <div className="inline-block px-5 py-2 mb-4 text-sm rounded-full bg-[#1717170D] text-[#404040]">
                Work Rights
            </div>
            <h2 className="text-[48px] font-bold text-[#0A0A0A] mb-3">
                Work Rights for International Students
            </h2>
            </div>

            <div className="relative">
            <div className="overflow-hidden">
                <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentWorkRightIndex * 100}%)` }}
                >
                {workRightsData.map((item, idx) => (
                    <div 
                    key={idx} 
                    className="border-2 border-[#0000001A] rounded-3xl p-8 bg-white transition relative overflow-hidden w-full md:w-1/3 flex-shrink-0 px-3 m-3 max-w-100"
                    >
                    <div className="absolute w-[372.61px] h-[443.31px] -right-8 -bottom-8 opacity-100 blur-64 rounded-[3.30382e+07px]">
                        <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-[#A1A1A1] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
                    </div>
                    <div className={`absolute left-0 top-0 h-[4px] bg-[#0A0A0A] z-50 w-full`}></div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 40V8C32 6.93913 31.5786 5.92172 30.8284 5.17157C30.0783 4.42143 29.0609 4 28 4H20C18.9391 4 17.9217 4.42143 17.1716 5.17157C16.4214 5.92172 16 6.93913 16 8V40" stroke="#003975" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M40 12H8C5.79086 12 4 13.7909 4 16V36C4 38.2091 5.79086 40 8 40H40C42.2091 40 44 38.2091 44 36V16C44 13.7909 42.2091 12 40 12Z" stroke="#003975" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h3 className="text-[24px] font-bold text-[#0A0A0A] mb-6">
                        {item.title}
                    </h3>
                    <p className="text-[30px] font-bold text-[#0066CC] mb-10">
                        {item.duration}
                    </p>
                    <p className="text-[16px] text-[#4A5565] mb-6">
                        {item.subtitle}
                    </p>
                    <div className="space-y-3 text-sm border-t-2 border-[#E5E5E5] pt-6">
                        <div className="flex items-center gap-2 text-[#364153]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.5 8.33322C2.49994 8.09078 2.55278 7.85124 2.65482 7.63132C2.75687 7.4114 2.90566 7.21639 3.09083 7.05989L8.92417 2.06073C9.22499 1.80648 9.60613 1.66699 10 1.66699C10.3939 1.66699 10.775 1.80648 11.0758 2.06073L16.9092 7.05989C17.0943 7.21639 17.2431 7.4114 17.3452 7.63132C17.4472 7.85124 17.5001 8.09078 17.5 8.33322V15.8332C17.5 16.2753 17.3244 16.6992 17.0118 17.0117C16.6993 17.3243 16.2754 17.4999 15.8333 17.4999H4.16667C3.72464 17.4999 3.30072 17.3243 2.98816 17.0117C2.67559 16.6992 2.5 16.2753 2.5 15.8332V8.33322Z" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-normal">Work Rights</span>
                        </div>
                        <p className="text-[#0A0A0A] font-bold text-[16px] pb-3 border-b-2 border-[#E5E5E5]">{item.workRights}</p>
                        
                        <div className="flex items-center gap-2 mt-4 text-[#364153]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.5 8.33322C2.49994 8.09078 2.55278 7.85124 2.65482 7.63132C2.75687 7.4114 2.90566 7.21639 3.09083 7.05989L8.92417 2.06073C9.22499 1.80648 9.60613 1.66699 10 1.66699C10.3939 1.66699 10.775 1.80648 11.0758 2.06073L16.9092 7.05989C17.0943 7.21639 17.2431 7.4114 17.3452 7.63132C17.4472 7.85124 17.5001 8.09078 17.5 8.33322V15.8332C17.5 16.2753 17.3244 16.6992 17.0118 17.0117C16.6993 17.3243 16.2754 17.4999 15.8333 17.4999H4.16667C3.72464 17.4999 3.30072 17.3243 2.98816 17.0117C2.67559 16.6992 2.5 16.2753 2.5 15.8332V8.33322Z" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-normal">Avg Hourly Rate</span>
                        </div>
                        <p className="text-[#0A0A0A] font-bold text-[16px] pb-3 border-b-2 border-[#E5E5E5]">{item.hourlyRate}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
                <button 
                onClick={() => setCurrentWorkRightIndex(Math.max(0, currentWorkRightIndex - 1))}
                disabled={currentWorkRightIndex === 0}
                className={`w-12 h-12 rounded-full border border-slate-300 transition flex items-center justify-center ${
                    currentWorkRightIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-slate-100"
                }`}
                >
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 8.00001C0 8.11675 0.0238582 8.22582 0.0715747 8.3272C0.119291 8.42859 0.190866 8.52229 0.286299 8.6083L8.39469 15.7512C8.57873 15.9171 8.80027 16 9.0593 16C9.23654 16 9.39503 15.9631 9.53477 15.8894C9.67451 15.8157 9.78698 15.7159 9.87219 15.5899C9.9574 15.464 10 15.3211 10 15.1614C10 14.934 9.90798 14.7343 9.72393 14.5622L2.28016 8.00001L9.72393 1.43779C9.90798 1.26575 10 1.06605 10 0.838711C10 0.678957 9.9574 0.536099 9.87219 0.410139C9.78698 0.284179 9.67451 0.184332 9.53477 0.1106C9.39503 0.0368666 9.23654 0 9.0593 0C8.80027 0 8.57873 0.0798772 8.39469 0.239631L0.286299 7.39171C0.190866 7.47774 0.119291 7.57144 0.0715747 7.67282C0.0238582 7.77421 0 7.88327 0 8.00001Z" fill="black" fillOpacity="0.8"/>
                </svg>
                </button>
                <button 
                onClick={() => setCurrentWorkRightIndex(Math.min(workRightsData.length - 3, currentWorkRightIndex + 1))}
                disabled={currentWorkRightIndex >= workRightsData.length - 3}
                className={`w-12 h-12 rounded-full border border-slate-300 transition flex items-center justify-center ${
                    currentWorkRightIndex >= workRightsData.length - 3
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-slate-100"
                }`}
                >
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8.00001C10 7.88327 9.97444 7.77421 9.92332 7.67282C9.87219 7.57144 9.79891 7.47774 9.70348 7.39171L1.60531 0.239631C1.42127 0.0798772 1.19632 0 0.930471 0C0.760054 0 0.603272 0.0368666 0.460123 0.1106C0.316973 0.184332 0.204499 0.284179 0.1227 0.410139C0.0409 0.536099 0 0.678957 0 0.838711C0 1.06605 0.0886162 1.26575 0.265848 1.43779L7.70961 8.00001L0.265848 14.5622C0.0886162 14.7343 0 14.934 0 15.1614C0 15.3211 0.0409 15.464 0.1227 15.5899C0.204499 15.7159 0.316973 15.8157 0.460123 15.8894C0.603272 15.9631 0.760054 16 0.930471 16C1.19632 16 1.42127 15.9171 1.60531 15.7512L9.70348 8.6083C9.79891 8.52229 9.87219 8.42859 9.92332 8.3272C9.97444 8.22582 10 8.11675 10 8.00001Z" fill="black" fillOpacity="0.8"/>
                </svg>
                </button>
            </div>
            </div>
        </div>
        </section>

      {/* Post-Study Work Visa Options - Carousel */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-[#0A0A0A] mb-8">
                    Post-Study Work Visa Options
                </h2>
                <p className="text-slate-600 text-[16px]">
                    Multiple pathways to work and settle in {countryName}
                </p>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-[#ecedf2] rounded-full p-1 mb-20">
                <button
                    onClick={() => {
                    setSelectedVisaTab("post-study");
                    setCurrentVisaIndex(0);
                    }}
                    className={`whitespace-nowrap px-2 py-1 text-[14px] rounded-full font-semibold transition text-center ${
                    currentVisaIndex === 0
                        ? "bg-white text-slate-900 shadow-sm"
                        : "bg-transparent text-slate-700 hover:text-slate-900"
                    }`}
                >
                    Post-study work
                </button>
                <button
                    onClick={() => {
                    setSelectedVisaTab("skilled");
                    setCurrentVisaIndex(1);
                    }}
                    className={`whitespace-nowrap px-2 py-1 text-[14px] rounded-full font-semibold transition text-center ${
                    currentVisaIndex === 1
                        ? "bg-white text-slate-900 shadow-sm"
                        : "bg-transparent text-slate-700 hover:text-slate-900"
                    }`}
                >
                    Skilled Migration
                </button>
                <button
                    onClick={() => {
                    setSelectedVisaTab("sponsored");
                    setCurrentVisaIndex(2);
                    }}
                    className={`whitespace-nowrap px-2 py-1 text-[14px] rounded-full font-semibold transition text-center ${
                    currentVisaIndex === 2
                        ? "bg-white text-slate-900 shadow-sm"
                        : "bg-transparent text-slate-700 hover:text-slate-900"
                    }`}
                >
                    Employee Sponsored
                </button>
            </div>

            <div className="relative">
            <div className="grid grid-cols-6 md:grid-cols-12 gap-8">
                {/* Left Card - Visa Details */}
                <div className="relative col-span-4 mr-7">
                    <div className="relative bg-white rounded-3xl p-8 border border-gray-200 overflow-hidden z-20">
                        <div className="absolute w-[372.61px] h-[443.31px] -right-20 -bottom-20 opacity-10 blur-64 rounded-[3.30382e+07px]">
                            <div className="absolute -bottom-1 -right-1 w-50 h-50 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
                        </div>
                        <h3 className="text-[22px] font-bold text-slate-900 mb-6 border-b-2 border-[#E5E5E5] pb-5">
                            {visaOptions[currentVisaIndex].title}
                        </h3>
                        
                        <div className="space-y-6 mb-6 z-50 bg-white">
                            <div className="flex flex-col items-start gap-1">
                                <div className="flex gap-2">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M2.5 8.33322C2.49994 8.09078 2.55278 7.85124 2.65482 7.63132C2.75687 7.4114 2.90566 7.21639 3.09083 7.05989L8.92417 2.06073C9.22499 1.80648 9.60613 1.66699 10 1.66699C10.3939 1.66699 10.775 1.80648 11.0758 2.06073L16.9092 7.05989C17.0943 7.21639 17.2431 7.4114 17.3452 7.63132C17.4472 7.85124 17.5001 8.09078 17.5 8.33322V15.8332C17.5 16.2753 17.3244 16.6992 17.0118 17.0117C16.6993 17.3243 16.2754 17.4999 15.8333 17.4999H4.16667C3.72464 17.4999 3.30072 17.3243 2.98816 17.0117C2.67559 16.6992 2.5 16.2753 2.5 15.8332V8.33322Z" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="text-sm text-[#364153] mb-1">Duration</p>
                                </div>
                                <div>
                                    <p className="font-bold text-[#0A0A0A]">{visaOptions[currentVisaIndex].duration}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-1">
                                <div className="flex gap-2">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M2.5 8.33322C2.49994 8.09078 2.55278 7.85124 2.65482 7.63132C2.75687 7.4114 2.90566 7.21639 3.09083 7.05989L8.92417 2.06073C9.22499 1.80648 9.60613 1.66699 10 1.66699C10.3939 1.66699 10.775 1.80648 11.0758 2.06073L16.9092 7.05989C17.0943 7.21639 17.2431 7.4114 17.3452 7.63132C17.4472 7.85124 17.5001 8.09078 17.5 8.33322V15.8332C17.5 16.2753 17.3244 16.6992 17.0118 17.0117C16.6993 17.3243 16.2754 17.4999 15.8333 17.4999H4.16667C3.72464 17.4999 3.30072 17.3243 2.98816 17.0117C2.67559 16.6992 2.5 16.2753 2.5 15.8332V8.33322Z" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="text-sm text-[#364153] mb-1">Eligibility</p>
                                </div>
                                <div>
                                    <p className="font-bold text-[#0A0A0A]">{visaOptions[currentVisaIndex].eligibility}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-1">
                                <div className="flex gap-2">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M2.5 8.33322C2.49994 8.09078 2.55278 7.85124 2.65482 7.63132C2.75687 7.4114 2.90566 7.21639 3.09083 7.05989L8.92417 2.06073C9.22499 1.80648 9.60613 1.66699 10 1.66699C10.3939 1.66699 10.775 1.80648 11.0758 2.06073L16.9092 7.05989C17.0943 7.21639 17.2431 7.4114 17.3452 7.63132C17.4472 7.85124 17.5001 8.09078 17.5 8.33322V15.8332C17.5 16.2753 17.3244 16.6992 17.0118 17.0117C16.6993 17.3243 16.2754 17.4999 15.8333 17.4999H4.16667C3.72464 17.4999 3.30072 17.3243 2.98816 17.0117C2.67559 16.6992 2.5 16.2753 2.5 15.8332V8.33322Z" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="text-sm text-[#364153] mb-1">Work Rights</p>
                                </div>
                                <div>
                                    <p className="font-bold text-[#0A0A0A]">{visaOptions[currentVisaIndex].workRights}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-1">
                                <div className="flex gap-2">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M2.5 8.33322C2.49994 8.09078 2.55278 7.85124 2.65482 7.63132C2.75687 7.4114 2.90566 7.21639 3.09083 7.05989L8.92417 2.06073C9.22499 1.80648 9.60613 1.66699 10 1.66699C10.3939 1.66699 10.775 1.80648 11.0758 2.06073L16.9092 7.05989C17.0943 7.21639 17.2431 7.4114 17.3452 7.63132C17.4472 7.85124 17.5001 8.09078 17.5 8.33322V15.8332C17.5 16.2753 17.3244 16.6992 17.0118 17.0117C16.6993 17.3243 16.2754 17.4999 15.8333 17.4999H4.16667C3.72464 17.4999 3.30072 17.3243 2.98816 17.0117C2.67559 16.6992 2.5 16.2753 2.5 15.8332V8.33322Z" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="text-sm text-[#364153] mb-1">Path to PR</p>
                                </div>
                                <div>
                                    <p className={`font-normal inline-block px-3 py-1 rounded-full text-[11px] ${
                                        visaOptions[currentVisaIndex].pathToPR === "High" 
                                        ? "bg-[#00C8531A] text-[#00C853]" 
                                        : visaOptions[currentVisaIndex].pathToPR === "Medium"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-blue-100 text-blue-700"
                                        }`}>
                                        {visaOptions[currentVisaIndex].pathToPR}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Arrow connector */}
                    <div className="absolute left-12 top-12 transform -translate-y-1/2 hidden md:flex items-center z-10">
                        <div className="w-80 h-[3px] bg-[#FCCEE8]"></div>
                        <div className="w-24 h-24 rounded-3xl border-3 bg-white border-[#E5E5E5] flex items-center justify-center">
                            <div className="bg-black w-15 h-15 rounded-2xl flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.16699 10H15.8337" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 4.16699L15.8333 10.0003L10 15.8337" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>  
                </div>

                {/* Right Card - Key Requirements */}
                <div className="bg-white rounded-3xl px-8 py-6 shadow-sm border border-gray-200  col-span-8 self-start ml-10 mt-12 relative overflow-hidden">
                    <div className="absolute w-[372.61px] h-[443.31px] -right-20 -bottom-20 opacity-10 blur-64 rounded-[3.30382e+07px]">
                        <div className="absolute -bottom-1 -right-1 w-50 h-50 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
                    </div>
                    <h3 className="text-[22px] font-bold text-slate-900 mb-6 border-b-2 border-[#E5E5E5] pb-3">
                        Key Requirements
                    </h3>
                    
                    <div className="space-y-2">
                        {visaOptions[currentVisaIndex].requirements.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 flex-shrink-0">
                            <path d="M16.6667 5L7.50002 14.1667L3.33335 10" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="text-[#364153] text-[16px]">{req}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-end gap-3 mt-8">
                <button 
                onClick={() => setCurrentVisaIndex(Math.max(0, currentVisaIndex - 1))}
                disabled={currentVisaIndex === 0}
                className={`w-12 h-12 rounded-full border border-slate-300 transition flex items-center justify-center ${
                    currentVisaIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-slate-100"
                }`}
                >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </button>
                <button 
                onClick={() => setCurrentVisaIndex(Math.min(2, currentVisaIndex + 1))}
                disabled={currentVisaIndex === 2}
                className={`w-12 h-12 rounded-full border border-slate-300 transition flex items-center justify-center ${
                    currentVisaIndex === 2
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-slate-100"
                }`}
                >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </button>
            </div>
            </div>
        </div>
        </section>

      {/* Top Graduate Employers & Regional Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Top Employers */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 col-span-7">
              <h2 className="text-[30px] font-bold text-[#0A0A0A] mb-10">
                Top Graduate Employers
              </h2>
              <div className="space-y-4">
                {topEmployers.map((employer, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                    <div>
                      <h3 className="font-bold text-[20px] text-[#0A0A0A]">{employer.name}</h3>
                      <p className="text-[14px] text-[#4A5565]">Roles: {employer.roles}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[24px] font-bold text-[#003975]">{employer.positions}</p>
                      <p className="text-[12px] text-[#6A7282]">Positions/year</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Benefits */}
            <div className="bg-[#f8fbff] rounded-3xl p-8 col-span-5">
              <h2 className="text-[30px] font-bold text-[#0A0A0A] mb-8">
                Regional Australia Benefits
              </h2>
              
              <div className="relative rounded-3xl p-6 mb-6 bg-gray-50 overflow-hidden border-b-2 border-r-2 border-l-2 border-[#0000001A]">
                <div className="absolute w-[372.61px] h-[443.31px] -right-8 -bottom-8 opacity-100 blur-64 rounded-[3.30382e+07px]">
                    <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-[#A1A1A1] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
                </div>
                <div className={`absolute left-0 top-0 h-[4px] bg-[#0A0A0A] z-50 w-full z-10`}></div>
                <h3 className="text-[24px] font-bold text-[#0A0A0A] mb-6">
                  Extra Incentives for Regional Areas
                </h3>
                
                <div className="space-y-3 mb-6">
                    <h3 className="text-[16px] font-bold text-[#0A0A0A] mb-3">
                        Benefits
                    </h3>
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.8973 10.7412L14.1598 17.8462C14.1739 17.9299 14.1622 18.0159 14.1261 18.0927C14.0901 18.1695 14.0315 18.2335 13.9581 18.276C13.8847 18.3186 13.8 18.3378 13.7155 18.331C13.6309 18.3241 13.5504 18.2917 13.4848 18.2379L10.5015 15.9987C10.3574 15.8911 10.1825 15.833 10.0027 15.833C9.82294 15.833 9.64798 15.8911 9.50396 15.9987L6.51563 18.237C6.45006 18.2907 6.36968 18.3232 6.28521 18.33C6.20073 18.3368 6.11619 18.3177 6.04285 18.2753C5.9695 18.2328 5.91086 18.169 5.87473 18.0923C5.83859 18.0157 5.8267 17.9298 5.84063 17.8462L7.10229 10.7412" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 11.667C12.7614 11.667 15 9.42842 15 6.66699C15 3.90557 12.7614 1.66699 10 1.66699C7.23858 1.66699 5 3.90557 5 6.66699C5 9.42842 7.23858 11.667 10 11.667Z" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                      <p className="font-normal text-[16px] text-[#0A0A0A]">Additional PR points</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.8973 10.7412L14.1598 17.8462C14.1739 17.9299 14.1622 18.0159 14.1261 18.0927C14.0901 18.1695 14.0315 18.2335 13.9581 18.276C13.8847 18.3186 13.8 18.3378 13.7155 18.331C13.6309 18.3241 13.5504 18.2917 13.4848 18.2379L10.5015 15.9987C10.3574 15.8911 10.1825 15.833 10.0027 15.833C9.82294 15.833 9.64798 15.8911 9.50396 15.9987L6.51563 18.237C6.45006 18.2907 6.36968 18.3232 6.28521 18.33C6.20073 18.3368 6.11619 18.3177 6.04285 18.2753C5.9695 18.2328 5.91086 18.169 5.87473 18.0923C5.83859 18.0157 5.8267 17.9298 5.84063 17.8462L7.10229 10.7412" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 11.667C12.7614 11.667 15 9.42842 15 6.66699C15 3.90557 12.7614 1.66699 10 1.66699C7.23858 1.66699 5 3.90557 5 6.66699C5 9.42842 7.23858 11.667 10 11.667Z" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                      <p className="font-normal text-[16px] text-[#0A0A0A]">Less competition</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.8973 10.7412L14.1598 17.8462C14.1739 17.9299 14.1622 18.0159 14.1261 18.0927C14.0901 18.1695 14.0315 18.2335 13.9581 18.276C13.8847 18.3186 13.8 18.3378 13.7155 18.331C13.6309 18.3241 13.5504 18.2917 13.4848 18.2379L10.5015 15.9987C10.3574 15.8911 10.1825 15.833 10.0027 15.833C9.82294 15.833 9.64798 15.8911 9.50396 15.9987L6.51563 18.237C6.45006 18.2907 6.36968 18.3232 6.28521 18.33C6.20073 18.3368 6.11619 18.3177 6.04285 18.2753C5.9695 18.2328 5.91086 18.169 5.87473 18.0923C5.83859 18.0157 5.8267 17.9298 5.84063 17.8462L7.10229 10.7412" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 11.667C12.7614 11.667 15 9.42842 15 6.66699C15 3.90557 12.7614 1.66699 10 1.66699C7.23858 1.66699 5 3.90557 5 6.66699C5 9.42842 7.23858 11.667 10 11.667Z" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                      <p className="font-normal text-[16px] text-[#0A0A0A]">Lower living costs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.8973 10.7412L14.1598 17.8462C14.1739 17.9299 14.1622 18.0159 14.1261 18.0927C14.0901 18.1695 14.0315 18.2335 13.9581 18.276C13.8847 18.3186 13.8 18.3378 13.7155 18.331C13.6309 18.3241 13.5504 18.2917 13.4848 18.2379L10.5015 15.9987C10.3574 15.8911 10.1825 15.833 10.0027 15.833C9.82294 15.833 9.64798 15.8911 9.50396 15.9987L6.51563 18.237C6.45006 18.2907 6.36968 18.3232 6.28521 18.33C6.20073 18.3368 6.11619 18.3177 6.04285 18.2753C5.9695 18.2328 5.91086 18.169 5.87473 18.0923C5.83859 18.0157 5.8267 17.9298 5.84063 17.8462L7.10229 10.7412" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 11.667C12.7614 11.667 15 9.42842 15 6.66699C15 3.90557 12.7614 1.66699 10 1.66699C7.23858 1.66699 5 3.90557 5 6.66699C5 9.42842 7.23858 11.667 10 11.667Z" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                      <p className="font-normal text-[16px] text-[#0A0A0A]">Extended PSW visa</p>
                    </div>
                  </div>
                </div>

                <div>
                    <p className="text-[14px] text-[#6A7282] mb-3">Popular Regional Cities:</p>
                    <div className="flex flex-wrap gap-2">
                    {["Perth", "Darwin", "Adelaide"].map((city, idx) => (
                        <span
                        key={idx}
                        className="px-2 py-1 text-[#0A0A0A] font-normal rounded-xl text-[12px] border-[1.5px] border-[#0000001A]"
                        >
                        {city}
                        </span>
                    ))}
                    </div>
                </div>
              </div>
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
            Ready to<br />
            Launch Your Career?
          </h2>
          <p className="text-[18px] text-[#4A5565] mb-10">
            Get expert guidance on job search strategies, resume building, and visa pathways
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