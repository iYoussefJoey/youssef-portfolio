import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PROFILE } from '@youssef-portfolio/portfolio-data';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Resume page (`/resume`) — web CV layout for recruiters.
 * Summary, experience, education, skill chips from PROFILE + PDF download.
 */
@Component({
  selector: 'yk-resume',
  imports: [MatChipsModule, MatButtonModule, MatIconModule],
  templateUrl: './resume.html',
  styleUrl: './resume.scss',
})
export class Resume {
  private readonly document = inject(DOCUMENT);

  readonly profile = PROFILE;
  readonly job = PROFILE.experience;
  readonly education = PROFILE.education;

  readonly resumePdfUrl = new URL(
    PROFILE.links.resumePdf,
    this.document.baseURI,
  ).href;

  readonly resumePdfDownloadName = PROFILE.links.resumePdf;

  /** Icon motion: idle → shake → drop → download → idle */
  readonly iconPhase = signal<'idle' | 'shake' | 'drop'>('idle');

  private busy = false;

  /**
   * Shake the icon, drop it, then save the PDF (blob download).
   */
  async onDownloadResume(event: Event): Promise<void> {
    event.preventDefault();
    if (this.busy) {
      return;
    }

    this.busy = true;
    try {
      this.iconPhase.set('shake');
      await this.wait(420);

      this.iconPhase.set('drop');
      await this.wait(350);

      await this.savePdf();
    } finally {
      this.iconPhase.set('idle');
      this.busy = false;
    }
  }

  private async savePdf(): Promise<void> {
    try {
      const response = await fetch(this.resumePdfUrl);
      if (!response.ok) {
        throw new Error(`PDF missing (${response.status})`);
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = this.document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = this.resumePdfDownloadName;
      this.document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      this.document.defaultView?.open(this.resumePdfUrl, '_blank');
    }
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
