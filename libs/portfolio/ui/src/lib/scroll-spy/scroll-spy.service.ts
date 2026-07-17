import { Injectable, signal } from '@angular/core';

/**
 * Tracks which Intro section is in view (Brittany-style left nav highlight).
 * Uses Intersection Observer — no scroll event spam.
 * Intro calls observe([...ids]); nav compares activeSectionId() in the template.
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  // ---VARIABLES---
  /** Observer instance; created in observe(), cleared in disconnect(). */
  private observer: IntersectionObserver | null = null;

  /** Section ids in document order (e.g. about → contact). */
  private sectionIds: string[] = [];

  /** Ids currently intersecting the “active” viewport band. */
  private readonly visibleIds = new Set<string>();

  // ---STATES---
  /**
   * Id of the section that should look active in the left nav.
   * null until the first section intersects.
   */
  readonly activeSectionId = signal<string | null>(null);

  /**
   * Starts watching the given section ids.
   * Call once from Intro after the view is ready (e.g. afterNextRender / ngAfterViewInit).
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
        // Band under the header: section near the top counts as “active”
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    for (const el of elements) {
      this.observer.observe(el);
    }
  }

  /**
   * Stops observing and clears state.
   * Call when leaving the Intro page so we don’t leak observers.
   */
  disconnect(): void {
    this.observer?.disconnect();
    this.observer = null;
    this.visibleIds.clear();
    this.sectionIds = [];
  }

  /**
   * Template helper: is this nav link the active section?
   * Prefer this over a big computed map — one comparison per link.
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
   * Intersection Observer callback.
   * Keeps a set of visible section ids, then picks the first one
   * in registered order (top-most section in the page).
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

    const active = this.sectionIds.find((id) => this.visibleIds.has(id));
    if (active) {
      this.activeSectionId.set(active);
    }
  }
}
