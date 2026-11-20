import { Link } from 'react-router-dom';
import { useSiteContent } from '../../../contexts/ContentContext';

export default function HeroSection() {
  const { home_hero: hero } = useSiteContent();

  return (
    <section className="relative min-h-[88vh] overflow-hidden md:min-h-[92vh]">
      <img
        src={hero.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover animate-fadeIn"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/92 via-brand-dark/70 to-brand-dark/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />

      <div className="container-ugta relative z-10 flex min-h-[88vh] flex-col justify-center py-24 md:min-h-[92vh]">
        <p className="eyebrow mb-4 animate-fadeUp text-accent">{hero.eyebrow}</p>
        <h1 className="max-w-3xl animate-fadeUp font-display text-4xl font-semibold text-white sm:text-5xl md:text-6xl lg:text-[4.25rem] [animation-delay:120ms]">
          {hero.title}
        </h1>
        <p className="mt-5 max-w-xl animate-fadeUp text-xl font-medium text-white/95 md:text-2xl [animation-delay:220ms]">
          {hero.subtitle}
        </p>
        <p className="mt-4 max-w-lg animate-fadeUp text-base text-white/80 md:text-lg [animation-delay:320ms]">
          {hero.description}
        </p>
        <div className="mt-10 flex animate-fadeUp flex-wrap gap-4 [animation-delay:420ms]">
          <Link to={hero.primaryCtaLink || '/programmes'} className="btn-primary">
            {hero.primaryCtaLabel || 'Our Programmes'}
          </Link>
          <Link to={hero.secondaryCtaLink || '/donate'} className="btn-secondary">
            {hero.secondaryCtaLabel || 'Donate Now'}
          </Link>
        </div>
      </div>
    </section>
  );
}
