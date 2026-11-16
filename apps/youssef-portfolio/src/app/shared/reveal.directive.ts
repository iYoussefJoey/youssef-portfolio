import { DOCUMENT } from '@angular/common';
import { DestroyRef, Directive, ElementRef, Injectable, afterNextRender, inject, signal } from '@angular/core';

const WAITING = '.gr:not([data-in]), .io:not([data-in])';

/**
 * One IntersectionObserver for every block that grows in (.gr) and the timeline line (.io).
 * It works on the page's DOM directly, so sections that are still prerendered HTML (not hydrated yet) reveal too.
 */
@Injectable({ providedIn: 'root' })
export class RevealObserver {
  private readonly doc = inject(DOCUMENT);
  private io?: IntersectionObserver;

  /** Set once the observer runs; the root then gets .reveal-on so waiting blocks start hidden. */
  readonly ready = signal(false);

  /** Called once by the app after the first render: watch every block on the page. */
  start(): void {
    const io = this.observer();
    this.doc.querySelectorAll(WAITING).forEach((el) => (io ? io.observe(el) : el.setAttribute('data-in', '')));
    if (io) this.ready.set(true);
  }

  /** Blocks created later (e.g. cards shown again by a filter). */
  observe(el: Element): void {
    if (el.hasAttribute('data-in')) return;
    const io = this.observer();
    if (io) io.observe(el);
    else el.setAttribute('data-in', '');
  }

  unobserve(el: Element): void {
    this.io?.unobserve(el);
  }

  private observer(): IntersectionObserver | undefined {
    const win = this.doc.defaultView;
    if (this.io || !win || !('IntersectionObserver' in win)) return this.io;
    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute('data-in', '');
          this.io?.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    return this.io;
  }
}

/**
 * Grow reveal: the host (class .gr or .io) grows in the first time 12% of it is on screen, once.
 * It sets data-in directly on the element, so scrolling never runs change detection.
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  constructor() {
    const el = inject<ElementRef<Element>>(ElementRef).nativeElement;
    const reveal = inject(RevealObserver);
    afterNextRender(() => reveal.observe(el));
    inject(DestroyRef).onDestroy(() => reveal.unobserve(el));
  }
}
