import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import DestinationsSection from '../components/DestinationsSection'
import JourneySection from '../components/JourneySection'
import PartnersSection from '../components/PartnersSection'
import SuccessStoriesSection from '../components/SuccessStoriesSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <DestinationsSection />
      <ServicesSection />
      <JourneySection />
      <SuccessStoriesSection />
      <PartnersSection />
    </>
  )
}