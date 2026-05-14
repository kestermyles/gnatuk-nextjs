'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactFormSchema,
  machineHireOptions,
  methodServiceOptions,
  type ContactFormValues,
} from '@/lib/validation';
import { CTAButton } from './CTAButton';
import { cn } from '@/lib/utils';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputBase =
  'w-full rounded border border-gnat-steel/40 bg-white px-4 py-3 text-gnat-navy placeholder:text-gnat-steel transition-colors focus:border-gnat-orange focus:outline-none focus:ring-2 focus:ring-gnat-orange/20';

const errorClass = 'mt-1.5 text-sm text-red-600';

type ContactFormProps = {
  defaultEnquiryType?: ContactFormValues['enquiryType'];
  defaultService?: ContactFormValues['service'];
};

export function ContactForm({ defaultEnquiryType, defaultService }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      enquiryType: defaultEnquiryType ?? 'method-proposal',
      service: defaultService,
      consent: undefined,
    },
  });

  // Cascading dropdown — service options change with enquiry type.
  const enquiryType = watch('enquiryType');
  const currentService = watch('service');
  const serviceChoices =
    enquiryType === 'machine-hire' ? machineHireOptions : methodServiceOptions;
  const serviceLabel =
    enquiryType === 'machine-hire' ? 'Machine (if known)' : 'Service (if known)';
  const servicePlaceholder =
    enquiryType === 'machine-hire' ? 'Select a Brokk model' : 'Select if known';

  // When the enquiry type changes, clear the service if it's no longer in the list.
  useEffect(() => {
    if (currentService && !serviceChoices.includes(currentService as never)) {
      setValue('service', undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enquiryType]);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus('submitting');
    setErrorMessage(null);
    try {
      // Pull the Turnstile token if the widget is enabled.
      let turnstileToken: string | undefined;
      if (TURNSTILE_SITE_KEY) {
        const tokenInput = formRef.current?.querySelector<HTMLInputElement>(
          '[name="cf-turnstile-response"]',
        );
        turnstileToken = tokenInput?.value;
        if (!turnstileToken) {
          setStatus('error');
          setErrorMessage('Please complete the verification challenge above the submit button.');
          return;
        }
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, turnstileToken }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong. Please try again.');
      }
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'form_submission',
          form_type: values.enquiryType,
          service: values.service || 'unspecified',
        });
      }
      reset();
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-gnat-orange/30 bg-gnat-orange/5 p-8 text-center">
        <h2 className="text-2xl font-semibold text-gnat-navy">Thanks — we&apos;ve got it.</h2>
        <p className="mt-3 text-gnat-steel-dark">
          A specialist will review your enquiry and come back with the right approach.
          For urgent matters, call <a href="tel:+441748826046" className="font-semibold text-gnat-orange">01748 826046</a>.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-gnat-navy">What do you need? *</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { value: 'method-proposal', label: 'Method Proposal' },
            { value: 'machine-hire', label: 'Machine Hire / Availability' },
            { value: 'guidance', label: 'Not sure — need guidance' },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-start gap-3 rounded border border-gnat-steel/40 p-3 has-[:checked]:border-gnat-orange has-[:checked]:bg-gnat-orange/5"
            >
              <input
                type="radio"
                value={opt.value}
                {...register('enquiryType')}
                className="mt-0.5 h-4 w-4 accent-gnat-orange"
              />
              <span className="text-sm text-gnat-navy">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.enquiryType && <p className={errorClass}>{errors.enquiryType.message}</p>}
      </fieldset>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-gnat-navy">
          {serviceLabel}
        </label>
        <select
          id="service"
          {...register('service')}
          className={cn(inputBase, 'appearance-none')}
          defaultValue=""
        >
          <option value="">{servicePlaceholder}</option>
          {serviceChoices.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-gnat-navy">
            Name *
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            {...register('name')}
            className={inputBase}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-semibold text-gnat-navy">
            Company <span className="font-normal text-gnat-steel">(optional)</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            {...register('company')}
            className={inputBase}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gnat-navy">
            Email *
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            {...register('email')}
            className={inputBase}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-gnat-navy">
            Phone <span className="font-normal text-gnat-steel">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            {...register('phone')}
            className={inputBase}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-gnat-navy">
          What needs removing, cutting or breaking out? *
        </label>
        <p className="mb-2 text-sm text-gnat-steel-dark">
          Include location, access constraints, and any programme pressure.
        </p>
        <textarea
          id="message"
          rows={6}
          {...register('message')}
          className={cn(inputBase, 'resize-y')}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-gnat-steel-dark">
        <input
          type="checkbox"
          {...register('consent')}
          className="mt-0.5 h-4 w-4 flex-none accent-gnat-orange"
        />
        <span>
          I agree to GNAT UK contacting me about this enquiry. See our{' '}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gnat-navy underline hover:text-gnat-orange"
          >
            Privacy Policy
          </a>
          {' '}(opens in a new tab).
        </span>
      </label>
      {errors.consent && <p className={errorClass}>{errors.consent.message}</p>}

      {TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
            async
            defer
          />
          <div
            className="cf-turnstile"
            data-sitekey={TURNSTILE_SITE_KEY}
            data-theme="light"
          />
        </>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <CTAButton size="lg" variant="primary" {...({ type: 'submit' } as any)}>
          {status === 'submitting' ? 'Sending…' : 'Request Method Proposal'}
        </CTAButton>
        <p className="text-sm text-gnat-steel-dark">
          No obligation. We&apos;ll review and come back with the right approach.
        </p>
      </div>

      {status === 'error' && errorMessage && (
        <div role="alert" className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {errorMessage}
        </div>
      )}
    </form>
  );
}
