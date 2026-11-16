import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { HeaderComponent } from './sections/header/header.component';
import { MotionService } from './shared/motion.service';
import { RevealObserver } from './shared/reveal.directive';
import { ThemeService } from './shared/theme.service';

/**
 * The one-page portfolio. The root carries the theme, the Motion state and the reveal switch.
 * Header and hero hydrate at once; every section below the fold stays prerendered HTML and loads its code
 * when it scrolls into view (incremental hydration), which keeps the first load light.
 */
@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
  ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly theme = inject(ThemeService);
  protected readonly motion = inject(MotionService);
  protected readonly reveal = inject(RevealObserver);

  constructor() {
    afterNextRender(() => this.reveal.start());
  }
}
