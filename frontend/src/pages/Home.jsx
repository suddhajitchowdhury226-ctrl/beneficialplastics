import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import AiAssistant from '../components/home/AiAssistant';
import StatsBar from '../components/home/StatsBar';
import AboutStrip from '../components/home/AboutStrip';
import QuoteSection from '../components/quote/QuoteSection';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <StatsBar />
      <AboutStrip />
      <AiAssistant />
      <QuoteSection id="contact" eyebrow="Get In Touch" />
    </>
  );
}
