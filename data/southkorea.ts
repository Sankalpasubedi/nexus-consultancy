import { CountryDataType } from "@/types/country";

const southKoreaData: CountryDataType = {
  country: "South Korea", currency: "KRW", flagCode: "kr", accentColor: "#003975",
  carouselData: {
    CountryImages: [
      { id: 1, url: "/destinations/skorea.png", location: "Seoul" },
      { id: 2, url: "/destinations/skorea.png", location: "Busan" },
      { id: 3, url: "/destinations/skorea.png", location: "Jeju Island" },
    ],
    description: "Cutting-edge technology and rich cultural heritage await you. South Korea offers world-class education, K-culture experiences, and growing opportunities for international students.",
    guideLink: "#",
  },
  highlightedData: {
    statistics: [
      { id: 1, label: "Top Universities", value: "3 in World Top 100" },
      { id: 2, label: "Post-Study Work", value: "D-10 Job Seeking Visa" },
      { id: 3, label: "Popular Programs", value: "Technology, Business, Korean Studies" },
      { id: 4, label: "Scholarship", value: "KGSP Government Scholarship" },
    ],
    description: "South Korea combines technological innovation with rich cultural traditions. Affordable tuition, generous scholarships, and the growing influence of K-culture make it an exciting study destination.",
  },
  universities: [
    { id: "1", name: "Seoul National University", location: { city: "Seoul", state: "Seoul" }, ranking: { position: 29, type: "Global" }, scholarship: { percentage: 50, accreditedBy: "KCUE", description: "SNU Global Scholarship" } },
    { id: "2", name: "KAIST", location: { city: "Daejeon", state: "Daejeon" }, ranking: { position: 42, type: "Global" }, scholarship: { percentage: 60, accreditedBy: "KCUE", description: "KAIST International Student Scholarship" } },
    { id: "3", name: "POSTECH", location: { city: "Pohang", state: "Gyeongbuk" }, ranking: { position: 71, type: "Global" }, scholarship: { percentage: 55, accreditedBy: "KCUE", description: "POSTECH Full Scholarship" } },
    { id: "4", name: "Yonsei University", location: { city: "Seoul", state: "Seoul" }, ranking: { position: 76, type: "Global" }, scholarship: { percentage: 40, accreditedBy: "KCUE", description: "Yonsei International Scholarship" } },
    { id: "5", name: "Korea University", location: { city: "Seoul", state: "Seoul" }, ranking: { position: 79, type: "Global" }, scholarship: { percentage: 35, accreditedBy: "KCUE", description: "KU Global Scholarship" } },
  ],
  whyData: [
    "World leader in technology and innovation",
    "Korean Government Scholarship Program (KGSP) with full funding",
    "Affordable tuition at top-ranked universities",
    "Safe country with excellent infrastructure",
    "Rich cultural experiences (K-pop, K-drama, cuisine)",
    "Growing opportunities for English-speaking professionals",
  ],
  visaRequirements: {
    processingtime: "2-4 weeks",
    VisaCardData: [
      { id: "identity", title: "Identity Documents", icon: "IdCard", items: ["Valid passport", "Passport photographs", "Visa application form"] },
      { id: "offer", title: "Admission Documents", icon: "GraduationCap", items: ["Certificate of Admission", "Business registration of the institution", "Study plan"] },
      { id: "financial", title: "Financial Documents", icon: "Landmark", items: ["Bank balance certificate ($10,000+)", "Financial guarantee letter", "Scholarship certificate"] },
      { id: "academic", title: "Academic Documents", icon: "FileText", items: ["Academic transcripts", "TOPIK or English proficiency scores", "Degree certificates"] },
      { id: "visa", title: "Visa Application", icon: "FileText", items: ["D-2 student visa application", "Visa fee payment", "Health certificate"] },
      { id: "health", title: "Health Requirements", icon: "HeartPulse", items: ["Medical examination", "TB screening", "Health insurance enrollment"] },
    ],
  },
  admissionRequirementsData: {
    Undergraduate: [
      { id: 1, text: "High school diploma or equivalent" },
      { id: 2, text: "TOPIK Level 3+ or IELTS 5.5+ for English programs" },
      { id: 3, text: "Academic transcripts" },
      { id: 4, text: "Personal statement and study plan" },
    ],
    Postgraduate: [
      { id: 1, text: "Bachelor degree from recognized institution" },
      { id: 2, text: "TOPIK Level 4+ or IELTS 6.0+" },
      { id: 3, text: "Research proposal for research programs" },
      { id: 4, text: "Letters of recommendation (2)" },
      { id: 5, text: "Portfolio for arts programs" },
    ],
    Doctoral: [
      { id: 1, text: "Master degree in relevant field" },
      { id: 2, text: "TOPIK Level 5+ or IELTS 6.5+" },
      { id: 3, text: "Research proposal and publications" },
      { id: 4, text: "Academic references (3)" },
    ],
  },
  costData: [
    { id: 1, category: "Accommodation", minCost: 300000, maxCost: 800000, percentage: 75 },
    { id: 2, category: "Food & Dining", minCost: 200000, maxCost: 400000, percentage: 60 },
    { id: 3, category: "Transport", minCost: 50000, maxCost: 100000, percentage: 40 },
    { id: 4, category: "Miscellaneous", minCost: 100000, maxCost: 250000, percentage: 50 },
  ],
  workData: [
    { title: "Part-Time Work", description: "Work 20 hours/week after 6 months of study with permission", icon: "Briefcase" },
    { title: "D-10 Job Seeking Visa", description: "Post-graduation visa for job seeking in Korea", icon: "FileText" },
    { title: "Tech Industry", description: "Growing demand for skilled workers in Samsung, LG, Hyundai, and startups", icon: "TrendingUp" },
  ],
  scholarshipData: [
    { id: 1, name: "KGSP (Korean Government Scholarship)", amount: "Full tuition + living + airfare", eligibility: "International students at all levels", deadline: "February-March" },
    { id: 2, name: "University-specific Scholarships", amount: "50-100% tuition reduction", eligibility: "Based on grades and TOPIK level", deadline: "Varies" },
  ],
  cultureData: [
    { id: 1, title: "K-Culture Wave", description: "K-pop, K-drama, and Korean cuisine have global influence" },
    { id: 2, title: "Ancient Heritage", description: "Palaces, temples, and traditional villages preserving centuries of history" },
    { id: 3, title: "Technology Hub", description: "One of the most connected countries with ultra-fast internet" },
    { id: 4, title: "Food Culture", description: "BBQ, kimchi, street food, and a UNESCO-recognized culinary tradition" },
  ],
  testimonials: [
    { name: "Pradeep Lama", degree: "MSc AI", university: "KAIST", country: "South Korea", quote: "KAIST's research facilities are world-class. Nexsus helped me get a full KGSP scholarship.", image: "/student/student1.jpg" },
    { name: "Samjhana Thapa", degree: "BA Korean Studies", university: "Seoul National University", country: "South Korea", quote: "Living in Seoul while studying Korean culture was an amazing experience.", image: "/student/student2.jpg" },
  ],
};

export default southKoreaData;
