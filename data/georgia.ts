import { CountryDataType } from "@/types/country";

const georgiaData: CountryDataType = {
  country: "Georgia",
  currency: "GEL",
  flagCode: "ge",
  accentColor: "#6b7280",
  carouselData: {
    CountryImages: [
      { id: 1, url: "/destinations/Georgia.jpg", location: "Tbilisi" },
      { id: 2, url: "/destinations/Georgia.jpg", location: "Batumi" },
      { id: 3, url: "/destinations/Georgia.jpg", location: "Kutaisi" },
      { id: 4, url: "/destinations/Georgia.jpg", location: "Old Town Walk" },
      { id: 5, url: "/destinations/Georgia.jpg", location: "University Life" },
    ],
    description:
      "A growing study destination known for affordable tuition, simple admissions, and a welcoming environment for international students.",
    guideLink: "#",
  },
  highlightedData: {
    statistics: [
      { id: 1, label: "Popular Fields", value: "Medicine, Business, IT" },
      { id: 2, label: "Living Cost", value: "Budget Friendly" },
      { id: 3, label: "Language", value: "English-taught options" },
      { id: 4, label: "Intake", value: "Multiple intakes" },
    ],
    description:
      "Georgia offers affordable tuition, straightforward admission pathways, and a comfortable student lifestyle for those looking for an emerging destination.",
  },
  universities: [
    { id: "1", name: "Tbilisi State Medical University", location: { city: "Tbilisi", state: "Tbilisi", country: "Georgia" }, ranking: { position: 1001, type: "Global" }, scholarship: { percentage: 20, accreditedBy: "Ministry of Education", description: "Merit-based tuition discounts" } },
    { id: "2", name: "Ilia State University", location: { city: "Tbilisi", state: "Tbilisi", country: "Georgia" }, ranking: { position: 1201, type: "Global" }, scholarship: { percentage: 25, accreditedBy: "Ministry of Education", description: "International student scholarship" } },
    { id: "3", name: "Caucasus University", location: { city: "Tbilisi", state: "Tbilisi", country: "Georgia" }, ranking: { position: 1301, type: "Global" }, scholarship: { percentage: 30, accreditedBy: "Ministry of Education", description: "Entrance scholarship support" } },
  ],
  whyData: [
    "Affordable tuition and living costs",
    "English-taught programs in key fields",
    "Simplified admission process for international applicants",
    "Safe and student-friendly capital city",
    "Good option for medicine, business, and IT courses",
  ],
  visaRequirements: {
    processingtime: "4-8 weeks",
    VisaCardData: [
      { id: "identity", title: "Identity Documents", icon: "IdCard", items: ["Valid passport", "Passport photos", "National ID"] },
      { id: "offer", title: "Admission Proof", icon: "GraduationCap", items: ["University offer letter", "Course details", "Tuition receipt if available"] },
      { id: "financial", title: "Financial Proof", icon: "Landmark", items: ["Bank statement", "Sponsor letter", "Proof of tuition payment"] },
      { id: "academic", title: "Academic Records", icon: "FileText", items: ["Transcripts", "Certificates", "English proficiency proof"] },
      { id: "travel", title: "Travel & Health", icon: "HeartPulse", items: ["Travel insurance", "Medical documents if required", "Accommodation details"] },
      { id: "application", title: "Application Set", icon: "ClipboardList", items: ["Completed visa form", "Application fee receipt", "Statement of purpose"] },
    ],
  },
  admissionRequirementsData: {
    Undergraduate: [
      { id: 1, text: "Completion of higher secondary education" },
      { id: 2, text: "Passport and academic transcripts" },
      { id: 3, text: "Basic English proficiency" },
    ],
    Postgraduate: [
      { id: 1, text: "Completed bachelor degree" },
      { id: 2, text: "Academic transcripts and SOP" },
      { id: 3, text: "Letters of recommendation" },
      { id: 4, text: "English language proof" },
    ],
    Doctoral: [
      { id: 1, text: "Completed master degree" },
      { id: 2, text: "Research proposal" },
      { id: 3, text: "Academic references" },
    ],
  },
  costData: [
    { id: 1, category: "Accommodation", minCost: 250, maxCost: 600, percentage: 55 },
    { id: 2, category: "Food & Dining", minCost: 150, maxCost: 250, percentage: 40 },
    { id: 3, category: "Transport", minCost: 20, maxCost: 60, percentage: 20 },
    { id: 4, category: "Miscellaneous", minCost: 50, maxCost: 150, percentage: 25 },
  ],
  workData: [
    { title: "Part-Time Work", description: "Students can explore part-time roles depending on visa conditions and course load.", icon: "Briefcase" },
    { title: "Internships", description: "Practical experience opportunities are available in business, healthcare, and technology fields.", icon: "FileText" },
    { title: "Post-Study Paths", description: "Many students use Georgia as a stepping stone for wider global study and career planning.", icon: "TrendingUp" },
  ],
  scholarshipData: [
    { id: 1, name: "Merit Tuition Discount", amount: "10% - 30%", eligibility: "High-performing students", deadline: "Varies" },
    { id: 2, name: "International Student Aid", amount: "Partial tuition support", eligibility: "New applicants", deadline: "Rolling" },
    { id: 3, name: "Faculty Scholarship", amount: "Course-based support", eligibility: "Department nominated", deadline: "Varies" },
  ],
  cultureData: [
    { id: 1, title: "Historic Tbilisi", description: "A vibrant capital with old-town charm and modern student facilities." },
    { id: 2, title: "Affordable Living", description: "One of the reasons students choose Georgia is the manageable monthly budget." },
    { id: 3, title: "Warm Hospitality", description: "Students often enjoy a welcoming and social atmosphere." },
  ],
  testimonials: [
    { name: "Aarav Shrestha", degree: "MBBS", university: "Tbilisi State Medical University", country: "Georgia", quote: "The process felt simple and the cost was much easier to manage than I expected.", image: "/services/NEX-_-28.jpg" },
    { name: "Sangita Rai", degree: "MBA", university: "Ilia State University", country: "Georgia", quote: "Nexsus helped me compare options and prepare the documents quickly.", image: "/services/NEX-_-30.jpg" },
  ],
};

export default georgiaData;
