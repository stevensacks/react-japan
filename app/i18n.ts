import type {FormatFunction} from 'i18next';
import resources, {LANGUAGES} from '~/languages';

const formatFn: FormatFunction = (value: any, format?: string) =>
    format === 'number' ? Number(value).toLocaleString() : value;

export default {
    defaultNS: 'common',
    fallbackLng: 'en',
    fallbackNS: ['common'],
    interpolation: {
        escapeValue: false,
        format: formatFn,
    },
    lowerCaseLng: true,
    react: {useSuspense: false},
    resources,
    returnNull: false,
    supportedLngs: LANGUAGES,
};
