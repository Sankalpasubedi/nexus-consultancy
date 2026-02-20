"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const offices = [
  {
    city: "Kathmandu",
    address: "Putalisadak, Kathmandu 44600",
    phone: "+977 1 4123456",
    hours: "Sun-Fri: 10AM - 6PM",
    isPrimary: true,
  },
  {
    city: "Sydney",
    address: "789 George St, Sydney NSW 2000",
    phone: "+61 2 9876 5432",
    hours: "Mon-Fri: 9AM - 5PM",
    isPrimary: false,
  },
  {
    city: "Melbourne",
    address: "321 Collins St, Melbourne VIC 3000",
    phone: "+61 3 9876 5432",
    hours: "Mon-Fri: 9AM - 5PM",
    isPrimary: false,
  },
];

export default function ContactCTASection() {
  return (
    <section className="pt-32 pb-52 px-4 sm:px-6 lg:px-8 bg-white relative z-0">
      <div className="max-w-7xl mx-auto">
        {/* ─── Top CTA Banner ─── */}
        <FadeUp>
          <div className="relative bg-gradient-to-r from-[#003975] to-[#001d3d] rounded-3xl p-12 lg:p-16 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/[0.06] rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Ready to Start Your Global Education Journey?
              </h2>
              <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
                Book a free consultation with our expert counselors. No
                obligations, just guidance.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-[#003975] px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-colors shadow-lg shadow-black/20"
                  >
                    Book Free Consultation
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    href="tel:+97714123456"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors"
                  >
                    <Phone size={18} />
                    Call Us Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ─── Office Cards ─── */}
        
      </div>
    </section>
  );
}
