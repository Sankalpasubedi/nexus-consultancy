import { CountryDataType } from "@/types/country";

const philippinesData: CountryDataType = {
  country: "Philippines",
  currency: "PHP",
  flagCode: "ph",
  accentColor: "#2563eb",
  carouselData: {
    CountryImages: [
      { id: 1, url: "/destinations/Philippines.jpg", location: "Manila" },
      { id: 2, url: "/destinations/Philippines.jpg", location: "Cebu" },
      { id: 3, url: "/destinations/Philippines.jpg", location: "Davao" },
      { id: 4, url: "/destinations/Philippines.jpg", location: "Campus Life" },
      { id: 5, url: "/destinations/Philippines.jpg", location: "Student Support" },
    ],
    description:
      "A practical destination for students looking for affordable education, English-medium instruction, and a familiar campus environment.",
    guideLink: "#",
  },
  highlightedData: {
    statistics: [
      { id: 1, label: "Popular Programs", value: "Medicine, Nursing, Business" },
      { id: 2, label: "Language", value: "English widely used" },
      { id: 3, label: "Living Cost", value: "Moderate" },
      { id: 4, label: "Climate", value: "Tropical" },
    ],
    description:
      "The Philippines is popular for health sciences and business studies, with English-speaking classrooms and relatively accessible living costs.",
  },
  universities: [
    { id: "1", name: "University of the Philippines", location: { city: "Quezon City", state: "Metro Manila", country: "Philippines" }, ranking: { position: 412, type: "Global" }, scholarship: { percentage: 30, accreditedBy: "Commission on Higher Education", description: "Merit scholarships" } },
    { id: "2", name: "Ateneo de Manila University", location: { city: "Quezon City", state: "Metro Manila", country: "Philippines" }, ranking: { position: 500, type: "Global" }, scholarship: { percentage: 35, accreditedBy: "University Grants", description: "Entrance scholarship awards" } },
    { id: "3", name: "University of Santo Tomas", location: { city: "Manila", state: "Metro Manila", country: "Philippines" }, ranking: { position: 701, type: "Global" }, scholarship: { percentage: 25, accreditedBy: "University Grants", description: "Academic excellence grant" } },
  ],
  whyData: [
    "English is widely used in higher education",
    "Good destination for health and business courses",
    "Manageable tuition and living costs",
    "Friendly environment for international students",
    "Rich cultural and island lifestyle",
  ],
  visaRequirements: {
    processingtime: "4-6 weeks",
    VisaCardData: [
      { id: "identity", title: "Identity Documents", icon: "IdCard", items: ["Valid passport", "Photographs", "Civil ID"] },
      { id: "offer", title: "Admission Proof", icon: "GraduationCap", items: ["Offer letter", "Enrollment details", "Course duration"] },
      { id: "financial", title: "Funds Proof", icon: "Landmark", items: ["Bank statements", "Sponsor documents", "Tuition fee proof"] },
      { id: "academic", title: "Academic Records", icon: "FileText", items: ["Transcripts", "Certificates", "English proficiency documents"] },
      { id: "health", title: "Health Cover", icon: "HeartPulse", items: ["Medical certificate", "Travel insurance", "Vaccination records if requested"] },
      { id: "application", title: "Visa Application", icon: "ClipboardList", items: ["Completed application", "Visa fee receipt", "Statement of purpose"] },
    ],
  },
  admissionRequirementsData: {
    Undergraduate: [
      { id: 1, text: "High school completion or equivalent" },
      { id: 2, text: "Academic transcripts" },
      { id: 3, text: "English proficiency proof" },
    ],
    Postgraduate: [
      { id: 1, text: "Bachelor degree completion" },
      { id: 2, text: "Statement of purpose" },
      { id: 3, text: "Recommendations" },
      { id: 4, text: "Relevant work experience for some programs" },
    ],
    Doctoral: [
      { id: 1, text: "Master degree completion" },
      { id: 2, text: "Research proposal" },
      { id: 3, text: "Academic references" },
    ],
  },
  costData: [
    { id: 1, category: "Accommodation", minCost: 180, maxCost: 450, percentage: 45 },
    { id: 2, category: "Food & Dining", minCost: 120, maxCost: 220, percentage: 35 },
    { id: 3, category: "Transport", minCost: 25, maxCost: 70, percentage: 18 },
    { id: 4, category: "Miscellaneous", minCost: 50, maxCost: 120, percentage: 22 },
  ],
  workData: [
    { title: "Part-Time Opportunities", description: "Students can look for part-time work depending on course schedule and visa rules.", icon: "Briefcase" },
    { title: "Health Science Training", description: "Strong practical training culture for medicine, nursing, and allied health programs.", icon: "HeartPulse" },
    { title: "Career Growth", description: "A useful option for students building an international profile with English-medium study.", icon: "TrendingUp" },
  ],
  scholarshipData: [
    { id: 1, name: "University Merit Scholarship", amount: "Partial tuition support", eligibility: "High-achieving applicants", deadline: "Varies" },
    { id: 2, name: "International Student Grant", amount: "Tuition reduction", eligibility: "New enrollments", deadline: "Rolling" },
    { id: 3, name: "Department Scholarship", amount: "Course-based support", eligibility: "Eligible faculty students", deadline: "Varies" },
  ],
  cultureData: [
    { id: 1, title: "Island Lifestyle", description: "A warm climate and diverse cultural environment across the islands." },
    { id: 2, title: "English-Friendly Campuses", description: "Many universities operate in English, making transitions easier for international students." },
    { id: 3, title: "Student Communities", description: "Large student communities help new arrivals settle in faster." },
  ],
  testimonials: [
    { name: "Rohan Karki", degree: "MBBS", university: "University of the Philippines", country: "Philippines", quote: "I chose the Philippines for affordable medical study and a smooth application process.", image: "/services/NEX-_-32.jpg" },
    { name: "Nisha Thapa", degree: "BBA", university: "Ateneo de Manila University", country: "Philippines", quote: "The guidance helped me compare schools and shortlist the best fit quickly.", image: "/services/NEX-_-35.jpg" },
  ],
};

export default philippinesData;
