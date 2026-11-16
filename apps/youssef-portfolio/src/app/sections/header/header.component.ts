import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { OTHER_LANG, currentLang } from '../../shared/locale';
import { LogoMarkComponent } from '../../shared/logo-mark.component';
import { MotionService } from '../../shared/motion.service';
import { PressFeedbackDirective } from '../../shared/press-feedback.directive';
import { ScrollSpyDirective, ScrollSpyService } from '../../shared/scroll-spy';
import { ThemeService } from '../../shared/theme.service';

/** Sticky header: logo + Motion switch, nav with scroll-spy, Hire me, language, theme, and the phone menu. */
@Component({
  selector: 'app-header',
  imports: [LogoMarkComponent, ScrollSpyDirective, PressFeedbackDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly motion = inject(MotionService);
  private readonly spy = inject(ScrollSpyService);

  /** The same page in the other language. */
  protected readonly other = OTHER_LANG[currentLang()];
  /** ...opened at the section in view (both pages share the section ids), so switching language keeps the visitor's place. */
  protected readonly otherHref = computed(() => {
    const id = this.spy.current();
    return id && id !== 'top' ? `${this.other.href}#${id}` : this.other.href;
  });

  protected readonly links = [
    { id: 'work', label: $localize`:@@nav.work:Work` },
    { id: 'experience', label: $localize`:@@nav.experience:Experience` },
    { id: 'skills', label: $localize`:@@nav.skills:Skills` },
    { id: 'contact', label: $localize`:@@nav.contact:Contact` },
  ] as const;

  protected readonly menuOpen = signal(false);
  private readonly hirePressed = signal(false);

  /** Hire me stops popping for good once Contact is reached or it is pressed. */
  protected readonly hireDone = computed(() => this.hirePressed() || this.spy.contactReached());

  /** The theme button says what it will do. */
  protected readonly themeLabel = computed(() =>
    this.theme.isDark()
      ? $localize`:@@theme.toLight:Switch to light mode`
      : $localize`:@@theme.toDark:Switch to dark mode`,
  );
  protected readonly menuLabel = computed(() =>
    this.menuOpen() ? $localize`:@@menu.close:Close menu` : $localize`:@@menu.open:Open menu`,
  );

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected pressHire(): void {
    this.hirePressed.set(true);
  }
}
