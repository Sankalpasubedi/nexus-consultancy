import { CountryDataType } from "@/types/country";

const japanData: CountryDataType = {
  country: "Japan", currency: "JPY", flagCode: "jp", accentColor: "#dc2626",
  carouselData: {
    CountryImages: [
      { id: 1, url: "/destinations/japan.png", location: "Tokyo" },
      { id: 2, url: "/destinations/japan.png", location: "Kyoto" },
      { id: 3, url: "/destinations/japan.png", location: "Osaka" },
    ],
    description: "Blend of tradition and innovation in world-class universities. Japan offers cutting-edge technology, rich cultural heritage, and affordable education with generous government scholarships.",
    guideLink: "#",
  },
  highlightedData: {
    statistics: [
      { id: 1, label: "Top Universities", value: "5 in World Top 200" },
      { id: 2, label: "Post-Study Work", value: "Designated Activities Visa" },
      { id: 3, label: "Popular Programs", value: "Engineering, Technology, Arts" },
      { id: 4, label: "Scholarship", value: "MEXT Government Scholarship" },
    ],
    description: "Japan combines cutting-edge technology with centuries of tradition. Affordable tuition, generous government scholarships, and a safe society make it an increasingly popular study destination.",
  },
  universities: [
    { id: "1", name: "University of Tokyo", location: { city: "Tokyo", state: "Tokyo" }, ranking: { position: 28, type: "Global" }, scholarship: { percentage: 45, accreditedBy: "MEXT", description: "MEXT Scholarship for international students" } },
    { id: "2", name: "Kyoto University", location: { city: "Kyoto", state: "Kyoto" }, ranking: { position: 46, type: "Global" }, scholarship: { percentage: 40, accreditedBy: "MEXT", description: "JASSO Honors Scholarship" } },
    { id: "3", name: "Tokyo Institute of Technology", location: { city: "Tokyo", state: "Tokyo" }, ranking: { position: 55, type: "Global" }, scholarship: { percentage: 35, accreditedBy: "MEXT", description: "Tokyo Tech Scholarship" } },
    { id: "4", name: "Osaka University", location: { city: "Osaka", state: "Osaka" }, ranking: { position: 68, type: "Global" }, scholarship: { percentage: 30, accreditedBy: "MEXT", description: "Osaka University Scholarship" } },
    { id: "5", name: "Tohoku University", location: { city: "Sendai", state: "Miyagi" }, ranking: { position: 79, type: "Global" }, scholarship: { percentage: 35, accreditedBy: "MEXT", description: "Tohoku University President's Fellowship" } },
  ],
  whyData: [
    "Affordable tuition at national universities",
    "MEXT government scholarships with full funding",
    "World leader in technology and engineering research",
    "Safe country with excellent public transportation",
    "Rich cultural heritage alongside modern innovation",
    "Growing number of English-taught programs",
  ],
  visaRequirements: {
    processingtime: "1-3 months",
    VisaCardData: [
      { id: "identity", title: "Identity Documents", icon: "IdCard", items: ["Valid passport", "Passport photographs (4.5x3.5cm)", "Certificate of Eligibility (CoE)"] },
      { id: "offer", title: "Admission Documents", icon: "GraduationCap", items: ["Acceptance letter from Japanese institution", "Certificate of Enrollment", "Course outline"] },
      { id: "financial", title: "Financial Documents", icon: "Landmark", items: ["Bank statements showing sufficient funds", "Scholarship certificate (if applicable)", "Sponsor documentation"] },
      { id: "academic", title: "Academic Documents", icon: "FileText", items: ["Academic transcripts", "JLPT or EJU scores", "Degree certificates"] },
      { id: "visa", title: "Visa Application", icon: "FileText", items: ["Visa application form", "Statement of reasons for study", "Study plan"] },
      { id: "health", title: "Health Requirements", icon: "HeartPulse", items: ["Medical certificate", "Health insurance enrollment", "TB screening certificate"] },
    ],
  },
  admissionRequirementsData: {
    Undergraduate: [
      { id: 1, text: "12 years of school education or equivalent" },
      { id: 2, text: "EJU examination scores" },
      { id: 3, text: "JLPT N2+ or English proficiency for English programs" },
      { id: 4, text: "University-specific entrance examination" },
    ],
    Postgraduate: [
      { id: 1, text: "Bachelor degree (16 years of education)" },
      { id: 2, text: "JLPT N1 or English proficiency" },
      { id: 3, text: "Research plan" },
      { id: 4, text: "Contact with potential supervisor" },
      { id: 5, text: "Academic transcripts and references" },
    ],
    Doctoral: [
      { id: 1, text: "Master degree in relevant field" },
      { id: 2, text: "Strong research background" },
      { id: 3, text: "Detailed research proposal" },
      { id: 4, text: "Academic references (2-3)" },
      { id: 5, text: "Publications preferred" },
    ],
  },
  costData: [
    { id: 1, category: "Accommodation", minCost: 30000, maxCost: 80000, percentage: 75 },
    { id: 2, category: "Food & Dining", minCost: 20000, maxCost: 40000, percentage: 60 },
    { id: 3, category: "Transport", minCost: 5000, maxCost: 15000, percentage: 45 },
    { id: 4, category: "Miscellaneous", minCost: 10000, maxCost: 25000, percentage: 50 },
  ],
  workData: [
    { title: "Part-Time Work", description: "Work up to 28 hours/week with permission from immigration", icon: "Briefcase" },
    { title: "Post-Study Work", description: "Designated Activities visa for job-seeking after graduation", icon: "FileText" },
    { title: "Career Prospects", description: "Growing demand for international talent in Japanese companies", icon: "TrendingUp" },
  ],
  scholarshipData: [
    { id: 1, name: "MEXT Scholarship", amount: "Full tuition + ¥143,000-145,000/month", eligibility: "Government-funded for all levels", deadline: "April (Embassy route)" },
    { id: 2, name: "JASSO Honors Scholarship", amount: "¥48,000/month", eligibility: "Privately-funded international students", deadline: "Varies" },
    { id: 3, name: "University Tuition Waivers", amount: "50-100% tuition reduction", eligibility: "Based on academic merit and financial need", deadline: "Varies" },
  ],
  cultureData: [
    { id: 1, title: "Traditional Arts", description: "Tea ceremony, calligraphy, martial arts, and traditional festivals" },
    { id: 2, title: "Pop Culture", description: "Anime, manga, gaming, and J-pop shape global youth culture" },
    { id: 3, title: "Cuisine", description: "UNESCO-recognized washoku cuisine from sushi to ramen" },
    { id: 4, title: "Technology & Innovation", description: "Bullet trains, robotics, and cutting-edge consumer technology" },
  ],
  testimonials: [
    { name: "Sunil Tamang", degree: "MEng Robotics", university: "University of Tokyo", country: "Japan", quote: "Japan's technology is decades ahead. NEXUS helped me secure a MEXT scholarship covering everything.", image: "/student/student1.jpg" },
    { name: "Rekha Pariyar", degree: "MBA", university: "Kyoto University", country: "Japan", quote: "The blend of traditional business ethics and modern innovation made my MBA truly unique.", image: "/student/student2.jpg" },
  ],
};

export default japanData;
