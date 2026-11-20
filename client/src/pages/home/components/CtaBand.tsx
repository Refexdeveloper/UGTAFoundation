import { Link } from 'react-router-dom';

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1531206715518-52c71f1e0d4e?auto=format&fit=crop&w=2000&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-brand-dark/80" />
      <div className="container-ugta relative z-10 py-20 text-center md:py-24">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold text-white md:text-4xl">
          Let&apos;s work together to create meaningful change
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          We welcome collaborations with organisations, institutions,
          implementation partners, donors and individuals who share our
          commitment to social development and sustainability.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-primary">
            Contact Us
          </Link>
          <Link to="/donate" className="btn-secondary">
            Contribute
          </Link>
        </div>
      </div>
    </section>
  );
}
