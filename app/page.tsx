import HeroSection from '../components/HeroSection'
import ThumbnailVideoSection from '../components/ThumbnailVideoSection'
import ServicesSection from '../components/ServicesSection'
import DestinationsSection from '../components/DestinationsSection'
import ShowcaseSection from '../components/ShowcaseSection'
import WorldMapSection from '../components/WorldMapSection'
import BranchesMapSection from '../components/BranchesMapSection'
import WhyChooseSection from '../components/WhyChooseSection'
import JourneySection from '../components/JourneySection'
import PopularCoursesSection from '../components/PopularCoursesSection'
import TextRevealSection from '../components/TextRevealSection'
import SuccessStoriesSection from '../components/SuccessStoriesSection'
import PartnersSection from '../components/PartnersSection'
import EventsSection from '../components/EventsSection'
import ToolsSection from '../components/ToolsSection'
import NewsSection from '../components/NewsSection'
import HowWeHelpSection from '../components/HowWeHelpSection'
import ContactCTASection from '../components/ContactCTASection'
import PageAnimations from '../components/PageAnimations'

export default function Home() {
  return (
    <PageAnimations>
      <HeroSection />
      <ThumbnailVideoSection />
      <div className="relative z-10 -mt-[50vh]">
        <ServicesSection />
      </div>
      <DestinationsSection />
      <ShowcaseSection />
      <WorldMapSection />
      <WhyChooseSection />
      <JourneySection />
      <PopularCoursesSection />
      <TextRevealSection />
      <SuccessStoriesSection />
      <PartnersSection />
      <BranchesMapSection />
      <EventsSection />
      <ToolsSection />
      <NewsSection />
      <HowWeHelpSection />
      <ContactCTASection />
    </PageAnimations>
  )
}
