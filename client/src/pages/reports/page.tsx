import Layout from '../../components/layout/Layout';
import PageHero from '../../components/common/PageHero';
import { useSiteContent } from '../../contexts/ContentContext';

export default function ReportsPage() {
  const { reports } = useSiteContent();

  return (
    <Layout>
      <PageHero
        eyebrow="Reports & Publications"
        title="Transparency and accountability"
        subtitle="Programme reports, financial statements and statutory disclosures."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="section-pad bg-white">
        <div className="container-ugta">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow mb-3">Documents</p>
            <h2 className="heading-display">Reports and publications</h2>
          </div>

          <div className="mx-auto grid max-w-4xl gap-3">
            {reports.map((report) => (
              <div
                key={report}
                className="flex items-center justify-between gap-4 border border-brand/10 bg-surface px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <i className="ri-file-text-line text-2xl text-brand" />
                  <span className="font-medium text-ink">{report}</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  Coming soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
