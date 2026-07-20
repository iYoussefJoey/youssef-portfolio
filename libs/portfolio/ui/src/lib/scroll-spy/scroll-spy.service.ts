import { Injectable, signal } from '@angular/core';

/**
 * Tracks which Intro section is active in the left rail.
 *
 * Uses scroll position relative to the sticky header (not “near page bottom”),
 * so short sections like Skills still get a turn. Clicks pin briefly so smooth
 * scroll doesn’t flash the wrong link mid-animation.
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private sectionIds: string[] = [];

  /** Click target — while set, we don’t auto-update from scroll. */
  private pinnedId: string | null = null;
  private pinTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly onWindowScroll = (): void => this.syncFromScroll();
  private readonly onScrollEnd = (): void => this.unpin();

  readonly activeSectionId = signal<string | null>(null);

  /** Call from Intro `ngAfterViewInit` with section ids in page order. */
  observe(sectionIds: string[]): void {
    this.disconnect();
    this.sectionIds = [...sectionIds];
    this.activeSectionId.set(sectionIds[0] ?? null);
    window.addEventListener('scroll', this.onWindowScroll, { passive: true });
    this.syncFromScroll();
  }

  disconnect(): void {
    window.removeEventListener('scroll', this.onWindowScroll);
    window.removeEventListener('scrollend', this.onScrollEnd);
    this.clearPinTimer();
    this.pinnedId = null;
    this.sectionIds = [];
  }

  isActive(sectionId: string): boolean {
    return this.activeSectionId() === sectionId;
  }

  /** Rail click — highlight immediately, then smooth-scroll. */
  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (!el) {
      return;
    }

    this.pinnedId = sectionId;
    this.activeSectionId.set(sectionId);
    this.clearPinTimer();

    window.addEventListener('scrollend', this.onScrollEnd, { once: true });
    // Fallback if `scrollend` isn’t supported
    this.pinTimer = setTimeout(() => this.unpin(), 700);

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private unpin(): void {
    window.removeEventListener('scrollend', this.onScrollEnd);
    this.clearPinTimer();

    const wasPinned = this.pinnedId;
    this.pinnedId = null;

    // Keep the clicked section if it’s still on screen (short pages / last sections)
    if (wasPinned && this.isSectionInView(wasPinned)) {
      this.activeSectionId.set(wasPinned);
      return;
    }

    this.syncFromScroll();
  }

  private clearPinTimer(): void {
    if (this.pinTimer !== null) {
      clearTimeout(this.pinTimer);
      this.pinTimer = null;
    }
  }

  private syncFromScroll(): void {
    if (this.sectionIds.length === 0) {
      return;
    }

    if (this.pinnedId) {
      this.activeSectionId.set(this.pinnedId);
      return;
    }

    this.activeSectionId.set(this.sectionUnderHeader());
  }

  /**
   * Last section whose top has passed just under the sticky header.
   * Education (last) often never reaches that line — not enough page below it —
   * so when we’re at the document bottom (and Education is on screen), force it.
   */
  private sectionUnderHeader(): string {
    const markerY = 96;
    let active = this.sectionIds[0] ?? '';

    for (const id of this.sectionIds) {
      const el = document.getElementById(id);
      if (!el) {
        continue;
      }

      if (el.getBoundingClientRect().top <= markerY) {
        active = id;
      }
    }

    const lastId = this.sectionIds[this.sectionIds.length - 1];
    if (lastId && this.shouldActivateLastSection(lastId)) {
      return lastId;
    }

    return active;
  }

  /**
   * Last section only — activate when the user has scrolled as far as possible
   * (Education can’t physically reach the header marker on a short final block).
   */
  private shouldActivateLastSection(lastId: string): boolean {
    const el = document.getElementById(lastId);
    if (!el) {
      return false;
    }

    const lastTop = el.getBoundingClientRect().top;
    const scrolledToEnd =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 64;

    // Must be at the end of the page AND Education must be in the viewport
    return scrolledToEnd && lastTop < window.innerHeight;
  }

  /** True if any part of the section sits in the main reading area. */
  private isSectionInView(sectionId: string): boolean {
    const el = document.getElementById(sectionId);
    if (!el) {
      return false;
    }

    const rect = el.getBoundingClientRect();
    const header = 64;
    return rect.bottom > header && rect.top < window.innerHeight * 0.85;
  }
}
