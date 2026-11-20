import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSiteContent } from '../../contexts/ContentContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About UGTA' },
  { to: '/programmes', label: 'Our Programmes' },
  { to: '/impact', label: 'Our Impact' },
  { to: '/reports', label: 'Reports' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const { foundation } = useSiteContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow ${
        scrolled ? 'bg-white/95 shadow-md backdrop-blur' : 'bg-white'
      }`}
    >
      <div className="container-ugta flex items-center justify-between gap-4 py-3 md:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-sm font-extrabold tracking-tight text-white">
            UGTA
          </div>
          <div className="min-w-0">
            <div className="truncate font-display text-lg font-semibold leading-tight text-brand md:text-xl">
              {foundation.shortName}
            </div>
            <div className="hidden text-[11px] font-medium uppercase tracking-wide text-ink-muted sm:block">
              {foundation.legalName}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 xl:gap-7 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-[13px] font-semibold uppercase tracking-wide transition ${
                  isActive ? 'text-brand' : 'text-ink-muted hover:text-brand'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/donate" className="btn-primary !py-2.5 !px-5">
            Donate Now
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand/20 text-brand lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <i className={`text-xl ${open ? 'ri-close-line' : 'ri-menu-line'}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-brand/10 bg-white lg:hidden">
          <div className="container-ugta flex flex-col gap-1 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-wide ${
                    isActive ? 'bg-brand-soft text-brand' : 'text-ink-muted'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/donate" className="btn-primary mt-2 w-full">
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
