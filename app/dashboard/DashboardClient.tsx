"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem, HoverCard } from "@/lib/animations";
import { Icon } from "@/lib/icons";

const quickLinks = [
  {
    title: "Application Tracker",
    description: "Track your university applications",
    icon: "ClipboardList",
    href: "/contact",
    color: "#6366f1",
  },
  {
    title: "Document Checklist",
    description: "View required documents",
    icon: "FileText",
    href: "/study-abroad/documents-required",
    color: "#10b981",
  },
  {
    title: "Visa Status",
    description: "Check visa application status",
    icon: "ShieldCheck",
    href: "/services/student-visa-assistance",
    color: "#f59e0b",
  },
  {
    title: "Upcoming Events",
    description: "Webinars and seminars",
    icon: "Calendar",
    href: "/contact",
    color: "#ec4899",
  },
];

const upcomingActions = [
  { task: "Submit English Proficiency Test scores", deadline: "5 days left", priority: "high" },
  { task: "Complete financial documents", deadline: "2 weeks left", priority: "medium" },
  { task: "Book pre-departure session", deadline: "1 month left", priority: "low" },
];

export default function DashboardClient() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-32 pb-20">
      {/* Header */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Welcome Back, Student!
            </h1>
            <p className="text-slate-600">
              Track your study abroad journey and upcoming tasks.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <StaggerItem key={link.title}>
                <HoverCard>
                  <Link href={link.href} className="block bg-white rounded-xl p-5 border border-gray-100 h-full">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${link.color}15` }}
                    >
                      <Icon name={link.icon} size={22} className="text-indigo-500" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{link.title}</h3>
                    <p className="text-sm text-slate-500">{link.description}</p>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Application Progress */}
            <FadeUp className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-slate-900 text-lg mb-6">Your Journey Progress</h3>
                <div className="space-y-4">
                  {[
                    { step: "Profile Setup", status: "completed" },
                    { step: "University Selection", status: "completed" },
                    { step: "Document Preparation", status: "in-progress" },
                    { step: "Application Submission", status: "pending" },
                    { step: "Visa Process", status: "pending" },
                    { step: "Pre-Departure", status: "pending" },
                  ].map((item, i) => (
                    <div key={item.step} className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          item.status === "completed"
                            ? "bg-brand-green text-white"
                            : item.status === "in-progress"
                            ? "bg-brand-blue text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {item.status === "completed" ? (
                          <Icon name="Check" size={16} />
                        ) : (
                          i + 1
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${item.status === "pending" ? "text-slate-400" : "text-slate-900"}`}>
                          {item.step}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "in-progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.status === "in-progress" ? "In Progress" : item.status === "completed" ? "Done" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Upcoming Tasks */}
            <FadeUp delay={0.1}>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full">
                <h3 className="font-bold text-slate-900 text-lg mb-6">Upcoming Tasks</h3>
                <div className="space-y-4">
                  {upcomingActions.map((action) => (
                    <div key={action.task} className="p-3 bg-slate-50 rounded-xl">
                      <p className="font-medium text-slate-900 text-sm mb-2">{action.task}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">{action.deadline}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            action.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : action.priority === "medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {action.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-brand-blue text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-900 transition"
                >
                  Contact Counselor
                  <Icon name="ArrowRight" size={14} />
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="bg-gradient-to-r from-brand-blue to-blue-900 rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-2">Need Help?</h2>
              <p className="text-white/80 mb-6">Our counselors are available to assist you at every step.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-brand-blue px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition"
              >
                Schedule a Call
                <Icon name="Phone" size={16} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
