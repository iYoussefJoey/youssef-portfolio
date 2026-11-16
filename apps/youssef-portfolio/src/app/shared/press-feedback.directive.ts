import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';

const BUSY_MS = 1200;

/**
 * Loading on press, no spinner: on click the control gets data-busy and aria-busy="true" for 1.2s.
 * The CSS then runs the sheen (2 passes) and fills a 3px line along the bottom; with Motion off only the line shows.
 * Links still navigate.
 */
@Directive({
  selector: '[appPress]',
  host: { '(click)': 'press()' },
})
export class PressFeedbackDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected press(): void {
    if (this.el.hasAttribute('data-busy')) return;
    this.el.setAttribute('data-busy', '');
    this.el.setAttribute('aria-busy', 'true');
    this.timer = setTimeout(() => {
      this.el.removeAttribute('data-busy');
      this.el.removeAttribute('aria-busy');
    }, BUSY_MS);
  }
}
