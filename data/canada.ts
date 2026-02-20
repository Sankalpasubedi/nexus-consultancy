import { CountryDataType } from "@/types/country";

const canadaData: CountryDataType = {
  country: "Canada",
  currency: "CAD",
  flagCode: "ca",
  accentColor: "#dc2626",
  carouselData: {
    CountryImages: [
      { id: 1, url: "/destinations/canada.png", location: "Toronto Skyline" },
      { id: 2, url: "/destinations/canada.png", location: "Banff National Park" },
      { id: 3, url: "/destinations/canada.png", location: "Vancouver" },
      { id: 4, url: "/destinations/canada.png", location: "Niagara Falls" },
      { id: 5, url: "/destinations/canada.png", location: "Montreal" },
    ],
    description: "World-class education with excellent post-study work opportunities, multicultural society, and pathways to permanent residency in one of the safest countries in the world.",
    guideLink: "#",
  },
  highlightedData: {
    statistics: [
      { id: 1, label: "Top Universities", value: "3 in World Top 50" },
      { id: 2, label: "Post-Study Work", value: "Up to 3-year PGWP" },
      { id: 3, label: "Popular Programs", value: "Business, IT, Engineering" },
      { id: 4, label: "Immigration", value: "Pathway to PR available" },
    ],
    description: "Canada offers affordable tuition compared to US/UK, a welcoming multicultural society, and some of the best post-graduation work and immigration pathways in the world.",
  },
  universities: [
    { id: "1", name: "University of Toronto", location: { city: "Toronto", state: "ON", country: "Canada" }, ranking: { position: 21, type: "Global" }, scholarship: { percentage: 44, accreditedBy: "Ministry of Training", description: "Lester B. Pearson International Scholarship" } },
    { id: "2", name: "McGill University", location: { city: "Montreal", state: "QC", country: "Canada" }, ranking: { position: 30, type: "Global" }, scholarship: { percentage: 40, accreditedBy: "Ministry of Education", description: "McGill Entrance Scholarships" } },
    { id: "3", name: "University of British Columbia", location: { city: "Vancouver", state: "BC", country: "Canada" }, ranking: { position: 34, type: "Global" }, scholarship: { percentage: 50, accreditedBy: "Ministry of Education", description: "International Major Entrance Scholarship" } },
    { id: "4", name: "University of Alberta", location: { city: "Edmonton", state: "AB", country: "Canada" }, ranking: { position: 111, type: "Global" }, scholarship: { percentage: 25, accreditedBy: "Ministry of Education", description: "International Student Scholarship" } },
    { id: "5", name: "University of Waterloo", location: { city: "Waterloo", state: "ON", country: "Canada" }, ranking: { position: 112, type: "Global" }, scholarship: { percentage: 30, accreditedBy: "Ministry of Education", description: "International Experience Awards" } },
    { id: "6", name: "University of Ottawa", location: { city: "Ottawa", state: "ON", country: "Canada" }, ranking: { position: 203, type: "Global" }, scholarship: { percentage: 35, accreditedBy: "Ministry of Education", description: "International Admission Scholarship" } },
  ],
  whyData: [
    "Affordable tuition compared to US and UK",
    "Post-graduation work permit (PGWP) up to 3 years",
    "Pathway to permanent residency through Express Entry",
    "Multicultural, safe, and welcoming society",
    "Bilingual country (English and French)",
    "High quality of life and excellent healthcare system",
  ],
  visaRequirements: {
    processingtime: "8-12 weeks",
    VisaCardData: [
      { id: "identity", title: "Identity & Travel Documents", icon: "IdCard", items: ["Valid passport", "Passport-size photographs", "National ID proof"] },
      { id: "offer", title: "Offer & Admission Documents", icon: "GraduationCap", items: ["Letter of Acceptance from DLI", "Proof of tuition payment", "Course details and duration"] },
      { id: "financial", title: "Financial Documents", icon: "Landmark", items: ["Proof of funds (CAD 10,000+ for one year)", "Bank statements (6-12 months)", "GIC certificate (recommended)", "Sponsor documents if applicable"] },
      { id: "academic", title: "Academic Documents", icon: "FileText", items: ["Academic transcripts", "IELTS/TOEFL scores", "Degree certificates"] },
      { id: "visa", title: "Visa Application Documents", icon: "FileText", items: ["Study permit application form", "Statement of Purpose", "Visa fee payment receipt"] },
      { id: "health", title: "Health & Character", icon: "HeartPulse", items: ["Medical examination report", "Police clearance certificate", "Biometrics appointment"] },
    ],
  },
  admissionRequirementsData: {
    Undergraduate: [
      { id: 1, text: "Completion of high school or equivalent" },
      { id: 2, text: "IELTS 6.0-6.5 overall or equivalent" },
      { id: 3, text: "Academic transcripts and certificates" },
      { id: 4, text: "Some programs may require SAT/ACT scores" },
    ],
    Postgraduate: [
      { id: 1, text: "Completed bachelor degree" },
      { id: 2, text: "IELTS 6.5-7.0 overall or equivalent" },
      { id: 3, text: "GRE/GMAT scores (program dependent)" },
      { id: 4, text: "Letters of recommendation (2-3)" },
      { id: 5, text: "Statement of Purpose" },
      { id: 6, text: "Work experience (for MBA programs)" },
    ],
    Doctoral: [
      { id: 1, text: "Completed master degree" },
      { id: 2, text: "IELTS 7.0+ overall" },
      { id: 3, text: "Research proposal" },
      { id: 4, text: "Academic references (3)" },
      { id: 5, text: "Published research preferred" },
    ],
  },
  costData: [
    { id: 1, category: "Accommodation", minCost: 600, maxCost: 1500, percentage: 80 },
    { id: 2, category: "Food & Dining", minCost: 200, maxCost: 400, percentage: 65 },
    { id: 3, category: "Transport", minCost: 80, maxCost: 150, percentage: 55 },
    { id: 4, category: "Miscellaneous", minCost: 100, maxCost: 300, percentage: 60 },
  ],
  workData: [
    { title: "Part-Time During Studies", description: "Work up to 20 hours/week during semesters and full-time during breaks", icon: "Briefcase" },
    { title: "Post-Graduation Work Permit", description: "PGWP allows you to work for up to 3 years after graduation", icon: "FileText" },
    { title: "Pathway to PR", description: "Canadian Experience Class and Provincial Nominee Programs for permanent residency", icon: "TrendingUp" },
  ],
  scholarshipData: [
    { id: 1, name: "Vanier Canada Graduate Scholarships", amount: "CAD 50,000/year for 3 years", eligibility: "Doctoral students", deadline: "November 1" },
    { id: 2, name: "Lester B. Pearson Scholarship", amount: "Full tuition + living expenses", eligibility: "Outstanding international students at U of T", deadline: "November 30" },
    { id: 3, name: "Ontario Trillium Scholarship", amount: "CAD 40,000/year for 4 years", eligibility: "PhD students", deadline: "Varies" },
  ],
  cultureData: [
    { id: 1, title: "Natural Wonders", description: "From the Rocky Mountains to Niagara Falls and vast wilderness" },
    { id: 2, title: "Multicultural Mosaic", description: "One of the most diverse countries with communities from every corner of the world" },
    { id: 3, title: "Winter Sports", description: "World-class skiing, snowboarding, and ice hockey culture" },
    { id: 4, title: "Arts & Festivals", description: "Toronto International Film Festival, Montreal Jazz Festival, and vibrant arts scenes" },
  ],
  testimonials: [
    { name: "Priya Sharma", degree: "MBA", university: "University of Toronto", country: "Canada", quote: "Nexsus transformed my dream into reality. Their personalized guidance helped me secure admission to my dream university with a scholarship.", image: "/student/student1.jpg" },
    { name: "Arun Poudel", degree: "MSc Data Science", university: "University of British Columbia", country: "Canada", quote: "The PGWP pathway was a game-changer for my career. Nexsus helped me navigate every step perfectly.", image: "/student/student2.jpg" },
    { name: "Sita Gurung", degree: "BBA", university: "McGill University", country: "Canada", quote: "I couldn't have navigated the complex application process without Nexsus. Their expertise and dedication are unmatched.", image: "/student/student3.jpg" },
  ],
};

export default canadaData;
