import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

/**
 * The one Motion switch. On by default, off when the OS asks for reduced motion.
 * The root gets motion-on / motion-off; with motion off the CSS stops every animation and transition.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly win = inject(DOCUMENT).defaultView;

  /** The OS asks for reduced motion. Read once at start-up. */
  readonly reducedByOs = this.browser && !!this.win?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  readonly on = signal(!this.reducedByOs);

  toggle(): void {
    this.on.update((v) => !v);
  }
}
