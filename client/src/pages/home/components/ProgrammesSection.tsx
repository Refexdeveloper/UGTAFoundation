import { Link } from 'react-router-dom';
import { useSiteContent } from '../../../contexts/ContentContext';

export default function ProgrammesSection() {
  const { programmes } = useSiteContent();

  return (
    <section className="section-pad bg-surface">
      <div className="container-ugta">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow mb-3">What we do</p>
          <h2 className="heading-display">Our Programmes</h2>
          <p className="mt-4 text-ink-muted">
            Education, sustainability and healthcare initiatives that expand
            opportunity and strengthen communities.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {programmes.map((programme, index) => (
            <Link
              key={programme.id}
              to={`/programmes#${programme.id}`}
              className="group relative block min-h-[420px] overflow-hidden rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={programme.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <h3 className="font-display text-2xl font-semibold text-white">
                  {programme.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-white/80">
                  {programme.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                  Explore
                  <i className="ri-arrow-right-line transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
