"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  TrackpadCarousel,
  CarouselCard,
} from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { useState } from "react";

/* ─── Testimonials Data ────────────────────────────── */

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    branch: "Kathmandu",
    country: "Australia",
    university: "University of Sydney",
    image: "/services/NEX-_-1.jpg",
    quote: "The Kathmandu branch team was incredibly helpful throughout my entire application process!"
  },
  {
    id: 2,
    name: "Rahul Thapa",
    branch: "Pokhara",
    country: "Canada",
    university: "University of Toronto",
    image: "/services/NEX-_-2.jpg",
    quote: "I visited the Pokhara branch for guidance, and their expertise was impressive!"
  },
  {
    id: 3,
    name: "Anita Gurung",
    branch: "Chitwan",
    country: "UK",
    university: "University of Manchester",
    image: "/services/NEX-_-3.jpg",
    quote: "The counselors helped me secure a scholarship. Forever grateful for their support!"
  },
  {
    id: 4,
    name: "Suman KC",
    branch: "Butwal",
    country: "USA",
    university: "Boston University",
    image: "/services/NEX-_-4.jpg",
    quote: "From test prep to visa approval, the team was with me every step of the way!"
  },
  {
    id: 5,
    name: "Deepa Magar",
    branch: "Biratnagar",
    country: "New Zealand",
    university: "University of Auckland",
    image: "/services/NEX-_-5.jpg",
    quote: "The branch made the complex process so simple. I'm now pursuing my dreams!"
  },
];

/* ─── Branches Data ────────────────────────────────── */

const branches = [
  {
    id: "dillibazar",
    name: "Kathmandu - Dillibazar",
    city: "Kathmandu",
    type: "Head Office",
    address: "Dillibazar, Kathmandu 44600, Nepal",
    phone: "+977-1-4439758",
    email: "info@nexsus.com.np",
    hours: "Sun-Fri: 9AM-5PM",
    mapUrl: "https://maps.google.com/?q=Dillibazar+Kathmandu",
    services: ["Test Prep", "Counseling", "Visa", "All Services"],
  },
  {
    id: "baneshwor",
    name: "Kathmandu - Baneshwor",
    city: "Kathmandu",
    type: "Branch Office",
    address: "New Baneshwor, Kathmandu, Nepal",
    phone: "+977-1-4485123",
    email: "baneshwor@nexsus.com.np",
    hours: "Sun-Fri: 9AM-5PM",
    mapUrl: "https://maps.google.com/?q=New+Baneshwor+Kathmandu",
    services: ["Test Prep", "Counseling", "Visa"],
  },
  {
    id: "samakhusi",
    name: "Kathmandu - Samakhusi",
    city: "Kathmandu",
    type: "Branch Office",
    address: "Samakhusi, Kathmandu, Nepal",
    phone: "+977-1-4356789",
    email: "samakhusi@nexsus.com.np",
    hours: "Sun-Fri: 9AM-5PM",
    mapUrl: "https://maps.google.com/?q=Samakhusi+Kathmandu",
    services: ["Test Prep", "Counseling"],
  },
  {
    id: "banepa",
    name: "Banepa",
    city: "Kavrepalanchok",
    type: "Regional Office",
    address: "Banepa, Kavrepalanchok, Nepal",
    phone: "+977-11-661234",
    email: "banepa@nexsus.com.np",
    hours: "Sun-Fri: 10AM-5PM",
    mapUrl: "https://maps.google.com/?q=Banepa+Nepal",
    services: ["Counseling", "Visa"],
  },
  {
    id: "birtamode",
    name: "Birtamode",
    city: "Jhapa",
    type: "Regional Office",
    address: "Birtamode, Jhapa, Nepal",
    phone: "+977-23-541234",
    email: "birtamode@nexsus.com.np",
    hours: "Sun-Fri: 10AM-5PM",
    mapUrl: "https://maps.google.com/?q=Birtamode+Nepal",
    services: ["Test Prep", "Counseling", "Visa"],
  },
  {
    id: "dhulabari",
    name: "Dhulabari",
    city: "Jhapa",
    type: "Regional Office",
    address: "Dhulabari, Jhapa, Nepal",
    phone: "+977-23-551234",
    email: "dhulabari@nexsus.com.np",
    hours: "Sun-Fri: 10AM-5PM",
    mapUrl: "https://maps.google.com/?q=Dhulabari+Nepal",
    services: ["Counseling"],
  },
];

export default function BranchesClient() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      {/* ── Hero Section ── */}
      <section className="px-6 mb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <FadeUp>
                <span className="inline-block px-4 py-1.5 bg-[#003975]/10 text-[#003975] text-sm font-medium rounded-full mb-4">
                  Find Us Near You
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                  Our Branch Locations
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                  Visit any of our offices across Nepal for personalized guidance on your study abroad journey.
                </p>
              </FadeUp>
            </div>

            {/* Right Image */}
            <FadeUp delay={0.2}>
              <div className="hidden lg:block relative group">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <Image
                    src="/services/NEX-_-18.jpg"
                    alt="Our Branch Office"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003975]/20 to-transparent" />
                </div>
                {/* Floating accent */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#00ab18]/10 flex items-center justify-center">
                      <Icon name="MapPin" size={24} className="text-[#00ab18]" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-lg">6+</p>
                      <p className="text-slate-500 text-xs">Branch Offices</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 mb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Offices", value: "6+", icon: "Building2" },
              { label: "Cities", value: "4", icon: "MapPin" },
              { label: "Counselors", value: "50+", icon: "Users" },
              { label: "Students Helped", value: "10K+", icon: "GraduationCap" },
            ].map((stat) => (
              <FadeUp key={stat.label}>
                <div className="bg-gradient-to-br from-[#003975]/5 to-[#00ab18]/5 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <Icon name={stat.icon} size={20} className="text-[#003975]" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Branch Cards ── */}
      <section className="px-6 mb-16">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              All Branches
            </h2>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <StaggerItem key={branch.id}>
                <HoverCard className="h-full">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-[#00ab18]/10 text-[#00ab18] text-xs font-medium rounded-full mb-2">
                          {branch.type}
                        </span>
                        <h3 className="font-bold text-slate-900 text-lg">{branch.name}</h3>
                        <p className="text-sm text-slate-500">{branch.city}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#003975]/10 flex items-center justify-center">
                        <Icon name="Building2" size={18} className="text-[#003975]" />
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 flex-grow">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="MapPin" size={14} className="text-slate-400" />
                        <span className="text-slate-600">{branch.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Phone" size={14} className="text-slate-400" />
                        <a href={`tel:${branch.phone}`} className="text-slate-600 hover:text-[#003975]">
                          {branch.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Mail" size={14} className="text-slate-400" />
                        <a href={`mailto:${branch.email}`} className="text-slate-600 hover:text-[#003975]">
                          {branch.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Clock" size={14} className="text-slate-400" />
                        <span className="text-slate-600">{branch.hours}</span>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="flex flex-wrap gap-1 mt-4">
                      {branch.services.map((service) => (
                        <span
                          key={service}
                          className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2">
                      <Link
                        href={`/branches/${branch.id}`}
                        className="flex-1 text-center px-4 py-2.5 bg-[#004a8f] text-white text-sm font-medium rounded-lg hover:bg-[#003468] transition"
                      >
                        View Details
                      </Link>
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 border border-gray-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                      >
                        <Icon name="ExternalLink" size={14} />
                      </a>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Why Visit Us ── */}
      <section className="py-16 px-6 bg-[#003975]/5">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Why Visit Our Branch?
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Get personalized guidance from our expert counselors.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "Users", title: "Expert Counselors", desc: "One-on-one guidance from certified professionals" },
              { icon: "FileText", title: "Document Review", desc: "Get your documents checked on the spot" },
              { icon: "CreditCard", title: "Flexible Payments", desc: "Discuss payment plans and options" },
              { icon: "Coffee", title: "Comfortable Space", desc: "Relax while we plan your future" },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-[#003975]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} size={20} className="text-[#003975]" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Student Success Stories Carousel ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 bg-[#00ab18]/10 text-[#00ab18] text-sm font-medium rounded-full mb-4">
                Success Stories
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Students Love Our Branches
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Hear from students who visited our branches and achieved their dreams.
              </p>
            </div>
          </FadeUp>

          <TrackpadCarousel className="mt-8">
            {testimonials.map((testimonial) => (
              <CarouselCard key={testimonial.id} className="min-w-[300px] sm:min-w-[350px]">
                <div className="bg-gradient-to-br from-[#003975]/5 to-[#00ab18]/5 rounded-2xl p-6 h-full border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden group">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm text-slate-500">{testimonial.branch} Branch</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Icon name="Quote" size={24} className="text-[#003975]/30" />
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-[#003975]/10 text-[#003975] rounded-full font-medium">
                      {testimonial.country}
                    </span>
                    <span className="text-xs text-slate-500">{testimonial.university}</span>
                  </div>
                </div>
              </CarouselCard>
            ))}
          </TrackpadCarousel>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto">
              Visit any of our branches or book a free consultation online. 
              Our team is ready to help you achieve your study abroad dreams.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#004a8f] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#003468] hover:shadow-lg transition"
              >
                Book Free Consultation <Icon name="ArrowRight" size={14} />
              </Link>
              <a
                href="https://wa.me/9779851032197"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#1fb855] hover:shadow-lg transition"
              >
                <Icon name="MessageCircle" size={14} />
                Chat on WhatsApp
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
