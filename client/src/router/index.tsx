import { Suspense, useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import routes from './config';

export function AppRoutes() {
  const element = useRoutes(routes);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return <Suspense fallback={null}>{element}</Suspense>;
}
