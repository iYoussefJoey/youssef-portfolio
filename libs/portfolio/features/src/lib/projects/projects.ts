import { Component } from '@angular/core';
import { PROFILE } from '@youssef-portfolio/portfolio-data';
import { MatChipsModule } from '@angular/material/chips';

/**
 * Projects page (`/projects`) — product case studies (Safesys, Emitum, Pogotowie).
 * Reads stack, summary, and bullets from PROFILE.projects.
 */
@Component({
  selector: 'yk-projects',
  imports: [MatChipsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  readonly projects = PROFILE.projects;
}
