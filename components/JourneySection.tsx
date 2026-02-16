"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    id: 1,
    title: "Discovery & Counseling",
    description: "We assess your profile, goals, and preferences to create a personalized education plan.",
    color: "blue",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20.9992 21.0002L16.6992 16.7002" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  },
  {
    id: 2,
    title: "University Selection",
    description:
      "Shortlist universities that match your aspirations, budget, and academic background.",
    color: "lightBlue",
    icon:(
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 14L11 16L15 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "Application & Visa",
    description:
      "Complete applications with expert guidance and navigate visa requirements seamlessly.",
    color: "cyan",
    icon:(
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 15L11 17L15 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  },
  {
    id: 4,
    title: "Pre-Departure Prep",
    description:
      "Get ready with accommodation, travel bookings, and essential pre-departure briefings.",
    color: "green",
    icon:(
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.8 19.2L16 11L19.5 7.5C21 6 21.5 4 21 3C20 2.5 18 3 16.5 4.5L13 8L4.8 6.2C4.3 6.1 3.9 6.3 3.7 6.7L3.4 7.2C3.2 7.7 3.3 8.2 3.7 8.5L9 12L7 15H4L3 16L6 18L8 21L9 20V17L12 15L15.5 20.3C15.8 20.7 16.3 20.8 16.8 20.6L17.3 20.4C17.7 20.1 17.9 19.7 17.8 19.2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  },
  {
    id: 5,
    title: "Begin Your Journey",
    description:
      "Arrive confident and prepared to excel in your new academic environment.",
    color: "greenDark",
    icon:(
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.4208 10.9224C21.5998 10.8434 21.7517 10.7136 21.8577 10.5492C21.9637 10.3847 22.0191 10.1927 22.0171 9.99709C22.0151 9.80144 21.9557 9.61068 21.8463 9.44844C21.737 9.2862 21.5824 9.15961 21.4018 9.08436L12.8308 5.18036C12.5702 5.06151 12.2872 5 12.0008 5C11.7144 5 11.4313 5.06151 11.1708 5.18036L2.60077 9.08036C2.42274 9.15833 2.27129 9.28649 2.16494 9.44917C2.05859 9.61185 2.00195 9.802 2.00195 9.99636C2.00195 10.1907 2.05859 10.3809 2.16494 10.5435C2.27129 10.7062 2.42274 10.8344 2.60077 10.9124L11.1708 14.8204C11.4313 14.9392 11.7144 15.0007 12.0008 15.0007C12.2872 15.0007 12.5702 14.9392 12.8308 14.8204L21.4208 10.9224Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 10V16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 12.5V16C6 16.7956 6.63214 17.5587 7.75736 18.1213C8.88258 18.6839 10.4087 19 12 19C13.5913 19 15.1174 18.6839 16.2426 18.1213C17.3679 17.5587 18 16.7956 18 16V12.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  },
];

export default function JourneySection() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-id"));
          if (entry.isIntersecting) {
            setVisibleSteps((prev) =>
              prev.includes(id) ? prev : [...prev, id]
            );
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const colorStyles: any = {
    blue: {
      border: "bg-gradient-to-b from-[#2B7FFF] to-[#00B8DB]",
      iconBg: "bg-gradient-to-b from-[#003975] to-[#006BDB]",
      dot: "bg-gradient-to-b from-[#003975] to-[#006BDB]",
      glow: "bg-[#006BDB]",
    },
    lightBlue: {
      border: "bg-gradient-to-b from-[#006EE2] to-[#17C1FF]",
      iconBg: "bg-gradient-to-b from-[#006EE2] to-[#17C1FF]",
      dot: "bg-gradient-to-b from-[#006EE2] to-[#17C1FF]",
      glow: "bg-[#17C1FF]",
    },
    cyan: {
      border: "bg-gradient-to-b from-[#1D92FF] to-[#00FFFF]",
      iconBg: "bg-gradient-to-b from-[#1D92FF] to-[#00FFFF]",
      dot: "bg-gradient-to-b from-[#1D92FF] to-[#00FFFF]",
      glow: "bg-[#00FFFF]",
    },
    green: {
      border: "bg-gradient-to-b from-[#5CFBFB] via-[#16FE9D] to-[#00FF7F]",
      iconBg: "bg-gradient-to-b from-[#5CFBFB] via-[#16FE9D] to-[#00FF7F]",
      dot: "bg-gradient-to-b from-[#5CFBFB] via-[#16FE9D] to-[#00FF7F]",
      glow: "bg-[#00FF7F]",
    },
    greenDark: {
      border: "bg-gradient-to-b from-[#008112] to-[#00D81E]",
      iconBg: "bg-gradient-to-b from-[#008112] to-[#00D81E]",
      dot: "bg-gradient-to-b from-[#008112] to-[#00D81E]",
      glow: "bg-[#00D81E]",
    },
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-2 mb-6 text-lg rounded-full bg-gray-100 text-slate-700">
            Your Pathway
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            The Student Journey
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A clear, step-by-step process designed to make your study abroad
            dream a reality
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
            <div
              className="absolute inset-0 w-0.5"
              style={{
                background:
                  "linear-gradient(to bottom, #BEDBFF, #E9D4FF, #FCCEE8)",
              }}
            />
            <div className="absolute inset-0 w-1 left-[1.1px] -translate-x-1/2 overflow-hidden">
              <div
                className="w-full h-[200%] rounded-full overflow-hidden"
                style={{
                  background:
                    "linear-gradient(to bottom, #BEDBFF, #E9D4FF, #FCCEE8)",
                  WebkitMaskImage: `
                    repeating-linear-gradient(
                      to bottom,
                      black 0px,
                      black 14px,
                      transparent 14px,
                      transparent 28px
                    )
                  `,
                  maskImage: `
                    repeating-linear-gradient(
                      to bottom,
                      black 0px,
                      black 14px,
                      transparent 14px,
                      transparent 28px
                    )
                  `,
                  animation: "moveDown 17s linear infinite",
                }}
              />
            </div>
            <style>
              {`
                @keyframes moveDown {
                  from {
                    transform: translateY(-50%);
                  }
                  to {
                    transform: translateY(0%);
                  }
                }
              `}
            </style>
          </div>
          <div className="space-y-24">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const style = colorStyles[step.color];

              return (
                <div
                  key={step.id}
                  data-id={step.id}
                  ref={(el) => {
                    refs.current[index] = el;
                  }}
                  className={`flex items-center ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div className="w-1/2 px-8">
                    <div
                      className={`relative bg-white rounded-3xl p-8 
                      shadow-sm transition-all duration-700 overflow-hidden
                      ${
                        visibleSteps.includes(step.id)
                          ? "opacity-100 translate-x-0"
                          : isLeft
                          ? "opacity-0 -translate-x-16"
                          : "opacity-0 translate-x-16"
                      }`}
                    >
                      {/* Left Border Line */}
                      <div className={`absolute left-[-1px] top-0 bottom-0 w-[4px] ${style.border} z-50`}></div>
                      {/* Brush Splash Glow - Multiple overlapping ellipses for organic shape */}
                      <div className="absolute -bottom-2 -right-3 w-24 h-24 opacity-30 pointer-events-none">
                        <div className={`absolute top-4 right-3 w-14 h-12 ${style.glow} blur-2xl rounded-full transform rotate-15`}></div>
                        <div className={`absolute bottom-2 right-1 w-12 h-14 ${style.glow} blur-2xl rounded-full transform -rotate-30`}></div>
                        <div className={`absolute top-8 right-4 w-10 h-8 ${style.glow} blur-xl rounded-full transform rotate-30 opacity-60`}></div>
                      </div>

                      <div className="flex items-start gap-4 relative z-10">
                        {/* Icon */}
                        <div
                          className={`w-12 h-12 rounded-xl ${style.iconBg} text-white flex items-center justify-center font-bold shadow-lg flex-shrink-0`}
                        >
                        {step.icon}
                        </div>

                        <div>
                          <p className="text-sm text-slate-400 font-medium mb-1">
                            Step {step.id}
                          </p>
                          <h3 className="text-xl font-normal text-slate-900 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="relative w-14 flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-white border-[3px] border-gray-200 flex items-center justify-center z-10 shadow-sm">
                      <div className={`w-7 h-7 rounded-full ${style.dot} shadow-lg`}></div>
                    </div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-24">
          <Link
            href="/destinations"
            className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-slate-900 transition"
          >
            Start Your Journey Today
          </Link>
        </div>

      </div>
    </section>
  );
}