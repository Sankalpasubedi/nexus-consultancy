import { CountryDataType } from "@/types/country";

const europeData: CountryDataType = {
  country: "Europe", currency: "EUR", flagCode: "eu", accentColor: "#003975",
  carouselData: {
    CountryImages: [
      { id: 1, url: "/destinations/europe.png", location: "Paris" },
      { id: 2, url: "/destinations/europe.png", location: "Berlin" },
      { id: 3, url: "/destinations/europe.png", location: "Amsterdam" },
    ],
    description: "Diverse cultures and world-renowned academic institutions across the continent. Many European countries offer tuition-free or low-cost education with excellent quality of life.",
    guideLink: "#",
  },
  highlightedData: {
    statistics: [
      { id: 1, label: "Top Universities", value: "Many in World Top 100" },
      { id: 2, label: "Tuition", value: "Free or low-cost in many countries" },
      { id: 3, label: "Programs", value: "Engineering, Arts, Sciences" },
      { id: 4, label: "Work Rights", value: "Varies by country" },
    ],
    description: "Europe offers incredible diversity — from tuition-free education in Germany to world-renowned art schools in Italy and innovative tech programs in the Nordics.",
  },
  universities: [
    { id: "1", name: "ETH Zurich", location: { city: "Zurich", state: "Zurich", country: "Switzerland" }, ranking: { position: 7, type: "Global" }, scholarship: { percentage: 35, accreditedBy: "Swiss Confederation", description: "Excellence Scholarships" } },
    { id: "2", name: "Sorbonne University", location: { city: "Paris", state: "Île-de-France", country: "France" }, ranking: { position: 59, type: "Global" }, scholarship: { percentage: 30, accreditedBy: "HCERES", description: "Sorbonne Excellence Scholarships" } },
    { id: "3", name: "Technical University of Munich", location: { city: "Munich", state: "Bavaria", country: "Germany" }, ranking: { position: 37, type: "Global" }, scholarship: { percentage: 40, accreditedBy: "German Accreditation", description: "TUM Scholarships" } },
    { id: "4", name: "Delft University of Technology", location: { city: "Delft", state: "South Holland", country: "Netherlands" }, ranking: { position: 47, type: "Global" }, scholarship: { percentage: 35, accreditedBy: "NVAO", description: "Justus & Louise van Effen Scholarship" } },
    { id: "5", name: "KTH Royal Institute of Technology", location: { city: "Stockholm", state: "Stockholm", country: "Sweden" }, ranking: { position: 73, type: "Global" }, scholarship: { percentage: 30, accreditedBy: "UKÄ", description: "KTH Scholarship" } },
  ],
  whyData: [
    "Tuition-free or low-cost education in Germany, Norway, Finland",
    "Schengen visa allows travel across 27 European countries",
    "Diverse cultural experiences across the continent",
    "Strong focus on research and innovation",
    "Many English-taught programs available",
    "High quality of life and excellent healthcare",
  ],
  visaRequirements: {
    processingtime: "4-12 weeks (varies by country)",
    VisaCardData: [
      { id: "identity", title: "Identity Documents", icon: "IdCard", items: ["Valid passport (6+ months validity)", "Passport photographs", "National ID"] },
      { id: "offer", title: "Admission Documents", icon: "GraduationCap", items: ["University acceptance letter", "Enrollment confirmation", "Course details"] },
      { id: "financial", title: "Financial Documents", icon: "Landmark", items: ["Blocked account (Germany: €11,208/year)", "Bank statements", "Scholarship letter", "Health insurance proof"] },
      { id: "academic", title: "Academic Documents", icon: "FileText", items: ["Academic transcripts", "Language proficiency (IELTS/TestDaF/DELF)", "Certified translations"] },
      { id: "visa", title: "Visa Application", icon: "FileText", items: ["National visa application form", "Cover letter / motivation letter", "Visa fee payment"] },
      { id: "health", title: "Health & Insurance", icon: "HeartPulse", items: ["Health insurance (mandatory)", "Medical certificate", "Police clearance"] },
    ],
  },
  admissionRequirementsData: {
    Undergraduate: [
      { id: 1, text: "High school diploma with good grades" },
      { id: 2, text: "English proficiency (IELTS 6.0+) or local language test" },
      { id: 3, text: "Motivation letter" },
      { id: 4, text: "Some countries require foundation year" },
    ],
    Postgraduate: [
      { id: 1, text: "Bachelor degree in relevant field" },
      { id: 2, text: "IELTS 6.5+ or local language proficiency" },
      { id: 3, text: "GRE/GMAT for some business programs" },
      { id: 4, text: "Letters of recommendation (2)" },
      { id: 5, text: "Research proposal for thesis programs" },
    ],
    Doctoral: [
      { id: 1, text: "Master degree with research component" },
      { id: 2, text: "Research proposal aligned with department" },
      { id: 3, text: "Academic references (3)" },
      { id: 4, text: "Publications preferred" },
      { id: 5, text: "Interview with potential supervisor" },
    ],
  },
  costData: [
    { id: 1, category: "Accommodation", minCost: 400, maxCost: 1000, percentage: 80 },
    { id: 2, category: "Food & Dining", minCost: 150, maxCost: 350, percentage: 65 },
    { id: 3, category: "Transport", minCost: 30, maxCost: 100, percentage: 45 },
    { id: 4, category: "Miscellaneous", minCost: 100, maxCost: 250, percentage: 55 },
  ],
  workData: [
    { title: "Student Work Rights", description: "Most countries allow 15-20 hours/week during studies", icon: "Briefcase" },
    { title: "Post-Study Work", description: "Germany: 18-month job seeker visa; Netherlands: orientation year", icon: "FileText" },
    { title: "EU Blue Card", description: "Work permit for highly qualified professionals across the EU", icon: "TrendingUp" },
  ],
  scholarshipData: [
    { id: 1, name: "Erasmus Mundus", amount: "Full tuition + €1,400/month", eligibility: "Joint master programs", deadline: "January" },
    { id: 2, name: "DAAD Scholarships (Germany)", amount: "€934-1,300/month", eligibility: "All levels", deadline: "October-November" },
    { id: 3, name: "Holland Scholarship", amount: "€5,000 one-time", eligibility: "Non-EU students in Netherlands", deadline: "February 1" },
  ],
  cultureData: [
    { id: 1, title: "Cultural Diversity", description: "44 countries with unique languages, cuisines, and traditions" },
    { id: 2, title: "Art & Architecture", description: "Renaissance art, Gothic cathedrals, and modern design" },
    { id: 3, title: "Travel Freedom", description: "Schengen area allows seamless travel across Europe" },
    { id: 4, title: "Cuisine", description: "French, Italian, Spanish, and countless regional culinary traditions" },
  ],
  testimonials: [
    { name: "Ashish Pandey", degree: "MSc Automotive Engineering", university: "TU Munich", country: "Germany", quote: "Tuition-free education at one of the best engineering schools in the world. NEXUS helped with the blocked account and visa.", image: "/student/student1.jpg" },
    { name: "Binita Karki", degree: "MSc Data Science", university: "Delft University", country: "Netherlands", quote: "The orientation year visa gave me time to find the perfect job after graduation.", image: "/student/student2.jpg" },
  ],
};

export default europeData;
