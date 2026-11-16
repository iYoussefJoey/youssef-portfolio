import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import type { Page, PagesProject, Picture, Project } from '../../data/models';
import { KIND_LABELS, PROJECTS } from '../../data/projects';
import { LightboxComponent } from '../../shared/lightbox/lightbox.component';
import { LightboxImage, LightboxService } from '../../shared/lightbox/lightbox.service';
import { PressFeedbackDirective } from '../../shared/press-feedback.directive';
import { RevealDirective } from '../../shared/reveal.directive';

type Filter = 'all' | 'ux' | 'fe';
type ShotView = 'desktop' | 'phone' | 'before';

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
    { id: 'all', label: $localize`:@@work.filter.all:All`, count: PROJECTS.length },
    { id: 'ux', label: 'UI/UX', count: PROJECTS.filter((p) => matches(p, 'ux')).length },
    { id: 'fe', label: $localize`:@@kind.fe:Front-end`, count: PROJECTS.filter((p) => matches(p, 'fe')).length },
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

  /** Pages showing their "before" version (key:pageId). Switching page goes back to "after". */
  private readonly showBefore = signal<ReadonlySet<string>>(new Set());

  protected page(p: PagesProject): Page {
    const id = this.selectedPage()[p.key];
    return p.pages.find((pg) => pg.id === id) ?? p.pages[0];
  }

  protected pickPage(p: PagesProject, id: string): void {
    this.selectedPage.update((sel) => ({ ...sel, [p.key]: id }));
  }

  protected isBefore(p: PagesProject, page: Page): boolean {
    return !!page.before && this.showBefore().has(`${p.key}:${page.id}`);
  }

  protected setBefore(p: PagesProject, page: Page, before: boolean): void {
    const key = `${p.key}:${page.id}`;
    this.showBefore.update((set) => {
      const next = new Set(set);
      if (before) next.add(key);
      else next.delete(key);
      return next;
    });
  }

  protected liveLabel(url: string): string {
    return url.replace('https://', '');
  }

  protected zoom(picture: Picture, alt: string, kind: LightboxImage['kind'], event: Event): void {
    this.lightbox.open({ ...picture, alt, kind }, event.currentTarget);
  }

  /** Opens a page screenshot full size. The "before" full page is a tall narrow shot, so it opens at phone width. */
  protected zoomPage(page: Page, view: ShotView, event: Event): void {
    if (view === 'before' && page.before) this.zoom(page.before, this.zoomCaption(page, view), 'phone', event);
    else if (view === 'phone' && page.phone) this.zoom(page.phone, this.zoomCaption(page, view), 'phone', event);
    else this.zoom(page.desktop, this.zoomCaption(page, view), 'wide', event);
  }

  /** Alt text of the screenshot in the card. */
  protected shotAlt(page: Page, view: ShotView): string {
    const page_ = page.label;
    if (view === 'before') return $localize`:@@shot.alt.before:${page_}:page: page before the redesign`;
    return view === 'phone'
      ? $localize`:@@shot.alt.phone:${page_}:page: page, phone`
      : $localize`:@@shot.alt.desktop:${page_}:page: page, desktop`;
  }

  /** Label of the picture button that opens the lightbox. */
  protected openLabel(page: Page, view: ShotView): string {
    const page_ = page.label;
    if (view === 'before') return $localize`:@@shot.open.before:Open the ${page_}:page: page before the redesign full size`;
    return view === 'phone'
      ? $localize`:@@shot.open.phone:Open the ${page_}:page: phone page full size`
      : $localize`:@@shot.open.desktop:Open the ${page_}:page: page full size`;
  }

  /** Lightbox caption. */
  private zoomCaption(page: Page, view: ShotView): string {
    const page_ = page.label;
    if (view === 'before') return $localize`:@@shot.cap.before:${page_}:page: page before the redesign, full page`;
    return view === 'phone'
      ? $localize`:@@shot.cap.phone:${page_}:page: page on a phone`
      : $localize`:@@shot.cap.desktop:${page_}:page: page on desktop`;
  }

  protected baLabel(page: Page): string {
    const page_ = page.label;
    return $localize`:@@work.ba.aria:${page_}:page: page before and after the redesign`;
  }

  /** Label of a picture card button. */
  protected pictureLabel(type: Project['type']): string {
    return type === 'gap'
      ? $localize`:@@work.open.gap:Open the GapMap picture full size`
      : $localize`:@@work.open.picture:Open the picture full size`;
  }
}
