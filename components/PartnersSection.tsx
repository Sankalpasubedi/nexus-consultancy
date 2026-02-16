const universities = [
  "OXFORD",
  "CAMBRIDGE",
  "MIT",
  "STANFORD",
  "HARVARD",
  "YALE",
  "U OF T",
  "MELBOURNE",
  "SYDNEY",
  "McGILL",
  "UCL",
  "IMPERIAL",
];

const stats = [
  { value: "98%", label: "Visa Success Rate" },
  { value: "$50M+", label: "Scholarships Secured" },
  { value: "15,000+", label: "Students Placed" },
];

export default function PartnersSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="inline-block px-5 py-2 mb-6 text-lg rounded-full bg-gray-100 text-slate-700">Trusted Partners</p>
          <h2 className="text-[16px] md:text-[18px] text-slate-900 mb-6">
            500+ Partner Universities
          </h2>
          <p className="text-base text-gray-600">
            Official partnerships with world-renowned institutions across the globe
          </p>
        </div>

        {/* University Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {universities.map((uni, index) => (
            <div
              key={index}
              className="bg-[#FAF5FF80] border border-gray-200 rounded-2xl p-8 md:p-10 text-center hover:border-gray-300 hover:shadow-sm transition-all duration-200 flex items-center justify-center min-h-[120px]"
            >
              <p className="text-gray-400 text-base tracking-wide">{uni}</p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="bg-[#262626] rounded-3xl p-10 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-gray-700">
            {stats.map((stat, index) => (
              <div key={index} className="text-center px-6">
                <p className="text-[12px] md:text-[16px] text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}