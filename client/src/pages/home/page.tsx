import Layout from '../../components/layout/Layout';
import HeroSection from './components/HeroSection';
import AboutIntro from './components/AboutIntro';
import ImpactStrip from './components/ImpactStrip';
import ProgrammesSection from './components/ProgrammesSection';
import SupportSection from './components/SupportSection';
import CtaBand from './components/CtaBand';

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <AboutIntro />
      <ImpactStrip />
      <ProgrammesSection />
      <SupportSection />
      <CtaBand />
    </Layout>
  );
}
