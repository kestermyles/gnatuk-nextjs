import { z } from 'zod';

export const enquiryTypes = ['method-proposal', 'machine-hire', 'guidance'] as const;
export const serviceOptions = [
  'Robotic Demolition',
  'Hydrodemolition',
  'Diamond Drilling',
  'Cold Cutting',
  'Machine Hire',
  'Not sure',
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
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
