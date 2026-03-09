// Shared exam data for test preparation pages

export interface ExamData {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
  stat: string;
  statLabel: string;
  image: string;
  heroImage: string;
  detailedDescription: string;
  sections: { name: string; description: string; duration: string }[];
  tips: string[];
  duration: string;
  fee: string;
  validity: string;
  acceptedBy: string[];
  scoreRange: string;
  testimonials: { id: number; name: string; score: string; quote: string; university: string }[];
}

export const exams: ExamData[] = [
  {
    title: "IELTS",
    slug: "enroll-for-ielts",
    subtitle: "International English Language Testing System",
    description: "The world's most popular English proficiency test for study, work, and migration. Accepted by over 11,000 organizations in 140+ countries.",
    features: ["Academic & General Training", "Computer & Paper-based", "Band score 0–9", "Results in 13 days"],
    icon: "BookOpen",
    stat: "3.5M+",
    statLabel: "Tests/Year",
    image: "/images/ielts.jpg",
    heroImage: "/images/ielts.jpg",
    detailedDescription: "IELTS (International English Language Testing System) is the world's most popular English language proficiency test. It assesses your ability to listen, read, write and speak in English, and is designed to reflect how you will use English at study, at work and in everyday life. Whether you're applying for university, seeking professional registration, or planning to migrate, IELTS opens doors to opportunities worldwide.",
    sections: [
      { name: "Listening", description: "4 sections with recordings of native English speakers covering conversations and monologues", duration: "40 minutes" },
      { name: "Reading", description: "3 sections with academic texts from books, journals, and newspapers", duration: "60 minutes" },
      { name: "Writing", description: "2 tasks - describe visual information and write an argumentative essay", duration: "60 minutes" },
      { name: "Speaking", description: "Face-to-face interview covering everyday topics and abstract ideas", duration: "11-14 minutes" },
    ],
    tips: ["Practice with authentic British Council materials", "Time yourself strictly during practice tests", "Focus on improving your weakest skills first", "Learn vocabulary in context, not isolation", "Record yourself speaking and analyze pronunciation", "Read academic articles daily to improve comprehension"],
    duration: "2 hours 45 minutes",
    fee: "NPR 29,500",
    validity: "2 years",
    acceptedBy: ["UK Universities", "Australian Immigration", "Canadian PR", "European Institutions", "US Universities"],
    scoreRange: "Band 0-9",
    testimonials: [
      { id: 1, name: "Priya Sharma", score: "Band 8.0", quote: "Nexsus helped me achieve my target band score in just 6 weeks. The mock tests were incredibly helpful!", university: "University of Melbourne" },
      { id: 2, name: "Rahul KC", score: "Band 7.5", quote: "The speaking practice sessions with expert trainers boosted my confidence tremendously.", university: "University of Edinburgh" },
      { id: 3, name: "Anita Gurung", score: "Band 8.5", quote: "Best IELTS coaching in Nepal! The personalized feedback on writing tasks made all the difference.", university: "University of Toronto" },
    ],
  },
  {
    title: "TOEFL iBT",
    slug: "enroll-for-toefl-ibt",
    subtitle: "Test of English as a Foreign Language",
    description: "Preferred by universities in the USA, Canada, and worldwide. Measures reading, listening, speaking, and writing in an academic context.",
    features: ["Internet-based test", "Score range 0–120", "Accepted by 12,000+ institutions", "Results in 4–8 days"],
    icon: "Globe",
    stat: "35M+",
    statLabel: "Tests Taken",
    image: "/images/toefl.jpg",
    heroImage: "/images/toefl.jpg",
    detailedDescription: "TOEFL iBT measures your ability to use and understand English at the university level. It evaluates how well you combine listening, reading, speaking and writing skills to perform academic tasks. The test is entirely computer-based, making it convenient and ensuring fast, accurate scoring.",
    sections: [
      { name: "Reading", description: "Academic passages with comprehension questions testing inference and vocabulary", duration: "35 minutes" },
      { name: "Listening", description: "Lectures and conversations from real academic settings", duration: "36 minutes" },
      { name: "Speaking", description: "Express opinions, summarize information, and demonstrate fluency", duration: "16 minutes" },
      { name: "Writing", description: "Integrated task combining reading/listening with independent essay", duration: "29 minutes" },
    ],
    tips: ["Get comfortable with the computer-based format early", "Practice note-taking for listening sections", "Build academic vocabulary systematically", "Take official ETS practice tests weekly", "Focus on integrated tasks that combine skills", "Work on typing speed for writing section"],
    duration: "About 2 hours",
    fee: "USD 190-200",
    validity: "2 years",
    acceptedBy: ["US Universities", "Canadian Universities", "UK Universities", "Australian Universities", "European Institutions"],
    scoreRange: "0-120",
    testimonials: [
      { id: 1, name: "Bikash Thapa", score: "112/120", quote: "The integrated task strategies taught here were game-changers. Scored 112 on my first attempt!", university: "MIT" },
      { id: 2, name: "Srijana Maharjan", score: "108/120", quote: "Excellent coaching for the speaking section. The recording practice sessions were invaluable.", university: "Stanford University" },
      { id: 3, name: "Arun Shrestha", score: "115/120", quote: "From 85 to 115 in 2 months! The personalized study plan worked wonders.", university: "Columbia University" },
    ],
  },
  {
    title: "PTE Academic",
    slug: "enroll-for-pte-academic",
    subtitle: "Pearson Test of English",
    description: "Fast, fair computer-based English test ideal for study abroad and immigration. Accepted by thousands of institutions globally.",
    features: ["AI-scored for fairness", "Results in 48 hours", "Score range 10–90", "Flexible test dates"],
    icon: "Monitor",
    stat: "99%",
    statLabel: "Acceptance",
    image: "/images/pte.jpg",
    heroImage: "/images/pte.jpg",
    detailedDescription: "PTE Academic is a computer-based English language test trusted by universities, colleges and governments around the world. It uses advanced AI technology to score your test, ensuring fast, accurate and unbiased results. With results available in just 48 hours and flexible test dates, PTE is the smart choice for busy professionals and students.",
    sections: [
      { name: "Speaking & Writing", description: "Personal introduction, read aloud, repeat sentence, describe image, essays", duration: "54-67 minutes" },
      { name: "Reading", description: "Multiple choice, reorder paragraphs, fill in the blanks", duration: "29-30 minutes" },
      { name: "Listening", description: "Summarize spoken text, multiple choice, highlight correct summary, dictation", duration: "30-43 minutes" },
    ],
    tips: ["Practice speaking clearly into a microphone", "Improve your typing speed to at least 40 WPM", "Master time management for each section", "Understand how AI scoring works", "Focus on pronunciation and oral fluency", "Practice with official Pearson materials"],
    duration: "Approximately 2 hours",
    fee: "USD 210-270",
    validity: "2 years",
    acceptedBy: ["Australian Immigration", "UK Visas", "New Zealand Immigration", "Canadian Institutions", "US Universities"],
    scoreRange: "10-90",
    testimonials: [
      { id: 1, name: "Deepak Regmi", score: "85/90", quote: "Got my Australian PR with a PTE score of 85. Nexsus trainers know exactly what the AI looks for!", university: "Australian PR Approved" },
      { id: 2, name: "Manisha Rai", score: "79/90", quote: "The AI scoring tips were incredibly specific and helpful. Achieved 79 on my second attempt.", university: "University of Auckland" },
      { id: 3, name: "Sujan Tamang", score: "82/90", quote: "Fast results and excellent score! The mock tests here perfectly simulate the real exam.", university: "Monash University" },
    ],
  },
  {
    title: "GRE",
    slug: "enroll-for-gre",
    subtitle: "Graduate Record Examination",
    description: "Required for graduate school admission in the US and other countries. Tests verbal reasoning, quantitative reasoning, and analytical writing.",
    features: ["Verbal & Quantitative", "Score range 130–170/section", "5-year score validity", "At home or test center"],
    icon: "BarChart3",
    stat: "700K+",
    statLabel: "Tests/Year",
    image: "/images/gre.jpg",
    heroImage: "/images/gre.jpg",
    detailedDescription: "The GRE General Test measures verbal reasoning, quantitative reasoning, critical thinking and analytical writing skills that have been developed over a long period of time and are not related to any specific field of study. It's your gateway to thousands of graduate programs, including MBA, specialized master's, and doctoral degrees worldwide.",
    sections: [
      { name: "Analytical Writing", description: "Analyze an issue and analyze an argument with well-structured essays", duration: "60 minutes" },
      { name: "Verbal Reasoning", description: "Reading comprehension, text completion, and sentence equivalence", duration: "60 minutes" },
      { name: "Quantitative Reasoning", description: "Arithmetic, algebra, geometry, and data analysis problems", duration: "70 minutes" },
    ],
    tips: ["Build a strong vocabulary with 3000+ words", "Review math fundamentals systematically", "Practice argument analysis daily", "Use official ETS materials exclusively", "Learn to manage time across adaptive sections", "Focus on data interpretation questions"],
    duration: "About 3 hours 45 minutes",
    fee: "USD 220",
    validity: "5 years",
    acceptedBy: ["US Graduate Schools", "MBA Programs", "Canadian Universities", "European Universities", "Asian Institutions"],
    scoreRange: "130-170 per section",
    testimonials: [
      { id: 1, name: "Ashish Pandey", score: "328/340", quote: "The quant strategies taught here are exceptional. Went from 155 to 168 in quantitative!", university: "Harvard University" },
      { id: 2, name: "Kritika Joshi", score: "322/340", quote: "Vocabulary building sessions and practice tests helped me score 165 in verbal.", university: "UC Berkeley" },
      { id: 3, name: "Rohan Basnet", score: "330/340", quote: "Nexsus GRE coaching is world-class. The analytical writing feedback improved my score by 1.5 points.", university: "Princeton University" },
    ],
  },
  {
    title: "SAT",
    slug: "enroll-for-sat",
    subtitle: "Scholastic Assessment Test",
    description: "Standardized test for undergraduate admissions in the US. Measures math, evidence-based reading, and writing skills.",
    features: ["Digital adaptive test", "Score range 400–1600", "Accepted worldwide", "Multiple test dates"],
    icon: "Star",
    stat: "2.2M+",
    statLabel: "Students/Year",
    image: "/images/sat.jpg",
    heroImage: "/images/sat.jpg",
    detailedDescription: "The SAT is a standardized test widely used for college admissions in the United States. The new digital SAT is shorter, more secure, and provides faster results while still measuring the skills and knowledge that matter most for college and career readiness. It's your ticket to top universities worldwide.",
    sections: [
      { name: "Reading & Writing", description: "Reading comprehension, grammar, vocabulary in context across 2 modules", duration: "64 minutes" },
      { name: "Math", description: "Algebra, geometry, data analysis, and advanced math across 2 adaptive modules", duration: "70 minutes" },
    ],
    tips: ["Practice with Khan Academy's free official resources", "Master time management for each section", "Understand how the adaptive format works", "Review algebra and data analysis thoroughly", "Take full-length digital practice tests", "Focus on evidence-based questions"],
    duration: "About 2 hours 14 minutes",
    fee: "USD 60 (+ international fees)",
    validity: "5 years",
    acceptedBy: ["US Colleges", "UK Universities", "Canadian Universities", "Asian Universities", "European Institutions"],
    scoreRange: "400-1600",
    testimonials: [
      { id: 1, name: "Sneha Adhikari", score: "1540/1600", quote: "From 1320 to 1540! The adaptive test strategies made a huge difference in my score.", university: "Yale University" },
      { id: 2, name: "Pratik Shah", score: "1520/1600", quote: "The math coaching is excellent. Scored a perfect 800 in math section!", university: "UCLA" },
      { id: 3, name: "Nisha Karki", score: "1490/1600", quote: "Comprehensive coaching that covers every aspect of the new digital SAT.", university: "NYU" },
    ],
  },
  {
    title: "GMAT",
    slug: "enroll-for-gmat",
    subtitle: "Graduate Management Admission Test",
    description: "The gold standard for MBA and business school admissions globally. Assesses analytical, writing, quantitative, and verbal skills.",
    features: ["Focus Edition available", "Score range 205–805", "Accepted by 7,700+ programs", "5-year validity"],
    icon: "Briefcase",
    stat: "200K+",
    statLabel: "Tests/Year",
    image: "/images/gmat.jpg",
    heroImage: "/images/gmat.jpg",
    detailedDescription: "The GMAT is a computer-adaptive test that measures analytical writing and problem-solving abilities, along with data sufficiency, logic, and critical reasoning skills. It is specifically designed to predict success in graduate business programs and is required by most top MBA programs worldwide.",
    sections: [
      { name: "Quantitative Reasoning", description: "Data sufficiency and problem-solving covering arithmetic, algebra, and geometry", duration: "45 minutes" },
      { name: "Verbal Reasoning", description: "Reading comprehension, critical reasoning, and sentence correction", duration: "45 minutes" },
      { name: "Data Insights", description: "Data interpretation, multi-source reasoning, graphics interpretation", duration: "45 minutes" },
    ],
    tips: ["Focus heavily on data interpretation skills", "Practice critical reasoning questions daily", "Master sentence correction patterns", "Take official GMAT practice tests regularly", "Understand the computer-adaptive algorithm", "Build mental math speed"],
    duration: "About 2 hours 15 minutes",
    fee: "USD 275",
    validity: "5 years",
    acceptedBy: ["Top MBA Programs", "INSEAD", "Wharton", "Harvard Business School", "London Business School"],
    scoreRange: "205-805",
    testimonials: [
      { id: 1, name: "Sagar Pokharel", score: "740/805", quote: "The GMAT Focus Edition coaching here is outstanding. Scored 740 and got into ISB!", university: "ISB Hyderabad" },
      { id: 2, name: "Binita Khadka", score: "720/805", quote: "Data Insights section coaching was exceptional. The strategies really work!", university: "INSEAD" },
      { id: 3, name: "Niraj Shrestha", score: "750/805", quote: "From 650 to 750 in 3 months. Best GMAT coaching in Kathmandu!", university: "Wharton" },
    ],
  },
];

export function getExamBySlug(slug: string): ExamData | undefined {
  return exams.find((exam) => exam.slug === slug);
}

export function getOtherExams(currentSlug: string): ExamData[] {
  return exams.filter((exam) => exam.slug !== currentSlug);
}
