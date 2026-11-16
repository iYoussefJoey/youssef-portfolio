import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { LightboxService } from './lightbox.service';

/**
 * Full-size picture in a native modal <dialog>, fixed to the viewport.
 * Closes on ✕, Esc or a click on the backdrop. Focus moves to ✕, then back to the picture.
 */
@Component({
  selector: 'app-lightbox',
  imports: [NgOptimizedImage],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightboxComponent {
  protected readonly lightbox = inject(LightboxService);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly closeBtn = viewChild.required<ElementRef<HTMLButtonElement>>('closeBtn');

  constructor() {
    effect(() => {
      const dlg = this.dialog().nativeElement;
      if (this.lightbox.image()) {
        if (!dlg.open) dlg.showModal();
        this.closeBtn().nativeElement.focus();
      } else if (dlg.open) {
        dlg.close();
        this.lightbox.restoreFocus();
      }
    });
  }

  /** Only a click on the dark backdrop itself closes it, not a click inside the panel. */
  protected backdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.lightbox.close();
  }

  /** Esc: close through the service so focus returns to the picture. */
  protected cancel(event: Event): void {
    event.preventDefault();
    this.lightbox.close();
  }
}
