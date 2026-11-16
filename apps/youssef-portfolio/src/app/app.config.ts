import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withI18nSupport,
  withIncrementalHydration,
} from '@angular/platform-browser';
import { StaleBuildErrorHandler } from './shared/stale-build';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // A page opened before a deploy whose section code is gone reloads once instead of leaving dead buttons.
    { provide: ErrorHandler, useClass: StaleBuildErrorHandler },
    // Sections below the fold hydrate when they scroll into view (@defer (hydrate on viewport) in app.html).
    // withI18nSupport: without it, every component holding translated text skips hydration and never wakes up.
    provideClientHydration(withEventReplay(), withIncrementalHydration(), withI18nSupport()),
  ],
};
