import { Component, inject, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  tablerBrandGithub,
  tablerBrandLinkedin,
  tablerMail,
} from '@ng-icons/tabler-icons';
import { ScrollSpyService } from '../scroll-spy/scroll-spy.service';
import {
  IntroAsideSection,
  IntroAsideSocial,
} from './intro-aside.model';

/**
 * Intro sticky left rail (Brittany-style) — section scroll-spy nav + socials.
 * Presentational shell: parent (Intro) owns PROFILE data and observe/disconnect.
 * Active link state comes from ScrollSpyService; nav clicks emit `sectionClick`.
 */
@Component({
  selector: 'yk-intro-aside',
  imports: [NgIcon, MatTooltipModule],
  templateUrl: './intro-aside.html',
  styleUrl: './intro-aside.scss',
  providers: [
    provideIcons({ tablerBrandGithub, tablerBrandLinkedin, tablerMail }),
  ],
  host: {
    class: 'intro-aside',
  },
})
export class IntroAside {
  readonly scrollSpy = inject(ScrollSpyService);

  /** Section links (order matches Intro content ids). */
  readonly sections = input.required<ReadonlyArray<IntroAsideSection>>();

  /** GitHub / LinkedIn / Email row at the bottom of the rail. */
  readonly socials = input.required<ReadonlyArray<IntroAsideSocial>>();

  /** Emitted when the user clicks a section link (parent should scrollTo). */
  readonly sectionClick = output<string>();

  onNavClick(sectionId: string, event: Event): void {
    event.preventDefault();
    this.sectionClick.emit(sectionId);
  }
}
