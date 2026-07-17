import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { ScrollSpyService } from '@youssef-portfolio/portfolio-ui';

@Component({
  selector: 'yk-intro',
  imports: [],
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
})
export class Intro implements AfterViewInit, OnDestroy {
  readonly scrollSpy: ScrollSpyService = inject(ScrollSpyService);

  /** Section ids in page order — must match id="..." in the template. */
  readonly sections: ReadonlyArray<{ id: string; label: string }> = [
    { id: 'about', label: 'About' },
    { id: 'technologies', label: 'Technologies' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
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
