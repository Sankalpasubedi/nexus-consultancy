const services = [
  {
    id: 1,
    title: "Career Counseling",
    description:
      "Personalized guidance to identify the perfect course and university aligned with your career goals.",
    icon: "compass",
  },
  {
    id: 2,
    title: "Application Support",
    description:
      "End-to-end assistance with university applications, SOPs, and documentation.",
    icon: "document",
  },
  {
    id: 3,
    title: "Visa Assistance",
    description:
      "Expert visa guidance with high success rates and interview preparation.",
    icon: "plane",
  },
  {
    id: 4,
    title: "Test Preparation",
    description:
      "Comprehensive prep for IELTS, TOEFL, GRE, GMAT, and other standardized tests.",
    icon: "book",
  },
  {
    id: 5,
    title: "Scholarship Guidance",
    description:
      "Maximize your chances with scholarship applications and financial aid support.",
    icon: "award",
  },
  {
    id: 6,
    title: "Pre-Departure Briefing",
    description:
      "Prepare for your journey with accommodation, culture, and essential travel guidance.",
    icon: "search",
  },
];

export default function ServicesSection() {
  const renderIcon = (iconType: string) => {
    const iconClass = "w-5 h-5 text-white";
    
    switch (iconType) {
      case "compass":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case "document":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case "plane":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        );
      case "book":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "award":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case "search":
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="inline-block px-5 py-2 mb-6 text-lg rounded-full bg-gray-200 text-slate-700">Our Services</p>
          <h2 className="text-[16px] md:text-[18px] text-slate-900 mb-6">
            Everything You Need for Success
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Comprehensive support from initial consultation to your first day on campus
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-8 bg-white border border-gray-200 rounded-3xl hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-5">
                {renderIcon(service.icon)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="bg-black text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
            Explore All Services
          </button>
        </div>
      </div>
    </section>
  );
}