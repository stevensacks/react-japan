import {z} from 'zod';

const schema = z.object({
  NODE_ENV: z.string(),
  SESSION_SECRET: z.string(),
  STRAPI_API_TOKEN: z.string(),
  STRAPI_BASE_URL: z.string(),
});

const clientSchema = schema.omit({
  SESSION_SECRET: true,
  STRAPI_API_TOKEN: true,
  STRAPI_BASE_URL: true,
});

export const env = schema.parse(process.env);

export const envClient = clientSchema.parse(process.env);

type Environment = z.infer<typeof clientSchema>;

declare global {
  interface Window {
    __APOLLO_STATE__: any;
    process: {
      env: Environment;
    };
  }
}
