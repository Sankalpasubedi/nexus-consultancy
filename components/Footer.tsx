import Link from "next/link";
import { MapPin, Phone, Mail, Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl">
            Book a free consultation with our expert counselors and take the first step toward your dream university.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
            />
            <Link href="/contact" className="bg-white text-slate-900 px-8 py-3 rounded-full font-medium hover:bg-slate-100 transition flex items-center justify-center gap-2 whitespace-nowrap">
              Get Started <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold mb-4">NEX<span className="text-[#00ab18]">US</span></h3>
              <p className="text-slate-400 text-sm mb-4">
                Your trusted partner in international education. We guide students toward global opportunities with passion, integrity, and care.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition text-xs">f</a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition text-xs">X</a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition">
                  <Camera size={12} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition text-xs">in</a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/services" className="hover:text-white transition">Career Counseling</Link></li>
                <li><Link href="/services" className="hover:text-white transition">Application Support</Link></li>
                <li><Link href="/services" className="hover:text-white transition">Visa Assistance</Link></li>
                <li><Link href="/services" className="hover:text-white transition">Test Preparation</Link></li>
                <li><Link href="/services" className="hover:text-white transition">Scholarship Guidance</Link></li>
                <li><Link href="/services" className="hover:text-white transition">Pre-Departure</Link></li>
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/destinations/australia" className="hover:text-white transition">Australia</Link></li>
                <li><Link href="/destinations/usa" className="hover:text-white transition">United States</Link></li>
                <li><Link href="/destinations/canada" className="hover:text-white transition">Canada</Link></li>
                <li><Link href="/destinations/uk" className="hover:text-white transition">United Kingdom</Link></li>
                <li><Link href="/destinations/new-zealand" className="hover:text-white transition">New Zealand</Link></li>
                <li><Link href="/destinations/japan" className="hover:text-white transition">Japan</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/courses" className="hover:text-white transition">Courses</Link></li>
                <li><Link href="/study-abroad" className="hover:text-white transition">Study Abroad</Link></li>
                <li><Link href="/study-abroad/process" className="hover:text-white transition">Process</Link></li>
                <li><Link href="/study-abroad/documents" className="hover:text-white transition">Documents</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="font-semibold mb-4">Locations</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex gap-2">
                  <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Putalisadak, Kathmandu</span>
                </li>
                <li className="flex gap-2">
                  <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                  <span>789 George St, Sydney NSW</span>
                </li>
                <li className="flex gap-2">
                  <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                  <span>321 Collins St, Melbourne VIC</span>
                </li>
                <li className="flex gap-2">
                  <Phone size={14} className="flex-shrink-0 mt-0.5" />
                  <span>+977 1 4123456</span>
                </li>
                <li className="flex gap-2">
                  <Mail size={14} className="flex-shrink-0 mt-0.5" />
                  <span>info@nexus.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>&copy; 2026 NEXUS Education Consultancy. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
