import { Component, computed, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../theme/theme.service';
import { THEME_PREFERENCE } from '../../theme/theme.model';

/** How long the arrow slides left before navigating home */
const BACK_EXIT_MS = 280;

/**
 * App shell header — sticky toolbar with brand animation, primary nav,
 * animated Back (sub-pages only), and light/dark/system theme menu.
 * Nav sits beside the brand (Josh Comeau–style); theme control stays far right.
 */
@Component({
  selector: 'yk-header-component',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  readonly systemTheme = inject(ThemeService);
  private readonly router = inject(Router);

  /** Primary tabs — Josh-style, beside the brand */
  readonly navLinks: ReadonlyArray<{ path: string; label: string }> = [
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/resume', label: 'Resume' },
  ];

  readonly themeMenuItems = [
    { preference: THEME_PREFERENCE.Light, icon: 'light_mode', label: 'Light' },
    { preference: THEME_PREFERENCE.Dark, icon: 'dark_mode', label: 'Dark' },
    {
      preference: THEME_PREFERENCE.System,
      icon: 'keyboard_command_key',
      label: 'System',
    },
  ];

  /** True while the back-arrow exit animation is playing */
  readonly isBacking = signal(false);

  /** Current URL — updates on every successful navigation */
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  /** Show Back only on sub-pages (not Intro `/`) */
  readonly showBack = computed(() => {
    const url = this.currentUrl().split('?')[0] ?? '/';
    return url !== '/' && url !== '';
  });

  /**
   * Play “arrow slides left”, then navigate to Intro.
   * preventDefault so we don’t jump before the motion finishes.
   */
  onBackClick(event: Event): void {
    event.preventDefault();

    if (this.isBacking()) {
      return;
    }

    this.isBacking.set(true);

    window.setTimeout(() => {
      void this.router.navigateByUrl('/').finally(() => {
        this.isBacking.set(false);
      });
    }, BACK_EXIT_MS);
  }
}
