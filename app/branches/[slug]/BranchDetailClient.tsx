"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/lib/animations";
import { Icon } from "@/lib/icons";

interface BranchDetailClientProps {
  slug: string;
}

// Testimonial type
interface Testimonial {
  id: number;
  name: string;
  country: string;
  quote: string;
  destination: string;
}

// FAQ type
interface FAQ {
  question: string;
  answer: string;
}

// Branch data type
interface BranchData {
  name: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  phone2?: string;
  whatsapp?: string;
  email: string;
  hours: string;
  saturdayHours?: string;
  mapUrl: string;
  mapEmbedUrl: string;
  description: string;
  longDescription: string[];
  image: string;
  coordinates: { lat: number; lng: number };
  googleRating: number;
  googleReviews: number;
  stats: { label: string; value: string }[];
  testimonials: Testimonial[];
  faqs: FAQ[];
}

const branches: Record<string, BranchData> = {
  kathmandu: {
    name: "Kathmandu Main Office",
    city: "Kathmandu",
    district: "Kathmandu",
    address: "Putalisadak, Kathmandu",
    phone: "+977-1-4444444",
    phone2: "+977-9851234567",
    whatsapp: "+977-9851234567",
    email: "kathmandu@nexsuseducation.com",
    hours: "Sunday - Friday: 9:00 AM to 6:00 PM",
    saturdayHours: "Saturday: Closed",
    mapUrl: "https://maps.google.com/?q=27.7089,85.3239",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.7089,85.3239&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Our main headquarters in the heart of Kathmandu, serving students from across Nepal with comprehensive study abroad services.",
    longDescription: [
      "Nexsus Education Kathmandu is one of the leading study abroad consultants in Nepal, dedicated to helping students achieve their international education dreams. Established with a vision to provide world-class guidance, we have been assisting students in securing admissions to top universities across the UK, USA, Australia, Canada, New Zealand, and Europe.",
      "We offer comprehensive services including IELTS, PTE Academic, TOEFL iBT, and SAT coaching, providing ample mock tests to ensure our students meet their visa and admission requirements. Our experienced counselors work tirelessly to identify the best opportunities for each student.",
      "From counseling and university applications to visa guidance, test preparation, and pre-departure services, we offer a complete range of services. We help students connect with those who have already reached their dream destinations, making us one of the most trusted education consultants in Nepal."
    ],
    image: "/branches/branch.png",
    coordinates: { lat: 27.7089, lng: 85.3239 },
    googleRating: 4.8,
    googleReviews: 156,
    stats: [
      { label: "Students Assisted", value: "5,000+" },
      { label: "University Partners", value: "200+" },
      { label: "Visa Success Rate", value: "98%" },
      { label: "Countries", value: "10+" }
    ],
    testimonials: [
      { id: 1, name: "Sarina Shrestha", country: "Canada", quote: "I was looking for a top education consultant in Kathmandu and luckily a friend recommended me to Nexsus Education. They assisted me from getting a letter of offer to acquiring student insurance and finally arranging my visa.", destination: "Canada" },
      { id: 2, name: "Shrawan Kumar Thapa", country: "Australia", quote: "Nexsus Education is the best overseas education consultant in Nepal. They provided great assistance with my student visa application to Melbourne. The team has been very approachable and always there to answer all my queries.", destination: "Australia" },
      { id: 3, name: "Devnand Thapa", country: "Canada", quote: "I am ever grateful to the competent team for helping me attain my Canada student visa in no time. The consultation and customer services they provide are efficient and excellent.", destination: "Canada" }
    ],
    faqs: [
      { question: "Is Nexsus one of the best study abroad consultants in Nepal?", answer: "Yes, Nexsus Education is recognized as one of the leading study abroad consultants in Nepal, with a proven track record of helping thousands of students achieve their international education goals." },
      { question: "What services do study abroad consultants in Nepal provide?", answer: "We provide comprehensive services including career counseling, university selection, application assistance, visa guidance, test preparation (IELTS, PTE, TOEFL, SAT), SOP writing, scholarship guidance, and pre-departure support." },
      { question: "Does Nexsus offer free counseling for students?", answer: "Yes, we offer free initial counseling sessions to understand your academic goals and provide personalized guidance on your study abroad journey." },
      { question: "Which countries can I apply to through Nexsus Nepal?", answer: "Through Nexsus, you can apply to universities in the UK, USA, Australia, Canada, New Zealand, Germany, Japan, South Korea, and several other European countries." },
      { question: "Where is Nexsus located in Kathmandu?", answer: "Our Kathmandu office is located at Putalisadak, easily accessible from all parts of the city. Visit us during our office hours for a free consultation." }
    ]
  },
  dillibazar: {
    name: "Dillibazar Main Office",
    city: "Dillibazar",
    district: "Kathmandu",
    address: "Dillibazar, Kathmandu-44600, Nepal",
    phone: "+977 1 4519495",
    phone2: "+977 9851032197",
    whatsapp: "+977 9851032197",
    email: "info@nexsuseducation.com",
    hours: "Sunday - Friday: 9:00 AM to 6:00 PM",
    saturdayHours: "Saturday: Closed",
    mapUrl: "https://maps.google.com/?q=27.7089,85.3239",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.7089,85.3239&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Our main headquarters in the heart of Dillibazar, serving students from across Nepal with comprehensive study abroad services.",
    longDescription: [
      "Nexsus Education Dillibazar is our flagship headquarters, serving as the central hub for all study abroad services in Nepal. With years of experience and a dedicated team of expert counselors, we have helped thousands of students realize their dreams of studying at prestigious international universities.",
      "Our Dillibazar office specializes in providing end-to-end support for students aspiring to study in the UK, USA, Australia, Canada, and European countries. We offer expert guidance on course selection, university applications, visa processing, and scholarship opportunities.",
      "We take pride in our high visa success rate and personalized approach to each student's journey. Our team stays updated with the latest immigration policies and university requirements to provide accurate and timely guidance to all our students."
    ],
    image: "/branches/branch.png",
    coordinates: { lat: 27.7089, lng: 85.3239 },
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
  baneshwor: {
    name: "Baneshwor Branch",
    city: "Baneshwor",
    district: "Kathmandu",
    address: "Baneshwor, Kathmandu, Nepal",
    phone: "+977 1 5922227",
    phone2: "+977 9841830127",
    whatsapp: "+977 9841830127",
    email: "baneshwor@nexsuseducation.com",
    hours: "Sunday - Friday: 9:00 AM to 6:00 PM",
    saturdayHours: "Saturday: Closed",
    mapUrl: "https://maps.google.com/?q=27.6908,85.3433",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.6908,85.3433&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Conveniently located in Baneshwor, serving students in eastern Kathmandu with dedicated counselors.",
    longDescription: [
      "Nexsus Education Baneshwor branch brings our world-class study abroad services to the heart of eastern Kathmandu. Our branch is strategically located to serve students from Baneshwor, Koteshwor, Tinkune, and surrounding areas.",
      "With a team of experienced counselors specializing in various destinations, we provide personalized guidance tailored to each student's academic background and career aspirations. Our Baneshwor team has successfully helped hundreds of students secure admissions to top universities worldwide.",
      "We offer all services available at our main branch including IELTS/PTE coaching, visa processing, scholarship guidance, and comprehensive pre-departure support. Visit us for a free consultation and take the first step towards your international education journey."
    ],
    image: "/branches/branch.png",
    coordinates: { lat: 27.6908, lng: 85.3433 },
    googleRating: 4.7,
    googleReviews: 89,
    stats: [
      { label: "Students Assisted", value: "2,500+" },
      { label: "University Partners", value: "150+" },
      { label: "Visa Success Rate", value: "97%" },
      { label: "Countries", value: "10+" }
    ],
    testimonials: [
      { id: 1, name: "Bikash Tamang", country: "Australia", quote: "The Baneshwor team is amazing! They helped me get into a top Australian university with a scholarship. Very professional and supportive throughout the process.", destination: "Australia" },
      { id: 2, name: "Sushma Rai", country: "UK", quote: "I'm so grateful to Nexsus Baneshwor for making my UK study journey smooth and stress-free. The counselors are very knowledgeable and helpful.", destination: "UK" },
      { id: 3, name: "Nabin Shrestha", country: "Canada", quote: "Got my Canada study permit approved on first attempt! The team's expertise in documentation and visa processing is exceptional.", destination: "Canada" }
    ],
    faqs: [
      { question: "What areas does the Baneshwor branch serve?", answer: "Our Baneshwor branch primarily serves students from Baneshwor, Koteshwor, Tinkune, Sinamangal, and all surrounding areas of eastern Kathmandu." },
      { question: "Does the Baneshwor branch offer test preparation classes?", answer: "Yes, we offer IELTS, PTE, TOEFL, and SAT preparation classes with experienced trainers and flexible schedules." },
      { question: "Can I get a free consultation at the Baneshwor branch?", answer: "Absolutely! We offer free counseling sessions. You can walk in during office hours or book an appointment in advance." },
      { question: "What documents should I bring for my first consultation?", answer: "For your first visit, bring your academic transcripts, English test scores (if any), passport, and any other relevant documents." },
      { question: "How can I reach the Baneshwor branch?", answer: "Our office is located at the main Baneshwor road, easily accessible by public transport. Contact us for detailed directions." }
    ]
  },
  samakhusi: {
    name: "Samakhusi Branch",
    city: "Samakhusi",
    district: "Kathmandu",
    address: "Samakhusi, Kathmandu, Nepal",
    phone: "+977 1 4971971",
    phone2: "+977 9820291960",
    whatsapp: "+977 9820291960",
    email: "samakhusi@nexsuseducation.com",
    hours: "Sunday - Friday: 9:00 AM to 6:00 PM",
    saturdayHours: "Saturday: Closed",
    mapUrl: "https://maps.google.com/?q=27.7295,85.3115",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.7295,85.3115&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Serving students in the northern Kathmandu valley area with personalized guidance.",
    longDescription: [
      "Nexsus Education Samakhusi branch extends our commitment to quality education consulting to the northern Kathmandu valley. We serve students from Samakhusi, Gongabu, Balaju, Machapokhari, and nearby areas.",
      "Our dedicated team of counselors brings years of experience in guiding students towards their international education goals. We understand the unique aspirations of each student and provide customized solutions to help them succeed.",
      "From initial career counseling to post-arrival support in your destination country, we are your trusted partner throughout your study abroad journey. Our branch offers complete services including test preparation, visa assistance, and scholarship guidance."
    ],
    image: "/branches/branch.png",
    coordinates: { lat: 27.7295, lng: 85.3115 },
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
  banepa: {
    name: "Banepa Branch",
    city: "Banepa",
    district: "Kavrepalanchok",
    address: "Banepa, Kavrepalanchok, Nepal",
    phone: "+977 11 665859",
    phone2: "+977 9860824272",
    whatsapp: "+977 9860824272",
    email: "banepa@nexsuseducation.com",
    hours: "Sunday - Friday: 9:00 AM to 5:30 PM",
    saturdayHours: "Saturday: Closed",
    mapUrl: "https://maps.google.com/?q=27.6291,85.5219",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.6291,85.5219&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Serving students in Kavrepalanchok and surrounding areas with comprehensive services.",
    longDescription: [
      "Nexsus Education Banepa brings premium study abroad consulting services to Kavrepalanchok district. Our branch serves students from Banepa, Dhulikhel, Panauti, and surrounding areas who aspire to pursue international education.",
      "Understanding the challenges students face in accessing quality guidance outside Kathmandu, we established this branch to provide the same high-quality services closer to home. Our counselors are well-versed in various study destinations and visa requirements.",
      "We offer complete end-to-end services including career counseling, test preparation, university applications, visa processing, and pre-departure orientation. Our goal is to make international education accessible to students across Nepal."
    ],
    image: "/branches/branch.png",
    coordinates: { lat: 27.6291, lng: 85.5219 },
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
  birtamode: {
    name: "Birtamode Branch",
    city: "Birtamode",
    district: "Jhapa",
    address: "Birtamode, Jhapa, Nepal",
    phone: "+977 23 591692",
    phone2: "+977 9843649305",
    whatsapp: "+977 9843649305",
    email: "birtamode@nexsuseducation.com",
    hours: "Sunday - Friday: 10:00 AM to 5:30 PM",
    saturdayHours: "Saturday: Closed",
    mapUrl: "https://maps.google.com/?q=26.6466,87.9893",
    mapEmbedUrl: "https://maps.google.com/maps?q=26.6466,87.9893&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Serving students in Jhapa and eastern Nepal region with dedicated support.",
    longDescription: [
      "Nexsus Education Birtamode is your gateway to international education in eastern Nepal. Located in the heart of Jhapa district, we serve students from Birtamode, Damak, Bhadrapur, and the entire eastern region.",
      "Our branch is staffed with experienced counselors who understand the aspirations of students from this region. We have successfully guided hundreds of students from eastern Nepal to prestigious universities abroad.",
      "We provide comprehensive services including career counseling, test preparation, visa assistance, and scholarship guidance. Our mission is to make quality study abroad consulting accessible to students in eastern Nepal without the need to travel to Kathmandu."
    ],
    image: "/branches/branch.png",
    coordinates: { lat: 26.6466, lng: 87.9893 },
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
  dhulabari: {
    name: "Dhulabari Branch",
    city: "Dhulabari",
    district: "Jhapa",
    address: "Dhulabari, Jhapa, Nepal",
    phone: "+977 23 591127",
    phone2: "+977 9801455861",
    whatsapp: "+977 9801455861",
    email: "dhulabari@nexsuseducation.com",
    hours: "Sunday - Friday: 10:00 AM to 5:30 PM",
    saturdayHours: "Saturday: Closed",
    mapUrl: "https://maps.google.com/?q=26.6689,88.0412",
    mapEmbedUrl: "https://maps.google.com/maps?q=26.6689,88.0412&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Conveniently located in Dhulabari, serving the Jhapa district with expert guidance.",
    longDescription: [
      "Nexsus Education Dhulabari extends our commitment to quality education consulting to the border region of eastern Nepal. We serve students from Dhulabari, Kakarbhitta, and nearby areas who dream of studying abroad.",
      "Our strategic location makes it convenient for students in this region to access world-class study abroad guidance without traveling long distances. Our counselors are experienced in handling diverse student profiles and immigration requirements.",
      "We offer the same comprehensive services as our main branches including counseling, test prep, visa processing, and scholarship assistance. Our goal is to help every aspiring student achieve their international education dreams."
    ],
    image: "/branches/branch.png",
    coordinates: { lat: 26.6689, lng: 88.0412 },
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
  pokhara: {
    name: "Pokhara Branch",
    city: "Pokhara",
    district: "Kaski",
    address: "Lakeside, Pokhara",
    phone: "+977-61-555555",
    phone2: "+977-9856034567",
    whatsapp: "+977-9856034567",
    email: "pokhara@nexsuseducation.com",
    hours: "Sunday - Friday: 10:00 AM to 6:00 PM",
    saturdayHours: "Saturday: Closed",
    mapUrl: "https://maps.google.com/?q=28.2096,83.9568",
    mapEmbedUrl: "https://maps.google.com/maps?q=28.2096,83.9568&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Serving the western region of Nepal with dedicated counselors for Australia, UK, and Canada programs.",
    longDescription: [
      "Nexsus Education Pokhara brings world-class study abroad consulting to the beautiful city of Pokhara. Serving students from Kaski, Syangja, Parbat, and the entire Gandaki region, we are committed to helping students achieve their international education dreams.",
      "Our Pokhara branch is staffed with experienced counselors who specialize in various study destinations. We understand the unique needs of students from this region and provide personalized guidance tailored to each individual's goals.",
      "From lakeside Pokhara, students can now access all our services including career counseling, test preparation, visa processing, and scholarship assistance without traveling to Kathmandu. We're here to make your study abroad journey smooth and successful."
    ],
    image: "/branches/branch.png",
    coordinates: { lat: 28.2096, lng: 83.9568 },
    googleRating: 4.8,
    googleReviews: 94,
    stats: [
      { label: "Students Assisted", value: "2,000+" },
      { label: "University Partners", value: "150+" },
      { label: "Visa Success Rate", value: "97%" },
      { label: "Countries", value: "10+" }
    ],
    testimonials: [
      { id: 1, name: "Sita Gurung", country: "Australia", quote: "The Pokhara team is fantastic! They made my study abroad journey to Australia seamless and stress-free.", destination: "Australia" },
      { id: 2, name: "Hari Thapa", country: "UK", quote: "Best education consultancy in Pokhara! Got my UK student visa approved with their expert guidance.", destination: "UK" },
      { id: 3, name: "Maya Magar", country: "Canada", quote: "I highly recommend Nexsus Pokhara. They found me a perfect university program with scholarship in Canada.", destination: "Canada" }
    ],
    faqs: [
      { question: "Where is the Pokhara branch located?", answer: "We are located at Lakeside, Pokhara, easily accessible from all parts of the city and Gandaki region." },
      { question: "Do you offer IELTS coaching in Pokhara?", answer: "Yes, we offer comprehensive IELTS, PTE, and TOEFL coaching with experienced trainers." },
      { question: "Which countries do you specialize in from Pokhara?", answer: "We specialize in Australia, UK, Canada, USA, and New Zealand, but assist with all major study destinations." },
      { question: "Can students from Syangja and Parbat visit your office?", answer: "Absolutely! We serve students from the entire Gandaki region including Syangja, Parbat, Baglung, and beyond." },
      { question: "Do you help with student accommodation abroad?", answer: "Yes, we provide guidance on finding safe and affordable accommodation in your destination country." }
    ]
  },
  chitwan: {
    name: "Chitwan Branch",
    city: "Chitwan",
    district: "Chitwan",
    address: "Bharatpur, Chitwan",
    phone: "+977-56-666666",
    phone2: "+977-9855034567",
    whatsapp: "+977-9855034567",
    email: "chitwan@nexsuseducation.com",
    hours: "Sunday - Friday: 10:00 AM to 5:30 PM",
    saturdayHours: "Saturday: Closed",
    mapUrl: "https://maps.google.com/?q=27.6766,84.4362",
    mapEmbedUrl: "https://maps.google.com/maps?q=27.6766,84.4362&t=&z=15&ie=UTF8&iwloc=&output=embed",
    description: "Our Chitwan branch provides personalized guidance to students from the Terai region.",
    longDescription: [
      "Nexsus Education Chitwan is one of the leading study abroad consultants in Chitwan, Nepal. We have been helping students from Bharatpur and surrounding areas achieve their international education dreams with comprehensive guidance and support.",
      "Established to bring quality overseas education consulting to the Terai region, our Chitwan branch has a proven track record of successful student placements in top universities across the UK, USA, Australia, Canada, and Europe.",
      "We offer the best IELTS, PTE Academic, TOEFL iBT and SAT coaching in Chitwan, providing ample mock tests to ensure our students meet their visa and admission requirements. From counseling to pre-departure support, we're with you every step of the way."
    ],
    image: "/branches/branch.png",
    coordinates: { lat: 27.6766, lng: 84.4362 },
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
};

// Extract branch id from slug (handles "find-us-at-{id}" format)
function extractBranchId(slug: string): string {
  const match = slug.match(/^find-us-at-(.+)$/);
  return match ? match[1] : slug;
}

// Services data
const services = [
  { icon: "BookOpen", title: "Test Preparation", description: "Achieve your target score with our expert-led test prep for IELTS, TOEFL, PTE and SAT." },
  { icon: "GraduationCap", title: "Education Counseling", description: "Get free, personalized guidance to find the perfect course and university for your career goals." },
  { icon: "DollarSign", title: "Scholarship Guidance", description: "We help you secure scholarships and financial aid to make your study abroad dream a reality." },
  { icon: "Building2", title: "University Admissions", description: "Stand out with a tailored application that gets you accepted into your top-choice university." },
  { icon: "FileCheck", title: "Visa Applications", description: "Get expert support for documentation and interview prep to simplify your visa application process." },
  { icon: "Home", title: "Student Accommodation", description: "We find safe and comfortable student housing for you, ensuring a smooth and stress-free start." },
];

// Get other branches (excluding current)
function getOtherBranches(currentId: string) {
  return Object.entries(branches)
    .filter(([id]) => id !== currentId)
    .slice(0, 4)
    .map(([id, branch]) => ({ id, name: branch.city }));
}

// FAQ Accordion Component
function FAQAccordion({ faqs, branchName }: { faqs: FAQ[]; branchName: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border-b border-gray-100">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between py-4 text-left"
          >
            <span className="font-medium text-slate-900 pr-8">{faq.question}</span>
            <motion.div
              animate={{ rotate: openIndex === idx ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <Icon name="Plus" size={20} className="text-slate-400" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-slate-600 pb-4 text-sm leading-relaxed">{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function BranchDetailClient({ slug }: BranchDetailClientProps) {
  const branchId = extractBranchId(slug.toLowerCase());
  const branch = branches[branchId];
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Carousel state for testimonials
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  
  // Auto-scroll effect for testimonials carousel
  useEffect(() => {
    if (!branch || carouselPaused) return;
    
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % branch.testimonials.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [branch, carouselPaused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission - backend integration will be done later
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", { ...formData, branch: branch?.name });
    setSubmitSuccess(true);
    setIsSubmitting(false);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        inquiryType: "",
        subject: "",
        message: "",
      });
      setSubmitSuccess(false);
    }, 3000);
  };

  if (!branch) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Branch Not Found</h1>
            <p className="text-slate-600 mb-8">The requested branch page does not exist.</p>
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition"
            >
              <Icon name="ArrowLeft" size={16} />
              View All Branches
            </Link>
          </FadeUp>
        </div>
      </main>
    );
  }

  const otherBranches = getOtherBranches(branchId);

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 text-brand-blue hover:text-blue-900 mb-6 font-medium"
            >
              <Icon name="ArrowLeft" size={16} />
              All Branches
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {branch.name}
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl">
              {branch.description}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Main Content: Map + Contact */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <FadeUp>
              <div className="relative rounded-2xl overflow-hidden h-[400px] border border-gray-200 shadow-sm">
                <iframe
                  src={branch.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map showing ${branch.name} location`}
                  className="w-full h-full"
                />
              </div>
            </FadeUp>

            {/* Contact Info */}
            <FadeUp delay={0.1}>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
                <p className="text-slate-700 font-medium mb-4">Nexsus Education Consultants in {branch.city} - Nepal</p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={18} className="text-brand-blue mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-slate-600">{branch.address}</p>
                      <p className="text-slate-500 text-sm">{branch.district}, Nepal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={18} className="text-brand-blue mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-slate-700 font-medium">Office Timings:</p>
                      <p className="text-slate-600">{branch.hours}</p>
                      {branch.saturdayHours && <p className="text-slate-600">{branch.saturdayHours}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Icon name="Phone" size={16} className="text-brand-blue" />
                      <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="text-slate-600 hover:text-brand-blue">
                        {branch.phone}
                      </a>
                    </div>
                    {branch.whatsapp && (
                      <a 
                        href={`https://wa.me/${branch.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-green-600 hover:text-green-700"
                      >
                        <Icon name="MessageCircle" size={16} />
                        WhatsApp
                      </a>
                    )}
                  </div>
                  
                  {branch.phone2 && (
                    <div className="flex items-center gap-2">
                      <Icon name="Phone" size={16} className="text-brand-blue" />
                      <a href={`tel:${branch.phone2.replace(/\s/g, '')}`} className="text-slate-600 hover:text-brand-blue">
                        {branch.phone2}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={16} className="text-brand-blue" />
                    <a href={`mailto:${branch.email}`} className="text-slate-600 hover:text-brand-blue">
                      {branch.email}
                    </a>
                  </div>
                </div>

                {/* Get Directions */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-medium text-slate-900 mb-3">Get Directions</p>
                  <div className="flex gap-3">
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-900 transition"
                    >
                      <Icon name="Navigation" size={14} />
                      By Road
                    </a>
                    <a
                      href={`tel:${branch.phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-2 border border-gray-200 text-slate-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition"
                    >
                      <Icon name="Phone" size={14} />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Book Consultation Form */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <FadeUp>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  Book Your <span className="text-brand-blue">FREE Consultation</span> Call
                </h3>
                <p className="text-slate-600 text-sm mb-6">with our Certified Counselors</p>
                
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 rounded-xl p-6 text-center"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Check" size={24} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-lg mb-1 text-green-800">Thank You!</h4>
                    <p className="text-green-700 text-sm">We&apos;ll contact you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name*"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email ID*"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                    />
                    <div className="flex gap-2">
                      <div className="w-20 px-3 py-3 rounded-lg border border-gray-200 text-slate-600 text-sm flex items-center justify-center">
                        +977
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Mobile Number*"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        name="inquiryType"
                        required
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                      >
                        <option value="" disabled>Inquiry Type*</option>
                        <option value="study-abroad">Study Abroad</option>
                        <option value="visa-assistance">Visa Assistance</option>
                        <option value="test-preparation">Test Preparation</option>
                        <option value="scholarship">Scholarship</option>
                        <option value="career-counseling">Career Counseling</option>
                        <option value="other">Other</option>
                      </select>
                      <select
                        name="destination"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                      >
                        <option value="" disabled selected>Destination</option>
                        <option value="australia">Australia</option>
                        <option value="uk">United Kingdom</option>
                        <option value="usa">United States</option>
                        <option value="canada">Canada</option>
                        <option value="newzealand">New Zealand</option>
                        <option value="europe">Europe</option>
                        <option value="japan">Japan</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject (e.g., MBA in Australia)"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                    />
                    <textarea
                      name="message"
                      placeholder="Your Message (Optional)"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm resize-none"
                    />
                    
                    <div className="flex items-start gap-2 text-sm">
                      <input type="checkbox" id="terms" required className="mt-1 accent-brand-blue" />
                      <label htmlFor="terms" className="text-slate-600">
                        I agree to Nexsus&apos;s{" "}
                        <Link href="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>
                        {" "}and{" "}
                        <Link href="/terms" className="text-brand-blue hover:underline">Terms & Conditions</Link> *
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Icon name="Loader2" size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Get Started
                          <Icon name="ArrowRight" size={16} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeUp>

            {/* Service Features */}
            <FadeUp delay={0.1}>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "End-to-End Assistance", icon: "CheckCircle" },
                    { label: "Expert Guidance", icon: "Users" },
                    { label: "Visa & Financial Assistance", icon: "FileCheck" },
                    { label: "Career & Post-Study Planning", icon: "Target" },
                  ].map((feature) => (
                    <div key={feature.label} className="bg-slate-50 rounded-xl p-4 text-center">
                      <Icon name={feature.icon} size={24} className="text-brand-blue mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-700">{feature.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Overseas Education Consultants in {branch.city}
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              {branch.longDescription.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {branch.stats.map((stat, idx) => (
              <FadeUp key={stat.label} delay={idx * 0.1}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-brand-blue mb-1">{stat.value}</p>
                  <p className="text-slate-600 text-sm">{stat.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <p className="text-center text-slate-400 text-xs mt-6">(As of Mar &apos;26)*</p>
        </div>
      </section>

      {/* Testimonials Section - Auto-scroll Carousel */}
      <section className="px-6 py-16 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  Student Success Stories
                </h2>
                <p className="text-slate-600 max-w-2xl">
                  Real experiences from students who achieved their study abroad dreams with Nexsus.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button 
                  onClick={() => setCarouselIndex(prev => prev === 0 ? branch.testimonials.length - 1 : prev - 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition"
                >
                  <Icon name="ChevronLeft" size={18} />
                </button>
                <button 
                  onClick={() => setCarouselIndex(prev => (prev + 1) % branch.testimonials.length)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition"
                >
                  <Icon name="ChevronRight" size={18} />
                </button>
              </div>
            </div>
          </FadeUp>
          
          <div 
            className="relative"
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
          >
            <div 
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(-${carouselIndex * (100 / 3)}%)` }}
            >
              {[...branch.testimonials, ...branch.testimonials].map((testimonial, idx) => (
                <div 
                  key={`${testimonial.id}-${idx}`} 
                  className="min-w-[calc(33.333%-1rem)] flex-shrink-0 md:min-w-[calc(33.333%-1rem)] sm:min-w-[calc(50%-0.75rem)] max-sm:min-w-full"
                >
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
                    <div className="flex items-center gap-1 text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" size={14} className="fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed flex-grow mb-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                        <span className="text-brand-blue font-semibold text-sm">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
                        <p className="text-slate-500 text-xs">{testimonial.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-6">
              {branch.testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === carouselIndex % branch.testimonials.length 
                      ? 'w-6 bg-brand-blue' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Story + Google Rating */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Share Your Success Story Today
              </h2>
              <p className="text-slate-600 mb-6">
                If we&apos;ve worked together and made an impact, we&apos;d be grateful if you could take a moment to share your story with us.
              </p>
              
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <span className="text-3xl font-bold text-brand-blue">{branch.googleRating}</span>
                  <span className="text-slate-600"> of 5</span>
                  <p className="text-slate-500 text-sm">{branch.city} - Nepal</p>
                </div>
                <div className="border-l border-gray-200 pl-6">
                  <div className="flex gap-1 text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={18} className={i < Math.floor(branch.googleRating) ? "fill-current" : ""} />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm"><span className="font-semibold">{branch.googleReviews} Reviews</span> on Google</p>
                </div>
              </div>
              
              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-brand-blue text-brand-blue px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-blue/5 transition"
              >
                Share Your Story Now
              </a>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                    <Image
                      src={branch.image}
                      alt={`Success story ${i}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Services We Offer
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl">
              From test preparation to visa application, we offer end-to-end support to help you achieve your study abroad aspirations.
            </p>
          </FadeUp>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <FadeUp key={service.title} delay={idx * 0.05}>
                <div className="bg-white rounded-xl p-6 border border-gray-100 h-full">
                  <div className="w-14 h-14 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={24} className="text-brand-blue" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm">{service.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Nexsus Study Abroad Consultants in {branch.city}
            </h2>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <FAQAccordion faqs={branch.faqs} branchName={branch.name} />
          </FadeUp>
        </div>
      </section>

      {/* Other Locations */}
      <section className="px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Other Nexsus Locations
            </h2>
            <div className="flex flex-wrap gap-3">
              {otherBranches.map((b) => (
                <Link
                  key={b.id}
                  href={`/branches/find-us-at-${b.id}`}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-brand-blue hover:text-white transition"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
