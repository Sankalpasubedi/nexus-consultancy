export interface CourseCategory {
  slug: string;
  title: string;
  description: string;
  programs: string;
  image: string;
  icon: string;
  gradient: string;
  programsList: {
    name: string;
    duration: string;
    tuition: string;
    description: string;
  }[];
  careers: {
    title: string;
    salary: string;
    growth: string;
  }[];
  destinations: {
    country: string;
    flag: string;
    universities: string[];
  }[];
  requirements: {
    undergraduate: string[];
    postgraduate: string[];
  };
}

export const courseCategories: CourseCategory[] = [
  {
    slug: "information-technology",
    title: "Information Technology",
    description: "Shape the digital future with cutting-edge tech programs from world-class universities.",
    programs: "180+",
    image: "/courses/it.png",
    icon: "Monitor",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
    programsList: [
      { name: "Cyber Security", duration: "3-4 years", tuition: "$22K-$52K/yr", description: "Protect systems and data from cyber threats." },
      { name: "Cloud Computing", duration: "3-4 years", tuition: "$20K-$48K/yr", description: "Design and manage scalable cloud infrastructure." },
      { name: "Data Science & AI", duration: "3-4 years", tuition: "$25K-$52K/yr", description: "Harness data and AI for real-world solutions." },
      { name: "Software Engineering", duration: "3-4 years", tuition: "$18K-$50K/yr", description: "Build robust, scalable software applications." },
      { name: "Network & Systems", duration: "3-4 years", tuition: "$20K-$45K/yr", description: "Design and maintain enterprise networks." },
      { name: "Information Systems", duration: "3-4 years", tuition: "$18K-$45K/yr", description: "Bridge business needs with technology solutions." },
    ],
    careers: [
      { title: "Cyber Security Analyst", salary: "$65K-$120K", growth: "33%" },
      { title: "Data Scientist", salary: "$70K-$130K", growth: "36%" },
      { title: "Cloud Architect", salary: "$80K-$150K", growth: "15%" },
      { title: "Software Developer", salary: "$60K-$140K", growth: "25%" },
      { title: "AI/ML Engineer", salary: "$75K-$160K", growth: "40%" },
      { title: "DevOps Engineer", salary: "$70K-$135K", growth: "21%" },
    ],
    destinations: [
      { country: "USA", flag: "us", universities: ["MIT", "Stanford", "UC Berkeley"] },
      { country: "UK", flag: "gb", universities: ["Oxford", "Cambridge", "Imperial"] },
      { country: "Australia", flag: "au", universities: ["Melbourne", "Sydney", "ANU"] },
      { country: "Canada", flag: "ca", universities: ["Toronto", "Waterloo", "UBC"] },
    ],
    requirements: {
      undergraduate: ["High school diploma with strong math/science", "IELTS 6.0-7.0 or equivalent", "SAT/ACT scores (for US)"],
      postgraduate: ["Bachelor's in CS/IT or related field", "IELTS 6.5-7.0", "GRE scores (recommended)", "Programming portfolio preferred"],
    },
  },
  {
    slug: "business-management",
    title: "Business & Management",
    description: "Develop leadership skills and business acumen at top global business schools.",
    programs: "240+",
    image: "/courses/business and management.webp",
    icon: "BarChart3",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
    programsList: [
      { name: "MBA", duration: "1-2 years", tuition: "$30K-$70K/yr", description: "Comprehensive business leadership program." },
      { name: "International Business", duration: "3-4 years", tuition: "$20K-$50K/yr", description: "Global commerce and trade management." },
      { name: "Finance & Accounting", duration: "3-4 years", tuition: "$22K-$55K/yr", description: "Financial analysis and corporate accounting." },
      { name: "Marketing", duration: "3-4 years", tuition: "$20K-$48K/yr", description: "Digital marketing and brand management." },
      { name: "HR Management", duration: "3-4 years", tuition: "$18K-$45K/yr", description: "People management and organizational development." },
      { name: "Supply Chain", duration: "3-4 years", tuition: "$20K-$50K/yr", description: "Logistics and operations management." },
    ],
    careers: [
      { title: "Management Consultant", salary: "$70K-$150K", growth: "14%" },
      { title: "Financial Analyst", salary: "$60K-$120K", growth: "9%" },
      { title: "Marketing Manager", salary: "$65K-$130K", growth: "10%" },
      { title: "Investment Banker", salary: "$80K-$200K", growth: "7%" },
      { title: "HR Director", salary: "$70K-$140K", growth: "9%" },
      { title: "Operations Manager", salary: "$60K-$120K", growth: "8%" },
    ],
    destinations: [
      { country: "USA", flag: "us", universities: ["Harvard", "Wharton", "Stanford"] },
      { country: "UK", flag: "gb", universities: ["London Business School", "Oxford Saïd"] },
      { country: "France", flag: "fr", universities: ["INSEAD", "HEC Paris"] },
      { country: "Australia", flag: "au", universities: ["Melbourne Business", "UNSW"] },
    ],
    requirements: {
      undergraduate: ["High school diploma", "IELTS 6.0-6.5", "Math proficiency preferred"],
      postgraduate: ["Bachelor's degree", "IELTS 6.5-7.0", "GMAT 600+ (for MBA)", "2+ years work experience (MBA)"],
    },
  },
  {
    slug: "engineering",
    title: "Engineering",
    description: "Build the future with world-class engineering education and research opportunities.",
    programs: "200+",
    image: "/courses/engineering-1024x682.jpg",
    icon: "Cog",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
    programsList: [
      { name: "Mechanical Engineering", duration: "4 years", tuition: "$20K-$55K/yr", description: "Design and manufacture mechanical systems." },
      { name: "Civil Engineering", duration: "4 years", tuition: "$18K-$50K/yr", description: "Plan and build infrastructure projects." },
      { name: "Electrical Engineering", duration: "4 years", tuition: "$22K-$55K/yr", description: "Power systems and electronics design." },
      { name: "Chemical Engineering", duration: "4 years", tuition: "$20K-$52K/yr", description: "Process design and chemical manufacturing." },
      { name: "Aerospace Engineering", duration: "4 years", tuition: "$25K-$58K/yr", description: "Aircraft and spacecraft design." },
      { name: "Environmental Engineering", duration: "4 years", tuition: "$18K-$48K/yr", description: "Sustainable solutions for environmental challenges." },
    ],
    careers: [
      { title: "Mechanical Engineer", salary: "$65K-$110K", growth: "7%" },
      { title: "Civil Engineer", salary: "$60K-$105K", growth: "8%" },
      { title: "Electrical Engineer", salary: "$70K-$120K", growth: "7%" },
      { title: "Aerospace Engineer", salary: "$75K-$130K", growth: "8%" },
      { title: "Chemical Engineer", salary: "$70K-$120K", growth: "9%" },
      { title: "Environmental Engineer", salary: "$60K-$100K", growth: "4%" },
    ],
    destinations: [
      { country: "USA", flag: "us", universities: ["MIT", "Stanford", "Georgia Tech"] },
      { country: "UK", flag: "gb", universities: ["Imperial", "Cambridge", "UCL"] },
      { country: "Germany", flag: "de", universities: ["TU Munich", "RWTH Aachen"] },
      { country: "Japan", flag: "jp", universities: ["University of Tokyo", "Kyoto"] },
    ],
    requirements: {
      undergraduate: ["High school diploma with strong math/physics", "IELTS 6.0-6.5", "SAT Math 700+ recommended"],
      postgraduate: ["Bachelor's in Engineering", "IELTS 6.5-7.0", "GRE scores", "Research experience preferred"],
    },
  },
  {
    slug: "health-sciences",
    title: "Health Sciences",
    description: "Pursue a career in healthcare with programs from globally recognized medical institutions.",
    programs: "150+",
    image: "/courses/health sciences.jpg",
    icon: "Heart",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
    programsList: [
      { name: "Medicine / MBBS", duration: "5-6 years", tuition: "$30K-$60K/yr", description: "Comprehensive medical degree." },
      { name: "Nursing", duration: "3-4 years", tuition: "$18K-$40K/yr", description: "Patient care and clinical nursing." },
      { name: "Pharmacy", duration: "4-5 years", tuition: "$20K-$45K/yr", description: "Pharmaceutical sciences and drug development." },
      { name: "Public Health", duration: "2 years", tuition: "$20K-$50K/yr", description: "Community health and epidemiology." },
      { name: "Biomedical Sciences", duration: "3-4 years", tuition: "$22K-$50K/yr", description: "Medical research and laboratory sciences." },
      { name: "Physiotherapy", duration: "3-4 years", tuition: "$20K-$45K/yr", description: "Physical rehabilitation and therapy." },
    ],
    careers: [
      { title: "Doctor", salary: "$80K-$250K", growth: "3%" },
      { title: "Registered Nurse", salary: "$55K-$90K", growth: "6%" },
      { title: "Pharmacist", salary: "$65K-$130K", growth: "5%" },
      { title: "Public Health Specialist", salary: "$55K-$100K", growth: "17%" },
      { title: "Biomedical Researcher", salary: "$50K-$100K", growth: "17%" },
      { title: "Physiotherapist", salary: "$55K-$95K", growth: "18%" },
    ],
    destinations: [
      { country: "USA", flag: "us", universities: ["Johns Hopkins", "Harvard Medical"] },
      { country: "UK", flag: "gb", universities: ["Oxford", "Cambridge", "Imperial"] },
      { country: "Australia", flag: "au", universities: ["Melbourne", "Sydney", "Monash"] },
      { country: "Canada", flag: "ca", universities: ["Toronto", "McGill", "UBC"] },
    ],
    requirements: {
      undergraduate: ["High school diploma with biology/chemistry", "IELTS 6.5-7.0", "MCAT/UCAT (for medicine)"],
      postgraduate: ["Bachelor's in relevant field", "IELTS 7.0", "Clinical experience preferred", "Research publications (bonus)"],
    },
  },
  {
    slug: "arts-and-design",
    title: "Arts & Design",
    description: "Unleash your creativity at prestigious art and design schools worldwide.",
    programs: "120+",
    image: "/courses/art and design.jpg",
    icon: "Palette",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
    programsList: [
      { name: "Graphic Design", duration: "3-4 years", tuition: "$18K-$45K/yr", description: "Visual communication and branding." },
      { name: "Fine Arts", duration: "3-4 years", tuition: "$15K-$40K/yr", description: "Painting, sculpture, and mixed media." },
      { name: "Animation & VFX", duration: "3-4 years", tuition: "$20K-$45K/yr", description: "3D animation and visual effects." },
      { name: "Fashion Design", duration: "3-4 years", tuition: "$20K-$45K/yr", description: "Fashion creation and textile design." },
      { name: "Interior Design", duration: "3-4 years", tuition: "$18K-$42K/yr", description: "Space design and architecture." },
      { name: "Film & Media", duration: "3-4 years", tuition: "$20K-$45K/yr", description: "Filmmaking and digital media production." },
    ],
    careers: [
      { title: "UX/UI Designer", salary: "$55K-$110K", growth: "23%" },
      { title: "Art Director", salary: "$65K-$130K", growth: "11%" },
      { title: "Animator", salary: "$50K-$100K", growth: "16%" },
      { title: "Fashion Designer", salary: "$40K-$90K", growth: "3%" },
      { title: "Film Director", salary: "$50K-$150K", growth: "24%" },
      { title: "Interior Designer", salary: "$45K-$90K", growth: "5%" },
    ],
    destinations: [
      { country: "USA", flag: "us", universities: ["RISD", "Parsons", "CalArts"] },
      { country: "UK", flag: "gb", universities: ["Royal College of Art", "Central Saint Martins"] },
      { country: "Italy", flag: "it", universities: ["Politecnico di Milano"] },
      { country: "Japan", flag: "jp", universities: ["Musashino Art University"] },
    ],
    requirements: {
      undergraduate: ["High school diploma", "IELTS 6.0-6.5", "Portfolio required", "Creative aptitude test"],
      postgraduate: ["Bachelor's in relevant field", "IELTS 6.5", "Strong portfolio", "Artist statement"],
    },
  },
  {
    slug: "law-and-legal-studies",
    title: "Law & Legal Studies",
    description: "Pursue justice and governance with law degrees from internationally renowned faculties.",
    programs: "90+",
    image: "/courses/legal and law.jpeg",
    icon: "Scale",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
    programsList: [
      { name: "LLB (Bachelor of Laws)", duration: "3-4 years", tuition: "$15K-$40K/yr", description: "Foundational law degree." },
      { name: "LLM (Master of Laws)", duration: "1-2 years", tuition: "$25K-$60K/yr", description: "Advanced legal specialization." },
      { name: "JD (Juris Doctor)", duration: "3 years", tuition: "$30K-$65K/yr", description: "Professional law degree (US)." },
      { name: "International Law", duration: "1-2 years", tuition: "$25K-$55K/yr", description: "Global governance and treaties." },
      { name: "Corporate Law", duration: "1-2 years", tuition: "$25K-$60K/yr", description: "Business and commercial law." },
      { name: "Human Rights Law", duration: "1-2 years", tuition: "$20K-$50K/yr", description: "Human rights advocacy and policy." },
    ],
    careers: [
      { title: "Corporate Lawyer", salary: "$80K-$200K", growth: "10%" },
      { title: "Human Rights Lawyer", salary: "$55K-$120K", growth: "9%" },
      { title: "Legal Consultant", salary: "$70K-$150K", growth: "8%" },
      { title: "Legal Advisor", salary: "$65K-$130K", growth: "8%" },
      { title: "Judge/Magistrate", salary: "$80K-$180K", growth: "3%" },
      { title: "International Law Specialist", salary: "$75K-$160K", growth: "9%" },
    ],
    destinations: [
      { country: "USA", flag: "us", universities: ["Harvard Law", "Yale Law", "Stanford Law"] },
      { country: "UK", flag: "gb", universities: ["Oxford", "Cambridge", "LSE"] },
      { country: "Australia", flag: "au", universities: ["Melbourne Law", "Sydney Law"] },
      { country: "Netherlands", flag: "nl", universities: ["Leiden University"] },
    ],
    requirements: {
      undergraduate: ["High school diploma", "IELTS 6.5-7.0", "Strong analytical skills"],
      postgraduate: ["Bachelor's degree (any field for JD)", "IELTS 7.0", "LSAT (for US JD programs)", "Law degree (for LLM)"],
    },
  },
  {
    slug: "social-sciences",
    title: "Social Sciences",
    description: "Understand human behavior and society through rigorous academic programs.",
    programs: "160+",
    image: "/courses/social science.jpg",
    icon: "Globe",
    gradient: "from-[#003975] via-[#003975] to-[#00ab18]",
    programsList: [
      { name: "Psychology", duration: "3-4 years", tuition: "$18K-$50K/yr", description: "Study of mind and behavior." },
      { name: "Sociology", duration: "3-4 years", tuition: "$15K-$42K/yr", description: "Social structures and institutions." },
      { name: "Political Science", duration: "3-4 years", tuition: "$16K-$45K/yr", description: "Government and political systems." },
      { name: "International Relations", duration: "3-4 years", tuition: "$18K-$48K/yr", description: "Global diplomacy and foreign policy." },
      { name: "Economics", duration: "3-4 years", tuition: "$20K-$50K/yr", description: "Economic theory and policy analysis." },
      { name: "Anthropology", duration: "3-4 years", tuition: "$14K-$42K/yr", description: "Human cultures and evolution." },
    ],
    careers: [
      { title: "Policy Analyst", salary: "$55K-$100K", growth: "6%" },
      { title: "Clinical Psychologist", salary: "$60K-$120K", growth: "14%" },
      { title: "Social Worker", salary: "$45K-$75K", growth: "9%" },
      { title: "Diplomat", salary: "$65K-$130K", growth: "6%" },
      { title: "Economist", salary: "$60K-$130K", growth: "13%" },
      { title: "Research Analyst", salary: "$50K-$90K", growth: "18%" },
    ],
    destinations: [
      { country: "USA", flag: "us", universities: ["Harvard", "Princeton", "Stanford"] },
      { country: "UK", flag: "gb", universities: ["Oxford", "LSE", "Cambridge"] },
      { country: "Netherlands", flag: "nl", universities: ["Amsterdam", "Leiden"] },
      { country: "Canada", flag: "ca", universities: ["Toronto", "McGill", "UBC"] },
    ],
    requirements: {
      undergraduate: ["High school diploma", "IELTS 6.0-6.5", "Strong writing skills"],
      postgraduate: ["Bachelor's in relevant field", "IELTS 6.5-7.0", "GRE (recommended)", "Research proposal (PhD)"],
    },
  },
];
