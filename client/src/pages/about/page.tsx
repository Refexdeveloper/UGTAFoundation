import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import PageHero from '../../components/common/PageHero';
import { useSiteContent } from '../../contexts/ContentContext';

export default function AboutPage() {
  const { hash } = useLocation();
  const { foundation, mission, values } = useSiteContent();

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <Layout>
      <PageHero
        eyebrow="About UGTA"
        title={foundation.legalName}
        subtitle={foundation.tagline}
        image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="section-pad bg-white">
        <div className="container-ugta grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-3">Our story</p>
            <h2 className="heading-display text-3xl md:text-4xl">
              Empowering communities. Enabling opportunities.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-ink-muted lg:col-span-8 md:text-lg">
            <p>{foundation.about}</p>
            <p>{foundation.supporting}</p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-brand-soft">
        <div className="container-ugta grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Vision</p>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Our Vision
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
              {foundation.vision}
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Mission</p>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Our Mission
            </h2>
            <ul className="mt-4 space-y-3">
              {mission.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <i className="ri-checkbox-circle-fill mt-0.5 text-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="values" className="section-pad scroll-mt-24 bg-white">
        <div className="container-ugta">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow mb-3">What guides us</p>
            <h2 className="heading-display">Our Values</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {values.map((value) => (
              <div
                key={value}
                className="border border-brand/10 bg-surface px-5 py-8 text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
                  <i className="ri-heart-line text-xl" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {value}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-ugta grid gap-8 md:grid-cols-3">
          <div>
            <p className="eyebrow mb-2">Registered office</p>
            <p className="text-ink-muted">{foundation.location}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">12A Registration</p>
            <p className="text-ink-muted">{foundation.registrations['12A']}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">80G Registration</p>
            <p className="text-ink-muted">{foundation.registrations['80G']}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
