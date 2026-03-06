/* ─── Branch Data ─────────────────────────────────────────── */

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
  coordinates: { lat: number; lng: number };
  isHeadOffice: boolean;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    tiktok: string;
  };
  openingHours: string;
  description: string;
}

export const branches: Branch[] = [
  {
    id: "dillibazar",
    slug: "dillibazar",
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
    coordinates: { lat: 27.7089, lng: 85.3239 },
    isHeadOffice: true,
    socialLinks: {
      facebook: "https://facebook.com/nexsuseducation",
      instagram: "https://instagram.com/nexsuseducation",
      linkedin: "https://linkedin.com/company/nexsuseducation",
      tiktok: "https://tiktok.com/@nexsuseducation",
    },
    openingHours: "Sun - Fri: 9:00 AM - 6:00 PM",
    description: "Our main headquarters in the heart of Kathmandu. Visit us for comprehensive study abroad guidance.",
  },
  {
    id: "baneshwor",
    slug: "baneshwor",
    name: "Kathmandu - Baneshwor",
    shortName: "Baneshwor",
    city: "Kathmandu",
    district: "Kathmandu",
    address: "Baneshwor, Kathmandu, Nepal",
    phone: "+977 1 5922227",
    phone2: "+977 9841830127",
    whatsapp: "+977 9841830127",
    email: "baneshwor@nexsuseducation.com",
    mapUrl: "https://maps.google.com/?q=27.6908,85.3433",
    coordinates: { lat: 27.6908, lng: 85.3433 },
    isHeadOffice: false,
    socialLinks: {
      facebook: "https://facebook.com/nexsuseducation.baneshwor",
      instagram: "https://instagram.com/nexsuseducation",
      linkedin: "https://linkedin.com/company/nexsuseducation",
      tiktok: "https://tiktok.com/@nexsuseducation",
    },
    openingHours: "Sun - Fri: 9:00 AM - 6:00 PM",
    description: "Conveniently located in Baneshwor, serving students in eastern Kathmandu.",
  },
  {
    id: "samakhusi",
    slug: "samakhusi",
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
    coordinates: { lat: 27.7295, lng: 85.3115 },
    isHeadOffice: false,
    socialLinks: {
      facebook: "https://facebook.com/nexsuseducation.samakhusi",
      instagram: "https://instagram.com/nexsuseducation",
      linkedin: "https://linkedin.com/company/nexsuseducation",
      tiktok: "https://tiktok.com/@nexsuseducation",
    },
    openingHours: "Sun - Fri: 9:00 AM - 6:00 PM",
    description: "Serving students in the northern Kathmandu valley area.",
  },
  {
    id: "banepa",
    slug: "banepa",
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
    coordinates: { lat: 27.6291, lng: 85.5219 },
    isHeadOffice: false,
    socialLinks: {
      facebook: "https://facebook.com/nexsuseducation.banepa",
      instagram: "https://instagram.com/nexsuseducation",
      linkedin: "https://linkedin.com/company/nexsuseducation",
      tiktok: "https://tiktok.com/@nexsuseducation",
    },
    openingHours: "Sun - Fri: 9:00 AM - 6:00 PM",
    description: "Serving students in Kavrepalanchok and surrounding areas.",
  },
  {
    id: "birtamode",
    slug: "birtamode",
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
    coordinates: { lat: 26.6466, lng: 87.9893 },
    isHeadOffice: false,
    socialLinks: {
      facebook: "https://facebook.com/nexsuseducation.birtamode",
      instagram: "https://instagram.com/nexsuseducation",
      linkedin: "https://linkedin.com/company/nexsuseducation",
      tiktok: "https://tiktok.com/@nexsuseducation",
    },
    openingHours: "Sun - Fri: 9:00 AM - 6:00 PM",
    description: "Serving students in Jhapa and eastern Nepal region.",
  },
  {
    id: "dhulabari",
    slug: "dhulabari",
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
    coordinates: { lat: 26.6689, lng: 88.0412 },
    isHeadOffice: false,
    socialLinks: {
      facebook: "https://facebook.com/nexsuseducation.dhulabari",
      instagram: "https://instagram.com/nexsuseducation",
      linkedin: "https://linkedin.com/company/nexsuseducation",
      tiktok: "https://tiktok.com/@nexsuseducation",
    },
    openingHours: "Sun - Fri: 9:00 AM - 6:00 PM",
    description: "Conveniently located in Dhulabari, serving the Jhapa district.",
  },
];

// Get default branch (head office)
export const defaultBranch = branches.find((b) => b.isHeadOffice) || branches[0];

// Get branch by slug
export function getBranchBySlug(slug: string | null): Branch {
  if (!slug) return defaultBranch;
  const branch = branches.find((b) => b.slug === slug);
  return branch || defaultBranch;
}

// Get all branch slugs for static generation
export function getAllBranchSlugs(): string[] {
  return branches.map((b) => b.slug);
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
