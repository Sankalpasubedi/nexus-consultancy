"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Scholarship {
  id: number;
  title: string;
  awardAmount: string;
  eligibility: string;
  applicationPeriod: string;
  department: string;
}

const scholarshipsByCountry: Record<string, Scholarship[]> = {
  australia: [
    {
      id: 1,
      title: "Research Training Program Scholarship Vicechancellor",
      awardAmount: "AUD 32,000/year + tuition",
      eligibility: "PhD and research masters students",
      applicationPeriod: "Rolling",
      department: "Government",
    },
    {
      id: 2,
      title: "Research Training Program Scholarship Vicechancellor",
      awardAmount: "AUD 32,000/year + tuition",
      eligibility: "PhD and research masters students",
      applicationPeriod: "Rolling",
      department: "Government",
    },
    {
      id: 3,
      title: "Research Training Program Scholarship Vicechancellor",
      awardAmount: "AUD 32,000/year + tuition",
      eligibility: "PhD and research masters students",
      applicationPeriod: "Rolling",
      department: "Government",
    },
    {
      id: 4,
      title: "Research Training Program Scholarship Vicechancellor",
      awardAmount: "AUD 32,000/year + tuition",
      eligibility: "PhD and research masters students",
      applicationPeriod: "Rolling",
      department: "Government",
    },
    {
      id: 5,
      title: "Research Training Program Scholarship Vicechancellor",
      awardAmount: "AUD 32,000/year + tuition",
      eligibility: "PhD and research masters students",
      applicationPeriod: "Rolling",
      department: "Government",
    },
    {
      id: 6,
      title: "Research Training Program Scholarship Vicechancellor",
      awardAmount: "AUD 32,000/year + tuition",
      eligibility: "PhD and research masters students",
      applicationPeriod: "Rolling",
      department: "Government",
    },
    {
      id: 7,
      title: "Industryy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 8,
      title: "Industryyy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 9,
      title: "Industryyy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 10,
      title: "Industryyy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 11,
      title: "Industryyy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 12,
      title: "Industryyy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 13,
      title: "Industryyy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
  ],
  "united-states": [
    {
      id: 1,
      title: "Fulbright Scholarship Program",
      awardAmount: "USD 25,000+ per year",
      eligibility: "US citizens and international students",
      applicationPeriod: "October - November",
      department: "Government",
    },
    {
      id: 2,
      title: "Merit-Based University Scholarships",
      awardAmount: "USD 10,000 - 50,000/year",
      eligibility: "High academic achievers",
      applicationPeriod: "Rolling",
      department: "University",
    },
    {
      id: 3,
      title: "STEM Research Fellowship",
      awardAmount: "USD 30,000/year + tuition",
      eligibility: "STEM graduate students",
      applicationPeriod: "December - February",
      department: "Government",
    },
    {
      id: 4,
      title: "International Graduate Assistantships",
      awardAmount: "Tuition waiver + stipend",
      eligibility: "Master's and PhD students",
      applicationPeriod: "Rolling",
      department: "University",
    },
    {
      id: 5,
      title: "Community-Based Scholarships",
      awardAmount: "USD 5,000 - 20,000",
      eligibility: "All international students",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 6,
      title: "Need-Based Financial Aid",
      awardAmount: "Variable amounts",
      eligibility: "Demonstrated financial need",
      applicationPeriod: "Rolling",
      department: "University",
    },
  ],
  "new-zealand": [
    {
      id: 1,
      title: "New Zealand Excellence Scholarship",
      awardAmount: "NZD 15,000 - 50,000",
      eligibility: "International students with merit",
      applicationPeriod: "Rolling",
      department: "Government",
    },
    {
      id: 2,
      title: "University Postgraduate Scholarship",
      awardAmount: "NZD 10,000/year + tuition",
      eligibility: "Master's and PhD students",
      applicationPeriod: "Rolling",
      department: "University",
    },
    {
      id: 3,
      title: "Health Research Council Scholarship",
      awardAmount: "NZD 20,000/year",
      eligibility: "Health and medical research students",
      applicationPeriod: "April - May",
      department: "Government",
    },
    {
      id: 4,
      title: "Pasifika Scholarship Program",
      awardAmount: "NZD 12,000 - 25,000",
      eligibility: "Pacific Island students",
      applicationPeriod: "Rolling",
      department: "Government",
    },
    {
      id: 5,
      title: "Vice-Chancellor Scholarship",
      awardAmount: "NZD 8,000 - 15,000",
      eligibility: "High-achieving international students",
      applicationPeriod: "Rolling",
      department: "University",
    },
    {
      id: 6,
      title: "Industry Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 7,
      title: "Industryy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 8,
      title: "Industryyy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 9,
      title: "Industryyy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 10,
      title: "Industryyy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 11,
      title: "Industryyy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 12,
      title: "Industryyy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
    {
      id: 13,
      title: "Industryyy Partnership Scholarships",
      awardAmount: "NZD 5,000 - 30,000",
      eligibility: "Students in partner industries",
      applicationPeriod: "Varies",
      department: "Private",
    },
  ],
};

const tips = [
  "Start your search early - some scholarships have deadlines a year in advance",
  "Read eligibility criteria carefully before applying",
  "Prepare strong academic transcripts and recommendation letters",
  "Write compelling personal statements highlighting your achievements",
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

export default function ScholarshipsDetail() {
  const params = useParams();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const country = params?.country as string;
  const countryName = country ? countryNames[country.toLowerCase()] || country : "this country";
  const scholarships = country 
    ? scholarshipsByCountry[country.toLowerCase()] || scholarshipsByCountry.australia 
    : [];

  const itemsPerPage = 6; // Show 6 items (2 rows of 3)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - itemsPerPage));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + itemsPerPage;
      return newIndex < scholarships.length ? newIndex : prev;
    });
  };

  const visibleScholarships = scholarships.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );
  const isNextDisabled = currentIndex + itemsPerPage >= scholarships.length;

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
          <h1 className="text-5xl md:text-[48px] font-bold text-white mb-3">
            Scholarships in {countryName}
          </h1>
          <p className="text-[20px] text-blue-100">
            Financial aid opportunities for international student
          </p>
        </div>
      </section>

      {/* Scholarships Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleScholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="border border-gray-200 rounded-3xl p-5 hover:shadow-2xl transition-all bg-white"
              >
                {/* Header with Icon and Badge */}
                <div className="flex items-start justify-end mb-1">
                  <span className="text-xs text-[#A1A1A1] bg-gray-50 px-3 py-1.5 rounded-3xl">
                    Government
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[24px] font-bold text-[#0A0A0A] mb-6 leading-snug flex flex-row">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.6496 17.0703L20.4752 27.3441C20.4957 27.4651 20.4787 27.5895 20.4266 27.7005C20.3744 27.8116 20.2896 27.9041 20.1835 27.9657C20.0774 28.0273 19.955 28.055 19.8327 28.0451C19.7104 28.0352 19.594 27.9883 19.4992 27.9105L15.1853 24.6727C14.977 24.5171 14.724 24.433 14.4641 24.433C14.2041 24.433 13.9511 24.5171 13.7429 24.6727L9.42174 27.9093C9.32693 27.9869 9.2107 28.0338 9.08855 28.0437C8.96641 28.0536 8.84415 28.026 8.7381 27.9646C8.63205 27.9032 8.54724 27.8109 8.495 27.7C8.44275 27.5892 8.42555 27.465 8.44569 27.3441L10.2701 17.0703" stroke="#003975" stroke-width="2.41" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.4605 18.4082C18.4535 18.4082 21.6905 15.1713 21.6905 11.1782C21.6905 7.18522 18.4535 3.94824 14.4605 3.94824C10.4675 3.94824 7.23047 7.18522 7.23047 11.1782C7.23047 15.1713 10.4675 18.4082 14.4605 18.4082Z" stroke="#003975" stroke-width="2.41" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  {scholarship.title}
                </h3>

                {/* Award Amount */}
                <div className="mb-6">
                  <p className="text-[14px] text-[#A1A1A1] mb-2">Award Amount</p>
                  <p className="text-xl font-bold text-[#003975]">
                    {scholarship.awardAmount}
                  </p>
                </div>

                {/* Eligibility */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5341 6.66666C14.8385 8.16086 14.6215 9.71428 13.9193 11.0679C13.2171 12.4214 12.072 13.4934 10.6751 14.1049C9.27816 14.7164 7.71382 14.8305 6.24293 14.4282C4.77205 14.026 3.48353 13.1316 2.59225 11.8943C1.70097 10.657 1.26081 9.15148 1.34518 7.62892C1.42954 6.10635 2.03332 4.65872 3.05583 3.52744C4.07835 2.39616 5.45779 1.64961 6.96411 1.4123C8.47043 1.17498 10.0126 1.46123 11.3334 2.22333" stroke="#A1A1A1" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 7.33366L8 9.33366L14.6667 2.66699" stroke="#A1A1A1" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p className="text-xs text-[#A1A1A1]">Eligibility</p>
                  </div>
                  <p className="text-sm text-[#525252]">
                    {scholarship.eligibility}
                  </p>
                </div>

                {/* Application Period */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.33301 1.33301V3.99967" stroke="#A1A1A1" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.667 1.33301V3.99967" stroke="#A1A1A1" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.6667 2.66699H3.33333C2.59695 2.66699 2 3.26395 2 4.00033V13.3337C2 14.07 2.59695 14.667 3.33333 14.667H12.6667C13.403 14.667 14 14.07 14 13.3337V4.00033C14 3.26395 13.403 2.66699 12.6667 2.66699Z" stroke="#A1A1A1" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 6.66699H14" stroke="#A1A1A1" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p className="text-xs text-[#A1A1A1]">Application Period</p>
                  </div>
                  <p className="text-sm text-[#525252]">
                    {scholarship.applicationPeriod}
                  </p>
                </div>

                {/* Button */}
                <button className="w-full bg-[#003975] hover:bg-[#002855] cursor-pointer text-white font-semibold py-3.5 px-6 rounded-full transition-all flex items-center justify-center gap-2 group">
                  Check Eligibility
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16699 10H15.8337" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 4.16699L15.8333 10.0003L10 15.8337" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Carousel Navigation */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-12 h-12 rounded-full border border-gray-200 transition flex items-center justify-center ${
                currentIndex === 0
                  ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              aria-label="Previous page"
            >
              <svg
                className="w-5 h-5"
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
              disabled={isNextDisabled}
              className={`w-12 h-12 rounded-full border border-gray-200 transition flex items-center justify-center ${
                isNextDisabled
                  ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              aria-label="Next page"
            >
              <svg
                className="w-5 h-5"
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
      </section>

      {/* Tips Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8fbff]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full mb-4">
              Scholarship Tips
            </span>
            <h2 className="text-3xl md:text-[16px] text-gray-900">
              All the things you must know about <span className="font-bold">Scholarships</span>
            </h2>
          </div>

          {/* Tips List */}
          <div className="space-y-12">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex gap-9  items-center">
                <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 7H22V13" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <p className="text-[#0A0A0A] text-[32px] pt-2 leading-8.75">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fdfdfd] relative overflow-hidden">

        <div className="absolute w-[372.61px] h-[443.31px] -bottom-60 left-90 opacity-15 blur-64 rounded-[3.30382e+07px]">
          <div className="absolute top-8 right-1 w-60 h-60 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
          <div className="absolute top-10 right-10 w-60 h-60 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
          <div className="absolute top-15 right-15 w-60 h-60 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
          <div className="absolute bottom-4 right-2 w-24 h-28 bg-[#155DFC] blur-3xl rounded-full transform -rotate-30"></div>
          <div className="absolute top-16 right-8 w-20 h-16 bg-[#155DFC] blur-2xl rounded-full transform rotate-30 opacity-20"></div>
        </div>

        <div className="absolute w-[372.61px] h-[443.31px] -bottom-40 right-20 opacity-25 blur-64 rounded-[3.30382e+07px]">
          <div className="absolute top-8 right-1 w-60 h-60 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
          <div className="absolute top-10 right-10 w-60 h-60 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
          <div className="absolute top-15 right-15 w-60 h-60 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
          <div className="absolute bottom-4 right-2 w-24 h-28 bg-[#155DFC] blur-3xl rounded-full transform -rotate-30"></div>
          <div className="absolute top-16 right-8 w-20 h-16 bg-[#155DFC] blur-2xl rounded-full transform rotate-30 opacity-20"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Need Help with<br />
            Scholarship Applications??
          </h2>
          <p className="text-[18px] text-gray-600 mb-10 max-w-6xl mx-auto">
            Our counsellors can help you identify and apply for suitable scholarship
          </p>
          <button className="bg-black hover:bg-gray-800 text-white text-[18px] py-4 px-12 rounded-full transition-all flex items-center gap-12 mx-auto group">
            Book Counselling
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.16699 10H15.8337" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 4.16699L15.8333 10.0003L10 15.8337" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}