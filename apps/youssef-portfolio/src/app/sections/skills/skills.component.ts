import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';
import type { SkillGroup } from '../../data/models';
import { LANGUAGES, SKILL_GROUPS, VISIBLE_TILES } from '../../data/skills';
import { RevealDirective } from '../../shared/reveal.directive';

/**
 * 05 · Skills & tools. Phones: a 3-tab tray shows one group at a time. Tablet/desktop: all three cards.
 * Each card shows 4 tiles, then "Show all N" opens the rest; only the clicked card grows.
 */
@Component({
  selector: 'app-skills',
  imports: [NgTemplateOutlet, RevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  protected readonly groups = SKILL_GROUPS;
  protected readonly languages = LANGUAGES;
  protected readonly visible = VISIBLE_TILES;

  /** The group shown on phones. */
  protected readonly tab = signal<SkillGroup['id']>('design');
  /** Groups whose extra tiles are open. */
  protected readonly open = signal<Partial<Record<SkillGroup['id'], boolean>>>({});

  protected toggle(id: SkillGroup['id']): void {
    this.open.update((o) => ({ ...o, [id]: !o[id] }));
  }
}
