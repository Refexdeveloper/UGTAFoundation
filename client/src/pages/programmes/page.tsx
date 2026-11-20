import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import PageHero from '../../components/common/PageHero';
import { useSiteContent } from '../../contexts/ContentContext';

export default function ProgrammesPage() {
  const { hash } = useLocation();
  const { programmes } = useSiteContent();

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <Layout>
      <PageHero
        eyebrow="Our Programmes"
        title="Education. Sustainability. Healthcare."
        subtitle="Targeted interventions that improve quality of life and strengthen communities."
        image="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=2000&q=80"
      />

      {programmes.map((programme, index) => (
        <section
          key={programme.id}
          id={programme.id}
          className={`section-pad scroll-mt-24 ${
            index % 2 === 0 ? 'bg-white' : 'bg-surface'
          }`}
        >
          <div className="container-ugta grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden">
                <img
                  src={programme.image}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="eyebrow mb-3">{programme.title}</p>
              <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
                {programme.subtitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
                {programme.summary}
              </p>

              <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-brand">
                Key focus areas
              </h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {programme.focus.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-ink-muted">
                    <i className="ri-arrow-right-s-line mt-0.5 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="container-ugta mt-12">
            <h3 className="mb-6 font-display text-2xl font-semibold text-ink">
              Key Initiatives
            </h3>
            <div className="grid gap-5 md:grid-cols-2">
              {programme.initiatives.map((item) => (
                <article
                  key={item.title}
                  className="border-l-4 border-accent bg-white px-5 py-5 shadow-sm"
                >
                  <h4 className="font-semibold text-ink">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </Layout>
  );
}
