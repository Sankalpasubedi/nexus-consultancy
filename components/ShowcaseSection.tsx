"use client";

import { useState } from "react";
import Image from "next/image";

const serviceImages = [
  "/services/NEX-_-32.jpg",
  "/services/NEX-_-42.jpg",
  "/services/NEX-_-49.jpg",
  "/services/NEX-_-2.jpg",
  "/services/NEX-_-47.jpg",
  "/services/NEX-_-28.jpg",
  "/services/NEX-_-7.jpg",
  "/services/NEX-_-35.jpg",
  "/services/NEX-_-14.jpg",
  "/services/NEX-_-25.jpg",
  "/services/NEX-_-3.jpg",
  "/services/NEX-_-10.jpg",
];

const testimonials = [
  {
    name: "Priya Sharma",
    country: "Studying in Australia",
    quote: "Nexsus made my dream of studying abroad a reality. Their guidance throughout the visa process was exceptional!",
    avatar: "/student/avatar-1.jpg",
  },
  {
    name: "Rahul Thapa",
    country: "Studying in Canada",
    quote: "The team helped me secure a scholarship worth $15,000. Forever grateful for their support and dedication.",
    avatar: "/student/avatar-2.jpg",
  },
  {
    name: "Anisha Gurung",
    country: "Studying in UK",
    quote: "From university selection to visa approval, every step was handled professionally. Highly recommend!",
    avatar: "/student/avatar-3.jpg",
  },
  {
    name: "Bikash Rai",
    country: "Studying in USA",
    quote: "Best consultancy in Nepal! They understood my goals and found the perfect university for my career.",
    avatar: "/student/avatar-4.jpg",
  },
  {
    name: "Sita Poudel",
    country: "Studying in New Zealand",
    quote: "The pre-departure support was amazing. I felt completely prepared for my journey abroad.",
    avatar: "/student/avatar-5.jpg",
  },
  {
    name: "Arun Shrestha",
    country: "Studying in Germany",
    quote: "Professional, reliable, and caring. Nexsus is the best decision I made for my study abroad journey.",
    avatar: "/student/avatar-6.jpg",
  },
  {
    name: "Manisha KC",
    country: "Studying in Japan",
    quote: "They helped me with everything from test prep to accommodation. Truly a one-stop solution!",
    avatar: "/student/avatar-7.jpg",
  },
  {
    name: "Dipesh Maharjan",
    country: "Studying in South Korea",
    quote: "Got my visa approved in the first attempt! The documentation guidance was spot on.",
    avatar: "/student/avatar-8.jpg",
  },
];

export default function ShowcaseSection() {
  const [topPaused, setTopPaused] = useState(false);
  const [bottomPaused, setBottomPaused] = useState(false);

  return (
    <section className="py-20 bg-white overflow-hidden">
      {/* Top Carousel - Service Images - Moving Left */}
      <div
        className="relative overflow-hidden mb-0"
        onMouseEnter={() => setTopPaused(true)}
        onMouseLeave={() => setTopPaused(false)}
      >
        <div
          className="flex"
          style={{
            animation: "showcaseScrollLeft 40s linear infinite",
            animationPlayState: topPaused ? "paused" : "running",
          }}
        >
          {[...serviceImages, ...serviceImages, ...serviceImages].map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 relative w-[400px] h-[280px] md:w-[500px] md:h-[320px] overflow-hidden group"
            >
              <Image
                src={img}
                alt={`Service showcase ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Carousel - Testimonials - Moving Right */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setBottomPaused(true)}
        onMouseLeave={() => setBottomPaused(false)}
      >
        <div
          className="flex"
          style={{
            animation: "showcaseScrollRight 50s linear infinite",
            animationPlayState: bottomPaused ? "paused" : "running",
          }}
        >
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[400px] md:w-[500px] bg-gray-50 p-8 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
            >
              <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-3">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#003975] flex items-center justify-center text-white font-semibold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes showcaseScrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes showcaseScrollRight {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
