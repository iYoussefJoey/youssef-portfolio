import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { KIND_LABELS, PROJECTS, Page, PagesProject, Picture, Project } from '../../data';
import { LightboxComponent } from '../../shared/lightbox/lightbox.component';
import { LightboxImage, LightboxService } from '../../shared/lightbox/lightbox.service';
import { PressFeedbackDirective } from '../../shared/press-feedback.directive';
import { RevealDirective } from '../../shared/reveal.directive';

type Filter = 'all' | 'ux' | 'fe';

interface Card {
  project: Project;
  /** Featured cards take a full row, only under "All". */
  feat: boolean;
  /** An odd card left over at the end takes a full row too. */
  wide: boolean;
}

const matches = (p: Project, f: Filter) => f === 'all' || p.kind === f || p.kind === 'both';

/** 03 · Selected work: filters, page cards with tabs and a LIVE link, picture cards, NDA code cards, lightbox. */
@Component({
  selector: 'app-work',
  imports: [NgOptimizedImage, RevealDirective, PressFeedbackDirective, LightboxComponent],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkComponent {
  private readonly lightbox = inject(LightboxService);
  protected readonly kindLabels = KIND_LABELS;

  protected readonly filters: readonly { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: PROJECTS.length },
    { id: 'ux', label: 'UI/UX', count: PROJECTS.filter((p) => matches(p, 'ux')).length },
    { id: 'fe', label: 'Front-end', count: PROJECTS.filter((p) => matches(p, 'fe')).length },
  ];

  protected readonly filter = signal<Filter>('all');
  /** Selected page tab per page card (key → page label). */
  private readonly selectedPage = signal<Record<string, string>>({});

  /** Filtering keeps the order. */
  protected readonly cards = computed<Card[]>(() => {
    const f = this.filter();
    const cards = PROJECTS.filter((p) => matches(p, f)).map((project) => ({
      project,
      feat: f === 'all' && !!project.feat,
      wide: false,
    }));
    const plain = cards.filter((c) => !c.feat);
    if (plain.length % 2 === 1) plain[plain.length - 1].wide = true;
    return cards;
  });

  protected page(p: PagesProject): Page {
    const label = this.selectedPage()[p.key];
    return p.pages.find((pg) => pg.label === label) ?? p.pages[0];
  }

  protected pickPage(p: PagesProject, label: string): void {
    this.selectedPage.update((sel) => ({ ...sel, [p.key]: label }));
  }

  protected liveLabel(url: string): string {
    return url.replace('https://', '');
  }

  protected zoom(picture: Picture, alt: string, kind: LightboxImage['kind'], event: Event): void {
    this.lightbox.open({ ...picture, alt, kind }, event.currentTarget);
  }
}
