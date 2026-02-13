import { z } from 'zod';

export const jobDescriptionSchema = z.object({
  title: z.string().min(2).max(100),
  company: z.string().min(2).max(100),
  location: z.string().optional(),
  requirements: z.object({
    skills: z.array(z.string()),
    experienceYears: z.number().min(0).max(50).optional()
  })
});

export function validateInput(data: any, schema: z.ZodType<any>) {
  const result = schema.safeParse(data);
  return result;
}
