import { Link } from 'react-router-dom';
import { useSiteContent } from '../../../contexts/ContentContext';

export default function ImpactStrip() {
  const { impact } = useSiteContent();
  const highlights = impact.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-brand py-14 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 10% 50%, rgba(232,145,15,0.35), transparent 40%), radial-gradient(circle at 90% 20%, rgba(255,255,255,0.12), transparent 35%)',
        }}
      />
      <div className="container-ugta relative z-10">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-accent-soft">Our Impact</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white md:text-4xl">
              Creating impact that matters
            </h2>
          </div>
          <Link
            to="/impact"
            className="text-sm font-bold uppercase tracking-wide text-white/90 hover:text-accent"
          >
            View all impact metrics →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {highlights.map((stat, i) => (
            <div
              key={`${stat.label}-${i}`}
              className="animate-fadeUp border-l border-white/25 pl-4 md:pl-5"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="font-display text-3xl font-semibold text-accent md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-white/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
