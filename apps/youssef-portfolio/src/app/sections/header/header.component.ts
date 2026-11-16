import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { LogoMarkComponent } from '../../shared/logo-mark.component';
import { MotionService } from '../../shared/motion.service';
import { PressFeedbackDirective } from '../../shared/press-feedback.directive';
import { ScrollSpyDirective, ScrollSpyService } from '../../shared/scroll-spy';
import { ThemeService } from '../../shared/theme.service';

/** Sticky header: logo + Motion switch, nav with scroll-spy, Hire me, theme, and the phone menu. */
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

  protected readonly links = [
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  protected readonly menuOpen = signal(false);
  private readonly hirePressed = signal(false);

  /** Hire me stops popping for good once Contact is reached or it is pressed. */
  protected readonly hireDone = computed(() => this.hirePressed() || this.spy.contactReached());

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
