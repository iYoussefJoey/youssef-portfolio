import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PROFILE } from '@youssef-portfolio/portfolio-data';
import {
  IntroAside,
  IntroAsideSection,
  IntroAsideSocial,
  ScrollSpyService,
} from '@youssef-portfolio/portfolio-ui';
import { MatChipsModule } from '@angular/material/chips';

/**
 * Intro page (`/`) — Brittany-style layout: sticky rail (UI) + scrolling sections.
 * Owns PROFILE content and ScrollSpy observe/disconnect; rail is `yk-intro-aside`.
 * Hero shows the avatar, "what I'm looking for", and CTAs (Resume first, then work).
 */
@Component({
  selector: 'yk-intro',
  imports: [IntroAside, MatChipsModule, RouterLink],
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
})
export class Intro implements AfterViewInit, OnDestroy {
  readonly scrollSpy: ScrollSpyService = inject(ScrollSpyService);
  private readonly doc = inject(DOCUMENT);
  readonly profile = PROFILE;

  /** Resolves the avatar against the deployed base href (works on GitHub Pages). */
  readonly photoUrl = new URL(PROFILE.photo, this.doc.baseURI).href;

  /** Falls back to initials if the photo file isn't present in public/. */
  readonly photoFailed = signal(false);

  /** Initials shown while/if the photo is missing. */
  readonly initials = PROFILE.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  /** Section ids in page order — must match id="..." in the template. */
  readonly sections: ReadonlyArray<IntroAsideSection> = [
    { id: 'about', label: 'About' },
    { id: 'technologies', label: 'Technologies' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
  ];

  /** Rail socials — Contact lives here, not as a page section. */
  readonly socials: ReadonlyArray<IntroAsideSocial> = [
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

  /** Rail nav click → smooth-scroll + set active section. */
  onSectionClick(sectionId: string): void {
    this.scrollSpy.scrollTo(sectionId);
  }

  ngOnDestroy(): void {
    this.scrollSpy.disconnect();
  }
}
