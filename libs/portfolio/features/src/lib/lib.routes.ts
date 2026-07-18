import { Route } from '@angular/router';
import { Intro } from './intro/intro';
import { Experience } from './experience/experience';
import { Projects } from './projects/projects';
import { Resume } from './resume/resume';

/**
 * Lazy-loaded portfolio feature routes (mounted under app `path: ''`).
 * Keep page components here; the app shell only hosts header + router-outlet.
 */
export const featuresRoutes: Route[] = [
  { path: '', component: Intro },
  { path: 'experience', component: Experience },
  { path: 'projects', component: Projects },
  { path: 'resume', component: Resume },
];
