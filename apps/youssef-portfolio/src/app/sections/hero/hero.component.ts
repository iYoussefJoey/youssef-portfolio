import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  ViewEncapsulation,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { LENS_HINTS, LINKS, Lens } from '../../data';
import { ICON_PATHS } from '../../shared/icons';
import { MotionService } from '../../shared/motion.service';
import { PressFeedbackDirective } from '../../shared/press-feedback.directive';

/** How long the UX lens shows on load before the page settles on UI. */
const UX_INTRO_MS = 1800;

/** Hero with the "View this page as" lens switch (UX wireframe / UI / Code inspector). */
@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, PressFeedbackDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  private readonly motion = inject(MotionService);
  protected readonly links = LINKS;
  protected readonly icons = ICON_PATHS;
  protected readonly uxHint = LENS_HINTS.ux;

  /**
   * With Motion on, the page opens on the UX view. The prerendered HTML is the UI view (right for crawlers and
   * no-JS visits); the boot script in index.html switches it to UX before the first paint, and the component
   * starts in that same state, so hydration changes nothing and the layout never jumps on load.
   */
  private readonly intro = isPlatformBrowser(inject(PLATFORM_ID)) && this.motion.on();

  protected readonly lens = signal<Lens>(this.intro ? 'ux' : 'ui');
  /** The lens has been set at least once (the first UI view on load does not sweep). */
  protected readonly lensSet = signal(this.intro);
  protected readonly hint = computed(() => LENS_HINTS[this.lens()]);

  private touched = false;

  constructor() {
    let timer: ReturnType<typeof setTimeout> | undefined;
    inject(DestroyRef).onDestroy(() => clearTimeout(timer));

    // UX shows for 1.8s from page load, then the page settles on UI unless the visitor already picked a lens.
    afterNextRender(() => {
      if (!this.intro) return;
      timer = setTimeout(
        () => {
          if (!this.touched && this.motion.on()) this.setLens('ui', false);
        },
        Math.max(0, UX_INTRO_MS - performance.now()),
      );
    });

    // Turning Motion off returns the page to the UI view.
    let wasOn = this.motion.on();
    effect(() => {
      const on = this.motion.on();
      if (wasOn && !on) untracked(() => this.setLens('ui', false));
      wasOn = on;
    });
  }

  protected pick(lens: Lens): void {
    this.setLens(lens, true);
  }

  private setLens(lens: Lens, byVisitor: boolean): void {
    if (byVisitor) this.touched = true;
    this.lens.set(lens);
    this.lensSet.set(true);
  }
}
