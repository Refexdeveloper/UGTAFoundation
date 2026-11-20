import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Layout from '../../components/layout/Layout';
import PageHero from '../../components/common/PageHero';
import { useSiteContent } from '../../contexts/ContentContext';

type FormState = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  message: string;
};

const initial: FormState = {
  name: '',
  email: '',
  phone: '',
  organisation: '',
  message: '',
};

export default function ContactPage() {
  const { foundation } = useSiteContent();
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  const [errorMessage, setErrorMessage] = useState('');

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'phone' && value && !/^[+\d\s()-]*$/.test(value)) return;
    if (/[<>]/.test(value)) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Unable to send your message.');
      }
      setStatus('success');
      setForm(initial);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong.',
      );
    }
  };

  return (
    <Layout>
      <PageHero
        eyebrow="Contact Us"
        title="Let's work together to create meaningful change"
        subtitle="We welcome collaborations with organisations, partners, donors and individuals."
        image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="section-pad bg-white">
        <div className="container-ugta grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Get in touch</p>
            <h2 className="heading-display text-3xl md:text-4xl">
              {foundation.legalName}
            </h2>
            <div className="mt-8 space-y-5 text-ink-muted">
              <div className="flex gap-3">
                <i className="ri-map-pin-line text-xl text-brand" />
                <div>
                  <div className="font-semibold text-ink">Registered office</div>
                  <p>{foundation.location}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <i className="ri-mail-line text-xl text-brand" />
                <div>
                  <div className="font-semibold text-ink">Email</div>
                  <a
                    href={`mailto:${foundation.email}`}
                    className="hover:text-brand"
                  >
                    {foundation.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <i className="ri-phone-line text-xl text-brand" />
                <div>
                  <div className="font-semibold text-ink">Phone</div>
                  <a
                    href={`tel:${foundation.phone.replace(/\s/g, '')}`}
                    className="hover:text-brand"
                  >
                    {foundation.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="border border-brand/10 bg-surface p-6 md:p-8"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                    Full name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={onChange}
                    className="w-full rounded-md border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    className="w-full rounded-md border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className="w-full rounded-md border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label
                    htmlFor="organisation"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Organisation
                  </label>
                  <input
                    id="organisation"
                    name="organisation"
                    value={form.organisation}
                    onChange={onChange}
                    className="w-full rounded-md border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={1000}
                  value={form.message}
                  onChange={onChange}
                  className="w-full rounded-md border border-brand/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
                />
              </div>

              {status === 'success' && (
                <p className="mt-4 text-sm font-medium text-brand">
                  Thank you. Your message has been sent successfully.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-4 text-sm font-medium text-red-600">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary mt-6 disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
