import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ContentPanel from './components/ContentPanel';
import UsersPanel from './components/UsersPanel';

type Section = 'content' | 'users';

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [section, setSection] = useState<Section>('content');
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const canManageUsers =
    user?.user_type === 'SuperAdmin' || user?.user_type === 'Admin';

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-brand/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <div className="font-display text-xl font-semibold text-brand">
              UGTA CMS
            </div>
            <div className="text-xs text-ink-muted">
              {user?.first_name} {user?.last_name} · {user?.user_type}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm font-semibold text-brand hover:underline">
              View site
            </Link>
            <button type="button" onClick={logout} className="btn-outline !py-2 !px-4">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-xl border border-brand/10 bg-white p-3">
          <nav className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setSection('content')}
              className={`rounded-lg px-3 py-2.5 text-left text-sm font-semibold ${
                section === 'content'
                  ? 'bg-brand text-white'
                  : 'text-ink-muted hover:bg-brand-soft'
              }`}
            >
              Website content
            </button>
            {canManageUsers && (
              <button
                type="button"
                onClick={() => setSection('users')}
                className={`rounded-lg px-3 py-2.5 text-left text-sm font-semibold ${
                  section === 'users'
                    ? 'bg-brand text-white'
                    : 'text-ink-muted hover:bg-brand-soft'
                }`}
              >
                User management
              </button>
            )}
          </nav>
        </aside>

        <main>
          {section === 'content' && <ContentPanel notify={notify} />}
          {section === 'users' && canManageUsers && (
            <UsersPanel notify={notify} />
          )}
        </main>
      </div>

      {toast && (
        <div
          className={`fixed bottom-6 right-6 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${
            toast.type === 'error' ? 'bg-red-600' : 'bg-brand'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
