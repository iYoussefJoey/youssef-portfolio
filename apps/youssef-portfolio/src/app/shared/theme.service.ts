import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Theme } from '../data';

const STORAGE_KEY = 'jf-theme';

/**
 * Light / dark theme.
 * First visit follows the OS (prefers-color-scheme) and keeps following it until the visitor
 * presses the theme button; that choice is saved in localStorage['jf-theme'].
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly win = inject(DOCUMENT).defaultView;

  /** The visitor's own pick, if they have made one. */
  private readonly chosen = signal<Theme | null>(this.readStored());
  private readonly system = signal<Theme>('light');

  readonly theme = computed<Theme>(() => this.chosen() ?? this.system());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    if (!this.browser || !this.win?.matchMedia) return;
    const mq = this.win.matchMedia('(prefers-color-scheme: dark)');
    this.system.set(mq.matches ? 'dark' : 'light');
    mq.addEventListener('change', (e) => this.system.set(e.matches ? 'dark' : 'light'));
  }

  toggle(): void {
    const next: Theme = this.isDark() ? 'light' : 'dark';
    try {
      this.win?.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage blocked: the choice still applies for this visit
    }
    this.chosen.set(next);
  }

  private readStored(): Theme | null {
    if (!this.browser) return null;
    try {
      const t = this.win?.localStorage.getItem(STORAGE_KEY);
      return t === 'light' || t === 'dark' ? t : null;
    } catch {
      return null;
    }
  }
}
