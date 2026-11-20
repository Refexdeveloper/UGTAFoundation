import { useEffect, useState } from 'react';
import { usersApi, type CmsUser } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';

type Props = {
  notify: (message: string, type?: 'success' | 'error') => void;
};

const emptyForm = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  user_type: 'Admin' as CmsUser['user_type'],
  is_active: true,
};

export default function UsersPanel({ notify }: Props) {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<CmsUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [selected, setSelected] = useState<CmsUser | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setUsers(await usersApi.list());
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setSelected(null);
    setForm(emptyForm);
    setModal('create');
  };

  const openEdit = (user: CmsUser) => {
    setSelected(user);
    setForm({
      first_name: user.first_name,
      last_name: user.last_name || '',
      email: user.email,
      password: '',
      user_type: user.user_type,
      is_active: user.is_active,
    });
    setModal('edit');
  };

  const save = async () => {
    setSaving(true);
    try {
      if (modal === 'create') {
        if (!form.password) {
          notify('Password is required', 'error');
          return;
        }
        await usersApi.create(form);
        notify('User created');
      } else if (selected) {
        const payload: Parameters<typeof usersApi.update>[1] = {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          user_type: form.user_type,
          is_active: form.is_active,
        };
        if (form.password) payload.password = form.password;
        await usersApi.update(selected.id, payload);
        notify('User updated');
      }
      setModal(null);
      await load();
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (user: CmsUser) => {
    if (!confirm(`Delete ${user.email}?`)) return;
    try {
      await usersApi.remove(user.id);
      notify('User deleted');
      await load();
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Delete failed', 'error');
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">
            User management
          </h2>
          <p className="text-sm text-ink-muted">
            Create and manage CMS admin accounts
          </p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary">
          Add user
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-brand/10 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-brand-soft text-ink">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                  Loading…
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                  No users yet
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t border-brand/10">
                  <td className="px-4 py-3">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.user_type}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        user.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="text-brand hover:underline"
                        onClick={() => openEdit(user)}
                      >
                        Edit
                      </button>
                      {me?.user_type === 'SuperAdmin' && me.id !== user.id && (
                        <button
                          type="button"
                          className="text-red-600 hover:underline"
                          onClick={() => remove(user)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="font-display text-xl font-semibold">
              {modal === 'create' ? 'Add user' : 'Edit user'}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                className="rounded-lg border border-brand/15 px-3 py-2 text-sm"
                placeholder="First name"
                value={form.first_name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, first_name: e.target.value }))
                }
              />
              <input
                className="rounded-lg border border-brand/15 px-3 py-2 text-sm"
                placeholder="Last name"
                value={form.last_name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, last_name: e.target.value }))
                }
              />
              <input
                className="rounded-lg border border-brand/15 px-3 py-2 text-sm sm:col-span-2"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
              <input
                className="rounded-lg border border-brand/15 px-3 py-2 text-sm sm:col-span-2"
                placeholder={
                  modal === 'edit'
                    ? 'New password (optional)'
                    : 'Password (min 12 chars)'
                }
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
              />
              <select
                className="rounded-lg border border-brand/15 px-3 py-2 text-sm"
                value={form.user_type}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    user_type: e.target.value as CmsUser['user_type'],
                  }))
                }
              >
                <option value="Editor">Editor</option>
                <option value="Admin">Admin</option>
                {me?.user_type === 'SuperAdmin' && (
                  <option value="SuperAdmin">SuperAdmin</option>
                )}
              </select>
              <select
                className="rounded-lg border border-brand/15 px-3 py-2 text-sm"
                value={form.is_active ? '1' : '0'}
                onChange={(e) =>
                  setForm((f) => ({ ...f, is_active: e.target.value === '1' }))
                }
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="btn-outline"
                onClick={() => setModal(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary"
                disabled={saving}
                onClick={save}
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
