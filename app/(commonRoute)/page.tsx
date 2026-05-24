import HeroSection from './_component/page/home/HeroSection';
import { getFeaturedEvent } from '@/services/featuredEvent';

export default async function HomePage() {
  // Parallel data fetching
  const [featured] = await Promise.all([
    getFeaturedEvent()
  ]);

  return (
    <div className="space-y-24 pb-12 overflow-x-hidden">
      {/* Section 1: Hero — Featured Event */}
      <HeroSection featured={featured} />
    </div>
  );
}