import { Link } from 'react-router-dom';
import { useSiteContent } from '../../contexts/ContentContext';

export default function Footer() {
  const { foundation, programmes } = useSiteContent();
  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(232,145,15,0.25), transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(26,122,102,0.45), transparent 45%)',
        }}
      />
      <div className="container-ugta relative z-10 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-4 font-display text-2xl font-semibold">
              {foundation.shortName}
            </div>
            <p className="text-sm leading-relaxed text-white/75">
              {foundation.supporting}
            </p>
            <p className="mt-4 text-sm text-white/65">{foundation.location}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              About UGTA
            </h3>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <Link to="/about" className="hover:text-accent">
                  Vision & Mission
                </Link>
              </li>
              <li>
                <Link to="/about#values" className="hover:text-accent">
                  Our Values
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-accent">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-accent">
                  Reports & Disclosures
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Programme Areas
            </h3>
            <ul className="space-y-2 text-sm text-white/75">
              {programmes.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/programmes#${p.id}`}
                    className="hover:text-accent"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/gallery" className="hover:text-accent">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Get Involved
            </h3>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <Link to="/donate" className="hover:text-accent">
                  Donate Now
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent">
                  Contact / Grievance
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-accent">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-accent">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            <div className="mt-5 space-y-1 text-sm text-white/70">
              <a href={`mailto:${foundation.email}`} className="block hover:text-accent">
                {foundation.email}
              </a>
              <a href={`tel:${foundation.phone.replace(/\s/g, '')}`} className="block hover:text-accent">
                {foundation.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {foundation.legalName}. All rights
            reserved.
          </p>
          <p>
            12A: {foundation.registrations['12A']} · 80G:{' '}
            {foundation.registrations['80G']}
          </p>
        </div>
      </div>
    </footer>
  );
}
