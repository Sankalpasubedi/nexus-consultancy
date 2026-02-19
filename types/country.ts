export interface CountryImage {
  id: number;
  url: string;
  location: string;
}

export interface CarouselData {
  CountryImages: CountryImage[];
  description: string;
  guideLink: string;
}

interface StatisticItem {
  id: number;
  label: string;
  value: string;
}

export interface HighLightedData {
  statistics: StatisticItem[];
  description: string;
}

export interface University {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    country?: string;
  };
  ranking: {
    position: number;
    type: string;
  };
  scholarship: {
    percentage: number;
    accreditedBy: string;
    description: string;
  };
  image?: string;
}

interface VisaRequirementCard {
  id: string;
  title: string;
  icon: string;
  items: string[];
}

export interface VisaRequirements {
  processingtime: string;
  VisaCardData: VisaRequirementCard[];
}

export interface AdmissionRequirementsData {
  [key: string]: { id: number; text: string }[];
}

export type EducationLevel = "Undergraduate" | "Postgraduate" | "Doctoral";

export interface CostData {
  id: number;
  category: string;
  minCost: number;
  maxCost: number;
  percentage: number;
}

export type WhyData = string;

export interface WorkData {
  title: string;
  description: string;
  icon: string;
}

export interface ScholarshipData {
  id: number;
  name: string;
  amount: string;
  eligibility: string;
  deadline: string;
}

export interface CultureData {
  id: number;
  title: string;
  description: string;
  image?: string;
}

export interface TestimonialData {
  name: string;
  degree: string;
  university: string;
  country: string;
  quote: string;
  image?: string;
}

export interface CountryDataType {
  country: string;
  currency: string;
  flagCode: string;
  accentColor: string;
  carouselData: CarouselData;
  highlightedData: HighLightedData;
  universities: University[];
  whyData: WhyData[];
  visaRequirements: VisaRequirements;
  admissionRequirementsData: AdmissionRequirementsData;
  costData: CostData[];
  workData: WorkData[];
  scholarshipData: ScholarshipData[];
  cultureData: CultureData[];
  testimonials: TestimonialData[];
}
