import {z} from 'zod';

const schema = z.object({
    NODE_ENV: z.string(),
    SESSION_SECRET: z.string(),
    SUPPORTED_LOCALES: z.string(),
});

const clientSchema = schema.omit({SESSION_SECRET: true});

export const env = schema.parse(process.env);

export const envClient = clientSchema.parse(process.env);

type Environment = z.infer<typeof clientSchema>;

declare global {
    interface Window {
        process: {
            env: Environment;
        };
    }
}
