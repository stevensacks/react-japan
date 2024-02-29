import type {Locale} from 'date-fns';
import {format} from 'date-fns';
import {ja} from 'date-fns/locale';

const LOCALE_FORMATS: Record<string, Locale> = {
    ja,
};

export const formatAbbreviatedMonthDayYear = (date: Date, language: string) =>
    language === 'en' ?
        format(date, 'PPP')
    :   format(date, 'PPP', {
            locale: LOCALE_FORMATS[language],
        });
