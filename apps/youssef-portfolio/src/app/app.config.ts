import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withI18nSupport,
  withIncrementalHydration,
} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Sections below the fold hydrate when they scroll into view (@defer (hydrate on viewport) in app.html).
    // withI18nSupport: without it, every component holding translated text skips hydration and never wakes up.
    provideClientHydration(withEventReplay(), withIncrementalHydration(), withI18nSupport()),
  ],
};
