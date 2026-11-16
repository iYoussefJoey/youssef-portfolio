import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Lang, currentLang } from './locale';

const SITE = 'https://iyoussefjoey.github.io/youssef-portfolio/';
const ARABIC_FONT = 'fonts/readex-pro-arabic.woff2';

/**
 * Per-language document head: lang/dir on <html>, title, description, canonical and share tags.
 * It runs while the page is prerendered, so each language's HTML ships with the right head.
 * index.html holds the English defaults and the hreflang links shared by both pages.
 */
@Injectable({ providedIn: 'root' })
export class PageHead {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  apply(): void {
    const lang: Lang = currentLang();
    const html = this.doc.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    if (lang === 'en') return;

    const url = `${SITE}${lang}/`;
    const title = $localize`:@@seo.title:Youssef Khamis — UI/UX Designer & Front-End Developer`;
    const description = $localize`:@@seo.description:UI/UX designer and Angular & Next.js developer in Egypt. Mobile-first bilingual pages, design systems and WCAG 2.2 work. Open to remote roles.`;
    const shareDescription = $localize`:@@seo.share:Mobile-first, bilingual pages, two design systems and Angular apps. Open to remote roles.`;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: shareDescription });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: 'ar_EG' });
    this.meta.updateTag({ property: 'og:locale:alternate', content: 'en_US' });
    this.doc.head.querySelector('link[rel="canonical"]')?.setAttribute('href', url);

    // the Arabic font is only needed here: preload it so it is ready before the first layout
    const preload = this.doc.createElement('link');
    preload.setAttribute('rel', 'preload');
    preload.setAttribute('href', ARABIC_FONT);
    preload.setAttribute('as', 'font');
    preload.setAttribute('type', 'font/woff2');
    preload.setAttribute('crossorigin', '');
    this.doc.head.appendChild(preload);
  }
}
