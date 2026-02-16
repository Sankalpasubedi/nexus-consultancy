"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const countryStats: Record<string, { accommodation: number; avgCost: string; food: number; travel: number; costIncrease: string; currency: string }> = {
  australia: {
    accommodation: 65,
    avgCost: "AUD 2,000",
    food: 20,
    travel: 10,
    costIncrease: "+3.5%",
    currency: "AUD",
  },
  "united-states": {
    accommodation: 60,
    avgCost: "USD 1,800",
    food: 22,
    travel: 13,
    costIncrease: "+2.8%",
    currency: "USD",
  },
  "new-zealand": {
    accommodation: 60,
    avgCost: "NZD 1,900",
    food: 20,
    travel: 12,
    costIncrease: "+3.0%",
    currency: "NZD",
  },
  canada: {
    accommodation: 55,
    avgCost: "CAD 1,800",
    food: 22,
    travel: 15,
    costIncrease: "+2.5%",
    currency: "CAD",
  },
  "united-kingdom": {
    accommodation: 70,
    avgCost: "GBP 1,500",
    food: 18,
    travel: 12,
    costIncrease: "+4.0%",
    currency: "GBP",
  },
};

const cities = [
  { name: "Sydney", rent: "1,200 - 2,000", food: "1,200 - 2,000", transport: "1,200 - 2,000", total: "1,750 - 2,850" },
  { name: "Melbourne", rent: "1,000 - 1,800", food: "1,000 - 1,800", transport: "800 - 1,500", total: "1,600 - 2,500" },
  { name: "Brisbane", rent: "900 - 1,600", food: "900 - 1,600", transport: "600 - 1,200", total: "1,400 - 2,300" },
  { name: "Perth", rent: "900 - 1,600", food: "900 - 1,600", transport: "600 - 1,200", total: "1,400 - 2,300" },
  { name: "Adelaide", rent: "800 - 1,500", food: "800 - 1,500", transport: "500 - 1,000", total: "1,200 - 2,100" },
  { name: "Canberra", rent: "1,000 - 1,800", food: "1,000 - 1,800", transport: "700 - 1,300", total: "1,500 - 2,400" },
  { name: "Gold Coast", rent: "1,000 - 1,800", food: "1,000 - 1,800", transport: "700 - 1,300", total: "1,500 - 2,400" },
  { name: "Hobart", rent: "1,000 - 1,800", food: "1,000 - 1,800", transport: "700 - 1,300", total: "1,500 - 2,400" },
  { name: "Darwin", rent: "1,000 - 1,800", food: "1,000 - 1,800", transport: "700 - 1,300", total: "1,500 - 2,400" },
  { name: "Darwin", rent: "1,000 - 1,800", food: "1,000 - 1,800", transport: "700 - 1,300", total: "1,500 - 2,400" },
];

const budgetOptions = [
  {
    name: "Budget Student",
    range: "AUD 1,750 - 2,850",
    description: "Shared accommodation, home cooking, minimal entertainment",
    includes: ["Shared apartment", "Cook at home", "Public transport", "Student discounts"],
  },
  {
    name: "Moderate Student",
    range: "AUD 1,750 - 2,850",
    description: "Shared apartment, balanced lifestyle, regular activities",
    includes: ["Private room or studio", "Regular dining out", "Occasional rideshare", "Frequent entertainment"],
  },
  {
    name: "Comfortable Student",
    range: "AUD 1,750 - 2,850",
    description: "Private accommodation, flexible lifestyle, frequent activities",
    includes: ["Private room or studio", "Regular dining out", "Occasional rideshare", "Frequent entertainment"],
  },
];

const additionalExpenses = [
  { icon: "🏥", title: "Health Insurance", cost: "AUD 500-1000/year" },
  { icon: "💪", title: "Gym Membership", cost: "AUD 500-1000/year" },
  { icon: "📚", title: "Course Materials", cost: "AUD 500-1000/year" },
  { icon: "📱", title: "Phone & Internet", cost: "AUD 500-1000/year" },
  { icon: "💇", title: "Personal Care", cost: "AUD 500-1000/year" },
  { icon: "👕", title: "Clothing", cost: "AUD 500-1000/year" },
];

const budgetTips = [
  "Share accommodation with other students to reduce rent",
  "Cook at home instead of eating out regularly",
  "Use student discounts for transport and entertainment",
  "Buy second-hand textbooks or use library resources",
];

const globalComparison = [
  { category: "Rent", sydney: 85, london: 100, nyc: 120, toronto: 80 },
  { category: "Food", sydney: 75, london: 90, nyc: 110, toronto: 75 },
  { category: "Transport", sydney: 50, london: 70, nyc: 80, toronto: 65 },
  { category: "Entertainment", sydney: 60, london: 75, nyc: 100, toronto: 70 },
];

export default function LivingCostDetail() {
  const params = useParams();
  const router = useRouter();
  const [currentCityIndex, setCurrentCityIndex] = useState(0);

  const country = params?.country as string;
  const countryName = country ? countryNames[country.toLowerCase()] || country : "this country";
  const stats = country 
    ? countryStats[country.toLowerCase()] || countryStats.australia 
    : countryStats.australia;

  // City carousel logic
  const itemsPerPage = 9;
  const handleCityPrev = () => {
    setCurrentCityIndex((prev) => Math.max(0, prev - itemsPerPage));
    setTimeout(() => {
      const detailedCitySection = document.querySelector('.detailed-city-section');
      if (detailedCitySection) {
        detailedCitySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };
  const handleCityNext = () => {
    setCurrentCityIndex((prev) => {
      const newIndex = prev + itemsPerPage;
      return newIndex < cities.length ? newIndex : prev;
    });
    setTimeout(() => {
      const detailedCitySection = document.querySelector('.detailed-city-section');
      if (detailedCitySection) {
        detailedCitySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };
  const visibleCities = cities.slice(currentCityIndex, currentCityIndex + itemsPerPage);
  const isCityNextDisabled = currentCityIndex + itemsPerPage >= cities.length;
  const isCityPrevDisabled = currentCityIndex === 0;

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
            Living Cost in {countryName}
          </h1>
          <p className="text-[20px] text-[#4A5565]">
            Monthly expenses organized by city in {stats.currency}
          </p>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { value: `~${stats.accommodation}%`, label: "Accommodation" },
              { value: stats.avgCost, label: "Avg Monthly Cost" },
              { value: `~${stats.food}%`, label: "Food & Dining" },
              { value: `~${stats.travel}%`, label: "Travel" },
              { value: stats.costIncrease, label: "Cost Increase (YoY)" },
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

      {/* City Breakdown Section with Carousel */}
      <section className="detailed-city-section py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-4">
              Living Expenses
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Detailed City Breakdown
            </h2>
            <p className="text-gray-600 text-lg">
              Compare monthly living expenses across major cities in {countryName}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visibleCities.map((city, idx) => (
              <div 
                key={idx} 
                className="border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all bg-white relative overflow-hidden"
              >
                <div className={`absolute left-0 top-0 h-[4px] bg-[#0A0A0A] z-50 w-full`}></div>
                <div className="absolute w-[272.61px] h-[343.31px] right-1 bottom-1 opacity-50 blur-64 rounded-[3.30382e+07px]">
                  <div className="absolute -bottom-20 -right-20 w-30 h-30 bg-[#A1A1A1] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
                </div>

                <div className="mb-6 pb-4">
                  <h3 className="text-[24px] text-center font-bold text-[#0A0A0A]">
                    {city.name}
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center pb-3 border-b-2 border-gray-200">
                    <div className="flex items-center gap-3 w-[50%]">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.5 8.33322C2.49994 8.09078 2.55278 7.85124 2.65482 7.63132C2.75687 7.4114 2.90566 7.21639 3.09083 7.05989L8.92417 2.06073C9.22499 1.80648 9.60613 1.66699 10 1.66699C10.3939 1.66699 10.775 1.80648 11.0758 2.06073L16.9092 7.05989C17.0943 7.21639 17.2431 7.4114 17.3452 7.63132C17.4472 7.85124 17.5001 8.09078 17.5 8.33322V15.8332C17.5 16.2753 17.3244 16.6992 17.0118 17.0117C16.6993 17.3243 16.2754 17.4999 15.8333 17.4999H4.16667C3.72464 17.4999 3.30072 17.3243 2.98816 17.0117C2.67559 16.6992 2.5 16.2753 2.5 15.8332V8.33322Z" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-gray-600 text-sm">Rent</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {stats.currency} {city.rent}
                    </span>
                  </div>

                  <div className="flex items-center pb-3 border-b-2 border-gray-200">
                    <div className="flex items-center gap-3 w-[50%]">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.66634 18.3337C7.12658 18.3337 7.49967 17.9606 7.49967 17.5003C7.49967 17.0401 7.12658 16.667 6.66634 16.667C6.2061 16.667 5.83301 17.0401 5.83301 17.5003C5.83301 17.9606 6.2061 18.3337 6.66634 18.3337Z" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.8333 18.3337C16.2936 18.3337 16.6667 17.9606 16.6667 17.5003C16.6667 17.0401 16.2936 16.667 15.8333 16.667C15.3731 16.667 15 17.0401 15 17.5003C15 17.9606 15.3731 18.3337 15.8333 18.3337Z" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.70801 1.70801H3.37467L5.59134 12.058C5.67266 12.4371 5.88357 12.7759 6.18777 13.0162C6.49197 13.2565 6.87043 13.3833 7.25801 13.3747H15.408C15.7873 13.3741 16.1551 13.2441 16.4505 13.0062C16.746 12.7683 16.9515 12.4368 17.033 12.0663L18.408 5.87467H4.26634" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-gray-600 text-sm">Food</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {stats.currency} {city.food}
                    </span>
                  </div>

                  <div className="flex items-center pb-3 border-b-2 border-gray-200">
                    <div className="flex items-center gap-3 w-[50%]">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.66699 5V10" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12.5 5V10" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.66699 10H18.0003" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.0003 15H17.5003C17.5003 15 17.917 13.5833 18.167 12.6667C18.2503 12.3333 18.3337 12 18.3337 11.6667C18.3337 11.3333 18.2503 11 18.167 10.6667L17.0003 6.5C16.7503 5.66667 15.917 5 15.0003 5H3.33366C2.89163 5 2.46771 5.17559 2.15515 5.48816C1.84259 5.80072 1.66699 6.22464 1.66699 6.66667V15H4.16699" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.83366 16.6663C6.75413 16.6663 7.50033 15.9201 7.50033 14.9997C7.50033 14.0792 6.75413 13.333 5.83366 13.333C4.91318 13.333 4.16699 14.0792 4.16699 14.9997C4.16699 15.9201 4.91318 16.6663 5.83366 16.6663Z" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.5 15H11.6667" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.3337 16.6663C14.2541 16.6663 15.0003 15.9201 15.0003 14.9997C15.0003 14.0792 14.2541 13.333 13.3337 13.333C12.4132 13.333 11.667 14.0792 11.667 14.9997C11.667 15.9201 12.4132 16.6663 13.3337 16.6663Z" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-gray-600 text-sm">Transport</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {stats.currency} {city.transport}
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center">
                    <span className="font-bold text-[#0A0A0A] text-[18px] w-[50%]">Total<br/>Monthly</span>
                    <span className="font-bold text-[#003975] text-xl">
                      {stats.currency} {city.total}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3">
            <button 
              onClick={handleCityPrev}
              disabled={isCityPrevDisabled}
              className={`w-12 h-12 rounded-full border border-gray-200 transition flex items-center justify-center ${
                isCityPrevDisabled
                  ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              aria-label="Previous page"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleCityNext}
              disabled={isCityNextDisabled}
              className={`w-12 h-12 rounded-full border border-gray-200 transition flex items-center justify-center ${
                isCityNextDisabled
                  ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              aria-label="Next page"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Expense Analytics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Expense Analytics
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Typical Monthly Expense Distribution
              </h3>
              <div className="flex flex-col items-center">
                <div className="relative w-65 h-65 mb-8">
                  <svg viewBox="-20 -20 250 250" className="w-full h-full transform -rotate-90">
                    {(() => {
                      const pieData = [
                        { label: 'Accommodation', percentage: stats.accommodation, color: '#0066cc' },
                        { label: 'Food & Groceries', percentage: stats.food, color: '#00d9ff' },
                        { label: 'Transportation', percentage: 8, color: '#ff6b9d' },
                        { label: 'Entertainment', percentage: 3, color: '#ffc107' },
                        { label: 'Utilities', percentage: 4, color: '#9333ea' },
                      ];
                      const total = 2 * Math.PI * 80;
                      let currentOffset = 0;
                      
                      return pieData.map((item, index) => {
                        const dashArray = (item.percentage / 100) * total;
                        const segment = (
                          <circle
                            key={index}
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke={item.color}
                            strokeWidth="60"
                            strokeDasharray={`${dashArray} ${total}`}
                            strokeDashoffset={-currentOffset}
                            className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                          />
                        );
                        currentOffset += dashArray;
                        return segment;
                      });
                    })()}
                  </svg>
                </div>
                <div className="space-y-2 text-sm w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#0066cc]"></div>
                    <span className="text-gray-700">Accommodation: {stats.accommodation}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#00d9ff]"></div>
                    <span className="text-gray-700">Food & Groceries: {stats.food}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#ff6b9d]"></div>
                    <span className="text-gray-700">Transportation: 8%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#ffc107]"></div>
                    <span className="text-gray-700">Entertainment: 3%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#9333ea]"></div>
                    <span className="text-gray-700">Utilities: 4%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Average Monthly Spending Trend
              </h3>
              <div className="w-full">
                <svg viewBox="0 0 500 300" className="w-full">
                  {(() => {
                    const lineData = [
                      { month: 'Jan', spending: 1920 },
                      { month: 'Feb', spending: 1800 },
                      { month: 'Mar', spending: 1950 },
                      { month: 'Apr', spending: 1850 },
                      { month: 'May', spending: 2100 },
                      { month: 'Jun', spending: 2250 },
                      { month: 'Jul', spending: 2350 },
                    ];
                    const maxSpending = Math.max(...lineData.map(d => d.spending));
                    const minSpending = Math.min(...lineData.map(d => d.spending));
                    const range = maxSpending - minSpending;
                    const chartHeight = 180;
                    const chartWidth = 400;
                    const padding = 60;

                    const linePoints = lineData.map((item, index) => {
                      const x = padding + (index * (chartWidth / (lineData.length - 1)));
                      const y = 240 - ((item.spending - minSpending) / range) * chartHeight;
                      return { x, y, ...item };
                    });

                    const linePath = linePoints.map((p, i) => 
                      i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`
                    ).join(' ');

                    return (
                      <>
                        {/* Grid lines */}
                        {[240, 180, 120, 60].map((y, i) => (
                          <line key={i} x1="60" y1={y} x2="460" y2={y} stroke="#e5e7eb" strokeWidth="1" />
                        ))}
                        
                        {/* Y-axis labels */}
                        <text x="35" y="245" fontSize="12" fill="#9ca3af">0</text>
                        <text x="20" y="185" fontSize="12" fill="#9ca3af">600</text>
                        <text x="15" y="125" fontSize="12" fill="#9ca3af">1200</text>
                        <text x="15" y="65" fontSize="12" fill="#9ca3af">1800</text>
                        <text x="15" y="35" fontSize="12" fill="#9ca3af">2400</text>

                        {/* Line path */}
                        <path
                          d={linePath}
                          fill="none"
                          stroke="#0066cc"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Data points */}
                        {linePoints.map((point, index) => (
                          <g key={index}>
                            <circle
                              cx={point.x}
                              cy={point.y}
                              r="5"
                              fill="#0066cc"
                              className="cursor-pointer hover:r-7 transition-all"
                            />
                            <title>{`${point.month}: $${point.spending}`}</title>
                          </g>
                        ))}

                        {/* X-axis labels */}
                        {linePoints.map((point, index) => (
                          <text key={index} x={point.x - 10} y="265" fontSize="12" fill="#9ca3af">
                            {point.month}
                          </text>
                        ))}
                      </>
                    );
                  })()}
                </svg>
                <div className="flex justify-center items-center gap-2 mt-4">
                  <div className="w-4 h-1 bg-[#0066cc]"></div>
                  <span className="text-sm text-gray-600">Spending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bar Chart - Full Width */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Cost Comparison by City
            </h3>
            <div className="w-full">
              <svg viewBox="0 0 600 320" className="w-full">
                {(() => {
                  const barData = {
                    cities: ['Sydney', 'Melbourne', 'Brisbane'],
                    categories: [
                      { label: 'Rent', color: '#0066cc', values: [1200, 1050, 1150] },
                      { label: 'Food', color: '#00d9ff', values: [450, 420, 400] },
                      { label: 'Transport', color: '#ff6b9d', values: [200, 180, 150] },
                    ],
                  };
                  const maxBarValue = Math.max(...barData.categories.flatMap(c => c.values));
                  const barChartHeight = 220;
                  const barWidth = 25;
                  const groupWidth = 150;
                  const barChartPadding = 80;

                  return (
                    <>
                      {/* Axes */}
                      <line x1="80" y1="40" x2="80" y2="260" stroke="#1f2937" strokeWidth="2" />
                      <line x1="80" y1="260" x2="580" y2="260" stroke="#1f2937" strokeWidth="2" />

                      {/* Grid lines */}
                      {[260, 205, 150, 95, 40].map((y, i) => (
                        <line key={i} x1="80" y1={y} x2="580" y2={y} stroke="#e5e7eb" strokeWidth="1" />
                      ))}

                      {/* Y-axis labels */}
                      <text x="55" y="265" fontSize="12" fill="#9ca3af">0</text>
                      <text x="40" y="210" fontSize="12" fill="#9ca3af">400</text>
                      <text x="40" y="155" fontSize="12" fill="#9ca3af">800</text>
                      <text x="35" y="100" fontSize="12" fill="#9ca3af">1200</text>
                      <text x="35" y="45" fontSize="12" fill="#9ca3af">1600</text>

                      {/* Bars */}
                      {barData.cities.map((city, cityIndex) => (
                        <g key={cityIndex}>
                          {barData.categories.map((category, catIndex) => {
                            const value = category.values[cityIndex];
                            const barHeight = (value / maxBarValue) * barChartHeight;
                            const x = barChartPadding + (cityIndex * groupWidth) + (catIndex * (barWidth + 5)) + 40;
                            const y = 260 - barHeight;
                            
                            return (
                              <g key={catIndex}>
                                <rect
                                  x={x}
                                  y={y}
                                  width={barWidth}
                                  height={barHeight}
                                  fill={category.color}
                                  rx="3"
                                  className="cursor-pointer hover:opacity-80 transition-opacity"
                                />
                                <title>{`${city} - ${category.label}: $${value}`}</title>
                              </g>
                            );
                          })}
                        </g>
                      ))}

                      {/* X-axis labels */}
                      {barData.cities.map((city, index) => (
                        <text
                          key={index}
                          x={barChartPadding + (index * groupWidth) + 40}
                          y="285"
                          fontSize="14"
                          fill="#4b5563"
                          fontWeight="500"
                        >
                          {city}
                        </text>
                      ))}

                      {/* Legend */}
                      {barData.categories.map((category, index) => (
                        <g key={index}>
                          <rect
                            x={200 + (index * 80)}
                            y="20"
                            width="16"
                            height="16"
                            fill={category.color}
                            rx="2"
                          />
                          <text x={220 + (index * 80)} y="32" fontSize="13" fill="#4b5563">
                            {category.label}
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Budget by Lifestyle Section */}
      <section>
        <div className="w-full">
          <div className=" bg-[#f7faff] w-full py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-[48px] font-bold text-[#0A0A0A] mb-2">Budget by Lifestyle</h2>
                <p className="text-[#4A5565] text-[18px]">
                  Choose a budget that matches your lifestyle preferences
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {budgetOptions.map((option, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition bg-white">
                    <h3 className="text-[20px] font-bold text-[#0A0A0A] mb-2 text-center">{option.name}</h3>
                    <p className="text-3xl font-bold text-[#003975] mb-2 text-center">{option.range}</p>
                    <p className="text-sm text-[#A1A1A1] mb-6 text-center">{option.description}</p>

                    <div className="border-t-2 border-[#E5E5E5] pt-4">
                      <p className="text-sm font-semibold text-[#525252] mb-2">Typical Includes:</p>
                      <ul className="space-y-1">
                        {option.includes.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-700">
                            <span className="text-green-600">✓</span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 max-w-6xl mx-auto">
            <h2 className="text-[#0A0A0A] text-[48px] font-bold mb-2 text-center">
              Additional Expenses to Consider
            </h2>
            <p className=" text-[#4A5565] text-[18px] text-center mb-12">
              Choose a budget that matches your lifestyle preferences
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 ">
              {additionalExpenses.map((expense, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition bg-white relative overflow-hidden">
                  <div className="absolute w-[172.61px] h-[143.31px] right-2 top-0 opacity-100 blur-64 rounded-[3.30382e+07px]">
                    <div className="absolute top-0 -right-2 w-40 h-40 bg-[#f9faff] blur-3xl rounded-full opacity-100 transform rotate-15"></div>
                  </div>
                  <h4 className="text-[#0A0A0A] text-[24px] mb-1">{expense.title}</h4>
                  <p className="text-[16px] text-[#A1A1A1]">{expense.cost}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Budget Tips Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f7faff] mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-4">
              Budget Planning Tips
            </span>
            <h2 className="text-3xl md:text-[16px] text-[#171717]">
              All the things you must know about <span className="font-bold">your budget</span>
            </h2>
          </div>

          <div className="space-y-4">
            {budgetTips.map((tip, idx) => (
              <div key={idx} className="flex gap-4 items-center justify-start">
                <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 7H22V13" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <p className="text-[#0A0A0A] text-[32px] leading-relaxed pt-2">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
            How Does {countryName} Compare Globally?
          </h2>
          <p className="text-slate-600 text-center mb-12">
            Cost index comparison with other popular study destinations (London = 100)
          </p>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
            <div className="space-y-4">
              {globalComparison.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 items-center">
                  <div className="mb-2 col-span-2 text-right -mr-[1.2px]">
                    <label className="font-semibold text-slate-900 text-sm">{item.category}</label> -
                  </div>
                  <div className="relative w-full col-span-10 items-center text-left border-l">
                    {/* Background grid lines */}
                    <div className="absolute inset-0 flex justify-between" style={{ left: '100px', right: 0 }}>
                      {[0, 30, 60, 90, 120].map((val) => (
                        <div key={val} className="border-l border-gray-200 h-full"></div>
                      ))}
                    </div>
                    
                    <div className="relative flex items-center gap-3">
                      {/* <div className="w-24 text-left"></div> */}
                      <div className="flex-1 space-y-0.5">
                        {/* Sydney */}
                        <div className="flex items-center">
                          <div 
                            className="h-1.75 bg-[#0066CC] rounded-r transition-all"
                            style={{ width: `${(item.sydney / 120) * 100}%` }}
                          ></div>
                        </div>
                        {/* London */}
                        <div className="flex items-center">
                          <div 
                            className="h-1.75 bg-[#FF6B6B] rounded-r transition-all"
                            style={{ width: `${(item.london / 120) * 100}%` }}
                          ></div>
                        </div>
                        {/* NYC */}
                        <div className="flex items-center">
                          <div 
                            className="h-1.75 bg-[#00C9A7] rounded-r transition-all"
                            style={{ width: `${(item.nyc / 120) * 100}%` }}
                          ></div>
                        </div>
                        {/* Toronto */}
                        <div className="flex items-center">
                          <div 
                            className="h-1.75 bg-[#FFD93D] rounded-r transition-all"
                            style={{ width: `${(item.toronto / 120) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
                    
              {/* X-axis labels */}
              <div className="grid grid-cols-12">
                <div className="col-span-2"></div>
                <div className="col-span-10">
                  <div className="flex justify-between mt-1.5 text-xs text-gray-500">
                    <span>0</span>
                    <span>30</span>
                    <span>60</span>
                    <span>90</span>
                    <span>120</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#0066CC] rounded"></div>
                <span className="text-sm text-gray-700">Sydney</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FF6B6B] rounded"></div>
                <span className="text-sm text-gray-700">London</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#00C9A7] rounded"></div>
                <span className="text-sm text-gray-700">NYC</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FFD93D] rounded"></div>
                <span className="text-sm text-gray-700">Toronto</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute w-[372.61px] h-[443.31px] right-1 bottom-1 opacity-40 blur-64 rounded-[3.30382e+07px]">
        <div className="absolute bottom-18 right-5 w-60 h-60 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
      </div>
      <div className="absolute w-[372.61px] h-[443.31px] left-30 -bottom-30 opacity-30 blur-64 rounded-[3.30382e+07px]">
        <div className="absolute -bottom-40 left-50 w-110 h-110 bg-[#155DFC] blur-3xl rounded-full opacity-80 transform rotate-15"></div>
      </div>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Need Help to<br />
            Plan your Budget?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
            Get personalized cost estimates and financial planning guidance
          </p>
          <button className="bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-full transition-all flex items-center gap-2 mx-auto group">
            Book Counselling
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}