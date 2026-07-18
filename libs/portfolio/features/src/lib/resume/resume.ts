import { Component } from '@angular/core';
import { PROFILE } from '@youssef-portfolio/portfolio-data';
import { MatChipsModule } from '@angular/material/chips';

/**
 * Resume page (`/resume`) — web CV layout for recruiters.
 * Summary, experience, education, and skill chips from PROFILE.
 * Phone is intentionally omitted on the public site (kept on PDF if needed).
 */
@Component({
  selector: 'yk-resume',
  imports: [MatChipsModule],
  templateUrl: './resume.html',
  styleUrl: './resume.scss',
})
export class Resume {
  readonly profile = PROFILE;
  readonly job = PROFILE.experience;
  readonly education = PROFILE.education;
}
