import { CountryDataType } from "@/types/country";

const australiaData: CountryDataType = {
  country: "Australia",
  currency: "AUD",
  flagCode: "au",
  accentColor: "#00ab18",
  carouselData: {
    CountryImages: [
      { id: 1, url: "/destinations/Australia.png", location: "Sydney Opera House" },
      { id: 2, url: "/destinations/Australia.png", location: "Great Ocean Road" },
      { id: 3, url: "/destinations/Australia.png", location: "Uluru" },
      { id: 4, url: "/destinations/Australia.png", location: "Bondi Beach" },
      { id: 5, url: "/destinations/Australia.png", location: "The Whitsundays" },
    ],
    description: "Experience world-class education in the land down under, where prestigious universities meet a vibrant, adventurous lifestyle and endless opportunities for personal growth.",
    guideLink: "#",
  },
  highlightedData: {
    statistics: [
      { id: 1, label: "Top Universities", value: "7 in World Top 100" },
      { id: 2, label: "Post-Study Work", value: "2-4 years PSW Visa" },
      { id: 3, label: "Popular Programs", value: "Engineering, Business, Health Sciences" },
      { id: 4, label: "Research & Innovation", value: "100+ Research centers nationwide" },
    ],
    description: "Australia is home to world-renowned universities, vibrant cities, and a high quality of life. With its multicultural environment and post-study work opportunities, it's an ideal destination for international students.",
  },
  universities: [
    {
      id: "1", name: "University of Melbourne",
      location: { city: "Melbourne", state: "VIC", country: "Australia" },
      ranking: { position: 14, type: "Global" },
      scholarship: { percentage: 50, accreditedBy: "TEQSA", description: "Melbourne International Undergraduate Scholarship" },
    },
    {
      id: "2", name: "University of Sydney",
      location: { city: "Sydney", state: "NSW", country: "Australia" },
      ranking: { position: 19, type: "Global" },
      scholarship: { percentage: 40, accreditedBy: "TEQSA", description: "Sydney Scholars Awards" },
    },
    {
      id: "3", name: "Australian National University",
      location: { city: "Canberra", state: "ACT", country: "Australia" },
      ranking: { position: 30, type: "Global" },
      scholarship: { percentage: 50, accreditedBy: "TEQSA", description: "ANU Chancellor's International Scholarship" },
    },
    {
      id: "4", name: "University of Queensland",
      location: { city: "Brisbane", state: "QLD", country: "Australia" },
      ranking: { position: 43, type: "Global" },
      scholarship: { percentage: 25, accreditedBy: "TEQSA", description: "UQ International Scholarship" },
    },
    {
      id: "5", name: "Monash University",
      location: { city: "Melbourne", state: "VIC", country: "Australia" },
      ranking: { position: 42, type: "Global" },
      scholarship: { percentage: 30, accreditedBy: "TEQSA", description: "Monash International Merit Scholarship" },
    },
    {
      id: "6", name: "University of New South Wales",
      location: { city: "Sydney", state: "NSW", country: "Australia" },
      ranking: { position: 45, type: "Global" },
      scholarship: { percentage: 25, accreditedBy: "TEQSA", description: "UNSW International Scholarships" },
    },
    {
      id: "7", name: "University of Western Australia",
      location: { city: "Perth", state: "WA", country: "Australia" },
      ranking: { position: 72, type: "Global" },
      scholarship: { percentage: 35, accreditedBy: "TEQSA", description: "UWA Global Excellence Scholarship" },
    },
    {
      id: "8", name: "University of Adelaide",
      location: { city: "Adelaide", state: "SA", country: "Australia" },
      ranking: { position: 89, type: "Global" },
      scholarship: { percentage: 30, accreditedBy: "TEQSA", description: "Adelaide Global Academic Excellence Scholarship" },
    },
  ],
  whyData: [
    "8 universities in the top 100 globally (QS World Rankings)",
    "Post-study work visa for 2-4 years depending on qualification",
    "Safe, multicultural, and welcoming environment",
    "Part-time work rights during studies (up to 48 hours per fortnight)",
    "High quality of life with excellent healthcare",
    "Research and innovation opportunities across all fields",
  ],
  visaRequirements: {
    processingtime: "4-6 weeks",
    VisaCardData: [
      {
        id: "identity_travel", title: "Identity & Travel Documents", icon: "IdCard",
        items: ["Valid passport (with sufficient validity)", "Passport-size photographs (as per visa specifications)", "National ID (if required)"],
      },
      {
        id: "offer_admission", title: "Offer & Admission Documents", icon: "GraduationCap",
        items: ["Offer Letter / Confirmation of Enrollment (CoE)", "Acceptance letter from the university", "Course details and duration information"],
      },
      {
        id: "financial", title: "Financial Documents", icon: "Landmark",
        items: ["Proof of funds to cover tuition and living expenses", "Bank statements (last 6-12 months)", "Education loan approval letter (if applicable)", "Sponsor affidavit / relationship proof (if sponsored)"],
      },
      {
        id: "academic", title: "Academic Documents", icon: "FileText",
        items: ["Academic transcripts and certificates", "English language test results (IELTS / PTE / TOEFL)", "Gap justification documents (if applicable)"],
      },
      {
        id: "visa_specific", title: "Visa-Specific Forms & Statements", icon: "FileText",
        items: ["Statement of Purpose (Visa SOP / GTE)", "Completed visa application form", "Visa fee payment receipt"],
      },
      {
        id: "health_character", title: "Health & Character Requirements", icon: "HeartPulse",
        items: ["Medical examination report from approved clinics", "Police Clearance Certificate (PCC)", "Overseas Student Health Cover (OSHC)"],
      },
      {
        id: "additional", title: "Additional Supporting Documents", icon: "Briefcase",
        items: ["Work experience letters", "CV / Resume", "Portfolio (for creative courses)", "Biometrics appointment confirmation"],
      },
    ],
  },
  admissionRequirementsData: {
    Undergraduate: [
      { id: 1, text: "Completion of Year 12 or equivalent international qualification" },
      { id: 2, text: "IELTS 6.0-6.5 overall (or equivalent)" },
      { id: 3, text: "Academic transcripts and certificates" },
      { id: 4, text: "Some courses may require additional tests (ATAR, SAT)" },
    ],
    Postgraduate: [
      { id: 1, text: "Completed bachelor degree or equivalent qualification" },
      { id: 2, text: "IELTS 6.5-7.0 overall (or equivalent)" },
      { id: 3, text: "Academic transcripts and degree certificates" },
      { id: 4, text: "Professional work experience (program dependent)" },
      { id: 5, text: "Letters of recommendation (2-3 required)" },
      { id: 6, text: "Statement of purpose or research proposal" },
    ],
    Doctoral: [
      { id: 1, text: "Completed master degree or equivalent qualification" },
      { id: 2, text: "IELTS 7.0-7.5 overall (or equivalent)" },
      { id: 3, text: "Comprehensive research proposal (3000-5000 words)" },
      { id: 4, text: "Academic transcripts from all previous institutions" },
      { id: 5, text: "Three academic references from qualified referees" },
      { id: 6, text: "Published research or significant research experience" },
      { id: 7, text: "Interview with potential supervisor required" },
    ],
  },
  costData: [
    { id: 1, category: "Accommodation", minCost: 200, maxCost: 500, percentage: 85 },
    { id: 2, category: "Food & Dining", minCost: 80, maxCost: 200, percentage: 70 },
    { id: 3, category: "Miscellaneous", minCost: 50, maxCost: 150, percentage: 75 },
    { id: 4, category: "Transport", minCost: 30, maxCost: 70, percentage: 65 },
  ],
  workData: [
    { title: "Part-Time During Studies", description: "Work up to 48 hours per fortnight during semester and unlimited hours during breaks", icon: "Briefcase" },
    { title: "Post-Study Work Visa", description: "2-4 year Temporary Graduate Visa (Subclass 485) depending on qualification level", icon: "FileText" },
    { title: "Career Opportunities", description: "Strong job market in IT, healthcare, engineering, and business sectors", icon: "TrendingUp" },
  ],
  scholarshipData: [
    { id: 1, name: "Australia Awards Scholarships", amount: "Full tuition + living expenses", eligibility: "Developing country nationals", deadline: "April 30" },
    { id: 2, name: "Research Training Program (RTP)", amount: "Full tuition + AUD 28,854/year stipend", eligibility: "Research degree students", deadline: "October 31" },
    { id: 3, name: "Destination Australia Scholarship", amount: "Up to AUD 15,000/year", eligibility: "Students studying in regional areas", deadline: "Varies by university" },
  ],
  cultureData: [
    { id: 1, title: "Beach & Outdoor Lifestyle", description: "Enjoy surfing, hiking, and the iconic Australian outdoor culture", image: "/culture/beach.jpg" },
    { id: 2, title: "Multicultural Society", description: "Experience diverse food, festivals, and communities from around the world", image: "/culture/multicultural.jpg" },
    { id: 3, title: "Wildlife & Nature", description: "Encounter unique wildlife like koalas, kangaroos, and the Great Barrier Reef", image: "/culture/wildlife.jpg" },
    { id: 4, title: "Sports & Entertainment", description: "Cricket, AFL, rugby and a vibrant arts and music scene", image: "/culture/sports.jpg" },
  ],
  testimonials: [
    {
      name: "Rahul Thapa", degree: "MS Computer Science", university: "University of Melbourne", country: "Australia",
      quote: "The team at Nexsus made the entire process seamless. From university selection to visa approval, they were there every step of the way.",
      image: "/student/student1.jpg",
    },
    {
      name: "Anita Sharma", degree: "MBA", university: "University of Sydney", country: "Australia",
      quote: "Australia's education system exceeded my expectations. The practical approach to learning prepared me well for my career.",
      image: "/student/student2.jpg",
    },
    {
      name: "Bikash Karki", degree: "BEng Civil Engineering", university: "Monash University", country: "Australia",
      quote: "The multicultural environment and world-class facilities made my study experience truly enriching.",
      image: "/student/student3.jpg",
    },
  ],
};

export default australiaData;
