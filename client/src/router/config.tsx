import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const HomePage = lazy(() => import('../pages/home/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const ProgrammesPage = lazy(() => import('../pages/programmes/page'));
const ImpactPage = lazy(() => import('../pages/impact/page'));
const ReportsPage = lazy(() => import('../pages/reports/page'));
const GalleryPage = lazy(() => import('../pages/gallery/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const DonatePage = lazy(() => import('../pages/donate/page'));
const PrivacyPolicyPage = lazy(() => import('../pages/privacy-policy/page'));
const TermsPage = lazy(() => import('../pages/terms/page'));
const AdminLoginPage = lazy(() => import('../pages/admin-login/page'));
const AdminDashboardPage = lazy(() => import('../pages/admin/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/programmes', element: <ProgrammesPage /> },
  { path: '/impact', element: <ImpactPage /> },
  { path: '/reports', element: <ReportsPage /> },
  { path: '/gallery', element: <GalleryPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/donate', element: <DonatePage /> },
  { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
  { path: '/terms', element: <TermsPage /> },
  { path: '/admin/login', element: <AdminLoginPage /> },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminDashboardPage />
      </ProtectedRoute>
    ),
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
