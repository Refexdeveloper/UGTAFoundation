import Layout from '../../components/layout/Layout';
import PageHero from '../../components/common/PageHero';
import { useSiteContent } from '../../contexts/ContentContext';

export default function ImpactPage() {
  const { impact } = useSiteContent();

  return (
    <Layout>
      <PageHero
        eyebrow="Our Impact"
        title="Creating impact that matters"
        subtitle="Measurable results across education, sustainability and healthcare."
        image="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="section-pad bg-white">
        <div className="container-ugta">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow mb-3">Scale of work</p>
            <h2 className="heading-display">Impact at a glance</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {impact.map((stat) => (
              <div
                key={stat.label}
                className="bg-brand-soft px-4 py-8 text-center md:px-5"
              >
                <div className="font-display text-3xl font-semibold text-brand md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-ink-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
