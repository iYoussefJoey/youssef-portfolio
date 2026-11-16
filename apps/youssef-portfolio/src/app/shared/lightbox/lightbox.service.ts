import { Injectable, signal } from '@angular/core';
import { Picture } from '../../data';

export interface LightboxImage extends Picture {
  alt: string;
  /** Phone screenshots open at phone width. */
  kind: 'wide' | 'phone';
}

/** Which picture is open full size, and the control that opened it (focus goes back there on close). */
@Injectable({ providedIn: 'root' })
export class LightboxService {
  readonly image = signal<LightboxImage | null>(null);
  private opener: HTMLElement | null = null;

  open(image: LightboxImage, opener: EventTarget | null): void {
    this.opener = opener instanceof HTMLElement ? opener : null;
    this.image.set(image);
  }

  close(): void {
    this.image.set(null);
  }

  /** Called once the dialog has closed, when the page is interactive again. */
  restoreFocus(): void {
    this.opener?.focus();
    this.opener = null;
  }
}
