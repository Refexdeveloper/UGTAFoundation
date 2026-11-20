import Layout from '../../components/layout/Layout';
import PageHero from '../../components/common/PageHero';
import { useSiteContent } from '../../contexts/ContentContext';

export default function GalleryPage() {
  const { gallery } = useSiteContent();

  return (
    <Layout>
      <PageHero
        eyebrow="Gallery"
        title="Stories of change"
        subtitle="Moments from education, sustainability and healthcare programmes."
        image="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="section-pad bg-white">
        <div className="container-ugta">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((story) => (
              <figure key={story.title} className="group overflow-hidden">
                <div className="overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-4">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {story.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">{story.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
