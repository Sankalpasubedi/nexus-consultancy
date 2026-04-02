import { CountryDataType } from "@/types/country";

const belarusData: CountryDataType = {
  country: "Belarus",
  currency: "BYN",
  flagCode: "by",
  accentColor: "#1d4ed8",
  carouselData: {
    CountryImages: [
      { id: 1, url: "/destinations/Belarus.jpg", location: "Minsk" },
      { id: 2, url: "/destinations/Belarus.jpg", location: "Gomel" },
      { id: 3, url: "/destinations/Belarus.jpg", location: "Brest" },
      { id: 4, url: "/destinations/Belarus.jpg", location: "University Campus" },
      { id: 5, url: "/destinations/Belarus.jpg", location: "Student Housing" },
    ],
    description:
      "An affordable European destination with established medical and technical programs, especially attractive for students seeking value-driven study abroad options.",
    guideLink: "#",
  },
  highlightedData: {
    statistics: [
      { id: 1, label: "Popular Programs", value: "Medicine, Engineering" },
      { id: 2, label: "Tuition", value: "Affordable" },
      { id: 3, label: "Language", value: "English support available" },
      { id: 4, label: "Lifestyle", value: "Safe and calm" },
    ],
    description:
      "Belarus is a practical option for students who want affordable tuition, recognized universities, and a quieter European study environment.",
  },
  universities: [
    { id: "1", name: "Belarusian State Medical University", location: { city: "Minsk", state: "Minsk", country: "Belarus" }, ranking: { position: 901, type: "Global" }, scholarship: { percentage: 20, accreditedBy: "Ministry of Education", description: "International student discount" } },
    { id: "2", name: "Belarusian State University", location: { city: "Minsk", state: "Minsk", country: "Belarus" }, ranking: { position: 351, type: "Global" }, scholarship: { percentage: 25, accreditedBy: "Ministry of Education", description: "Merit-based award" } },
    { id: "3", name: "Grodno State Medical University", location: { city: "Grodno", state: "Grodno", country: "Belarus" }, ranking: { position: 1001, type: "Global" }, scholarship: { percentage: 15, accreditedBy: "Ministry of Education", description: "Tuition support for eligible students" } },
  ],
  whyData: [
    "Affordable tuition and living costs",
    "Strong medical and engineering options",
    "European location with a focused academic environment",
    "English support available in many programs",
    "Good choice for budget-conscious students",
  ],
  visaRequirements: {
    processingtime: "4-8 weeks",
    VisaCardData: [
      { id: "identity", title: "Identity Documents", icon: "IdCard", items: ["Valid passport", "Photographs", "National ID"] },
      { id: "offer", title: "Admission Proof", icon: "GraduationCap", items: ["Invitation letter", "Course details", "University confirmation"] },
      { id: "financial", title: "Financial Proof", icon: "Landmark", items: ["Bank statements", "Sponsor documents", "Tuition payment proof"] },
      { id: "academic", title: "Academic Records", icon: "FileText", items: ["Transcripts", "Certificates", "English proficiency proof"] },
      { id: "medical", title: "Health Cover", icon: "HeartPulse", items: ["Medical certificate", "Insurance cover", "Vaccination proof if requested"] },
      { id: "application", title: "Application Set", icon: "ClipboardList", items: ["Completed visa form", "Visa fee receipt", "Statement of purpose"] },
    ],
  },
  admissionRequirementsData: {
    Undergraduate: [
      { id: 1, text: "Completion of higher secondary education" },
      { id: 2, text: "Academic transcripts" },
      { id: 3, text: "English language proof where applicable" },
    ],
    Postgraduate: [
      { id: 1, text: "Completed bachelor degree" },
      { id: 2, text: "Statement of purpose" },
      { id: 3, text: "Letters of recommendation" },
    ],
    Doctoral: [
      { id: 1, text: "Completed master degree" },
      { id: 2, text: "Research proposal" },
      { id: 3, text: "Academic references" },
    ],
  },
  costData: [
    { id: 1, category: "Accommodation", minCost: 180, maxCost: 420, percentage: 42 },
    { id: 2, category: "Food & Dining", minCost: 100, maxCost: 180, percentage: 28 },
    { id: 3, category: "Transport", minCost: 15, maxCost: 40, percentage: 12 },
    { id: 4, category: "Miscellaneous", minCost: 40, maxCost: 100, percentage: 18 },
  ],
  workData: [
    { title: "Part-Time Work", description: "Students can explore limited part-time roles depending on permit conditions.", icon: "Briefcase" },
    { title: "Technical Fields", description: "Engineering and medical study options are the main attraction for many students.", icon: "Microscope" },
    { title: "Budget Planning", description: "A good destination for students who want manageable monthly spending.", icon: "TrendingUp" },
  ],
  scholarshipData: [
    { id: 1, name: "Merit Tuition Support", amount: "10% - 25%", eligibility: "High achievers", deadline: "Varies" },
    { id: 2, name: "International Admission Discount", amount: "Partial tuition reduction", eligibility: "Eligible applicants", deadline: "Rolling" },
    { id: 3, name: "Faculty Award", amount: "Course-specific support", eligibility: "Department nominated", deadline: "Varies" },
  ],
  cultureData: [
    { id: 1, title: "Calm Student Life", description: "A quieter study environment with a strong focus on academics." },
    { id: 2, title: "European Setting", description: "Students get access to a European environment at a lower budget point." },
    { id: 3, title: "Medical Education Strength", description: "Well-known for medicine and health-related programs." },
  ],
  testimonials: [
    { name: "Mohan Adhikari", degree: "MBBS", university: "Belarusian State Medical University", country: "Belarus", quote: "The affordability made Belarus a practical choice for my family.", image: "/services/NEX-_-38.jpg" },
    { name: "Sujata Bista", degree: "MSc Engineering", university: "Belarusian State University", country: "Belarus", quote: "Nexsus helped me understand the visa and university process clearly.", image: "/services/NEX-_-40.jpg" },
  ],
};

export default belarusData;
