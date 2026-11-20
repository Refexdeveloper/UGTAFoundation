import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

export default function NotFound() {
  return (
    <Layout>
      <section className="section-pad container-ugta text-center">
        <p className="eyebrow mb-3">404</p>
        <h1 className="heading-display">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Back to home
        </Link>
      </section>
    </Layout>
  );
}
