import { Component } from '@angular/core';
import { PROFILE } from '@youssef-portfolio/portfolio-data';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

/**
 * Experience page (`/experience`) — GAMP role summary plus the product work.
 * Projects were merged in here (nav is Home / Experience / Resume). Each project
 * reads overview (what + problem), role, achievements, and a live link from PROFILE.
 */
@Component({
  selector: 'yk-experience',
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  /** Product projects shipped at GAMP (shared PROFILE source). */
  readonly projects = PROFILE.projects;

  /** Current role block (company, period, summary). */
  readonly job = PROFILE.experience;
}
