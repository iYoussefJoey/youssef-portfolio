import { Injectable, signal } from '@angular/core';

/**
 * Tracks which Intro section is in view (Brittany-style left nav highlight).
 * Uses Intersection Observer + a scroll fallback for short / bottom sections.
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  // ---VARIABLES---
  /** Observer instance; created in observe(), cleared in disconnect(). */
  private observer: IntersectionObserver | null = null;

  /** Section ids in document order (e.g. about → education). */
  private sectionIds: string[] = [];

  /** Ids currently intersecting the “active” viewport band. */
  private readonly visibleIds = new Set<string>();

  /** Bound scroll handler so we can remove the same function reference. */
  private readonly onWindowScroll = (): void => this.syncActiveSection();

  // ---STATES---
  /**
   * Id of the section that should look active in the left nav.
   * null until the first section intersects.
   */
  readonly activeSectionId = signal<string | null>(null);

  /**
   * Starts watching the given section ids.
   * Call once from Intro after the view is ready (ngAfterViewInit).
   * Replaces any previous observer.
   */
  observe(sectionIds: string[]): void {
    this.disconnect();
    this.sectionIds = [...sectionIds];
    this.visibleIds.clear();
    this.activeSectionId.set(sectionIds[0] ?? null);

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => this.onIntersect(entries),
      {
        // Band under the sticky header. Wider so short sections (Skills after
        root: null,
        rootMargin: '-10% 0px -45% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 1],
      },
    );

    for (const el of elements) {
      this.observer.observe(el);
    }

    window.addEventListener('scroll', this.onWindowScroll, { passive: true });
    this.syncActiveSection();
  }

  /**
   * Stops observing and clears state.
   * Call when leaving the Intro page so we don’t leak observers.
   */
  disconnect(): void {
    this.observer?.disconnect();
    this.observer = null;
    window.removeEventListener('scroll', this.onWindowScroll);
    this.visibleIds.clear();
    this.sectionIds = [];
  }

  /**
   * Template helper: is this nav link the active section?
   */
  isActive(sectionId: string): boolean {
    return this.activeSectionId() === sectionId;
  }

  /**
   * Smooth-scrolls to a section (left-nav click).
   * Also sets active id immediately so the highlight doesn’t wait for the observer.
   */
  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (!el) {
      return;
    }

    this.activeSectionId.set(sectionId);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Intersection Observer callback — updates the visible set, then syncs active id.
   */
  private onIntersect(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      const id = entry.target.id;
      if (!id) {
        continue;
      }

      if (entry.isIntersecting) {
        this.visibleIds.add(id);
      } else {
        this.visibleIds.delete(id);
      }
    }

    this.syncActiveSection();
  }

  /**
   * Picks the active section:
   * 1) near page bottom → last section (Education)
   * 2) else last id still in the visible band (not first — otherwise Skills
   *    is skipped while Technologies is still intersecting)
   * 3) else last section whose top has crossed the header marker
   */
  private syncActiveSection(): void {
    if (this.sectionIds.length === 0) {
      return;
    }

    if (this.isNearPageBottom()) {
      const last = this.sectionIds[this.sectionIds.length - 1];
      this.activeSectionId.set(last ?? null);
      return;
    }

    const visibleActive = [...this.sectionIds]
      .reverse()
      .find((id) => this.visibleIds.has(id));
    if (visibleActive) {
      this.activeSectionId.set(visibleActive);
      return;
    }

    this.activeSectionId.set(this.findNearestSectionId());
  }

  /** True when the user has scrolled to (or near) the bottom of the page. */
  private isNearPageBottom(): boolean {
    const scrollBottom = window.innerHeight + window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    return scrollBottom >= docHeight - 120;
  }

  /**
   * Fallback when nothing is in the IO band:
   * last section whose top has passed the marker under the header.
   */
  private findNearestSectionId(): string | null {
    const markerY = window.innerHeight * 0.25;
    let current: string | null = this.sectionIds[0] ?? null;

    for (const id of this.sectionIds) {
      const el = document.getElementById(id);
      if (!el) {
        continue;
      }

      if (el.getBoundingClientRect().top <= markerY) {
        current = id;
      }
    }

    return current;
  }
}
