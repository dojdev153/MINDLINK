import City3DBackground from '../components/City3DBackground';
import ScrollOrchestrator from '../components/ScrollOrchestrator';
import Hero from '../components/Hero';
import StatisticsBar from '../components/StatisticsBar';
import FeaturesGrid from '../components/FeaturesGrid';
import WaitlistSection from '../components/WaitlistSection';
import HowItWorks from '../components/HowItWorks';
import ASRHSafeSpace from '../components/ASRHSafeSpace';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <ScrollOrchestrator
        background={<City3DBackground />}
        hero={<Hero />}
      />

      {/* All sections below hero — background is transparent, body is #050d0f */}
      <StatisticsBar />
      <FeaturesGrid />
      <WaitlistSection />
      <HowItWorks />
      <ASRHSafeSpace />
      <FinalCTA />
      <Footer />
    </>
  );
}
