type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[42vh] overflow-hidden md:min-h-[48vh]">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/35" />
      <div className="container-ugta relative z-10 flex min-h-[42vh] flex-col justify-end pb-12 pt-24 md:min-h-[48vh] md:pb-16">
        {eyebrow && <p className="eyebrow mb-3 text-accent">{eyebrow}</p>}
        <h1 className="max-w-3xl font-display text-4xl font-semibold text-white md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
