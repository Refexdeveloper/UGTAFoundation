import { Link } from 'react-router-dom';
import { useSiteContent } from '../../../contexts/ContentContext';

export default function AboutIntro() {
  const { foundation } = useSiteContent();

  return (
    <section className="section-pad bg-white">
      <div className="container-ugta grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-3">Who we are</p>
          <h2 className="heading-display">
            Creating meaningful and lasting social impact
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-base leading-relaxed text-ink-muted md:text-lg">
            {foundation.about}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            {foundation.supporting}
          </p>
          <Link to="/about" className="btn-outline mt-8">
            Know more
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}
