import Layout from '../../components/layout/Layout';
import PageHero from '../../components/common/PageHero';
import { useSiteContent } from '../../contexts/ContentContext';

export default function PrivacyPolicyPage() {
  const { foundation } = useSiteContent();
  return (
    <Layout>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use and protect information shared with UGTA Foundation."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="section-pad bg-white">
        <div className="container-ugta prose prose-neutral max-w-3xl">
          <p>
            {foundation.legalName} respects your privacy. Information submitted
            through enquiry or donation channels is used only to respond to your
            request, process contributions, issue acknowledgements, and meet
            statutory obligations.
          </p>
          <p>
            We do not sell personal data. Access is limited to authorised
            personnel and service providers acting on our behalf under
            confidentiality obligations.
          </p>
          <p>
            For privacy questions, write to{' '}
            <a href={`mailto:${foundation.email}`}>{foundation.email}</a>.
          </p>
        </div>
      </section>
    </Layout>
  );
}
