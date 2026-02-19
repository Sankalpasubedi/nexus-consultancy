"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

interface NavItem {
  title: string;
  url: string;
  hasDropdown?: boolean;
  children?: { title: string; url: string; description?: string }[];
}

const navData: NavItem[] = [
  { title: "About", url: "/about" },
  {
    title: "Services",
    url: "/services",
    hasDropdown: true,
    children: [
      { title: "All Services", url: "/services", description: "Explore all our services" },
      { title: "SOP & Application", url: "/services/sop", description: "Statement of purpose help" },
      { title: "Test Preparation", url: "/services/test-preparation", description: "IELTS, TOEFL, PTE prep" },
      { title: "Counseling", url: "/services/counseling", description: "Expert guidance" },
      { title: "Visa Assistance", url: "/services/visa", description: "Visa application support" },
      { title: "Pre-Departure", url: "/services/pre-departure", description: "Prepare to fly" },
      { title: "Scholarships", url: "/services/scholarships", description: "Financial aid guidance" },
    ],
  },
  {
    title: "Courses",
    url: "/courses",
    hasDropdown: true,
    children: [
      { title: "All Courses", url: "/courses", description: "Browse all programs" },
      { title: "Information Technology", url: "/courses/information-technology", description: "CS & IT programs" },
      { title: "Business & Management", url: "/courses/business-management", description: "MBA & BBA" },
      { title: "Engineering", url: "/courses/engineering", description: "BEng & MEng" },
      { title: "Health Sciences", url: "/courses/health-sciences", description: "Medical & Health" },
    ],
  },
  {
    title: "Destinations",
    url: "/destinations",
    hasDropdown: true,
    children: [
      { title: "All Destinations", url: "/destinations", description: "Explore countries" },
      { title: "Australia", url: "/destinations/australia", description: "Land down under" },
      { title: "United Kingdom", url: "/destinations/uk", description: "Historic excellence" },
      { title: "Canada", url: "/destinations/canada", description: "Welcoming & diverse" },
      { title: "USA", url: "/destinations/usa", description: "Ivy League & more" },
      { title: "New Zealand", url: "/destinations/new-zealand", description: "Natural beauty" },
      { title: "Japan", url: "/destinations/japan", description: "Innovation & tradition" },
      { title: "South Korea", url: "/destinations/south-korea", description: "K-wave & tech" },
      { title: "Europe", url: "/destinations/europe", description: "Diverse cultures" },
    ],
  },
  { title: "Contact", url: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-black/5 bg-white/90 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-white/80 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#003975]">
            <span className="text-sm font-extrabold text-white">N</span>
          </div>
          <span className="text-base font-bold tracking-tight text-neutral-900">
            NEXSUS
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navData.map((item) => {
            const isActive =
              pathname === item.url || pathname.startsWith(item.url + "/");
            return (
              <div
                key={item.title}
                className="group relative"
                onMouseEnter={() =>
                  item.hasDropdown && setOpenDropdown(item.title)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.url}
                  className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#003975]"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  {item.title}
                  {item.hasDropdown && (
                    <ChevronDown className="h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {item.hasDropdown &&
                  item.children &&
                  openDropdown === item.title && (
                    <div className="absolute left-0 top-full z-50 min-w-[240px] rounded-xl border border-black/5 bg-white p-1.5 shadow-lg shadow-black/8 animate-in fade-in slide-in-from-top-1 duration-150">
                      {item.children.map((child) => (
                        <Link
                          key={child.url}
                          href={child.url}
                          className="flex flex-col rounded-lg px-3.5 py-2.5 transition-colors hover:bg-neutral-50"
                        >
                          <span className="text-sm font-medium text-neutral-800">
                            {child.title}
                          </span>
                          {child.description && (
                            <span className="text-xs text-neutral-400">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg lg:inline-flex"
            style={{ backgroundColor: "#003975" }}
          >
            Get Started
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-black/5 bg-white px-6 pb-6 pt-4 lg:hidden max-h-[calc(100vh-68px)] overflow-y-auto">
          <div className="flex flex-col gap-0.5">
            {navData.map((item) => (
              <div key={item.title}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.title ? null : item.title
                        )
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-medium text-neutral-700 hover:bg-neutral-50"
                    >
                      {item.title}
                      <ChevronDown
                        className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
                          openDropdown === item.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === item.title && item.children && (
                      <div
                        className="ml-3 flex flex-col gap-0.5 border-l-2 pl-3"
                        style={{ borderColor: "rgba(0,57,117,0.15)" }}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.url}
                            href={child.url}
                            className="rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.url}
                    className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-neutral-100 pt-4">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: "#003975" }}
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
