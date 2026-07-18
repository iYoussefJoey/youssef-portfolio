import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { PROFILE } from '@youssef-portfolio/portfolio-data';
import { ScrollSpyService } from '@youssef-portfolio/portfolio-ui';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import {
  tablerBrandGithub,
  tablerBrandLinkedin,
  tablerMail,
} from '@ng-icons/tabler-icons';

/**
 * Intro page (`/`) — Brittany-style sticky left rail + scrolling sections.
 * Hosts About, Technologies, Skills, and Education; socials live in the rail.
 * Uses ScrollSpyService to highlight the active section while scrolling.
 */
@Component({
  selector: 'yk-intro',
  imports: [NgIcon, MatTooltipModule, MatChipsModule],
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
  providers: [
    provideIcons({ tablerBrandGithub, tablerBrandLinkedin, tablerMail }),
  ],
})
export class Intro implements AfterViewInit, OnDestroy {
  readonly scrollSpy: ScrollSpyService = inject(ScrollSpyService);
  readonly profile = PROFILE;

  /** Section ids in page order — must match id="..." in the template. */
  readonly sections: ReadonlyArray<{ id: string; label: string }> = [
    { id: 'about', label: 'About' },
    { id: 'technologies', label: 'Technologies' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
  ];

  /** Brittany-style rail socials (bottom of aside). Contact lives here, not a section. */
  readonly socials: ReadonlyArray<{
    id: 'github' | 'linkedin' | 'email';
    label: string;
    href: string;
    icon: string;
  }> = [
    {
      id: 'github',
      label: 'GitHub',
      href: PROFILE.links.github,
      icon: 'tablerBrandGithub',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: PROFILE.links.linkedin,
      icon: 'tablerBrandLinkedin',
    },
    {
      id: 'email',
      label: 'Email',
      href: PROFILE.links.emailCompose,
      icon: 'tablerMail',
    },
  ];

  ngAfterViewInit(): void {
    this.scrollSpy.observe(this.sections.map((s) => s.id));
  }

  onNavClick(sectionId: string, event: Event): void {
    event.preventDefault();
    this.scrollSpy.scrollTo(sectionId);
  }

  ngOnDestroy(): void {
    this.scrollSpy.disconnect();
  }
}
