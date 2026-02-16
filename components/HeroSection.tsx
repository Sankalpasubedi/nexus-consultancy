"use client"; // Add this for animation effects

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [blob1Position, setBlob1Position] = useState({ x: 80, y: 80 });
  const [blob2Position, setBlob2Position] = useState({ x: 80, y: 80 });

  useEffect(() => {
    const moveBlobs = () => {
      // Random movement for first blob (top right)
      setBlob1Position({
        x: 80 + Math.sin(Date.now() / 2000) * 30,
        y: 80 + Math.cos(Date.now() / 2500) * 30,
      });

      // Random movement for second blob (bottom left)
      setBlob2Position({
        x: 80 + Math.sin(Date.now() / 3000) * 40,
        y: 80 + Math.cos(Date.now() / 2800) * 40,
      });
    };

    const interval = setInterval(moveBlobs, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50 to-white overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* First Blob - Top Right (Green) */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-30"
          style={{
            right: `${blob1Position.x}px`,
            top: `${blob1Position.y}px`,
            background: 'linear-gradient(135deg, rgba(41, 251, 128, 0.1) 0%, rgba(0, 166, 62, 0.3) 100%)',
            filter: 'blur(32px)',
            transform: 'translate(0, 0)',
            transition: 'all 3s ease-in-out',
          }}
        />

        {/* Second Blob - Bottom Left (Blue) */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-30"
          style={{
            left: `${blob2Position.x}px`,
            bottom: `${blob2Position.y}px`,
            background: 'linear-gradient(135deg, rgba(21, 93, 252, 0.1) 0%, rgba(21, 93, 252, 0.3) 100%)',
            filter: 'blur(32px)',
            transform: 'translate(0, 0)',
            transition: 'all 3s ease-in-out',
          }}
        />

        {/* Additional subtle blobs for depth */}
        <div 
          className="absolute w-64 h-64 rounded-full opacity-20"
          style={{
            left: '20%',
            top: '30%',
            background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, rgba(255,165,0,0.2) 100%)',
            filter: 'blur(40px)',
            animation: 'float 15s infinite alternate',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center pt-50 pb-50">

        {/* Top Tag */}
        <div className="inline-block px-5 py-2 mb-6 text-lg rounded-full bg-gray-100 text-slate-700">
          Your Global Education Partner
        </div>

        {/* Headline */}
        <h1 className="text-1xl md:text-[17px] text-slate-900 mb-4 leading-tight">
          Transform Your Future
        </h1>

        {/* Subheadline with colored words */}
        <p className="text-1xl md:text-[17px] font-medium mb-6">
  <span className="bg-gradient-to-r from-green-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
    Study Abroad with Confidence
  </span>
</p>

        {/* Description */}
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
          Expert guidance for your international education journey. From
          university selection to visa success, we're with you every step of
          the way.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            href="/destinations"
            className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-slate-900 transition-all flex items-center gap-2"
          >
            Start Your Journey →
          </Link>

          <button className="px-8 py-3 rounded-full border border-slate-300 text-slate-800 font-medium hover:bg-slate-100 transition-all">
            Book a Consultation
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          <div>
            <div className="text-1xl text-slate-900">15K+</div>
            <p className="text-slate-500 mt-1">Students Placed</p>
          </div>
          <div>
            <div className="text-1xl text-slate-900">500+</div>
            <p className="text-slate-500 mt-1">Partner Universities</p>
          </div>
          <div>
            <div className="text-1xl text-slate-900">30+</div>
            <p className="text-slate-500 mt-1">Countries</p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <svg width="25" height="40" viewBox="0 0 25 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.841461">
        <mask id="path-1-inside-1_127_5463" fill="white">
        <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12V28C24 34.6274 18.6274 40 12 40C5.37258 40 0 34.6274 0 28V12Z"/>
        </mask>
        <path d="M12 0M24 12H23V28H24H25V12H24ZM12 40M0 28H1V12H0H-1V28H0ZM12 40V39C5.92487 39 1 34.0751 1 28H0H-1C-1 35.1797 4.8203 41 12 41V40ZM24 28H23C23 34.0751 18.0751 39 12 39V40V41C19.1797 41 25 35.1797 25 28H24ZM12 0V1C18.0751 1 23 5.92487 23 12H24H25C25 4.8203 19.1797 -1 12 -1V0ZM12 0V-1C4.8203 -1 -1 4.8203 -1 12H0H1C1 5.92487 5.92487 1 12 1V0Z" fill="#A1A1A1" mask="url(#path-1-inside-1_127_5463)"/>
        <rect x="9.57422" y="13.6299" width="4.85" height="5.99" rx="2.425" fill="#A1A1A1"/>
        </g>
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-30px, -20px) scale(1.1); }
        }
      `}</style>
    </section>
  );
}