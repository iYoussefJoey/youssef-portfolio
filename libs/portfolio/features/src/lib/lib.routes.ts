import { Route } from '@angular/router';
import { Intro } from './intro/intro';
import { Experience } from './experience/experience';
import { Resume } from './resume/resume';

/**
 * Lazy-loaded portfolio feature routes (mounted under app `path: ''`).
 * Keep page components here; the app shell only hosts header + router-outlet.
 *
 * Projects were merged into Experience; `/projects` redirects for old links.
 */
export const featuresRoutes: Route[] = [
  { path: '', component: Intro },
  { path: 'experience', component: Experience },
  { path: 'projects', redirectTo: 'experience', pathMatch: 'full' },
  { path: 'resume', component: Resume },
];
