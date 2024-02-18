import en from './en';
import ja from './ja';

export type Language = 'en' | 'ja';

export const LANGUAGES: Array<Language> = ['en', 'ja'];

export default {
    en,
    ja,
} as const;
