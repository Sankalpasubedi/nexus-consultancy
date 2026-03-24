import { countryDataMap } from "@/data";

export type UniversitySort = "popularity" | "ranking" | "name-asc" | "name-desc";

export interface UniversityFinderItem {
  id: string;
  slug: string;
  name: string;
  country: string;
  countrySlug: string;
  city: string;
  state: string;
  rankingPosition: number;
  rankingType: string;
  scholarshipPercentage: number;
  scholarshipName: string;
  accreditedBy: string;
  annualTuitionUsd: number;
  internationalStudents: number;
  programsCount: number;
  acceptanceRate: number;
  image: string;
  overview: string;
  tags: string[];
  popularityScore: number;
}

const gallery = [
  "/services/NEX-_-2.jpg",
  "/services/NEX-_-8.jpg",
  "/services/NEX-_-14.jpg",
  "/services/NEX-_-22.jpg",
  "/services/NEX-_-28.jpg",
  "/services/NEX-_-35.jpg",
  "/services/NEX-_-42.jpg",
  "/services/NEX-_-45.jpg",
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function createOverview(name: string, city: string, country: string): string {
  return `${name} in ${city}, ${country} is known for career-focused programs, student support services, and strong graduate outcomes for international students.`;
}

const universityItems: UniversityFinderItem[] = Object.entries(countryDataMap).flatMap(
  ([countrySlug, countryData], countryIndex) =>
    countryData.universities.map((uni, uniIndex) => {
      const rankingBase = Math.max(uni.ranking.position, 1);
      const annualTuitionUsd = 12000 + ((rankingBase * 83 + uniIndex * 271) % 28000);
      const internationalStudents = 1200 + ((rankingBase * 151 + uniIndex * 503) % 38000);
      const programsCount = 45 + ((rankingBase * 7 + uniIndex * 5) % 210);
      const acceptanceRate = 22 + ((rankingBase + uniIndex * 3) % 56);
      const popularityScore =
        Math.max(0, 1200 - rankingBase * 4) +
        uni.scholarship.percentage * 6 +
        programsCount * 2 +
        Math.round(internationalStudents / 120);

      return {
        id: `${countrySlug}-${uni.id}`,
        slug: `${slugify(uni.name)}-${slugify(countryData.country)}`,
        name: uni.name,
        country: countryData.country,
        countrySlug,
        city: uni.location.city,
        state: uni.location.state,
        rankingPosition: rankingBase,
        rankingType: uni.ranking.type,
        scholarshipPercentage: uni.scholarship.percentage,
        scholarshipName: uni.scholarship.description,
        accreditedBy: uni.scholarship.accreditedBy,
        annualTuitionUsd,
        internationalStudents,
        programsCount,
        acceptanceRate,
        image: gallery[(countryIndex * 5 + uniIndex) % gallery.length],
        overview: createOverview(uni.name, uni.location.city, countryData.country),
        tags: [
          countryData.country,
          `${uni.location.city} campus`,
          `${uni.scholarship.percentage}% scholarship opportunities`,
          `${uni.ranking.type} ranking`,
        ],
        popularityScore,
      };
    })
);

function sortItems(items: UniversityFinderItem[], sortBy: UniversitySort): UniversityFinderItem[] {
  const clone = [...items];

  if (sortBy === "ranking") {
    return clone.sort((a, b) => a.rankingPosition - b.rankingPosition);
  }

  if (sortBy === "name-asc") {
    return clone.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "name-desc") {
    return clone.sort((a, b) => b.name.localeCompare(a.name));
  }

  return clone.sort((a, b) => b.popularityScore - a.popularityScore);
}

export function getAllUniversities(sortBy: UniversitySort = "popularity"): UniversityFinderItem[] {
  return sortItems(universityItems, sortBy);
}

export function getUniversityBySlug(slug: string): UniversityFinderItem | undefined {
  return universityItems.find((item) => item.slug === slug);
}

export function getCountryFilters(): string[] {
  const countries = new Set(universityItems.map((item) => item.country));
  return ["All destinations", ...Array.from(countries).sort((a, b) => a.localeCompare(b))];
}

export function getUniversitiesCount(): number {
  return universityItems.length;
}
