"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { Icon } from "@/lib/icons";
import { getExamBySlug, getOtherExams, ExamData } from "../examData";

interface ExamDetailClientProps {
  slug: string;
}

// Student Stories Auto-scroll Carousel
function StudentStoriesCarousel({ testimonials }: { testimonials: ExamData["testimonials"] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Arrows */}
      <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => setCurrentIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1)}
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white transition"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
      </div>
      <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white transition"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>

      {/* Carousel Container */}
      <div className="overflow-hidden rounded-2xl">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full shrink-0 px-4">
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Avatar & Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{testimonial.name}</h4>
                      <p className="text-brand-blue font-semibold">{testimonial.score}</p>
                      <p className="text-slate-500 text-sm">{testimonial.university}</p>
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <div className="flex-1">
                    <div className="text-4xl text-brand-blue/20 mb-2">&ldquo;</div>
                    <p className="text-slate-700 text-lg leading-relaxed -mt-4">
                      {testimonial.quote}
                    </p>
                    <div className="flex gap-1 mt-4 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? "w-8 bg-brand-blue" 
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ExamDetailClient({ slug }: ExamDetailClientProps) {
  const exam = getExamBySlug(slug);
  const otherExams = getOtherExams(slug);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Enrollment submitted:", { ...formData, exam: exam?.title });
    setSubmitSuccess(true);
    setIsSubmitting(false);
    setTimeout(() => {
      setFormData({ fullName: "", email: "", phone: "", preferredDate: "", message: "" });
      setSubmitSuccess(false);
    }, 3000);
  };

  if (!exam) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Exam Not Found</h1>
            <p className="text-slate-600 mb-8">The requested exam preparation page does not exist.</p>
            <Link
              href="/services/test-preparation"
              className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition"
            >
              <Icon name="ArrowLeft" size={16} />
              Back to Test Preparation
            </Link>
          </FadeUp>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[550px] overflow-hidden">
        <Image
          src={exam.heroImage}
          alt={exam.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24">
          <FadeUp>
            <Link
              href="/services/test-preparation"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium transition"
            >
              <Icon name="ArrowLeft" size={16} />
              All Test Preparations
            </Link>
          </FadeUp>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeUp delay={0.1}>
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon name={exam.icon} size={28} className="text-white" />
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-medium border border-white/20">
                    {exam.validity} Validity
                  </span>
                </div>
              </FadeUp>
              
              <FadeUp delay={0.15}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">
                  {exam.title}
                </h1>
              </FadeUp>
              
              <FadeUp delay={0.2}>
                <p className="text-xl text-white/80 mb-4">{exam.subtitle}</p>
              </FadeUp>
              
              <FadeUp delay={0.25}>
                <p className="text-white/70 mb-8 max-w-lg leading-relaxed">
                  {exam.description}
                </p>
              </FadeUp>
              
              <FadeUp delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#enroll"
                    className="inline-flex items-center gap-2 bg-white text-brand-blue px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition shadow-lg"
                  >
                    Enroll Now <Icon name="ArrowRight" size={16} />
                  </a>
                  <a
                    href="#sections"
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition"
                  >
                    View Test Sections
                  </a>
                </div>
              </FadeUp>
            </div>
            
            {/* Quick Stats Card */}
            <FadeUp delay={0.35}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="hidden lg:block bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Icon name="Clock" size={24} className="text-white mx-auto mb-2" />
                    <p className="text-white font-bold">{exam.duration}</p>
                    <p className="text-white/60 text-sm">Duration</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Icon name="CreditCard" size={24} className="text-white mx-auto mb-2" />
                    <p className="text-white font-bold">{exam.fee}</p>
                    <p className="text-white/60 text-sm">Test Fee</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Icon name="BarChart3" size={24} className="text-white mx-auto mb-2" />
                    <p className="text-white font-bold">{exam.scoreRange}</p>
                    <p className="text-white/60 text-sm">Score Range</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Icon name="TrendingUp" size={24} className="text-white mx-auto mb-2" />
                    <p className="text-white font-bold">{exam.stat}</p>
                    <p className="text-white/60 text-sm">{exam.statLabel}</p>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-6 bg-brand-blue">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {exam.features.map((feature, idx) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-2 text-white"
              >
                <Icon name="CheckCircle" size={16} className="text-white/80" />
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <span className="text-brand-blue font-semibold text-sm tracking-wide uppercase mb-3 block">About the Test</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                What is {exam.title}?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {exam.detailedDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-slate-500 text-sm font-medium">Accepted by:</span>
                {exam.acceptedBy.map((org) => (
                  <span key={org} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    {org}
                  </span>
                ))}
              </div>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                  <Image
                    src={exam.image}
                    alt={`${exam.title} preparation`}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating stat card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
                >
                  <p className="text-3xl font-bold text-brand-blue">{exam.stat}</p>
                  <p className="text-slate-600 text-sm">{exam.statLabel}</p>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Test Sections */}
      <section id="sections" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-brand-blue font-semibold text-sm tracking-wide uppercase mb-3 block">Test Structure</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {exam.title} Test Sections
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Understand each section of the test and prepare strategically for maximum score.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {exam.sections.map((section, idx) => (
              <StaggerItem key={section.name}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold text-lg shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{section.name}</h3>
                        <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-medium">
                          {section.duration}
                        </span>
                      </div>
                      <p className="text-slate-600">{section.description}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Preparation Tips */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <span className="text-brand-blue font-semibold text-sm tracking-wide uppercase mb-3 block">Expert Advice</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Preparation Tips from Our Experts
              </h2>
              <p className="text-slate-600 mb-8">
                Our experienced trainers have helped thousands of students achieve their target scores. Here are their top tips for {exam.title} success.
              </p>
              
              <div className="space-y-4">
                {exam.tips.map((tip, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name="Lightbulb" size={14} className="text-brand-blue" />
                    </div>
                    <span className="text-slate-700">{tip}</span>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <div className="bg-gradient-to-br from-brand-blue to-blue-800 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Why Choose Nexsus?</h3>
                <div className="space-y-4">
                  {[
                    { icon: "Users", text: "15+ Expert Certified Trainers" },
                    { icon: "Target", text: "95% Target Score Achievement" },
                    { icon: "BookOpen", text: "500+ Practice Tests Available" },
                    { icon: "Clock", text: "Flexible Batch Timings" },
                    { icon: "Award", text: "Proven Track Record Since 2010" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                        <Icon name={item.icon} size={18} />
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Student Stories Carousel */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="text-brand-blue font-semibold text-sm tracking-wide uppercase mb-3 block">Success Stories</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Students Who Aced {exam.title}
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Real stories from real students who achieved their dream scores with Nexsus coaching.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <StudentStoriesCarousel testimonials={exam.testimonials} />
          </FadeUp>
        </div>
      </section>

      {/* Enrollment Form */}
      <section id="enroll" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeUp>
              <span className="text-brand-blue font-semibold text-sm tracking-wide uppercase mb-3 block">Get Started</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Enroll for {exam.title} Preparation
              </h2>
              <p className="text-slate-600 mb-8">
                Take the first step towards achieving your target {exam.title} score. Fill out the form and our team will get in touch with you shortly.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Free diagnostic test to assess your current level",
                  "Personalized study plan based on your timeline",
                  "Access to comprehensive study materials",
                  "Regular mock tests with detailed feedback",
                  "One-on-one doubt clearing sessions",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={20} className="text-brand-blue shrink-0 mt-0.5" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6">
                <p className="text-slate-900 font-semibold mb-2">Have questions?</p>
                <p className="text-slate-600 text-sm mb-4">Call us or WhatsApp for instant support</p>
                <div className="flex gap-3">
                  <a
                    href="tel:+9771234567890"
                    className="inline-flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition"
                  >
                    <Icon name="Phone" size={14} />
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/9771234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition"
                  >
                    <Icon name="MessageCircle" size={14} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Start Your {exam.title} Journey
                </h3>
                
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 rounded-xl p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Check" size={32} className="text-white" />
                    </div>
                    <h4 className="font-bold text-xl mb-2 text-green-800">Enrollment Request Received!</h4>
                    <p className="text-green-700">Our team will contact you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                      <div className="flex gap-2">
                        <div className="w-20 px-3 py-3 rounded-lg border border-gray-200 text-slate-600 text-sm flex items-center justify-center bg-slate-50">
                          +977
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="98XXXXXXXX"
                          className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Batch</label>
                      <select
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                      >
                        <option value="">Select preferred batch timing</option>
                        <option value="morning">Morning Batch (7 AM - 9 AM)</option>
                        <option value="day">Day Batch (11 AM - 1 PM)</option>
                        <option value="evening">Evening Batch (5 PM - 7 PM)</option>
                        <option value="weekend">Weekend Batch (Sat-Sun)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Message (Optional)</label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Any specific requirements or questions?"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-brand-blue text-white px-6 py-3.5 rounded-full font-semibold hover:bg-blue-900 transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Icon name="Loader2" size={18} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Enroll Now
                          <Icon name="ArrowRight" size={18} />
                        </>
                      )}
                    </button>
                    <p className="text-center text-slate-500 text-xs">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>
                    </p>
                  </form>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Other Exams */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Explore Other Test Preparations
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherExams.slice(0, 3).map((otherExam) => (
                <Link
                  key={otherExam.slug}
                  href={`/services/test-preparation/${otherExam.slug}`}
                  className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-brand-blue/30 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition">
                      <Icon name={otherExam.icon} size={22} className="text-brand-blue group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-brand-blue transition">
                        {otherExam.title}
                      </h3>
                      <p className="text-slate-500 text-sm">{otherExam.subtitle}</p>
                    </div>
                    <Icon name="ArrowRight" size={18} className="text-slate-400 ml-auto group-hover:text-brand-blue group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
