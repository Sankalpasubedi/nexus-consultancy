import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUpRight,
} from "lucide-react";

const services = [
  { label: "Career Counseling", href: "/services/career-counseling" },
  { label: "Application Support", href: "/services/sop-writing-assistance" },
  { label: "Visa Assistance", href: "/services/student-visa-assistance" },
  { label: "Test Preparation", href: "/services/test-preparation" },
  { label: "Scholarship Guidance", href: "/services/scholarship-guidance" },
  { label: "Pre-Departure Support", href: "/services/pre-departure-support" },
];

const destinations = [
  { label: "Australia", href: "/destinations/study-in-australia" },
  { label: "Canada", href: "/destinations/study-in-canada" },
  { label: "United States", href: "/destinations/study-in-usa" },
  { label: "United Kingdom", href: "/destinations/study-in-uk" },
  { label: "New Zealand", href: "/destinations/study-in-new-zealand" },
  { label: "Japan", href: "/destinations/study-in-japan" },
  { label: "South Korea", href: "/destinations/study-in-south-korea" },
  { label: "Europe", href: "/destinations/study-in-europe" },
];

const resources = [
  { label: "Study Abroad Guide", href: "/study-abroad/complete-guide" },
  { label: "IELTS Preparation", href: "/services/test-preparation" },
  { label: "Scholarship Finder", href: "/services/scholarship-guidance" },
  { label: "Cost Calculator", href: "/study-abroad/compare-destinations" },
  { label: "Blog & Articles", href: "/blog" },
  { label: "FAQs", href: "/contact" },
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#001d3d] via-[#002a52] to-[#003975] text-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.05] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00ab18]/[0.04] rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="relative z-10 px-4 pt-16 pb-0 sm:px-6 lg:px-8">
      <div >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-gradient-to-r from-[#003975] via-[#004a8f] to-[#00ab18] px-8 py-12 md:px-14 md:py-14 shadow-2xl shadow-black/20 border border-white/10">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
              {/* Left content */}
              <div className="max-w-xl text-center lg:text-left">
                <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Stay Updated
                </h3>
                <p className="mt-3 text-base text-blue-100/70">
                  Get the latest study abroad tips, scholarship alerts, and
                  event updates delivered straight to your inbox.
                </p>
              </div>

              {/* Right - input group */}
              <div className="w-full max-w-md">
                <form
                  action="#"
                  method="POST"
                  className="flex items-center gap-3"
                >
                  <div className="relative min-w-0 flex-1">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email address"
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-5 py-3.5 pr-12 text-sm text-white placeholder-blue-200/50 backdrop-blur-sm transition focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                    />
                    <Mail
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-200/50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#003975] transition hover:bg-blue-50"
                  >
                    Subscribe
                    <ArrowUpRight size={16} />
                  </button>
                </form>
                <p className="mt-3 text-xs text-blue-200/40">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* ── Newsletter Banner ── */}
      

      {/* ── Main Footer Content ── */}
      <div className="relative z-10 px-4 pt-16 pb-0 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
            {/* Column 1 - Brand (col-span-2) */}
            <div className="sm:col-span-2">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo.png"
                  alt="Nexsus Educational Consultancy"
                  width={500}
                  height={500}
                  className="h-40 w-auto object-contain "
                />
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
                Nepal&apos;s trusted international education consultancy.
                Guiding students toward global opportunities since 2010.
              </p>

              {/* Social icons */}
              <div className="mt-6 flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-slate-700 hover:text-white"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 - Services */}
            <div>
              <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Destinations */}
            <div>
              <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
                Destinations
              </h4>
              <ul className="space-y-3">
                {destinations.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Resources */}
            <div>
              <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
                Resources
              </h4>
              <ul className="space-y-3">
                {resources.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5 - Contact */}
            <div>
              <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
                Contact
              </h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex gap-3">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-[#00ab18]"
                  />
                  <span>
                    Putalisadak, Kathmandu
                    <br />
                    Nepal
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone
                    size={16}
                    className="mt-0.5 shrink-0 text-[#00ab18]"
                  />
                  <a
                    href="tel:+97714123456"
                    className="transition hover:text-white"
                  >
                    +977 1 4123456
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail
                    size={16}
                    className="mt-0.5 shrink-0 text-[#00ab18]"
                  />
                  <a
                    href="mailto:info@nexsuseducation.com"
                    className="transition hover:text-white"
                  >
                    info@nexsuseducation.com
                  </a>
                </li>
                <li className="mt-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Working Hours
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Sun &ndash; Fri: 10 AM &ndash; 6 PM
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>



      {/* ── Bottom Bar ── */}
      <div className="relative z-10 mt-16 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
            {/* Left */}
            <p>
              &copy; 2026 Nexsus Educational Consultancy and Immigration Services Pvt. Ltd. All rights reserved.
            </p>

            {/* Center */}
            <p className="text-slate-500"></p>

            {/* Right */}
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="transition hover:text-slate-300"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition hover:text-slate-300">
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="transition hover:text-slate-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
