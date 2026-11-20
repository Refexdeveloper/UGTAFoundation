import Layout from '../../components/layout/Layout';
import PageHero from '../../components/common/PageHero';
import { useSiteContent } from '../../contexts/ContentContext';

export default function TermsPage() {
  const { foundation } = useSiteContent();
  return (
    <Layout>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle="Terms governing use of the UGTA Foundation website."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="section-pad bg-white">
        <div className="container-ugta max-w-3xl space-y-4 text-ink-muted">
          <p>
            By using this website you agree to these terms. Content is provided
            for general information about {foundation.legalName} and its
            programmes.
          </p>
          <p>
            Programme imagery and impact figures may be illustrative pending
            final verification. External links are provided for convenience; we
            are not responsible for third-party content.
          </p>
          <p>
            These terms are governed by the laws of India. For queries, contact{' '}
            <a className="text-brand underline" href={`mailto:${foundation.email}`}>
              {foundation.email}
            </a>
            .
          </p>
        </div>
      </section>
    </Layout>
  );
}
