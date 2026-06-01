import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import CLISection from '@/components/CLISection';
import CreditsSection from '@/components/CreditsSection';
import Footer from '@/components/Footer';
import { categories, resources } from '@/data/resources';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />

        <div id="resources" className="space-y-20 py-20 scroll-mt-20">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              resources={resources.filter((r) => r.category === category.id)}
            />
          ))}
        </div>

        <CLISection />
        <CreditsSection />
      </main>
      <Footer />
    </>
  );
}
