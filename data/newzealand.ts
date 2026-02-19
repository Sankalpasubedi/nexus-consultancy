import { CountryDataType } from "@/types/country";

const newZealandData: CountryDataType = {
  country: "New Zealand",
  currency: "NZD",
  flagCode: "nz",
  accentColor: "#003975",
  carouselData: {
    CountryImages: [
      { id: 1, url: "/destinations/newzeland.png", location: "Auckland" },
      { id: 2, url: "/destinations/newzeland.png", location: "Queenstown" },
      { id: 3, url: "/destinations/newzeland.png", location: "Wellington" },
      { id: 4, url: "/destinations/newzeland.png", location: "Rotorua" },
    ],
    description: "Experience innovative education in stunning natural beauty. New Zealand offers a safe, welcoming environment with strong focus on practical learning and excellent post-study work opportunities.",
    guideLink: "#",
  },
  highlightedData: {
    statistics: [
      { id: 1, label: "Top Universities", value: "2 in World Top 200" },
      { id: 2, label: "Post-Study Work", value: "1-3 year PSW Visa" },
      { id: 3, label: "Popular Programs", value: "Agriculture, IT, Environmental Science" },
      { id: 4, label: "Quality of Life", value: "Among safest countries globally" },
    ],
    description: "New Zealand combines world-class education with an unparalleled natural environment. Lower cost of living than Australia, strong practical learning focus, and welcoming communities make it an exceptional choice.",
  },
  universities: [
    { id: "1", name: "University of Auckland", location: { city: "Auckland", state: "Auckland" }, ranking: { position: 68, type: "Global" }, scholarship: { percentage: 40, accreditedBy: "NZQA", description: "International Student Excellence Scholarship" } },
    { id: "2", name: "University of Otago", location: { city: "Dunedin", state: "Otago" }, ranking: { position: 206, type: "Global" }, scholarship: { percentage: 30, accreditedBy: "NZQA", description: "Otago International Excellence Scholarship" } },
    { id: "3", name: "Victoria University of Wellington", location: { city: "Wellington", state: "Wellington" }, ranking: { position: 241, type: "Global" }, scholarship: { percentage: 25, accreditedBy: "NZQA", description: "Victoria Excellence Scholarship" } },
    { id: "4", name: "University of Canterbury", location: { city: "Christchurch", state: "Canterbury" }, ranking: { position: 256, type: "Global" }, scholarship: { percentage: 25, accreditedBy: "NZQA", description: "UC International First Year Scholarship" } },
    { id: "5", name: "Massey University", location: { city: "Palmerston North", state: "Manawatu" }, ranking: { position: 292, type: "Global" }, scholarship: { percentage: 20, accreditedBy: "NZQA", description: "Massey International Excellence Award" } },
  ],
  whyData: [
    "Safe and welcoming environment for international students",
    "Post-study work visa for 1-3 years",
    "Lower cost of living compared to Australia",
    "Strong focus on practical and applied learning",
    "Stunning natural beauty and outdoor lifestyle",
    "Progressive, innovative education system",
  ],
  visaRequirements: {
    processingtime: "4-6 weeks",
    VisaCardData: [
      { id: "identity", title: "Identity Documents", icon: "IdCard", items: ["Valid passport", "Passport photographs", "Birth certificate"] },
      { id: "offer", title: "Admission Documents", icon: "GraduationCap", items: ["Offer of place from NZ institution", "Evidence of tuition fee payment", "Course details"] },
      { id: "financial", title: "Financial Documents", icon: "Landmark", items: ["Proof of funds (NZD 20,000/year)", "Bank statements", "Scholarship letter", "Financial guarantor evidence"] },
      { id: "academic", title: "Academic Documents", icon: "FileText", items: ["Academic transcripts", "IELTS/PTE scores", "Certificates and diplomas"] },
      { id: "visa", title: "Visa Application", icon: "FileText", items: ["Online student visa application", "Visa fee payment", "Statement of purpose"] },
      { id: "health", title: "Health Requirements", icon: "HeartPulse", items: ["Medical certificate", "Chest X-ray", "Police certificates from each country lived 5+ years"] },
    ],
  },
  admissionRequirementsData: {
    Undergraduate: [
      { id: 1, text: "NCEA Level 3 or equivalent international qualification" },
      { id: 2, text: "IELTS 6.0 overall or equivalent" },
      { id: 3, text: "Academic transcripts" },
      { id: 4, text: "Foundation studies may be required" },
    ],
    Postgraduate: [
      { id: 1, text: "Bachelor degree from recognized institution" },
      { id: 2, text: "IELTS 6.5 overall or equivalent" },
      { id: 3, text: "Academic transcripts and degree certificate" },
      { id: 4, text: "Professional references (2)" },
      { id: 5, text: "Statement of purpose" },
    ],
    Doctoral: [
      { id: 1, text: "Master degree with research component" },
      { id: 2, text: "IELTS 6.5-7.0 overall" },
      { id: 3, text: "Research proposal approved by supervisor" },
      { id: 4, text: "Academic references (3)" },
      { id: 5, text: "Research publications preferred" },
    ],
  },
  costData: [
    { id: 1, category: "Accommodation", minCost: 180, maxCost: 400, percentage: 80 },
    { id: 2, category: "Food & Dining", minCost: 60, maxCost: 150, percentage: 65 },
    { id: 3, category: "Transport", minCost: 30, maxCost: 80, percentage: 50 },
    { id: 4, category: "Miscellaneous", minCost: 40, maxCost: 120, percentage: 55 },
  ],
  workData: [
    { title: "Part-Time Work", description: "Work up to 20 hours/week during semester and full-time during holidays", icon: "Briefcase" },
    { title: "Post-Study Work Visa", description: "1-3 year post-study work visa depending on qualification and location", icon: "FileText" },
    { title: "Residence Pathway", description: "Skilled Migrant Category for pathway to permanent residency", icon: "TrendingUp" },
  ],
  scholarshipData: [
    { id: 1, name: "NZ International Doctoral Research Scholarships", amount: "Full tuition + NZD 25,000 stipend", eligibility: "Doctoral students", deadline: "July 1" },
    { id: 2, name: "NZ Excellence Awards", amount: "NZD 10,000-30,000", eligibility: "High-achieving international students", deadline: "Varies" },
    { id: 3, name: "Manaaki NZ Scholarships", amount: "Full funding", eligibility: "Developing country nationals", deadline: "March 28" },
  ],
  cultureData: [
    { id: 1, title: "Maori Culture", description: "Rich indigenous heritage with traditional arts, haka, and cultural experiences" },
    { id: 2, title: "Adventure Sports", description: "Bungee jumping, skydiving, hiking, and water sports in spectacular settings" },
    { id: 3, title: "Film & Arts", description: "Home of Lord of the Rings and a thriving creative arts community" },
    { id: 4, title: "Natural Wonders", description: "Fiordland, geothermal areas, glaciers, and pristine beaches" },
  ],
  testimonials: [
    { name: "Maya Tamang", degree: "BSc Environmental Science", university: "University of Auckland", country: "New Zealand", quote: "New Zealand's focus on sustainability perfectly matched my studies. NEXUS helped me every step of the way.", image: "/student/student1.jpg" },
    { name: "Sujan Shrestha", degree: "MSc Computer Science", university: "Victoria University", country: "New Zealand", quote: "The quality of education and work-life balance in NZ is exceptional. NEXUS made the visa process straightforward.", image: "/student/student2.jpg" },
  ],
};

export default newZealandData;
