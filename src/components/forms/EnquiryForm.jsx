'use client';

import { usePathname } from 'next/navigation';
import { startTransition, useActionState } from 'react';
import { submitEnquiry } from '@/app/actions/enquiry';
import Icon, { WhatsAppIcon } from '@/components/ui/Icon';
import { SERVICES } from '@/data/services';
import { whatsappLink } from '@/data/site';

const FIELDS = {
  quote: ['name', 'phone', 'email', 'service', 'message'],
  service: ['name', 'phone', 'email', 'message'],
  product: ['name', 'phone', 'quantity', 'message'],
  callback: ['name', 'phone'],
  question: ['name', 'email', 'message'],
};

const LABELS = {
  name: ['Your name', 'Full name'],
  phone: ['Phone / WhatsApp', '+91 98765 43210'],
  email: ['Email', 'you@company.com'],
  quantity: ['Quantity', 'e.g. 50 pieces'],
  message: ['Tell us about it', 'Size, material, quantity, deadline — anything helps.'],
};

function Field({ name, dark, error, defaultValue, required }) {
  const [label, placeholder] = LABELS[name];
  const cls = `field ${dark ? 'field-dark' : ''} ${error ? '!border-laser' : ''}`;
  return (
    <label className={`block ${name === 'message' ? 'sm:col-span-2' : ''}`}>
      <span className={`label mb-2 block ${dark ? 'text-paper/55' : 'text-ink/55'}`}>
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      {name === 'message' ? (
        <textarea name={name} rows={4} placeholder={placeholder} defaultValue={defaultValue} className={`${cls} resize-y`} />
      ) : (
        <input
          name={name}
          type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'}
          inputMode={name === 'phone' ? 'tel' : undefined}
          autoComplete={name === 'name' ? 'name' : name === 'phone' ? 'tel' : name === 'email' ? 'email' : 'off'}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={cls}
          aria-invalid={error ? 'true' : undefined}
        />
      )}
      {error && <span className="mt-1.5 block text-sm text-laser">{error}</span>}
    </label>
  );
}

export default function EnquiryForm({ type = 'quote', service = '', product = '', dark = false, submitLabel = 'Send enquiry', className = '' }) {
  const [state, action, pending] = useActionState(submitEnquiry, null);
  const pathname = usePathname();
  const fields = FIELDS[type];
  const v = state?.values ?? {};
  const err = state?.errors ?? {};

  if (state?.ok) {
    // The static GitHub Pages preview can't store enquiries, so it hands them to WhatsApp instead.
    const viaWhatsApp = Boolean(state.whatsapp);
    return (
      <div className={`rounded-2xl border p-8 ${dark ? 'border-paper/15 text-paper' : 'border-line bg-white/50'} ${className}`} role="status">
        <span className="flex size-12 items-center justify-center rounded-full bg-gold text-ink">
          <Icon name={viaWhatsApp ? 'arrowUpRight' : 'check'} size={24} strokeWidth={2.2} />
        </span>
        <p className="display mt-5 text-3xl">{viaWhatsApp ? 'One last tap' : 'Got it — thank you!'}</p>
        <p className={`mt-2 max-w-md ${dark ? 'text-paper/65' : 'text-ink/65'}`}>
          {viaWhatsApp
            ? 'Send your details to our team on WhatsApp — the message is already written for you.'
            : 'Your enquiry is with our team. We usually reply within a few hours on working days. Need it faster? Message us on WhatsApp.'}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={state.whatsapp || whatsappLink('Hi Nexuz Hub! I just sent an enquiry on your website.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold btn-sm"
          >
            <WhatsAppIcon size={16} /> {viaWhatsApp ? 'Send on WhatsApp' : 'WhatsApp us'}
          </a>
          <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${pathname}`} className={`btn btn-sm ${dark ? 'btn-line-light' : 'btn-line'}`}>
            Send another
          </a>
        </div>
      </div>
    );
  }

  const inline = type === 'callback';
  // Submit via a transition so typed values stay put if validation fails.
  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };

  return (
    <form onSubmit={onSubmit} className={className} noValidate>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="page" value={pathname} />
      {service && <input type="hidden" name="service" value={service} />}
      {product && <input type="hidden" name="product" value={product} />}
      {/* Honeypot for bots — hidden from people and screen readers. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={inline ? 'grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end' : 'grid gap-5 sm:grid-cols-2'}>
        {fields.map((f) =>
          f === 'service' ? (
            <label key={f} className="block">
              <span className={`label mb-2 block ${dark ? 'text-paper/55' : 'text-ink/55'}`}>Service</span>
              <select name="service" defaultValue={v.service || ''} className={`field ${dark ? 'field-dark' : ''}`}>
                <option value="">Not sure yet</option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.short}>
                    {s.name}
                  </option>
                ))}
                <option value="Products">A product from the catalogue</option>
              </select>
            </label>
          ) : (
            <Field
              key={`${f}-${state?.attempt ?? 0}`}
              name={f}
              dark={dark}
              error={err[f]}
              defaultValue={v[f]}
              required={f === 'name' || (f === 'phone' && type !== 'question') || (f === 'email' && type === 'question')}
            />
          ),
        )}
        {inline && (
          <button type="submit" disabled={pending} className="btn btn-gold h-[3.15rem]">
            {pending ? 'Sending…' : submitLabel} {!pending && <Icon name="arrow" size={15} />}
          </button>
        )}
      </div>

      {state?.message && <p className="mt-4 text-sm text-laser">{state.message}</p>}

      {!inline && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className={`max-w-xs text-sm ${dark ? 'text-paper/45' : 'text-ink/50'}`}>No obligation. We reply with a firm quote, usually the same day.</p>
          <button type="submit" disabled={pending} className={`btn ${dark ? 'btn-gold' : 'btn-ink'}`}>
            {pending ? 'Sending…' : submitLabel} {!pending && <Icon name="arrow" size={15} />}
          </button>
        </div>
      )}
    </form>
  );
}
