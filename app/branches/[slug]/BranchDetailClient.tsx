"use client";

import Link from "next/link";
import Image from "next/image";
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
  mapEmbedUrl: string;
  description: string;
  image: string;
  coordinates: { lat: number; lng: number };
}> = {
  kathmandu: {
    name: "Kathmandu Main Office",
    city: "Kathmandu",
    address: "Putalisadak, Kathmandu",
    phone: "+977-1-4444444",
    email: "kathmandu@nexsus.edu.np",
    hours: "Sun-Fri: 10AM - 6PM",
    mapUrl: "https://maps.google.com/?q=27.7089,85.3239",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.7089,85.3239&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Our main headquarters in the heart of Kathmandu, serving students from across Nepal with comprehensive study abroad services.",
    image: "/branches/branch.png",
    coordinates: { lat: 27.7089, lng: 85.3239 },
  },
  dillibazar: {
    name: "Dillibazar Main Office",
    city: "Dillibazar",
    address: "Dillibazar, Kathmandu-44600, Nepal",
    phone: "+977 1 4519495",
    email: "info@nexsuseducation.com",
    hours: "Sun-Fri: 9AM - 6PM",
    mapUrl: "https://maps.google.com/?q=27.7089,85.3239",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.7089,85.3239&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Our main headquarters in the heart of Dillibazar, serving students from across Nepal with comprehensive study abroad services.",
    image: "/branches/branch.png",
    coordinates: { lat: 27.7089, lng: 85.3239 },
  },
  baneshwor: {
    name: "Baneshwor Branch",
    city: "Baneshwor",
    address: "Baneshwor, Kathmandu, Nepal",
    phone: "+977 1 5922227",
    email: "baneshwor@nexsuseducation.com",
    hours: "Sun-Fri: 9AM - 6PM",
    mapUrl: "https://maps.google.com/?q=27.6908,85.3433",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.6908,85.3433&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Conveniently located in Baneshwor, serving students in eastern Kathmandu with dedicated counselors.",
    image: "/branches/branch.png",
    coordinates: { lat: 27.6908, lng: 85.3433 },
  },
  samakhusi: {
    name: "Samakhusi Branch",
    city: "Samakhusi",
    address: "Samakhusi, Kathmandu, Nepal",
    phone: "+977 1 4971971",
    email: "samakhusi@nexsuseducation.com",
    hours: "Sun-Fri: 9AM - 6PM",
    mapUrl: "https://maps.google.com/?q=27.7295,85.3115",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.7295,85.3115&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Serving students in the northern Kathmandu valley area with personalized guidance.",
    image: "/branches/branch.png",
    coordinates: { lat: 27.7295, lng: 85.3115 },
  },
  banepa: {
    name: "Banepa Branch",
    city: "Banepa",
    address: "Banepa, Kavrepalanchok, Nepal",
    phone: "+977 11 665859",
    email: "banepa@nexsuseducation.com",
    hours: "Sun-Fri: 9AM - 6PM",
    mapUrl: "https://maps.google.com/?q=27.6291,85.5219",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.6291,85.5219&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Serving students in Kavrepalanchok and surrounding areas with comprehensive services.",
    image: "/branches/branch.png",
    coordinates: { lat: 27.6291, lng: 85.5219 },
  },
  birtamode: {
    name: "Birtamode Branch",
    city: "Birtamode",
    address: "Birtamode, Jhapa, Nepal",
    phone: "+977 23 591692",
    email: "birtamode@nexsuseducation.com",
    hours: "Sun-Fri: 9AM - 6PM",
    mapUrl: "https://maps.google.com/?q=26.6466,87.9893",
    mapEmbedUrl: "https://maps.google.com/maps?q=26.6466,87.9893&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Serving students in Jhapa and eastern Nepal region with dedicated support.",
    image: "/branches/branch.png",
    coordinates: { lat: 26.6466, lng: 87.9893 },
  },
  dhulabari: {
    name: "Dhulabari Branch",
    city: "Dhulabari",
    address: "Dhulabari, Jhapa, Nepal",
    phone: "+977 23 591127",
    email: "dhulabari@nexsuseducation.com",
    hours: "Sun-Fri: 9AM - 6PM",
    mapUrl: "https://maps.google.com/?q=26.6689,88.0412",
    mapEmbedUrl: "https://maps.google.com/maps?q=26.6689,88.0412&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Conveniently located in Dhulabari, serving the Jhapa district with expert guidance.",
    image: "/branches/branch.png",
    coordinates: { lat: 26.6689, lng: 88.0412 },
  },
  pokhara: {
    name: "Pokhara Branch",
    city: "Pokhara",
    address: "Lakeside, Pokhara",
    phone: "+977-61-555555",
    email: "pokhara@nexsuseducation.com",
    hours: "Sun-Fri: 10AM - 6PM",
    mapUrl: "https://maps.google.com/?q=28.2096,83.9568",
    mapEmbedUrl: "https://maps.google.com/maps?q=28.2096,83.9568&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Serving the western region of Nepal with dedicated counselors for Australia, UK, and Canada programs.",
    image: "/branches/branch.png",
    coordinates: { lat: 28.2096, lng: 83.9568 },
  },
  chitwan: {
    name: "Chitwan Branch",
    city: "Chitwan",
    address: "Bharatpur, Chitwan",
    phone: "+977-56-666666",
    email: "chitwan@nexsuseducation.com",
    hours: "Sun-Fri: 10AM - 6PM",
    mapUrl: "https://maps.google.com/?q=27.6766,84.4362",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.6766,84.4362&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Our Chitwan branch provides personalized guidance to students from the Terai region.",
    image: "/branches/branch.png",
    coordinates: { lat: 27.6766, lng: 84.4362 },
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

      {/* Branch Image Section */}
      <section className="px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 lg:h-96">
              <Image
                src={branch.image}
                alt={`${branch.name} office`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">{branch.name}</h3>
                <p className="text-white/80">{branch.address}</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Location</h2>
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-96 border border-gray-200">
              <iframe
                src={branch.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing ${branch.name} location`}
                className="w-full h-full"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-900 transition"
              >
                <Icon name="Navigation" size={16} />
                Get Directions
              </a>
              <a
                href={`tel:${branch.phone}`}
                className="inline-flex items-center gap-2 border border-brand-blue text-brand-blue px-5 py-2.5 rounded-full font-medium hover:bg-brand-blue/5 transition"
              >
                <Icon name="Phone" size={16} />
                Call Now
              </a>
            </div>
          </FadeUp>
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
