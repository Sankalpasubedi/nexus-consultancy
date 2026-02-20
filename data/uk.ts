import { CountryDataType } from "@/types/country";

const ukData: CountryDataType = {
  country: "United Kingdom",
  currency: "GBP",
  flagCode: "gb",
  accentColor: "#1e40af",
  carouselData: {
    CountryImages: [
      { id: 1, url: "/destinations/uk.png", location: "London" },
      { id: 2, url: "/destinations/uk.png", location: "Oxford" },
      { id: 3, url: "/destinations/uk.png", location: "Cambridge" },
      { id: 4, url: "/destinations/uk.png", location: "Edinburgh" },
      { id: 5, url: "/destinations/uk.png", location: "Manchester" },
    ],
    description: "Study at prestigious institutions with centuries of academic excellence. The UK's shorter degree programs, globally recognized qualifications, and rich cultural history make it a premier study destination.",
    guideLink: "#",
  },
  highlightedData: {
    statistics: [
      { id: 1, label: "Top Universities", value: "4 in World Top 10" },
      { id: 2, label: "Post-Study Work", value: "2-year Graduate Route" },
      { id: 3, label: "Degree Duration", value: "3-year UG, 1-year PG" },
      { id: 4, label: "Quality", value: "QAA regulated standards" },
    ],
    description: "The United Kingdom offers centuries of academic tradition combined with cutting-edge research. Shorter degree programs save time and money while providing globally recognized qualifications.",
  },
  universities: [
    { id: "1", name: "University of Oxford", location: { city: "Oxford", state: "England" }, ranking: { position: 3, type: "Global" }, scholarship: { percentage: 50, accreditedBy: "Royal Charter", description: "Rhodes and Clarendon Scholarships" } },
    { id: "2", name: "University of Cambridge", location: { city: "Cambridge", state: "England" }, ranking: { position: 2, type: "Global" }, scholarship: { percentage: 45, accreditedBy: "Royal Charter", description: "Gates Cambridge Scholarships" } },
    { id: "3", name: "Imperial College London", location: { city: "London", state: "England" }, ranking: { position: 6, type: "Global" }, scholarship: { percentage: 40, accreditedBy: "Royal Charter", description: "President's Undergraduate Scholarships" } },
    { id: "4", name: "University College London", location: { city: "London", state: "England" }, ranking: { position: 9, type: "Global" }, scholarship: { percentage: 38, accreditedBy: "Royal Charter", description: "UCL Global Scholarship" } },
    { id: "5", name: "University of Edinburgh", location: { city: "Edinburgh", state: "Scotland" }, ranking: { position: 22, type: "Global" }, scholarship: { percentage: 35, accreditedBy: "Royal Charter", description: "Edinburgh Global Scholarships" } },
    { id: "6", name: "King's College London", location: { city: "London", state: "England" }, ranking: { position: 40, type: "Global" }, scholarship: { percentage: 30, accreditedBy: "Royal Charter", description: "King's International Scholarships" } },
  ],
  whyData: [
    "Home to 4 of the world's top 10 universities",
    "Graduate Route visa for 2 years post-study work",
    "Shorter degree programs save time and money",
    "Globally recognized qualifications (QAA regulated)",
    "Rich cultural and historical experience",
    "Gateway to Europe with excellent transport links",
  ],
  visaRequirements: {
    processingtime: "3-6 weeks",
    VisaCardData: [
      { id: "identity", title: "Identity & Travel Documents", icon: "IdCard", items: ["Valid passport", "Passport photographs", "Previous visa documents"] },
      { id: "cas", title: "CAS & Admission Documents", icon: "GraduationCap", items: ["Confirmation of Acceptance for Studies (CAS)", "Unconditional offer letter", "CAS reference number and details"] },
      { id: "financial", title: "Financial Documents", icon: "Landmark", items: ["Proof of funds held for 28+ consecutive days", "Bank statements", "Education loan documents", "Scholarship confirmation"] },
      { id: "academic", title: "Academic Documents", icon: "FileText", items: ["Academic transcripts", "IELTS/TOEFL for SELT", "Degree certificates"] },
      { id: "visa", title: "Visa Application", icon: "FileText", items: ["Online visa application form", "Immigration Health Surcharge payment", "Tuberculosis test results (if applicable)"] },
      { id: "health", title: "Health & Biometrics", icon: "HeartPulse", items: ["TB test certificate", "Biometrics appointment", "NHS health surcharge receipt"] },
    ],
  },
  admissionRequirementsData: {
    Undergraduate: [
      { id: 1, text: "A-Levels or equivalent qualification" },
      { id: 2, text: "IELTS 6.0-6.5 overall or equivalent SELT" },
      { id: 3, text: "UCAS application with personal statement" },
      { id: 4, text: "Academic reference from school/college" },
    ],
    Postgraduate: [
      { id: 1, text: "Bachelor degree with 2:1 or equivalent" },
      { id: 2, text: "IELTS 6.5-7.0 overall" },
      { id: 3, text: "Academic transcripts and degree certificate" },
      { id: 4, text: "Personal statement/research proposal" },
      { id: 5, text: "Two academic references" },
    ],
    Doctoral: [
      { id: 1, text: "Master degree in relevant field" },
      { id: 2, text: "IELTS 7.0+ overall" },
      { id: 3, text: "Detailed research proposal (3000-5000 words)" },
      { id: 4, text: "Publications and research experience" },
      { id: 5, text: "Three academic references" },
      { id: 6, text: "Interview with supervisor" },
    ],
  },
  costData: [
    { id: 1, category: "Accommodation", minCost: 500, maxCost: 1200, percentage: 85 },
    { id: 2, category: "Food & Dining", minCost: 150, maxCost: 350, percentage: 65 },
    { id: 3, category: "Transport", minCost: 50, maxCost: 120, percentage: 50 },
    { id: 4, category: "Miscellaneous", minCost: 100, maxCost: 250, percentage: 55 },
  ],
  workData: [
    { title: "Part-Time During Studies", description: "Work up to 20 hours/week during term time", icon: "Briefcase" },
    { title: "Graduate Route", description: "2-year post-study work visa (3 years for PhD)", icon: "FileText" },
    { title: "Skilled Worker Visa", description: "Employers can sponsor Skilled Worker visas for graduates", icon: "TrendingUp" },
  ],
  scholarshipData: [
    { id: 1, name: "Chevening Scholarships", amount: "Full tuition + living + travel", eligibility: "Future leaders from 160+ countries", deadline: "November 1" },
    { id: 2, name: "Commonwealth Scholarships", amount: "Full funding", eligibility: "Commonwealth country citizens", deadline: "Varies" },
    { id: 3, name: "GREAT Scholarships", amount: "£10,000 minimum", eligibility: "Students from select countries", deadline: "Varies by university" },
  ],
  cultureData: [
    { id: 1, title: "Historic Heritage", description: "Centuries-old architecture, museums, and monuments throughout the UK" },
    { id: 2, title: "Theatre & Arts", description: "West End shows, world-class galleries, and a thriving creative scene" },
    { id: 3, title: "Football & Sports", description: "Premier League, cricket, and rugby create a passionate sporting culture" },
    { id: 4, title: "Countryside & Cities", description: "From the Scottish Highlands to London's cosmopolitan buzz" },
  ],
  testimonials: [
    { name: "Sarita Bhatta", degree: "MSc Finance", university: "Imperial College London", country: "UK", quote: "The 1-year master's program was intense but incredibly rewarding. Nexsus helped me through the CAS and visa process seamlessly.", image: "/student/student1.jpg" },
    { name: "Deepak KC", degree: "LLM International Law", university: "University of Oxford", country: "UK", quote: "Studying at Oxford was a dream come true. Nexsus guided me to secure a Clarendon Scholarship.", image: "/student/student2.jpg" },
    { name: "Nisha Rai", degree: "BA English Literature", university: "University of Edinburgh", country: "UK", quote: "Edinburgh's literary culture enhanced my studies beautifully. Nexsus made the UCAS process straightforward.", image: "/student/student3.jpg" },
  ],
};

export default ukData;
