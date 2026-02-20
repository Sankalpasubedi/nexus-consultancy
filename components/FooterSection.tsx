"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  services: [
    { name: "All Services", url: "/services" },
    { name: "SOP & Application", url: "/services/sop-writing-assistance" },
    { name: "Test Preparation", url: "/services/test-preparation" },
    { name: "Counseling", url: "/services/career-counseling" },
    { name: "Visa Assistance", url: "/services/student-visa-assistance" },
    { name: "Pre-Departure", url: "/services/pre-departure-support" },
    { name: "Scholarships", url: "/services/scholarship-guidance" },
  ],
  destinations: [
    { name: "Australia", url: "/destinations/study-in-australia" },
    { name: "United Kingdom", url: "/destinations/study-in-uk" },
    { name: "Canada", url: "/destinations/study-in-canada" },
    { name: "United States", url: "/destinations/study-in-usa" },
    { name: "New Zealand", url: "/destinations/study-in-new-zealand" },
    { name: "Japan", url: "/destinations/study-in-japan" },
    { name: "South Korea", url: "/destinations/study-in-south-korea" },
    { name: "Europe", url: "/destinations/study-in-europe" },
  ],
  courses: [
    { name: "Information Technology", url: "/courses/information-technology" },
    { name: "Business & Management", url: "/courses/business-management" },
    { name: "Engineering", url: "/courses/engineering" },
    { name: "Health Sciences", url: "/courses/health-sciences" },
    { name: "Arts & Design", url: "/courses/arts-and-design" },
    { name: "Law & Legal Studies", url: "/courses/law-and-legal-studies" },
  ],
  company: [
    { name: "About Us", url: "/about" },
    { name: "Contact", url: "/contact" },
    { name: "Destinations", url: "/destinations" },
    { name: "Courses", url: "/courses" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    url: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
];

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { name: string; url: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.name}>
            <Link
              href={item.url}
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterSection() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      {/* CTA banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #003975 0%, #002a57 50%, #001d3d 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute -right-20 -top-20 h-60 w-60 rounded-full"
            style={{
              background: "radial-gradient(circle, #00ab18, transparent)",
            }}
          />
          <div
            className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full"
            style={{
              background: "radial-gradient(circle, #00ab18, transparent)",
            }}
          />
        </div>
        <div className="relative mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 px-8 py-14 md:flex-row">
          <div className="max-w-lg text-center md:text-left">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Ready to Begin Your Journey?
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Book a free consultation with our expert counselors and take the
              first step toward your dream university.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-100 hover:shadow-lg"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-[1440px] px-8 pb-8 pt-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#003975]">
                <span className="text-xs font-extrabold text-white">N</span>
              </div>
              <span className="text-lg font-bold text-white">Nexsus</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              Your trusted partner in international education. Guiding students
              toward global opportunities with expertise and care.
            </p>

            <div className="mt-6 space-y-2.5">
              <a
                href="tel:+977-1-4234567"
                className="flex items-center gap-2.5 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                +977-1-4234567
              </a>
              <a
                href="mailto:info@nexsus.com"
                className="flex items-center gap-2.5 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                info@nexsus.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-neutral-400">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Putalisadak, Kathmandu, Nepal
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-all hover:border-white/20 hover:text-white hover:-translate-y-0.5"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Services" items={footerLinks.services} />
          <FooterColumn title="Destinations" items={footerLinks.destinations} />
          <FooterColumn title="Courses" items={footerLinks.courses} />
          <FooterColumn title="Company" items={footerLinks.company} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-neutral-500 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Nexsus Educational Consultancy and Immigration Services Pvt. Ltd.
            All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
