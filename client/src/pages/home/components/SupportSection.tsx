import { Link } from 'react-router-dom';

const causes = [
  {
    title: 'Enable every child to learn',
    copy: 'Support school infrastructure, scholarships and digital inclusion for underserved learners.',
    to: '/programmes#education',
    image:
      'https://images.unsplash.com/photo-1503676260726-1b71862b9b87?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Protect nature, build resilience',
    copy: 'Fund waterbody restoration, mangrove plantations and clean-energy access for communities.',
    to: '/programmes#sustainability',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Strengthen community health',
    copy: 'Help expand school-based healthcare, preventive screenings and emergency preparedness.',
    to: '/programmes#healthcare',
    image:
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1000&q=80',
  },
];

export default function SupportSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-ugta">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow mb-3">Support a cause</p>
            <h2 className="heading-display">Be a part of the change</h2>
          </div>
          <Link to="/donate" className="btn-primary self-start md:self-auto">
            Donate Now
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {causes.map((cause) => (
            <Link key={cause.title} to={cause.to} className="group block">
              <div className="overflow-hidden">
                <img
                  src={cause.image}
                  alt=""
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink group-hover:text-brand">
                {cause.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {cause.copy}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
