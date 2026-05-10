import { z } from 'zod';

export const enquiryTypes = ['method-proposal', 'machine-hire', 'guidance'] as const;

// Service options shown when enquiry type is method-proposal or guidance.
export const methodServiceOptions = [
  'Not sure — need advice',
  'Robotic Demolition',
  'Hydrodemolition',
  'Diamond Drilling & Sawing',
  'Abrasive Cold Cutting',
] as const;

// Service options shown when enquiry type is machine-hire (Brokk fleet).
export const machineHireOptions = [
  'Brokk 70',
  'Brokk 110',
  'Brokk 170',
  'Brokk 200',
  'Brokk 300',
  'Brokk 500',
  'Brokk 800',
  'Not sure — need advice',
] as const;

// Combined option set for server-side validation (deduped).
export const serviceOptions = [
  'Not sure — need advice',
  'Robotic Demolition',
  'Hydrodemolition',
  'Diamond Drilling & Sawing',
  'Abrasive Cold Cutting',
  'Brokk 70',
  'Brokk 110',
  'Brokk 170',
  'Brokk 200',
  'Brokk 300',
  'Brokk 500',
  'Brokk 800',
] as const;

export const contactFormSchema = z.object({
  enquiryType: z.enum(enquiryTypes, {
    errorMap: () => ({ message: 'Please select what you need' }),
  }),
  service: z.enum(serviceOptions).optional(),
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  email: z.string().trim().email('Please enter a valid email address').max(160),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal(''))
    .refine(
      (val) => !val || /^(\+44|0)[\d\s]{9,13}$/.test(val.replace(/\s+/g, ' ').trim()),
      'Please enter a valid UK phone number',
    ),
  message: z
    .string()
    .trim()
    .min(50, 'Please include a few more details (minimum 50 characters)')
    .max(5000),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please confirm consent to be contacted' }),
  }),
  // Honeypot — must remain empty
  website: z.string().max(0).optional().or(z.literal('')),
  // Cloudflare Turnstile token — only validated server-side if TURNSTILE_SECRET_KEY is set.
  turnstileToken: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
