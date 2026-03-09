"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { 
  Branch, 
  FAQ, 
  branches, 
  extractBranchId, 
  getOtherBranches,
  getBranchById 
} from "@/data/branches";

interface BranchDetailClientProps {
  slug: string;
}

// Services data
const services = [
  { icon: "BookOpen", title: "Test Preparation", description: "Achieve your target score with our expert-led test prep for IELTS, TOEFL, PTE and SAT." },
  { icon: "GraduationCap", title: "Education Counseling", description: "Get free, personalized guidance to find the perfect course and university for your career goals." },
  { icon: "DollarSign", title: "Scholarship Guidance", description: "We help you secure scholarships and financial aid to make your study abroad dream a reality." },
  { icon: "Building2", title: "University Admissions", description: "Stand out with a tailored application that gets you accepted into your top-choice university." },
  { icon: "FileCheck", title: "Visa Applications", description: "Get expert support for documentation and interview prep to simplify your visa application process." },
  { icon: "Home", title: "Student Accommodation", description: "We find safe and comfortable student housing for you, ensuring a smooth and stress-free start." },
];

// FAQ Accordion Component
function FAQAccordion({ faqs, branchName }: { faqs: FAQ[]; branchName: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border-b border-gray-100">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between py-4 text-left"
          >
            <span className="font-medium text-slate-900 pr-8">{faq.question}</span>
            <motion.div
              animate={{ rotate: openIndex === idx ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <Icon name="Plus" size={20} className="text-slate-400" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-slate-600 pb-4 text-sm leading-relaxed">{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function BranchDetailClient({ slug }: BranchDetailClientProps) {
  const branchId = extractBranchId(slug.toLowerCase());
  const branch = getBranchById(branchId);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Carousel state for testimonials
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  
  // Auto-scroll effect for testimonials carousel
  useEffect(() => {
    if (!branch || carouselPaused) return;
    
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % branch.testimonials.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [branch, carouselPaused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission - backend integration will be done later
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", { ...formData, branch: branch?.name });
    setSubmitSuccess(true);
    setIsSubmitting(false);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        inquiryType: "",
        subject: "",
        message: "",
      });
      setSubmitSuccess(false);
    }, 3000);
  };

  // Early return for not found branches
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

  const otherBranches = getOtherBranches(branchId);

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 text-brand-blue hover:text-blue-900 mb-6 font-medium"
            >
              <Icon name="ArrowLeft" size={16} />
              All Branches
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {branch.name}
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl">
              {branch.description}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Main Content: Map + Contact */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <FadeUp>
              <div className="relative rounded-2xl overflow-hidden h-[400px] border border-gray-200 shadow-sm">
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
            </FadeUp>

            {/* Contact Info */}
            <FadeUp delay={0.1}>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
                <p className="text-slate-700 font-medium mb-4">Nexsus Education Consultants in {branch.city} - Nepal</p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={18} className="text-brand-blue mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-slate-600">{branch.address}</p>
                      <p className="text-slate-500 text-sm">{branch.district}, Nepal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={18} className="text-brand-blue mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-slate-700 font-medium">Office Timings:</p>
                      <p className="text-slate-600">{branch.openingHours}</p>
                      {branch.saturdayHours && <p className="text-slate-600">{branch.saturdayHours}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Icon name="Phone" size={16} className="text-brand-blue" />
                      <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="text-slate-600 hover:text-brand-blue">
                        {branch.phone}
                      </a>
                    </div>
                    {branch.whatsapp && (
                      <a 
                        href={`https://wa.me/${branch.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-green-600 hover:text-green-700"
                      >
                        <Icon name="MessageCircle" size={16} />
                        WhatsApp
                      </a>
                    )}
                  </div>
                  
                  {branch.phone2 && (
                    <div className="flex items-center gap-2">
                      <Icon name="Phone" size={16} className="text-brand-blue" />
                      <a href={`tel:${branch.phone2.replace(/\s/g, '')}`} className="text-slate-600 hover:text-brand-blue">
                        {branch.phone2}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={16} className="text-brand-blue" />
                    <a href={`mailto:${branch.email}`} className="text-slate-600 hover:text-brand-blue">
                      {branch.email}
                    </a>
                  </div>
                </div>

                {/* Get Directions */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-medium text-slate-900 mb-3">Get Directions</p>
                  <div className="flex gap-3">
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-900 transition"
                    >
                      <Icon name="Navigation" size={14} />
                      By Road
                    </a>
                    <a
                      href={`tel:${branch.phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-2 border border-gray-200 text-slate-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition"
                    >
                      <Icon name="Phone" size={14} />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Book Consultation Form */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <FadeUp>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  Book Your <span className="text-brand-blue">FREE Consultation</span> Call
                </h3>
                <p className="text-slate-600 text-sm mb-6">with our Certified Counselors</p>
                
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 rounded-xl p-6 text-center"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Check" size={24} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-1 text-green-800">Thank You!</h4>
                    <p className="text-green-700 text-sm">We&apos;ll contact you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name*"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email ID*"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                    />
                    <div className="flex gap-2">
                      <div className="w-20 px-3 py-3 rounded-lg border border-gray-200 text-slate-600 text-sm flex items-center justify-center">
                        +977
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Mobile Number*"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        name="inquiryType"
                        required
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                      >
                        <option value="" disabled>Inquiry Type*</option>
                        <option value="study-abroad">Study Abroad</option>
                        <option value="visa-assistance">Visa Assistance</option>
                        <option value="test-preparation">Test Preparation</option>
                        <option value="scholarship">Scholarship</option>
                        <option value="career-counseling">Career Counseling</option>
                        <option value="other">Other</option>
                      </select>
                      <select
                        name="destination"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                      >
                        <option value="" disabled selected>Destination</option>
                        <option value="australia">Australia</option>
                        <option value="uk">United Kingdom</option>
                        <option value="usa">United States</option>
                        <option value="canada">Canada</option>
                        <option value="newzealand">New Zealand</option>
                        <option value="europe">Europe</option>
                        <option value="japan">Japan</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject (e.g., MBA in Australia)"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                    />
                    <textarea
                      name="message"
                      placeholder="Your Message (Optional)"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm resize-none"
                    />
                    
                    <div className="flex items-start gap-2 text-sm">
                      <input type="checkbox" id="terms" required className="mt-1 accent-brand-blue" />
                      <label htmlFor="terms" className="text-slate-600">
                        I agree to Nexsus&apos;s{" "}
                        <Link href="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>
                        {" "}and{" "}
                        <Link href="/terms" className="text-brand-blue hover:underline">Terms & Conditions</Link> *
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Icon name="Loader2" size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Get Started
                          <Icon name="ArrowRight" size={16} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeUp>

            {/* Service Features */}
            <FadeUp delay={0.1}>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "End-to-End Assistance", icon: "CheckCircle" },
                    { label: "Expert Guidance", icon: "Users" },
                    { label: "Visa & Financial Assistance", icon: "FileCheck" },
                    { label: "Career & Post-Study Planning", icon: "Target" },
                  ].map((feature) => (
                    <div key={feature.label} className="bg-slate-50 rounded-xl p-4 text-center">
                      <Icon name={feature.icon} size={24} className="text-brand-blue mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-700">{feature.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Overseas Education Consultants in {branch.city}
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              {branch.longDescription.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {branch.stats.map((stat, idx) => (
              <FadeUp key={stat.label} delay={idx * 0.1}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-brand-blue mb-1">{stat.value}</p>
                  <p className="text-slate-600 text-sm">{stat.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <p className="text-center text-slate-400 text-xs mt-6">(As of Mar &apos;26)*</p>
        </div>
      </section>

      {/* Testimonials Section - Auto-scroll Carousel */}
      <section className="px-6 py-16 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  Student Success Stories
                </h2>
                <p className="text-slate-600 max-w-2xl">
                  Real experiences from students who achieved their study abroad dreams with Nexsus.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button 
                  onClick={() => setCarouselIndex(prev => prev === 0 ? branch.testimonials.length - 1 : prev - 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition"
                >
                  <Icon name="ChevronLeft" size={18} />
                </button>
                <button 
                  onClick={() => setCarouselIndex(prev => (prev + 1) % branch.testimonials.length)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition"
                >
                  <Icon name="ChevronRight" size={18} />
                </button>
              </div>
            </div>
          </FadeUp>
          
          <div 
            className="relative"
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
          >
            <div 
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(-${carouselIndex * (100 / 3)}%)` }}
            >
              {[...branch.testimonials, ...branch.testimonials].map((testimonial, idx) => (
                <div 
                  key={`${testimonial.id}-${idx}`} 
                  className="min-w-[calc(33.333%-1rem)] flex-shrink-0 md:min-w-[calc(33.333%-1rem)] sm:min-w-[calc(50%-0.75rem)] max-sm:min-w-full"
                >
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
                    <div className="flex items-center gap-1 text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" size={14} className="fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed flex-grow mb-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                        <span className="text-brand-blue font-semibold text-sm">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
                        <p className="text-slate-500 text-xs">{testimonial.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-6">
              {branch.testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === carouselIndex % branch.testimonials.length 
                      ? 'w-6 bg-brand-blue' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Story + Google Rating */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Share Your Success Story Today
              </h2>
              <p className="text-slate-600 mb-6">
                If we&apos;ve worked together and made an impact, we&apos;d be grateful if you could take a moment to share your story with us.
              </p>
              
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <span className="text-3xl font-bold text-brand-blue">{branch.googleRating}</span>
                  <span className="text-slate-600"> of 5</span>
                  <p className="text-slate-500 text-sm">{branch.city} - Nepal</p>
                </div>
                <div className="border-l border-gray-200 pl-6">
                  <div className="flex gap-1 text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={18} className={i < Math.floor(branch.googleRating) ? "fill-current" : ""} />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm"><span className="font-semibold">{branch.googleReviews} Reviews</span> on Google</p>
                </div>
              </div>
              
              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-brand-blue text-brand-blue px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-blue/5 transition"
              >
                Share Your Story Now
              </a>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                    <Image
                      src={branch.image}
                      alt={`Success story ${i}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Services We Offer
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl">
              From test preparation to visa application, we offer end-to-end support to help you achieve your study abroad aspirations.
            </p>
          </FadeUp>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <FadeUp key={service.title} delay={idx * 0.05}>
                <div className="bg-white rounded-xl p-6 border border-gray-100 h-full">
                  <div className="w-14 h-14 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={24} className="text-brand-blue" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm">{service.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Nexsus Study Abroad Consultants in {branch.city}
            </h2>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <FAQAccordion faqs={branch.faqs} branchName={branch.name} />
          </FadeUp>
        </div>
      </section>

      {/* Other Locations */}
      <section className="px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Other Nexsus Locations
            </h2>
            <div className="flex flex-wrap gap-3">
              {otherBranches.map((b) => (
                <Link
                  key={b.id}
                  href={`/branches/find-us-at-${b.id}`}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-brand-blue hover:text-white transition"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
