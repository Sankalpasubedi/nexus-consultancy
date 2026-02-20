"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useRef, useState } from "react";

/* ================================================================
   BRANCH DATA — with exact Google Maps embed iframes
   ================================================================ */

interface Branch {
  id: number;
  name: string;
  label: string;
  city: string;
  address: string;
  phone1: string;
  phone2: string;
  isHead: boolean;
  embedUrl: string;
  directionsUrl: string;
}

const branches: Branch[] = [
  {
    id: 1,
    name: "Head Office",
    label: "Dillibazar",
    city: "Dillibazar, Kathmandu",
    address: "Dillibazar, Kathmandu-44600, Nepal",
    phone1: "01-4519495",
    phone2: "9851032197",
    isHead: true,
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17385.937813097844!2d85.3111465!3d27.7055199!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a7f7c4e0c1%3A0x247ec3573bef5a8c!2sNexsus%20Educational%20Consultancy%20And%20Immigration%20Services!5e1!3m2!1sen!2snp!4v1771541698463!5m2!1sen!2snp",
    directionsUrl:
      "https://www.google.com/maps/place/Nexsus+Educational+Consultancy+And+Immigration+Services/@27.7055199,85.3111465,17z/",
  },
  {
    id: 2,
    name: "Baneshwor Branch",
    label: "Baneshwor",
    city: "New Baneshwor, Kathmandu",
    address: "New Baneshwor, Kathmandu, Nepal",
    phone1: "01-5922227",
    phone2: "9841830127",
    isHead: false,
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12295.004869389208!2d85.3234703!3d27.6940659!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4c5777d264c17ce9%3A0x209500ee10cfad87!2sNexsus%20Educational%20Consultancy%20%26%20Immigration%20Services%20New%20Baneshwor!5e1!3m2!1sen!2snp!4v1771541799968!5m2!1sen!2snp",
    directionsUrl:
      "https://www.google.com/maps/place/Nexsus+Educational+Consultancy+%26+Immigration+Services+New+Baneshwor/@27.6940659,85.3234703,17z/",
  },
  {
    id: 3,
    name: "Samakhusi Branch",
    label: "Samakhusi",
    city: "Samakhusi, Kathmandu",
    address: "Samakhusi, Kathmandu, Nepal",
    phone1: "01-4971971",
    phone2: "9820291960",
    isHead: false,
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14125.632189868003!2d85.31775951430153!3d27.73555758829925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1900126ce7f3%3A0x1a511b42f1597f6f!2sNexsus%20Educational%20Consultancy%20Samakhusi-IELTS%20%2FPTE%20Center!5e0!3m2!1sen!2snp!4v1771541831849!5m2!1sen!2snp",
    directionsUrl:
      "https://www.google.com/maps/@27.7355576,85.3177595,17z/",
  },
  {
    id: 4,
    name: "Banepa Branch",
    label: "Banepa",
    city: "Banepa, Kavrepalanchok",
    address: "Banepa, Kavrepalanchok, Nepal",
    phone1: "01-1665859",
    phone2: "9860824272",
    isHead: false,
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4349.503273732663!2d85.5251538!3d27.6296416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb09f996386e97%3A0xb5dbeb7d5a61883a!2sNexsus%20Educational%20Consultancy%20and%20Immigration%20Services%20Banepa!5e1!3m2!1sen!2snp!4v1771541845494!5m2!1sen!2snp",
    directionsUrl:
      "https://www.google.com/maps/place/Nexsus+Educational+Consultancy+and+Immigration+Services+Banepa/@27.6296416,85.5251538,17z/",
  },
  {
    id: 5,
    name: "Birtamode Branch",
    label: "Birtamode",
    city: "Birtamode, Jhapa",
    address: "Birtamode, Jhapa, Nepal",
    phone1: "02-3591692",
    phone2: "9843649305",
    isHead: false,
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1327926.0364346562!2d86.5652285!3d27.3158468!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5bb00499446ff%3A0x4afa9376815b0587!2sNexus%20Educational%20Consultancy%2C%20Birtamode!5e1!3m2!1sen!2snp!4v1771541855500!5m2!1sen!2snp",
    directionsUrl:
      "https://www.google.com/maps/place/Nexus+Educational+Consultancy,+Birtamode/@26.6427074,87.9924648,17z/",
  },
  {
    id: 6,
    name: "Dhulabari Branch",
    label: "Dhulabari",
    city: "Dhulabari, Jhapa",
    address: "Dhulabari, Jhapa, Nepal",
    phone1: "02-3591127",
    phone2: "9801455861",
    isHead: false,
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d14262.17696591396!2d88.08856907803856!3d26.663071144558987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDM5JzM1LjciTiA4OMKwMDYnMDMuNCJF!5e0!3m2!1sen!2snp!4v1771541952343!5m2!1sen!2snp",
    directionsUrl:
      "https://www.google.com/maps/@26.659912,88.100947,17z/",
  },
];

/* ================================================================
   MAIN COMPONENT — Light-themed interactive branch explorer
   for the Contact page: tab selector → live map embed + details
   ================================================================ */

export default function ContactBranchExplorer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [selectedId, setSelectedId] = useState(1);

  const selected = branches.find((b) => b.id === selectedId) || branches[0];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gray-50 overflow-hidden">
      {/* ── Header ── */}
      <FadeUp>
        <div className="text-center max-w-3xl mx-auto px-6 mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-5 py-2 mb-5 rounded-full bg-white text-slate-600 text-sm font-medium shadow-sm border border-gray-100">
            <Icon name="MapPin" size={14} className="text-[#00ab18]" /> Find Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Locate Our{" "}
            <span className="bg-gradient-to-r from-[#003975] to-[#00ab18] bg-clip-text text-transparent">
              Nearest Branch
            </span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Select a branch below to see its exact location on the map and get directions instantly
          </p>
        </div>
      </FadeUp>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* ── Branch Tab Selector ── */}
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
            {branches.map((b) => {
              const active = selectedId === b.id;
              return (
                <motion.button
                  key={b.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedId(b.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-[#003975] text-white shadow-lg shadow-[#003975]/20"
                      : "bg-white text-slate-600 border border-gray-200 hover:border-[#003975]/30 hover:text-[#003975]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {b.isHead && (
                      <span className={`text-[10px] font-bold ${active ? "text-green-300" : "text-[#00ab18]"}`}>
                        ★
                      </span>
                    )}
                    {b.label}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="branch-tab-indicator"
                      className="absolute inset-0 rounded-full bg-[#003975] -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </FadeUp>

        {/* ── Map + Details Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
              {/* ── Live Google Maps Embed ── */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                <iframe
                  src={selected.embedUrl}
                  width="100%"
                  height="420"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map — ${selected.name}`}
                  className="w-full"
                />
              </div>

              {/* ── Branch Detail Card ── */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-7">
                {/* Name + Badge */}
                <div className="flex items-start gap-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      selected.isHead ? "bg-[#003975]" : "bg-[#003975]/10"
                    }`}
                  >
                    <Icon
                      name={selected.isHead ? "Building" : "MapPin"}
                      size={20}
                      className={selected.isHead ? "text-white" : "text-[#003975]"}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-slate-900 font-bold text-lg leading-tight">{selected.name}</h3>
                      {selected.isHead && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#003975] bg-[#003975]/10 px-2 py-0.5 rounded-full border border-[#003975]/15">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm mt-0.5">{selected.city}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-5" />

                {/* Contact Details */}
                <div className="space-y-3.5 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00ab18]/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={14} className="text-[#00ab18]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">Address</p>
                      <p className="text-sm text-slate-700">{selected.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#003975]/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={14} className="text-[#003975]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">Phone</p>
                      <div className="flex items-center gap-3 text-sm text-slate-700">
                        <a href={`tel:${selected.phone1.replace(/-/g, "")}`} className="hover:text-[#003975] transition">
                          {selected.phone1}
                        </a>
                        <span className="text-gray-300">|</span>
                        <a href={`tel:${selected.phone2}`} className="hover:text-[#003975] transition">
                          {selected.phone2}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={14} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">Office Hours</p>
                      <p className="text-sm text-slate-700">Sun – Fri: 9:00 AM – 6:00 PM</p>
                      <p className="text-xs text-slate-400 mt-0.5">Saturday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5">
                  <a
                    href={selected.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#003975] text-white text-sm font-semibold hover:bg-[#002d5e] transition shadow-sm"
                  >
                    <Icon name="Compass" size={16} /> Get Directions
                  </a>
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={`tel:${selected.phone1.replace(/-/g, "")}`}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-slate-700 text-sm font-medium hover:bg-gray-200 transition"
                    >
                      <Icon name="Phone" size={14} /> Call
                    </a>
                    <a
                      href={`https://wa.me/977${selected.phone2}?text=Hi%2C%20I%27m%20interested%20in%20studying%20abroad.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/10 text-[#128C7E] text-sm font-medium hover:bg-[#25D366]/20 transition"
                    >
                      <Icon name="MessageCircle" size={14} /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Quick Stats ── */}
        <FadeUp delay={0.2}>
          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-10 md:mt-14">
            {[
              { num: "6", label: "Branches", icon: "Building" },
              { num: "4", label: "Cities", icon: "MapPin" },
              { num: "3", label: "Districts", icon: "Globe" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center py-4 md:py-5 rounded-xl bg-white border border-gray-200 shadow-sm"
              >
                <Icon name={s.icon} size={16} className="text-[#003975]/40 mx-auto mb-2" />
                <div className="text-xl md:text-2xl font-bold text-slate-900">{s.num}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
