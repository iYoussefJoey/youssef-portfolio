import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { DesignSystemComponent } from './sections/design-system/design-system.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { HeaderComponent } from './sections/header/header.component';
import { HeroComponent } from './sections/hero/hero.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { WhatIDoComponent } from './sections/what-i-do/what-i-do.component';
import { WorkComponent } from './sections/work/work.component';
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
    HeroComponent,
    WhatIDoComponent,
    WorkComponent,
    ExperienceComponent,
    SkillsComponent,
    DesignSystemComponent,
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
