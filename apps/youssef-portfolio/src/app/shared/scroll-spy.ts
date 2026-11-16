import { DOCUMENT } from '@angular/common';
import { Directive, Injectable, afterNextRender, computed, inject, input, signal } from '@angular/core';

/** Watches every section[id] and remembers which one is in the middle of the screen. */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly doc = inject(DOCUMENT);
  private started = false;

  /** id of the section in view. */
  readonly current = signal<string | null>(null);
  /** The visitor has reached Contact at least once. */
  readonly contactReached = signal(false);

  start(): void {
    const win = this.doc.defaultView;
    if (this.started || !win || !('IntersectionObserver' in win)) return;
    this.started = true;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          this.current.set(e.target.id);
          if (e.target.id === 'contact') this.contactReached.set(true);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    this.doc.querySelectorAll('section[id]').forEach((s) => io.observe(s));
  }
}

/**
 * Put on a nav link (href="#id"): it gets data-on and aria-current="location" while its section is in view.
 * Only the link's own bindings change on scroll; the page is never re-rendered.
 */
@Directive({
  selector: 'a[appScrollSpy]',
  host: {
    '[attr.data-on]': 'on() ? "" : null',
    '[attr.aria-current]': 'on() ? "location" : null',
  },
})
export class ScrollSpyDirective {
  private readonly spy = inject(ScrollSpyService);

  /** The section id this link points to. */
  readonly appScrollSpy = input.required<string>();
  protected readonly on = computed(() => this.spy.current() === this.appScrollSpy());

  constructor() {
    afterNextRender(() => this.spy.start());
  }
}
