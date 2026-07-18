import { Component } from '@angular/core';
import { PROFILE } from '@youssef-portfolio/portfolio-data';
import { MatChipsModule } from '@angular/material/chips';

/**
 * Experience page (`/experience`) — GAMP role summary and key contributions.
 * Project deep-dives live on the Projects page; this page stays job-focused
 * but still lists product work from PROFILE when shown in the template.
 */
@Component({
  selector: 'yk-experience',
  imports: [MatChipsModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  /** Product projects shipped at GAMP (shared PROFILE source). */
  readonly projects = PROFILE.projects;

  /** Current role block (company, period, highlights). */
  readonly job = PROFILE.experience;
}
