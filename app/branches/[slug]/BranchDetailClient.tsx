"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { Icon } from "@/lib/icons";

interface BranchDetailClientProps {
  slug: string;
}

const branches: Record<string, {
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapUrl: string;
  description: string;
}> = {
  kathmandu: {
    name: "Kathmandu Main Office",
    city: "Kathmandu",
    address: "Putalisadak, Kathmandu",
    phone: "+977-1-4444444",
    email: "kathmandu@nexsus.edu.np",
    hours: "Sun-Fri: 10AM - 6PM",
    mapUrl: "https://maps.google.com/?q=Putalisadak+Kathmandu",
    description: "Our main headquarters in the heart of Kathmandu, serving students from across Nepal with comprehensive study abroad services.",
  },
  pokhara: {
    name: "Pokhara Branch",
    city: "Pokhara",
    address: "Lakeside, Pokhara",
    phone: "+977-61-555555",
    email: "pokhara@nexsus.edu.np",
    hours: "Sun-Fri: 10AM - 6PM",
    mapUrl: "https://maps.google.com/?q=Lakeside+Pokhara",
    description: "Serving the western region of Nepal with dedicated counselors for Australia, UK, and Canada programs.",
  },
  chitwan: {
    name: "Chitwan Branch",
    city: "Chitwan",
    address: "Bharatpur, Chitwan",
    phone: "+977-56-666666",
    email: "chitwan@nexsus.edu.np",
    hours: "Sun-Fri: 10AM - 6PM",
    mapUrl: "https://maps.google.com/?q=Bharatpur+Chitwan",
    description: "Our Chitwan branch provides personalized guidance to students from the Terai region.",
  },
};

export default function BranchDetailClient({ slug }: BranchDetailClientProps) {
  const branch = branches[slug.toLowerCase()];

  if (!branch) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Branch Not Found</h1>
            <p className="text-slate-600 mb-8">The requested branch page does not exist.</p>
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition"
            >
              <Icon name="ArrowLeft" size={16} />
              View All Branches
            </Link>
          </FadeUp>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 text-brand-blue hover:text-blue-900 mb-6 font-medium"
            >
              <Icon name="ArrowLeft" size={16} />
              All Branches
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {branch.name}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              {branch.description}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Branch Details */}
      <section className="px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 text-lg mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={18} className="text-brand-blue mt-1" />
                    <div>
                      <p className="font-medium text-slate-900">Address</p>
                      <p className="text-slate-600">{branch.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={18} className="text-brand-blue mt-1" />
                    <div>
                      <p className="font-medium text-slate-900">Phone</p>
                      <a href={`tel:${branch.phone}`} className="text-slate-600 hover:text-brand-blue">
                        {branch.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={18} className="text-brand-blue mt-1" />
                    <div>
                      <p className="font-medium text-slate-900">Email</p>
                      <a href={`mailto:${branch.email}`} className="text-slate-600 hover:text-brand-blue">
                        {branch.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={18} className="text-brand-blue mt-1" />
                    <div>
                      <p className="font-medium text-slate-900">Office Hours</p>
                      <p className="text-slate-600">{branch.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gradient-to-br from-brand-blue to-blue-900 rounded-2xl p-6 text-white h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xl mb-2">Book a Consultation</h3>
                  <p className="text-white/80 mb-6">
                    Schedule a free consultation with our expert counselors at the {branch.city} branch.
                  </p>
                </div>
                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 bg-white text-brand-blue px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition w-full"
                  >
                    Book Appointment
                    <Icon name="ArrowRight" size={16} />
                  </Link>
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-white/30 px-6 py-3 rounded-full font-medium hover:bg-white/10 transition w-full"
                  >
                    <Icon name="Map" size={16} />
                    Get Directions
                  </a>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Services Available */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Services Available at This Branch
            </h2>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "Target", title: "Career Counseling" },
              { icon: "FileText", title: "Visa Assistance" },
              { icon: "BookOpen", title: "Test Prep" },
              { icon: "PenLine", title: "SOP Writing" },
              { icon: "DollarSign", title: "Scholarship Guidance" },
              { icon: "Plane", title: "Pre-Departure Support" },
            ].map((service) => (
              <StaggerItem key={service.title}>
                <div className="bg-white rounded-xl p-4 flex items-center gap-3 border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                    <Icon name={service.icon} size={18} className="text-brand-blue" />
                  </div>
                  <span className="font-medium text-slate-900">{service.title}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
