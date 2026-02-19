import { CountryDataType } from "@/types/country";

const usaData: CountryDataType = {
  country: "United States",
  currency: "USD",
  flagCode: "us",
  accentColor: "#2563eb",
  carouselData: {
    CountryImages: [
      { id: 1, url: "/destinations/USA.png", location: "New York City" },
      { id: 2, url: "/destinations/USA.png", location: "San Francisco" },
      { id: 3, url: "/destinations/USA.png", location: "Boston" },
      { id: 4, url: "/destinations/USA.png", location: "Los Angeles" },
      { id: 5, url: "/destinations/USA.png", location: "Chicago" },
    ],
    description: "Pursue excellence at the world's leading universities with unmatched research opportunities, diverse campus culture, and pathways to global careers in the world's largest economy.",
    guideLink: "#",
  },
  highlightedData: {
    statistics: [
      { id: 1, label: "Top Universities", value: "5 in World Top 10" },
      { id: 2, label: "Post-Study Work", value: "OPT 1-3 years (STEM)" },
      { id: 3, label: "Popular Programs", value: "CS, Engineering, Business" },
      { id: 4, label: "Research", value: "World's largest research spending" },
    ],
    description: "The United States is home to the world's most prestigious universities, cutting-edge research facilities, and unmatched career opportunities across every industry.",
  },
  universities: [
    { id: "1", name: "Massachusetts Institute of Technology", location: { city: "Cambridge", state: "MA" }, ranking: { position: 1, type: "Global" }, scholarship: { percentage: 60, accreditedBy: "NEASC", description: "Need-blind admissions with full financial aid" } },
    { id: "2", name: "Stanford University", location: { city: "Stanford", state: "CA" }, ranking: { position: 5, type: "Global" }, scholarship: { percentage: 58, accreditedBy: "WASC", description: "Full tuition for families under $150K" } },
    { id: "3", name: "Harvard University", location: { city: "Cambridge", state: "MA" }, ranking: { position: 4, type: "Global" }, scholarship: { percentage: 55, accreditedBy: "NEASC", description: "Generous financial aid for all admitted students" } },
    { id: "4", name: "California Institute of Technology", location: { city: "Pasadena", state: "CA" }, ranking: { position: 6, type: "Global" }, scholarship: { percentage: 50, accreditedBy: "WASC", description: "Need-based financial aid" } },
    { id: "5", name: "University of Chicago", location: { city: "Chicago", state: "IL" }, ranking: { position: 11, type: "Global" }, scholarship: { percentage: 45, accreditedBy: "HLC", description: "Odyssey Scholarship Program" } },
    { id: "6", name: "Columbia University", location: { city: "New York", state: "NY" }, ranking: { position: 12, type: "Global" }, scholarship: { percentage: 50, accreditedBy: "MSCHE", description: "Need-blind admissions" } },
  ],
  whyData: [
    "Home to the most prestigious universities globally",
    "OPT allows 1-3 years of post-study work (STEM extension)",
    "Unmatched research and innovation ecosystem",
    "Extensive scholarship opportunities for international students",
    "Diverse campus culture and global networking",
    "Flexible education system with major/minor combinations",
  ],
  visaRequirements: {
    processingtime: "3-5 weeks",
    VisaCardData: [
      { id: "identity", title: "Identity & Travel Documents", icon: "IdCard", items: ["Valid passport (6+ months validity)", "DS-160 confirmation page", "Passport-size photographs"] },
      { id: "offer", title: "Admission Documents", icon: "GraduationCap", items: ["I-20 form from SEVP-certified school", "SEVIS fee payment receipt", "Offer letter from university"] },
      { id: "financial", title: "Financial Documents", icon: "Landmark", items: ["Bank statements showing sufficient funds", "I-134 Affidavit of Support", "Scholarship letter (if applicable)", "Financial sponsor documents"] },
      { id: "academic", title: "Academic Documents", icon: "FileText", items: ["Academic transcripts", "Standardized test scores (GRE/GMAT/SAT)", "English proficiency scores (TOEFL/IELTS)"] },
      { id: "visa", title: "Visa Interview Documents", icon: "FileText", items: ["Visa appointment confirmation", "Statement of Purpose", "Research plan (for research students)"] },
      { id: "health", title: "Additional Requirements", icon: "HeartPulse", items: ["Medical examination (if required)", "Police clearance certificate", "Previous visa documents"] },
    ],
  },
  admissionRequirementsData: {
    Undergraduate: [
      { id: 1, text: "High school diploma or equivalent" },
      { id: 2, text: "SAT or ACT scores (some schools test-optional)" },
      { id: 3, text: "TOEFL 80+ / IELTS 6.5+ overall" },
      { id: 4, text: "Extracurricular activities and essays" },
    ],
    Postgraduate: [
      { id: 1, text: "Bachelor degree from accredited institution" },
      { id: 2, text: "GRE/GMAT scores (program specific)" },
      { id: 3, text: "TOEFL 90+ / IELTS 7.0+ overall" },
      { id: 4, text: "Letters of recommendation (3)" },
      { id: 5, text: "Statement of Purpose" },
      { id: 6, text: "Research experience (for research programs)" },
    ],
    Doctoral: [
      { id: 1, text: "Master degree (some programs accept bachelor's)" },
      { id: 2, text: "GRE scores with strong quantitative section" },
      { id: 3, text: "TOEFL 100+ / IELTS 7.5+" },
      { id: 4, text: "Research proposal and writing sample" },
      { id: 5, text: "3 academic references" },
      { id: 6, text: "Publications in peer-reviewed journals preferred" },
    ],
  },
  costData: [
    { id: 1, category: "Accommodation", minCost: 800, maxCost: 2000, percentage: 90 },
    { id: 2, category: "Food & Dining", minCost: 300, maxCost: 600, percentage: 70 },
    { id: 3, category: "Transport", minCost: 50, maxCost: 150, percentage: 50 },
    { id: 4, category: "Miscellaneous", minCost: 200, maxCost: 500, percentage: 65 },
  ],
  workData: [
    { title: "On-Campus Employment", description: "Work up to 20 hours/week on campus during semesters", icon: "Briefcase" },
    { title: "OPT & STEM OPT", description: "12 months OPT + 24-month STEM extension for eligible fields", icon: "FileText" },
    { title: "H-1B Sponsorship", description: "Many employers sponsor H-1B work visas for international graduates", icon: "TrendingUp" },
  ],
  scholarshipData: [
    { id: 1, name: "Fulbright Foreign Student Program", amount: "Full tuition + living + travel", eligibility: "Graduate students from 160+ countries", deadline: "February-October (varies by country)" },
    { id: 2, name: "Hubert H. Humphrey Fellowship", amount: "Full funding for 10 months", eligibility: "Mid-career professionals", deadline: "Varies by country" },
    { id: 3, name: "University Merit Scholarships", amount: "Varies ($5,000 - Full tuition)", eligibility: "Based on academic excellence", deadline: "Varies by university" },
  ],
  cultureData: [
    { id: 1, title: "Diverse & Vibrant Cities", description: "From NYC's energy to LA's sunshine, every region offers unique experiences" },
    { id: 2, title: "Sports & Entertainment", description: "NFL, NBA, MLB, and Hollywood shape American popular culture" },
    { id: 3, title: "Innovation Hub", description: "Silicon Valley, Wall Street, and top research labs drive global innovation" },
    { id: 4, title: "Natural Diversity", description: "National parks, beaches, mountains, and deserts across 50 states" },
  ],
  testimonials: [
    { name: "Anish Shrestha", degree: "MS Computer Science", university: "Stanford University", country: "USA", quote: "The STEM OPT extension gave me 3 years of work experience in Silicon Valley. NEXUS guided me through the complex F-1 visa process perfectly.", image: "/student/student1.jpg" },
    { name: "Pragya Adhikari", degree: "MBA", university: "University of Chicago", country: "USA", quote: "Studying in the US opened doors I never imagined. NEXUS helped me secure a significant scholarship.", image: "/student/student2.jpg" },
    { name: "Roshan Maharjan", degree: "PhD Physics", university: "MIT", country: "USA", quote: "The research opportunities at MIT are world-class. NEXUS made the application process stress-free.", image: "/student/student3.jpg" },
  ],
};

export default usaData;
