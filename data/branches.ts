/* ─── Branch Data ─────────────────────────────────────────── */

// Testimonial type
export interface Testimonial {
  id: number;
  name: string;
  country: string;
  quote: string;
  destination: string;
}

// FAQ type
export interface FAQ {
  question: string;
  answer: string;
}

// Stat type
export interface BranchStat {
  label: string;
  value: string;
}

export interface Branch {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  phone2: string;
  whatsapp: string;
  email: string;
  mapUrl: string;
  mapEmbedUrl: string;
  coordinates: { lat: number; lng: number };
  isHeadOffice: boolean;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    tiktok: string;
  };
  openingHours: string;
  saturdayHours: string;
  description: string;
  longDescription: string[];
  image: string;
  googleRating: number;
  googleReviews: number;
  stats: BranchStat[];
  testimonials: Testimonial[];
  faqs: FAQ[];
}

export const branches: Branch[] = [
  {
    id: "dillibazar",
    slug: "find-us-at-dillibazar",
    name: "Kathmandu - Dillibazar (Head Office)",
    shortName: "Dillibazar",
    city: "Kathmandu",
    district: "Kathmandu",
    address: "Dillibazar, Kathmandu-44600, Nepal",
    phone: "+977 1 4519495",
    phone2: "+977 9851032197",
    whatsapp: "+977 9851032197",
    email: "info@nexsuseducation.com",
    mapUrl: "https://maps.google.com/?q=27.7089,85.3239",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.7089,85.3239&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 27.7089, lng: 85.3239 },
    isHeadOffice: true,
    socialLinks: {
      facebook: "https://facebook.com/nexsuseducation",
      instagram: "https://instagram.com/nexsuseducation",
      linkedin: "https://linkedin.com/company/nexsuseducation",
      tiktok: "https://tiktok.com/@nexsuseducation",
    },
    openingHours: "Sun - Fri: 9:00 AM - 6:00 PM",
    saturdayHours: "Saturday: Closed",
    description: "Our main headquarters in the heart of Kathmandu. Visit us for comprehensive study abroad guidance.",
    longDescription: [
      "Nexsus Education Dillibazar is our flagship headquarters, serving as the central hub for all study abroad services in Nepal. With years of experience and a dedicated team of expert counselors, we have helped thousands of students realize their dreams of studying at prestigious international universities.",
      "Our Dillibazar office specializes in providing end-to-end support for students aspiring to study in the UK, USA, Australia, Canada, and European countries. We offer expert guidance on course selection, university applications, visa processing, and scholarship opportunities.",
      "We take pride in our high visa success rate and personalized approach to each student's journey. Our team stays updated with the latest immigration policies and university requirements to provide accurate and timely guidance to all our students."
    ],
    image: "/branches/branch.png",
    googleRating: 4.9,
    googleReviews: 203,
    stats: [
      { label: "Students Assisted", value: "8,000+" },
      { label: "University Partners", value: "300+" },
      { label: "Visa Success Rate", value: "99%" },
      { label: "Countries", value: "12+" }
    ],
    testimonials: [
      { id: 1, name: "Anita Gurung", country: "UK", quote: "The team at Dillibazar branch made my UK study dream come true. From selecting the right university to visa approval, they were with me every step of the way. Highly recommended!", destination: "UK" },
      { id: 2, name: "Rajesh Karki", country: "Australia", quote: "I got my Australian student visa within 3 weeks thanks to Nexsus Dillibazar. Their documentation support and interview preparation were excellent.", destination: "Australia" },
      { id: 3, name: "Priya Adhikari", country: "Canada", quote: "Best education consultancy in Kathmandu! The counselors are knowledgeable and genuinely care about students' success. Got admission to my dream university in Canada.", destination: "Canada" }
    ],
    faqs: [
      { question: "Is Nexsus one of the best study abroad consultants in Nepal?", answer: "Yes, Nexsus Education is widely recognized as one of the top study abroad consultants in Nepal with the highest success rates and student satisfaction." },
      { question: "What services do study abroad consultants in Nepal provide?", answer: "We offer comprehensive services including free counseling, university selection, application processing, visa assistance, test preparation, SOP writing, scholarship guidance, and pre-departure orientation." },
      { question: "Does Nexsus offer free counseling for students in Dillibazar?", answer: "Absolutely! We provide free initial counseling to all students. Book an appointment or walk in during office hours to meet our expert counselors." },
      { question: "Which countries can I apply to through Nexsus Nepal?", answer: "We facilitate applications to universities in the UK, USA, Australia, Canada, New Zealand, Germany, Japan, South Korea, Ireland, and many other countries." },
      { question: "Where is Nexsus located in Dillibazar?", answer: "Our Dillibazar head office is located at the main Dillibazar road, Kathmandu-44600. It's easily accessible by public transport and near major landmarks." }
    ]
  },
  {
    id: "baneshwor",
    slug: "find-us-at-baneshwor",
    name: "Bharatpur - Chitwan",
    shortName: "Bharatpur",
    city: "Bharatpur",
    district: "Chitwan",
    address: "Bharatpur, Chitwan, Nepal",
    phone: "+977 56 666666",
    phone2: "+977 9855034567",
    whatsapp: "+977 9855034567",
    email: "chitwan@nexsuseducation.com",
    mapUrl: "https://maps.google.com/?q=27.6915,85.3430",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.6915,85.3430&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 27.6915, lng: 85.3430 },
    isHeadOffice: false,
    socialLinks: {
      facebook: "https://facebook.com/nexsuseducation.chitwan",
      instagram: "https://instagram.com/nexsuseducation",
      linkedin: "https://linkedin.com/company/nexsuseducation",
      tiktok: "https://tiktok.com/@nexsuseducation",
    },
    openingHours: "Sun - Fri: 10:00 AM - 5:30 PM",
    saturdayHours: "Saturday: Closed",
    description: "Our Chitwan branch provides personalized guidance to students from the Terai region.",
    longDescription: [
      "Nexsus Education Chitwan is one of the leading study abroad consultants in Chitwan, Nepal. We have been helping students from Bharatpur and surrounding areas achieve their international education dreams with comprehensive guidance and support.",
      "Established to bring quality overseas education consulting to the Terai region, our Chitwan branch has a proven track record of successful student placements in top universities across the UK, USA, Australia, Canada, and Europe.",
      "We offer the best IELTS, PTE Academic, TOEFL iBT and SAT coaching in Chitwan, providing ample mock tests to ensure our students meet their visa and admission requirements. From counseling to pre-departure support, we're with you every step of the way."
    ],
    image: "/branches/branch.png",
    googleRating: 4.8,
    googleReviews: 111,
    stats: [
      { label: "Students Assisted", value: "3,000+" },
      { label: "Institution Partners", value: "200+" },
      { label: "Visa Success Rate", value: "98%" },
      { label: "Destinations Served", value: "10+" }
    ],
    testimonials: [
      { id: 1, name: "Sarina Shrestha", country: "Canada", quote: "I was looking for a top education consultant in Chitwan and luckily a friend recommended me to Nexsus. The consultancy assisted me from getting a letter of offer for my education to acquiring student insurance and finally arranging my visa.", destination: "Canada" },
      { id: 2, name: "Shrawan Kumar Thapa", country: "Australia", quote: "Nexsus Nepal is the best overseas education consultant in Nepal. They provided great assistance with my student visa application to Melbourne, Australia. The team has been very approachable and always there to answer all my queries.", destination: "Australia" },
      { id: 3, name: "Devnand Thapa", country: "Canada", quote: "I am ever grateful to the competent team for helping me attain my Canada student visa in no time. The consultation and customer services they provide are efficient and excellent. Nexsus is the best education consultancy in Chitwan.", destination: "Canada" }
    ],
    faqs: [
      { question: "Is Nexsus one of the best study abroad consultants in Nepal?", answer: "Yes, Nexsus Education is recognized as one of the leading overseas education consultants in Nepal and Chitwan, with thousands of successful student placements across multiple countries." },
      { question: "What services do study abroad consultants in Nepal provide?", answer: "We provide comprehensive services including career counseling, course and university selection, application processing, test preparation (IELTS, PTE, TOEFL, SAT), visa assistance, scholarship guidance, and pre-departure orientation." },
      { question: "Does Nexsus offer free counseling for students in Chitwan?", answer: "Yes! We offer completely free initial counseling sessions. Visit our Bharatpur office or book an appointment to speak with our expert counselors." },
      { question: "Which countries can I apply to through Nexsus Nepal?", answer: "Through Nexsus, you can apply to universities in the UK, USA, Australia, Canada, New Zealand, Germany, Cyprus, France, Japan, South Korea, and many other countries." },
      { question: "Where is Nexsus located in Chitwan?", answer: "Our Chitwan office is located in Bharatpur, easily accessible from all parts of the district. We also have clients visiting from Narayanghat, Ratnanagar, and nearby areas." }
    ]
  },
  {
    id: "samakhusi",
    slug: "find-us-at-samakhusi",
    name: "Kathmandu - Samakhusi",
    shortName: "Samakhusi",
    city: "Kathmandu",
    district: "Kathmandu",
    address: "Samakhusi, Kathmandu, Nepal",
    phone: "+977 1 4971971",
    phone2: "+977 9820291960",
    whatsapp: "+977 9820291960",
    email: "samakhusi@nexsuseducation.com",
    mapUrl: "https://maps.google.com/?q=27.7295,85.3115",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.7295,85.3115&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 27.7295, lng: 85.3115 },
    isHeadOffice: false,
    socialLinks: {
      facebook: "https://facebook.com/nexsuseducation.samakhusi",
      instagram: "https://instagram.com/nexsuseducation",
      linkedin: "https://linkedin.com/company/nexsuseducation",
      tiktok: "https://tiktok.com/@nexsuseducation",
    },
    openingHours: "Sun - Fri: 9:00 AM - 6:00 PM",
    saturdayHours: "Saturday: Closed",
    description: "Serving students in the northern Kathmandu valley area with personalized guidance.",
    longDescription: [
      "Nexsus Education Samakhusi branch extends our commitment to quality education consulting to the northern Kathmandu valley. We serve students from Samakhusi, Gongabu, Balaju, Machapokhari, and nearby areas.",
      "Our dedicated team of counselors brings years of experience in guiding students towards their international education goals. We understand the unique aspirations of each student and provide customized solutions to help them succeed.",
      "From initial career counseling to post-arrival support in your destination country, we are your trusted partner throughout your study abroad journey. Our branch offers complete services including test preparation, visa assistance, and scholarship guidance."
    ],
    image: "/branches/branch.png",
    googleRating: 4.6,
    googleReviews: 67,
    stats: [
      { label: "Students Assisted", value: "1,800+" },
      { label: "University Partners", value: "120+" },
      { label: "Visa Success Rate", value: "96%" },
      { label: "Countries", value: "8+" }
    ],
    testimonials: [
      { id: 1, name: "Rajan Maharjan", country: "Japan", quote: "Nexsus Samakhusi helped me fulfill my dream of studying in Japan. Their guidance on language requirements and visa process was invaluable.", destination: "Japan" },
      { id: 2, name: "Sabina KC", country: "Australia", quote: "Very professional service! They helped me choose the right course and university in Australia. The entire process was hassle-free.", destination: "Australia" },
      { id: 3, name: "Sunil Thapa", country: "UK", quote: "The counselors at Samakhusi branch are very supportive. They helped me secure admission with a partial scholarship to a UK university.", destination: "UK" }
    ],
    faqs: [
      { question: "Which areas does the Samakhusi branch cover?", answer: "We serve students from Samakhusi, Gongabu, Balaju, Machapokhari, Budhanilkantha, and all northern Kathmandu areas." },
      { question: "Do you offer Japanese language classes?", answer: "Yes, we offer Japanese language classes for students planning to study in Japan, along with guidance on JLPT preparation." },
      { question: "What is the consultation process?", answer: "Book a free appointment, bring your documents, meet our counselor, get personalized university recommendations, and start your application process." },
      { question: "How long does the visa process take?", answer: "Visa processing time varies by country, typically ranging from 2-12 weeks. Our team ensures timely and accurate documentation." },
      { question: "Do you help with scholarship applications?", answer: "Yes, we actively help students identify and apply for scholarships, and have helped many secure partial and full scholarships." }
    ]
  },
  {
    id: "banepa",
    slug: "find-us-at-banepa",
    name: "Banepa",
    shortName: "Banepa",
    city: "Banepa",
    district: "Kavrepalanchok",
    address: "Banepa, Kavrepalanchok, Nepal",
    phone: "+977 11 665859",
    phone2: "+977 9860824272",
    whatsapp: "+977 9860824272",
    email: "banepa@nexsuseducation.com",
    mapUrl: "https://maps.google.com/?q=27.6291,85.5219",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.6291,85.5219&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 27.6291, lng: 85.5219 },
    isHeadOffice: false,
    socialLinks: {
      facebook: "https://facebook.com/nexsuseducation.banepa",
      instagram: "https://instagram.com/nexsuseducation",
      linkedin: "https://linkedin.com/company/nexsuseducation",
      tiktok: "https://tiktok.com/@nexsuseducation",
    },
    openingHours: "Sun - Fri: 9:00 AM - 5:30 PM",
    saturdayHours: "Saturday: Closed",
    description: "Serving students in Kavrepalanchok and surrounding areas with comprehensive services.",
    longDescription: [
      "Nexsus Education Banepa brings premium study abroad consulting services to Kavrepalanchok district. Our branch serves students from Banepa, Dhulikhel, Panauti, and surrounding areas who aspire to pursue international education.",
      "Understanding the challenges students face in accessing quality guidance outside Kathmandu, we established this branch to provide the same high-quality services closer to home. Our counselors are well-versed in various study destinations and visa requirements.",
      "We offer complete end-to-end services including career counseling, test preparation, university applications, visa processing, and pre-departure orientation. Our goal is to make international education accessible to students across Nepal."
    ],
    image: "/branches/branch.png",
    googleRating: 4.5,
    googleReviews: 45,
    stats: [
      { label: "Students Assisted", value: "800+" },
      { label: "University Partners", value: "100+" },
      { label: "Visa Success Rate", value: "95%" },
      { label: "Countries", value: "8+" }
    ],
    testimonials: [
      { id: 1, name: "Prem Tamang", country: "Australia", quote: "Having Nexsus in Banepa was a blessing. I didn't have to travel to Kathmandu for consultations. The team here is very capable and helpful.", destination: "Australia" },
      { id: 2, name: "Sunita Shrestha", country: "UK", quote: "Excellent service at the Banepa branch! They guided me through every step of my UK student visa application.", destination: "UK" },
      { id: 3, name: "Dipak Lama", country: "Canada", quote: "The counselors are very experienced. They helped me choose the right program and university in Canada based on my profile.", destination: "Canada" }
    ],
    faqs: [
      { question: "Is the Banepa branch as capable as Kathmandu branches?", answer: "Absolutely! Our Banepa branch offers all the same services and has equally experienced counselors. We maintain the same high standards across all branches." },
      { question: "Do you offer test preparation in Banepa?", answer: "Yes, we offer IELTS and PTE preparation classes at our Banepa branch with experienced trainers." },
      { question: "What documents do I need for consultation?", answer: "Bring your academic transcripts, English test scores (if available), passport, and any reference letters you may have." },
      { question: "Can I apply to multiple universities through you?", answer: "Yes, we help students apply to multiple universities to increase their chances of admission and scholarship opportunities." },
      { question: "How do I book an appointment?", answer: "Call us, WhatsApp us, or visit our office during working hours. We also offer online consultations for students who cannot visit in person." }
    ]
  },
  {
    id: "birtamode",
    slug: "find-us-at-birtamode",
    name: "Birtamode",
    shortName: "Birtamode",
    city: "Birtamode",
    district: "Jhapa",
    address: "Birtamode, Jhapa, Nepal",
    phone: "+977 23 591692",
    phone2: "+977 9843649305",
    whatsapp: "+977 9843649305",
    email: "birtamode@nexsuseducation.com",
    mapUrl: "https://maps.google.com/?q=26.6466,87.9893",
    mapEmbedUrl: "https://maps.google.com/maps?q=26.6466,87.9893&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 26.6466, lng: 87.9893 },
    isHeadOffice: false,
    socialLinks: {
      facebook: "https://facebook.com/nexsuseducation.birtamode",
      instagram: "https://instagram.com/nexsuseducation",
      linkedin: "https://linkedin.com/company/nexsuseducation",
      tiktok: "https://tiktok.com/@nexsuseducation",
    },
    openingHours: "Sun - Fri: 10:00 AM - 5:30 PM",
    saturdayHours: "Saturday: Closed",
    description: "Serving students in Jhapa and eastern Nepal region with dedicated support.",
    longDescription: [
      "Nexsus Education Birtamode is your gateway to international education in eastern Nepal. Located in the heart of Jhapa district, we serve students from Birtamode, Damak, Bhadrapur, and the entire eastern region.",
      "Our branch is staffed with experienced counselors who understand the aspirations of students from this region. We have successfully guided hundreds of students from eastern Nepal to prestigious universities abroad.",
      "We provide comprehensive services including career counseling, test preparation, visa assistance, and scholarship guidance. Our mission is to make quality study abroad consulting accessible to students in eastern Nepal without the need to travel to Kathmandu."
    ],
    image: "/branches/branch.png",
    googleRating: 4.7,
    googleReviews: 78,
    stats: [
      { label: "Students Assisted", value: "1,200+" },
      { label: "University Partners", value: "100+" },
      { label: "Visa Success Rate", value: "96%" },
      { label: "Countries", value: "8+" }
    ],
    testimonials: [
      { id: 1, name: "Prakash Rai", country: "Australia", quote: "Nexsus Birtamode made my dream of studying in Australia come true. The team is very professional and supportive.", destination: "Australia" },
      { id: 2, name: "Kabita Limbu", country: "UK", quote: "I'm grateful to the Birtamode team for their excellent guidance. Got my UK visa approved without any hassle.", destination: "UK" },
      { id: 3, name: "Santosh Chaudhary", country: "Canada", quote: "The best education consultancy in eastern Nepal! They helped me secure a scholarship to study in Canada.", destination: "Canada" }
    ],
    faqs: [
      { question: "What areas does the Birtamode branch serve?", answer: "We serve students from Birtamode, Damak, Bhadrapur, Mechinagar, and all areas of Jhapa and surrounding districts." },
      { question: "Do you have test preparation facilities?", answer: "Yes, we offer IELTS and PTE preparation classes with experienced instructors and modern facilities." },
      { question: "Is the nearest airport far from your office?", answer: "Bhadrapur Airport is the nearest, located about 15-20 km from our office. We also assist students traveling to Kathmandu for visa interviews." },
      { question: "Can I apply for Australian student visa from here?", answer: "Yes, we handle complete visa applications for all countries including Australia. You don't need to visit Kathmandu for most processes." },
      { question: "What makes Nexsus different from other consultancies?", answer: "Our high success rate, transparent process, experienced team, and genuine care for student success sets us apart." }
    ]
  },
  {
    id: "dhulabari",
    slug: "find-us-at-dhulabari",
    name: "Dhulabari",
    shortName: "Dhulabari",
    city: "Dhulabari",
    district: "Jhapa",
    address: "Dhulabari, Jhapa, Nepal",
    phone: "+977 23 591127",
    phone2: "+977 9801455861",
    whatsapp: "+977 9801455861",
    email: "dhulabari@nexsuseducation.com",
    mapUrl: "https://maps.google.com/?q=26.6689,88.0412",
    mapEmbedUrl: "https://maps.google.com/maps?q=26.6689,88.0412&t=&z=15&ie=UTF8&iwloc=&output=embed",
    coordinates: { lat: 26.6689, lng: 88.0412 },
    isHeadOffice: false,
    socialLinks: {
      facebook: "https://facebook.com/nexsuseducation.dhulabari",
      instagram: "https://instagram.com/nexsuseducation",
      linkedin: "https://linkedin.com/company/nexsuseducation",
      tiktok: "https://tiktok.com/@nexsuseducation",
    },
    openingHours: "Sun - Fri: 10:00 AM - 5:30 PM",
    saturdayHours: "Saturday: Closed",
    description: "Conveniently located in Dhulabari, serving the Jhapa district with expert guidance.",
    longDescription: [
      "Nexsus Education Dhulabari extends our commitment to quality education consulting to the border region of eastern Nepal. We serve students from Dhulabari, Kakarbhitta, and nearby areas who dream of studying abroad.",
      "Our strategic location makes it convenient for students in this region to access world-class study abroad guidance without traveling long distances. Our counselors are experienced in handling diverse student profiles and immigration requirements.",
      "We offer the same comprehensive services as our main branches including counseling, test prep, visa processing, and scholarship assistance. Our goal is to help every aspiring student achieve their international education dreams."
    ],
    image: "/branches/branch.png",
    googleRating: 4.6,
    googleReviews: 52,
    stats: [
      { label: "Students Assisted", value: "600+" },
      { label: "University Partners", value: "80+" },
      { label: "Visa Success Rate", value: "95%" },
      { label: "Countries", value: "7+" }
    ],
    testimonials: [
      { id: 1, name: "Raju Pradhan", country: "Japan", quote: "The Dhulabari team helped me with Japanese language preparation and visa processing. Very professional service!", destination: "Japan" },
      { id: 2, name: "Mina Thapa", country: "Australia", quote: "Got my Australian visa within a month! The team's expertise in documentation is impressive.", destination: "Australia" },
      { id: 3, name: "Bikram Rai", country: "UK", quote: "Excellent counseling service. They helped me find the perfect university program matching my career goals.", destination: "UK" }
    ],
    faqs: [
      { question: "Where exactly is the Dhulabari branch located?", answer: "We are located at the main Dhulabari chowk, easily accessible from Kakarbhitta and nearby areas." },
      { question: "Do you help with border crossing documentation?", answer: "Yes, we assist students with all necessary documentation for traveling from Nepal for their studies abroad." },
      { question: "What test preparation do you offer?", answer: "We offer IELTS, PTE, and Japanese language classes at our Dhulabari branch." },
      { question: "Can I pay fees in installments?", answer: "Yes, we offer flexible payment options. Discuss with our counselors during your consultation." },
      { question: "How experienced are your counselors?", answer: "Our counselors have years of experience and have successfully helped hundreds of students achieve their study abroad goals." }
    ]
  },
];

// Get default branch (head office)
export const defaultBranch = branches.find((b) => b.isHeadOffice) || branches[0];

// Get branch by slug (supports both old format and new find-us-at-{name} format)
export function getBranchBySlug(slug: string | null): Branch {
  if (!slug) return defaultBranch;
  
  // First try to find by exact slug match
  let branch = branches.find((b) => b.slug === slug);
  if (branch) return branch;
  
  // Try to extract id from "find-us-at-{id}" format
  const match = slug.match(/^find-us-at-(.+)$/);
  if (match) {
    branch = branches.find((b) => b.id === match[1]);
    if (branch) return branch;
  }
  
  // Fallback: try to match by id directly (for backwards compatibility)
  branch = branches.find((b) => b.id === slug);
  return branch || defaultBranch;
}

// Get all branch slugs for static generation
export function getAllBranchSlugs(): string[] {
  return branches.map((b) => b.slug);
}

// Get branch by ID
export function getBranchById(id: string): Branch | undefined {
  return branches.find((b) => b.id === id);
}

// Extract branch id from slug (handles "find-us-at-{id}" format)
export function extractBranchId(slug: string): string {
  const match = slug.match(/^find-us-at-(.+)$/);
  return match ? match[1] : slug;
}

// Get other branches (excluding current branch by ID)
export function getOtherBranches(currentId: string, limit: number = 4): Branch[] {
  return branches
    .filter((b) => b.id !== currentId)
    .slice(0, limit);
}

// Generate branch links for navigation
export function getBranchLinks() {
  return [
    { 
      label: "All Branches", 
      href: "/branches", 
      slug: null,
      icon: "MapPin", 
      description: "Find our offices near you" 
    },
    ...branches.map((branch) => ({
      label: branch.name,
      href: `/branches/${branch.slug}`,
      slug: branch.slug,
      icon: branch.isHeadOffice ? "Building2" : "MapPin",
      description: branch.isHeadOffice 
        ? "Our main headquarters" 
        : `${branch.district} branch office`,
    })),
  ];
}

/* ─── Geolocation Utilities ─────────────────────────────────── */

/**
 * Calculate distance between two coordinates using Haversine formula
 * @returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Find the nearest branch based on user's coordinates
 * @returns the nearest branch and the distance in km
 */
export function findNearestBranch(
  userLat: number,
  userLng: number
): { branch: Branch; distance: number } {
  let nearestBranch = branches[0];
  let minDistance = Infinity;

  for (const branch of branches) {
    const distance = calculateDistance(
      userLat,
      userLng,
      branch.coordinates.lat,
      branch.coordinates.lng
    );
    if (distance < minDistance) {
      minDistance = distance;
      nearestBranch = branch;
    }
  }

  return { branch: nearestBranch, distance: minDistance };
}

/**
 * Format distance for display
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m away`;
  }
  return `${km.toFixed(1)} km away`;
}
