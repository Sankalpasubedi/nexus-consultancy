"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useHeader } from "@/app/contexts/HeaderContext";

type ScaleKey = "4" | "7" | "10";

type ResultCard = {
  label: string;
  value: string;
  grade: string;
  note: string;
};

type FourScaleBand = {
  min: number;
  max: number;
  gpa: string;
  grade: string;
  note: string;
};

type SevenScaleBand = {
  min: number;
  max: number;
  gpa: string;
  grade: string;
  note: string;
};

const fourScaleBands: FourScaleBand[] = [
  { min: 90, max: 100, gpa: "4.0", grade: "A+", note: "Top-tier result on the US scale" },
  { min: 85, max: 89, gpa: "3.7", grade: "A", note: "Strong academic standing" },
  { min: 80, max: 84, gpa: "3.5", grade: "A-", note: "Excellent performance" },
  { min: 75, max: 79, gpa: "3.3", grade: "B+", note: "Very good result" },
  { min: 70, max: 74, gpa: "3.0", grade: "B", note: "Good result" },
  { min: 65, max: 69, gpa: "2.7", grade: "B-", note: "Solid academic performance" },
  { min: 60, max: 64, gpa: "2.3", grade: "C+", note: "Passing range" },
  { min: 55, max: 59, gpa: "2.0", grade: "C", note: "Minimum competitive zone" },
];

const sevenScaleBands: SevenScaleBand[] = [
  { min: 85, max: 100, gpa: "7.0", grade: "High Distinction", note: "Highest Australian style band" },
  { min: 75, max: 84, gpa: "6.0", grade: "Distinction", note: "Strong result for admissions" },
  { min: 65, max: 74, gpa: "5.0", grade: "Credit", note: "Good academic performance" },
  { min: 50, max: 64, gpa: "4.0", grade: "Pass", note: "Meets basic pass requirement" },
];

const scaleOptions: { value: ScaleKey; label: string; description: string }[] = [
  { value: "4", label: "US / Canada 4.0", description: "Most common for North America" },
  { value: "7", label: "Australia 7.0", description: "Used by many Australian universities" },
  { value: "10", label: "10.0 Scale", description: "Common in some EU / Canadian systems" },
];

function clampPercentage(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

function getBandResult(value: number, bands: { min: number; max: number; gpa: string; grade: string; note: string }[], fallback: ResultCard): ResultCard {
  const matched = bands.find((band) => value >= band.min && value <= band.max);
  if (matched) {
    return {
      label: `${matched.min}-${matched.max}%`,
      value: matched.gpa,
      grade: matched.grade,
      note: matched.note,
    };
  }
  return fallback;
}

function getResultForScale(percentage: number, scale: ScaleKey): ResultCard {
  if (scale === "4") {
    return getBandResult(percentage, fourScaleBands, {
      label: "Below 55%",
      value: "< 2.0",
      grade: "May not qualify",
      note: "Below the usual 4.0 admission benchmark",
    });
  }

  if (scale === "7") {
    return getBandResult(percentage, sevenScaleBands, {
      label: "Below 50%",
      value: "< 4.0",
      grade: "Fail",
      note: "Below the usual Australian pass range",
    });
  }

  const gpa = (percentage / 10).toFixed(1);
  return {
    label: "10.0 formula",
    value: gpa,
    grade: percentage >= 90 ? "Excellent" : percentage >= 80 ? "Very good" : percentage >= 70 ? "Good" : percentage >= 60 ? "Average" : "Below average",
    note: "Calculated with GPA = (Percentage / 100) x 10",
  };
}

function getAllScaleResults(percentage: number): ResultCard[] {
  return [
    getResultForScale(percentage, "4"),
    getResultForScale(percentage, "7"),
    getResultForScale(percentage, "10"),
  ];
}

export default function GpaCalculatorClient() {
  const { setShowSidebar } = useHeader();
  const [percentageInput, setPercentageInput] = useState("80");
  const [selectedScale, setSelectedScale] = useState<ScaleKey>("4");

  useEffect(() => {
    setShowSidebar(false);
    return () => setShowSidebar(true);
  }, [setShowSidebar]);

  const percentage = clampPercentage(Number(percentageInput));
  const selectedResult = useMemo(() => getResultForScale(percentage, selectedScale), [percentage, selectedScale]);
  const allScaleResults = useMemo(() => getAllScaleResults(percentage), [percentage]);

  return (
    <main className="min-h-screen bg-[#f7f9fc] pt-24 lg:pt-28 text-slate-900">
      <section className="relative overflow-hidden bg-white border-b border-gray-200 pt-8 pb-14 md:pt-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1.02 }}
          viewport={{ once: false, amount: 0.15, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden 2xl:block absolute top-16 right-10 z-0 pointer-events-none"
        >
          <div className="w-72 h-96 rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/40 relative bg-white">
            <Image src="/services/rightimage9.png" alt="Student using academic planning tools" fill className="object-cover object-top" priority />
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeUp>
            <p className="text-sm text-slate-500 mb-2">Nexsus Services / GPA Calculator</p>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight max-w-3xl">
              GPA Calculator for International Applications
            </h1>
            <p className="mt-4 text-slate-600 max-w-2xl text-base md:text-lg leading-relaxed">
              Convert your percentage into GPA on the 4.0, 7.0, and 10.0 scales commonly used by universities abroad.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  document.getElementById("gpa-calculator-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 bg-[#1f73d8] text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-[#175eb3] transition"
              >
                <Icon name="Calculator" size={18} />
                Use calculator
              </button>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 hover:border-slate-400 transition"
              >
                Ask for guidance <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div id="gpa-calculator-section" className="mt-10 grid lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 items-start scroll-mt-28">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[30px] border border-[#d8e3ef] bg-white p-5 sm:p-6 shadow-[0_12px_30px_rgba(16,27,56,0.05)]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf3fa] text-[#1f4f8b]">
                <Icon name="Calculator" size={19} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#101b38]">Calculate your GPA</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Enter your percentage and choose the scale you want to compare.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Percentage</span>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={percentageInput}
                    onChange={(event) => setPercentageInput(event.target.value)}
                    placeholder="Enter percentage"
                    className="w-full rounded-2xl border border-[#d8e3ef] bg-[#fbfcfe] px-4 py-3.5 pr-14 text-base outline-none transition focus:border-[#1f4f8b] focus:ring-4 focus:ring-[#1f4f8b]/10"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#1f4f8b]">
                    %
                  </span>
                </div>
              </label>

              <div>
                <span className="mb-2 block text-sm font-semibold text-slate-700">Target scale</span>
                <div className="grid gap-3 sm:grid-cols-3">
                  {scaleOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSelectedScale(option.value)}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        selectedScale === option.value
                          ? "border-[#1f4f8b] bg-[#edf3fa] shadow-sm"
                          : "border-[#d8e3ef] bg-[#fbfcfe] hover:border-[#bcd0e7]"
                      }`}
                    >
                      <div className="text-sm font-bold text-[#101b38]">{option.label}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-500">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-[#d8e3ef] bg-[#f3f7fc] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1f4f8b]">Result</p>
                <div className="mt-3 flex flex-wrap items-end gap-3">
                  <span className="text-4xl font-bold tracking-tight text-[#101b38]">{selectedResult.value}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1f4f8b] ring-1 ring-[#d8e3ef]">
                    {selectedResult.grade}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{selectedResult.note}</p>
              </div>
            </div>
          </motion.section>

          <div className="space-y-6">
            <StaggerContainer className="grid gap-4 sm:grid-cols-3">
              {allScaleResults.map((result, index) => (
                <StaggerItem key={scaleOptions[index].value}>
                  <div className="h-full rounded-[28px] border border-[#d8e3ef] bg-white p-5 shadow-[0_12px_30px_rgba(16,27,56,0.05)]">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-bold text-[#101b38]">{scaleOptions[index].label}</h3>
                      <Icon name="Percent" size={15} className="text-[#1f4f8b]" />
                    </div>
                    <div className="mt-4 text-3xl font-bold text-[#101b38]">{result.value}</div>
                    <p className="mt-1 text-sm font-semibold text-[#1f4f8b]">{result.grade}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{result.note}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="rounded-[30px] border border-[#d8e3ef] bg-white p-5 sm:p-6 shadow-[0_12px_30px_rgba(16,27,56,0.05)]">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#101b38]">How the conversion works</h3>
                  <p className="mt-1 text-sm sm:text-base leading-relaxed text-slate-600">
                    The 4.0 and 7.0 systems use grade bands, while the 10.0 scale is often based on a direct percentage formula.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f4f8b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163e6f] whitespace-nowrap"
                >
                  Ask for guidance <Icon name="ArrowRight" size={14} />
                </Link>
              </div>
            </div>

            <div className="rounded-[30px] border border-[#d8e3ef] bg-white p-5 sm:p-6 shadow-[0_12px_30px_rgba(16,27,56,0.05)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf3fa] text-[#1f4f8b]">
                  <Icon name="Table" size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#101b38]">Quick reference</h3>
                  <p className="text-sm text-slate-600">Based on the conversion ranges from the guide.</p>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-[22px] border border-[#d8e3ef]">
                <div className="grid grid-cols-3 bg-[#f3f7fc] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#1f4f8b]">
                  <span>Scale</span>
                  <span>Range</span>
                  <span>Result</span>
                </div>
                {[
                  ["4.0", "90-100%", "4.0 / A+"],
                  ["4.0", "75-79%", "3.3 / B+"],
                  ["7.0", "85-100%", "7.0 / High Distinction"],
                  ["7.0", "50-64%", "4.0 / Pass"],
                  ["10.0", "80-89%", "8.0-8.9"],
                  ["10.0", "60-69%", "6.0-6.9"],
                ].map(([scale, range, result], index) => (
                  <div
                    key={`${scale}-${range}`}
                    className={`grid grid-cols-3 px-4 py-3 text-sm ${index % 2 === 0 ? "bg-white" : "bg-[#fbfcfe]"}`}
                  >
                    <span className="font-semibold text-[#101b38]">{scale}</span>
                    <span className="text-slate-600">{range}</span>
                    <span className="text-slate-600">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <FadeUp delay={0.15}>
          <div className="mt-10 rounded-[30px] border border-[#d8e3ef] bg-white p-5 sm:p-6 shadow-[0_12px_30px_rgba(16,27,56,0.05)]">
            <h2 className="text-xl font-bold text-[#101b38]">Why students use this calculator</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                "Check admission eligibility for universities abroad.",
                "Compare your local percentage with target country GPA systems.",
                "Plan scholarship applications with a clearer academic target.",
                "Get a fast estimate before requesting an official evaluation.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-[#d8e3ef] bg-[#fbfcfe] p-4 text-sm leading-6 text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </main>
  );
}
