import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingActions from '../components/FloatingActions'
import { HeaderProvider } from './contexts/HeaderContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://nexsuseducation.com'),
  title: {
    default: 'Nexsus Educational Consultancy | Study Abroad Experts from Nepal',
    template: '%s | Nexsus Educational Consultancy',
  },
  description: 'Nepal\'s leading education consultancy. Expert guidance for studying in Australia, Canada, USA, UK, New Zealand, Japan, South Korea & Europe. 98% visa success rate. 15,000+ students placed globally.',
  keywords: [
    'study abroad', 'education consultancy', 'Nepal', 'study abroad from nepal',
    'IELTS preparation', 'PTE preparation', 'visa assistance', 'scholarships',
    'university admission', 'study in australia', 'study in canada', 'study in usa',
    'study in uk', 'study in japan', 'study in new zealand', 'study in south korea',
    'study in europe', 'education consultancy kathmandu', 'abroad study nepal',
    'best education consultancy nepal', 'student visa nepal', 'overseas education',
  ],
  openGraph: {
    title: 'Nexsus Educational Consultancy | Your Gateway to World-Class Education',
    description: 'Transform your future with expert study abroad guidance. 500+ partner universities across 30+ countries. 98% visa success rate.',
    type: 'website',
    siteName: 'Nexsus Educational Consultancy',
    url: 'https://nexsuseducation.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexsus Educational Consultancy | Study Abroad from Nepal',
    description: 'Nepal\'s #1 education consultancy. 15,000+ students placed. 98% visa success rate.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://nexsuseducation.com',
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-verification-code',
  },
}

// Global JSON-LD for the organization
const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://nexsuseducation.com/#website",
      url: "https://nexsuseducation.com",
      name: "Nexsus Educational Consultancy",
      description: "Nepal's leading education consultancy for studying abroad",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://nexsuseducation.com/destinations?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://nexsuseducation.com/#organization",
      name: "Nexsus Educational Consultancy",
      url: "https://nexsuseducation.com",
      description: "Nepal's premier education consultancy specializing in study abroad services. 15,000+ students placed globally with 98% visa success rate.",
      areaServed: { "@type": "Country", name: "Nepal" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
      knowsAbout: [
        "Study Abroad Consulting",
        "University Admissions",
        "Student Visa Assistance",
        "IELTS Preparation",
        "PTE Preparation",
        "Scholarship Guidance",
        "Study in Australia",
        "Study in Canada",
        "Study in USA",
        "Study in UK",
        "Study in New Zealand",
        "Study in Japan",
        "Study in South Korea",
        "Study in Europe",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <HeaderProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingActions />
        </HeaderProvider>
      </body>
    </html>
  )
}