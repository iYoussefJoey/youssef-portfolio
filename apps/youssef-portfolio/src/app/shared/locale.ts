import { LOCALE_ID, inject } from '@angular/core';

export type Lang = 'en' | 'ar';

/** The language this build was compiled for (English at the root, Arabic under ar/). */
export function currentLang(): Lang {
  return inject(LOCALE_ID).startsWith('ar') ? 'ar' : 'en';
}

/**
 * The link to the same page in the other language. Paths are relative to the base href,
 * which is /youssef-portfolio/ for English and /youssef-portfolio/ar/ for Arabic.
 */
export const OTHER_LANG: Record<Lang, { href: string; lang: Lang; name: string; short: string }> = {
  en: { href: 'ar/', lang: 'ar', name: 'العربية', short: 'ع' },
  ar: { href: '../', lang: 'en', name: 'English', short: 'EN' },
};
