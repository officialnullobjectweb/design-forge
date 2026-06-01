import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import CLISection from '@/components/CLISection';
import CreditsSection from '@/components/CreditsSection';
import Footer from '@/components/Footer';
import { categories } from '@/data/categories';
import { resources } from '@/data/resources';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />

        <div className="border-t border-zinc-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-zinc-400">
                <span className="font-medium text-zinc-600">{resources.length} free resources</span> across {categories.length} categories
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="inline-flex items-center rounded-full bg-zinc-50 px-3 py-1 text-[10px] font-medium text-zinc-600 ring-1 ring-zinc-200/50 hover:bg-zinc-100 transition-colors"
                  >
                    {cat.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="resources" className="space-y-16 py-16 scroll-mt-20">
          {categories.map((category) => {
            const catResources = resources.filter((r) => r.category === category.id);
            if (catResources.length === 0) return null;
            return (
              <CategorySection
                key={category.id}
                category={category}
                resources={catResources}
              />
            );
          })}
        </div>

        <CLISection />
        <CreditsSection />
      </main>
      <Footer />
    </>
  );
}
