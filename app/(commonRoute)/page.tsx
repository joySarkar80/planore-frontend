import { getUpcomingEvents } from '@/services/events';
import HeroSection from './_component/page/home/HeroSection';
import { getFeaturedEvent } from '@/services/featuredEvent';
import UpcomingEventsSlider from './_component/page/home/UpcomingEventsSlider';
import CategorySection from './_component/page/home/CategorySection';
import CtaSection from './_component/page/home/CtaSection';

export default async function HomePage() {
  // Parallel data fetching
  const [featured, upcomingEvents] = await Promise.all([
    getFeaturedEvent(),
    getUpcomingEvents(),
  ]);

  return (
    <div className="space-y-16 pb-12 overflow-x-hidden">
      {/* Section 1: Hero — Featured Event */}
      <HeroSection featured={featured} />

      <UpcomingEventsSlider events={upcomingEvents} />

      <CategorySection />

      <CtaSection />
    </div>
  );
}