import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import PageHero from '../../components/common/PageHero';
import { useSiteContent } from '../../contexts/ContentContext';

export default function DonatePage() {
  const { foundation } = useSiteContent();
  return (
    <Layout>
      <PageHero
        eyebrow="Donate"
        title="Your contribution can make a difference"
        subtitle="Help expand access to education, strengthen healthcare and protect our environment."
        image="https://images.unsplash.com/photo-1532629347102-77d3ff5c0c4d?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="section-pad bg-white">
        <div className="container-ugta grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-3">Be a part of the change</p>
            <h2 className="heading-display text-3xl md:text-4xl">
              Join us in building a more sustainable future
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
              Every contribution helps expand opportunities for underserved
              communities across education, sustainability and healthcare.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                'Secure payment gateway (coming soon)',
                'Donation acknowledgement and receipts',
                'Applicable tax-benefit information under 80G, subject to statutory eligibility',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <i className="ri-checkbox-circle-fill mt-0.5 text-brand" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-sm border border-accent/30 bg-accent-soft p-6">
              <h3 className="font-display text-xl font-semibold text-ink">
                Prefer to contribute directly?
              </h3>
              <p className="mt-2 text-sm text-ink-muted">
                Write to us at{' '}
                <a
                  href={`mailto:${foundation.email}`}
                  className="font-semibold text-brand underline"
                >
                  {foundation.email}
                </a>{' '}
                and our team will share bank and compliance details.
              </p>
              <Link to="/contact" className="btn-outline mt-5">
                Contact the foundation
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-brand px-6 py-8 text-white md:px-8">
              <h3 className="font-display text-2xl font-semibold">
                Where your support goes
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-white/85">
                <li className="flex gap-3">
                  <i className="ri-book-open-line text-accent text-xl" />
                  Education access, scholarships and digital inclusion
                </li>
                <li className="flex gap-3">
                  <i className="ri-leaf-line text-accent text-xl" />
                  Water restoration, mangroves and clean energy
                </li>
                <li className="flex gap-3">
                  <i className="ri-heart-pulse-line text-accent text-xl" />
                  School healthcare and preventive wellness
                </li>
              </ul>
              <button
                type="button"
                className="btn-primary mt-8 w-full"
                disabled
                title="Payment gateway integration pending"
              >
                Donate Now — Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
