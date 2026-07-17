import { Injectable, computed, effect, signal } from '@angular/core';
import { STORAGE_KEY, ThemeMode, ThemePreference } from './theme.model';

/**
 * Owns light / dark / system theming for the portfolio.
 * Applies CSS `color-scheme` so Material 3 `light-dark()` tokens resolve correctly,
 * and persists the user's preference in localStorage.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  // ---VARIABLES---
  /** Media query used to read and watch the OS color-scheme preference. */
  private readonly media = window.matchMedia('(prefers-color-scheme: dark)');

  // ---STATES---
  /** Current OS theme (`light` | `dark`), updated when the system preference changes. */
  private readonly systemMode = signal<ThemeMode>(
    this.media.matches ? 'dark' : 'light',
  );

  /**
   * User choice: fixed `light` / `dark`, or `system` to follow the OS.
   * Seeded from localStorage; defaults to `system` on first visit.
   */
  readonly preference = signal<ThemePreference>(
    (localStorage.getItem(STORAGE_KEY) as ThemePreference) ?? 'system',
  );

  // ---COMPUTEDS---
  /**
   * Effective theme painted on the page (always `light` or `dark`).
   * Resolves `system` to the live OS value via `systemMode`.
   */
  readonly theme = computed(() =>
    this.preference() === 'system' ? this.systemMode() : this.preference(),
  );

  /**
   * Wires OS change listening and keeps the DOM + storage in sync with `theme`.
   * Created so theme applies on app bootstrap without every component knowing about it.
   */
  constructor() {
    this.media.addEventListener('change', (el) =>
      this.systemMode.set(el.matches ? 'dark' : 'light'),
    );

    effect(() => {
      document.documentElement.style.colorScheme = this.theme();
      localStorage.setItem(STORAGE_KEY, this.preference());
    });
  }

  /**
   * Sets an explicit preference (`light` | `dark` | `system`).
   * Created for UI controls (e.g. three theme options) to change theme without
   * touching DOM or storage directly — the `effect` handles those side effects.
   */
  setPreference(preference: ThemePreference): void {
    this.preference.set(preference);
  }
}
