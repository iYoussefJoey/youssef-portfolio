import { Route } from '@angular/router';

/**
 * App routes — thin shell.
 * Lazy-loads portfolio-features so Intro (and later pages) ship in a separate chunk.
 */
export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@youssef-portfolio/portfolio-features').then(
        (m) => m.featuresRoutes,
      ),
  },
  { path: '**', redirectTo: '' },
];
