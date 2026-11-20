const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined) ?? '';

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function parseJson(res: Response) {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('Invalid response from server');
  }
  return res.json();
}

export type CmsUser = {
  id: string;
  first_name: string;
  last_name?: string;
  email: string;
  user_type: 'SuperAdmin' | 'Admin' | 'Editor';
  is_active: boolean;
  last_login_at?: string | null;
  created_at?: string;
};

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const body = await parseJson(res);
  if (!res.ok) throw new Error(body.message || 'Login failed');
  return body as { success: boolean; token: string; user: CmsUser };
}

export async function verifyToken() {
  const res = await fetch(`${API_BASE}/api/auth/verify`, {
    headers: authHeaders(),
  });
  const body = await parseJson(res);
  if (!res.ok) throw new Error(body.message || 'Session expired');
  return body as { success: boolean; user: CmsUser };
}

export const usersApi = {
  async list(): Promise<CmsUser[]> {
    const res = await fetch(`${API_BASE}/api/users`, { headers: authHeaders() });
    const body = await parseJson(res);
    if (!res.ok) throw new Error(body.message || 'Failed to load users');
    return body.data as CmsUser[];
  },
  async create(payload: {
    first_name: string;
    last_name?: string;
    email: string;
    password: string;
    user_type: CmsUser['user_type'];
    is_active?: boolean;
  }) {
    const res = await fetch(`${API_BASE}/api/users`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    const body = await parseJson(res);
    if (!res.ok) throw new Error(body.message || 'Failed to create user');
    return body.data as CmsUser;
  },
  async update(
    id: string,
    payload: Partial<{
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      user_type: CmsUser['user_type'];
      is_active: boolean;
    }>,
  ) {
    const res = await fetch(`${API_BASE}/api/users/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    const body = await parseJson(res);
    if (!res.ok) throw new Error(body.message || 'Failed to update user');
    return body.data as CmsUser;
  },
  async remove(id: string) {
    const res = await fetch(`${API_BASE}/api/users/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    const body = await parseJson(res);
    if (!res.ok) throw new Error(body.message || 'Failed to delete user');
    return body;
  },
};

export const cmsApi = {
  async getPublicContent() {
    const res = await fetch(`${API_BASE}/api/content`);
    const body = await parseJson(res);
    if (!res.ok) throw new Error(body.message || 'Failed to load content');
    return body.data as Record<string, unknown>;
  },
  async listSections() {
    const res = await fetch(`${API_BASE}/api/cms/sections`, {
      headers: authHeaders(),
    });
    const body = await parseJson(res);
    if (!res.ok) throw new Error(body.message || 'Failed to load sections');
    return body.data as Array<{
      id: number;
      section_key: string;
      title: string;
      content: unknown;
      is_active: boolean;
    }>;
  },
  async getSection(key: string) {
    const res = await fetch(`${API_BASE}/api/content/${key}`, {
      headers: authHeaders(),
    });
    const body = await parseJson(res);
    if (!res.ok) throw new Error(body.message || 'Failed to load section');
    return body.data as { section_key: string; title?: string; content: unknown };
  },
  async saveSection(key: string, content: unknown, title?: string) {
    const res = await fetch(`${API_BASE}/api/cms/sections/${key}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ content, title, is_active: true }),
    });
    const body = await parseJson(res);
    if (!res.ok) throw new Error(body.message || 'Failed to save section');
    return body.data;
  },
};
