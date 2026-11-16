import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Sections below the fold hydrate when they scroll into view (@defer (hydrate on viewport) in app.html).
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
  ],
};
