import { useEffect, useState } from 'react';
import { cmsApi } from '../../../services/api';

type Props = {
  notify: (message: string, type?: 'success' | 'error') => void;
};

const SECTIONS = [
  { key: 'foundation', label: 'Foundation details' },
  { key: 'home_hero', label: 'Home hero' },
  { key: 'mission', label: 'Mission points' },
  { key: 'values', label: 'Core values' },
  { key: 'impact', label: 'Impact statistics' },
  { key: 'programmes', label: 'Programmes' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'reports', label: 'Reports list' },
];

export default function ContentPanel({ notify }: Props) {
  const [activeKey, setActiveKey] = useState('foundation');
  const [jsonText, setJsonText] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const section = await cmsApi.getSection(activeKey);
        if (!cancelled) {
          setJsonText(JSON.stringify(section.content, null, 2));
        }
      } catch (err) {
        if (!cancelled) {
          notify(
            err instanceof Error ? err.message : 'Failed to load section',
            'error',
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [activeKey, notify]);

  const save = async () => {
    setSaving(true);
    try {
      const parsed = JSON.parse(jsonText);
      const meta = SECTIONS.find((s) => s.key === activeKey);
      await cmsApi.saveSection(activeKey, parsed, meta?.label);
      notify('Content saved — public site will show updates');
    } catch (err) {
      notify(
        err instanceof Error ? err.message : 'Invalid JSON or save failed',
        'error',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Website content
        </h2>
        <p className="text-sm text-ink-muted">
          Edit JSON for each section. Changes appear on the public website.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {SECTIONS.map((section) => (
          <button
            key={section.key}
            type="button"
            onClick={() => setActiveKey(section.key)}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
              activeKey === section.key
                ? 'bg-brand text-white'
                : 'bg-brand-soft text-brand hover:bg-brand/10'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-brand/10 bg-white p-4 md:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="font-semibold text-ink">
            {SECTIONS.find((s) => s.key === activeKey)?.label}
          </h3>
          <button
            type="button"
            className="btn-primary !py-2"
            disabled={saving || loading}
            onClick={save}
          >
            {saving ? 'Saving…' : 'Save section'}
          </button>
        </div>
        {loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : (
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            spellCheck={false}
            className="h-[28rem] w-full rounded-lg border border-brand/15 bg-surface p-4 font-mono text-xs leading-relaxed outline-none focus:border-brand"
          />
        )}
      </div>
    </div>
  );
}
