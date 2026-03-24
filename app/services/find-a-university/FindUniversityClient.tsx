"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, HoverCard } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";
import {
  getAllUniversities,
  getCountryFilters,
  getUniversitiesCount,
  type UniversitySort,
} from "./universityData";

const PAGE_SIZE = 9;

const rankingBands = ["All rankings", "Top 50", "Top 100", "Top 250", "Top 500"] as const;

const scholarshipOptions = [
  { label: "Any scholarship", value: 0 },
  { label: "10% and above", value: 10 },
  { label: "25% and above", value: 25 },
  { label: "40% and above", value: 40 },
];

function toMoney(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getRankingLimit(option: (typeof rankingBands)[number]): number {
  if (option === "Top 50") return 50;
  if (option === "Top 100") return 100;
  if (option === "Top 250") return 250;
  if (option === "Top 500") return 500;
  return Number.POSITIVE_INFINITY;
}

export default function FindUniversityClient() {
  const { setShowSidebar } = useHeader();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All destinations");
  const [sortBy, setSortBy] = useState<UniversitySort>("popularity");
  const [rankingBand, setRankingBand] = useState<(typeof rankingBands)[number]>("All rankings");
  const [minimumScholarship, setMinimumScholarship] = useState(0);
  const [onlyLargeCampuses, setOnlyLargeCampuses] = useState(false);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const countries = useMemo(() => getCountryFilters(), []);

  useEffect(() => {
    setShowSidebar(true);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  const filtered = useMemo(() => {
    const rankingLimit = getRankingLimit(rankingBand);

    const list = getAllUniversities(sortBy).filter((item) => {
      const queryMatch =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.city.toLowerCase().includes(query.toLowerCase()) ||
        item.country.toLowerCase().includes(query.toLowerCase());

      const countryMatch = country === "All destinations" || item.country === country;
      const rankingMatch = item.rankingPosition <= rankingLimit;
      const scholarshipMatch = item.scholarshipPercentage >= minimumScholarship;
      const campusMatch = !onlyLargeCampuses || item.internationalStudents >= 10000;

      return queryMatch && countryMatch && rankingMatch && scholarshipMatch && campusMatch;
    });

    return list;
  }, [query, country, sortBy, rankingBand, minimumScholarship, onlyLargeCampuses]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const visiblePages = useMemo(() => {
    const pages: number[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i += 1) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  const resetFilters = () => {
    setQuery("");
    setCountry("All destinations");
    setSortBy("popularity");
    setRankingBand("All rankings");
    setMinimumScholarship(0);
    setOnlyLargeCampuses(false);
    setPage(1);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f7f9]">
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-white border-b border-gray-200 overflow-hidden">
        <motion.div
          animate={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1.02 }}
          viewport={{ once: false, amount: 0.15, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden 2xl:block absolute top-20 right-12 z-0 pointer-events-none"
        >
          <div className="w-72 h-96 rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/40 relative">
            <Image src="/services/rightimage3.png" alt="" fill className="object-cover object-top" />
          </div>
        </motion.div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <FadeUp>
            <p className="text-sm text-slate-500 mb-2">Nexsus Services / Find a University</p>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              {getUniversitiesCount()} Universities and Colleges
            </h1>
            <p className="mt-4 text-slate-600 max-w-2xl">
              Compare institutions by destination, ranking, scholarships, and campus profile to shortlist your best-fit university.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setShowFilters((prev) => !prev)}
                className="inline-flex items-center gap-2 bg-[#1f73d8] text-white px-6 py-3 rounded-xl text-xl font-semibold hover:bg-[#175eb3] transition"
              >
                <Icon name="Search" size={18} />
                Filter university
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => {
                    setSortBy(event.target.value as UniversitySort);
                    setPage(1);
                  }}
                  className="h-full rounded-xl border border-slate-300 bg-white px-5 py-3 pr-12 text-xl font-semibold text-slate-700"
                >
                  <option value="popularity">Sort by: Popularity</option>
                  <option value="ranking">Sort by: THE World University Rankings</option>
                  <option value="name-asc">Sort by: University name (A-Z)</option>
                  <option value="name-desc">Sort by: University name (Z-A)</option>
                </select>
              </div>
            </div>
          </FadeUp>

          {showFilters && (
            <FadeUp delay={0.15}>
              <div className="mt-4 rounded-2xl border border-[#c8dce7] bg-[#e5f1f6] p-5">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <input
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Search by university or city"
                    className="h-12 rounded-xl border border-slate-300 px-4"
                  />

                  <select
                    value={country}
                    onChange={(event) => {
                      setCountry(event.target.value);
                      setPage(1);
                    }}
                    className="h-12 rounded-xl border border-slate-300 px-4 bg-white"
                  >
                    {countries.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <select
                    value={rankingBand}
                    onChange={(event) => {
                      setRankingBand(event.target.value as (typeof rankingBands)[number]);
                      setPage(1);
                    }}
                    className="h-12 rounded-xl border border-slate-300 px-4 bg-white"
                  >
                    {rankingBands.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={minimumScholarship}
                    onChange={(event) => {
                      setMinimumScholarship(Number(event.target.value));
                      setPage(1);
                    }}
                    className="h-12 rounded-xl border border-slate-300 px-4 bg-white"
                  >
                    {scholarshipOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={onlyLargeCampuses}
                      onChange={(event) => {
                        setOnlyLargeCampuses(event.target.checked);
                        setPage(1);
                      }}
                    />
                    Large campuses (10,000+ international students)
                  </label>

                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f73d8] hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      <section className="py-14 px-6 relative overflow-hidden">
        <motion.div
          animate={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1.05 }}
          viewport={{ once: false, amount: 0.15, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden 2xl:block absolute bottom-16 left-12 z-0 pointer-events-none"
        >
          <div className="w-72 h-96 rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/40 relative">
            <Image src="/services/leftimage5.png" alt="" fill className="object-cover object-top" />
          </div>
        </motion.div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-6 text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{filtered.length}</span> results
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pageItems.map((uni) => (
              <div key={uni.id}>
                <HoverCard>
                  <article className="h-full rounded-2xl border border-slate-300 bg-white p-5 flex flex-col">
                    <div className="w-11 h-11 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center mb-4">
                      <span className="text-[#1f73d8] font-bold text-xl">{uni.name.charAt(0)}</span>
                    </div>

                    <h3 className="text-3xl font-semibold text-slate-900 leading-tight mb-2">{uni.name}</h3>
                    <p className="text-slate-500 mb-3">{uni.country}</p>
                    <p className="text-sm text-[#1f73d8] font-medium mb-3">View all courses</p>

                    <div className="space-y-1 text-sm text-slate-600 pb-4 border-b border-slate-200">
                      <p className="flex items-center gap-2"><Icon name="Award" size={14} className="text-slate-500" /> Rank #{uni.rankingPosition} ({uni.rankingType})</p>
                      <p className="flex items-center gap-2"><Icon name="Users" size={14} className="text-slate-500" /> International students: {uni.internationalStudents.toLocaleString()}</p>
                      <p className="flex items-center gap-2"><Icon name="MessageSquare" size={14} className="text-slate-500" /> English courses available</p>
                    </div>

                    <p className="mt-4 text-sm text-slate-600 flex-1 leading-relaxed">{uni.overview}</p>

                    <Link
                      href={`/services/find-a-university/${uni.slug}`}
                      className="mt-5 inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-slate-700 font-medium hover:border-[#1f73d8] hover:text-[#1f73d8] transition"
                    >
                      View details
                    </Link>
                  </article>
                </HoverCard>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-slate-300 bg-white px-6 py-10 text-center text-slate-600">
              No universities found for your selected filters.
            </div>
          )}

          <div className="mt-10 w-full">
            <div className="mx-auto flex w-fit items-center justify-center gap-2 flex-wrap text-slate-700">
            <button
              disabled={currentPage <= 1}
              onClick={() => setPage(1)}
              className="w-10 h-10 rounded-lg border border-slate-300 disabled:opacity-40 flex items-center justify-center"
              aria-label="First page"
            >
              <Icon name="ChevronLeft" size={14} />
            </button>

            <button
              disabled={currentPage <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="w-10 h-10 rounded-lg border border-slate-300 disabled:opacity-40 flex items-center justify-center"
              aria-label="Previous page"
            >
              <Icon name="ChevronLeft" size={14} />
            </button>

            {visiblePages[0] && visiblePages[0] > 1 && <span className="px-2">...</span>}

            {visiblePages.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-lg border ${
                  p === currentPage
                    ? "border-[#1f73d8] bg-[#1f73d8] text-white"
                    : "border-slate-300"
                }`}
              >
                {p}
              </button>
            ))}

            {visiblePages[visiblePages.length - 1] && visiblePages[visiblePages.length - 1] < totalPages && (
              <span className="px-2">...</span>
            )}

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="w-10 h-10 rounded-lg border border-slate-300 disabled:opacity-40 flex items-center justify-center"
              aria-label="Next page"
            >
              <Icon name="ChevronRight" size={14} />
            </button>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setPage(totalPages)}
              className="w-10 h-10 rounded-lg border border-slate-300 disabled:opacity-40 flex items-center justify-center"
              aria-label="Last page"
            >
              <Icon name="ChevronRight" size={14} />
            </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
