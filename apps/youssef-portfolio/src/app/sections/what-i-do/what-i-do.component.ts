import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { COMMITS, SIDES, STATS } from '../../data/what-i-do';
import { RevealDirective } from '../../shared/reveal.directive';
import { InspectCardComponent } from './inspect-card.component';

/** 02 · What I do: six numbers, the two sides, the inspect card and "How I work" as a commit history. */
@Component({
  selector: 'app-what-i-do',
  imports: [RevealDirective, InspectCardComponent],
  templateUrl: './what-i-do.component.html',
  styleUrl: './what-i-do.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatIDoComponent {
  protected readonly stats = STATS;
  protected readonly sides = SIDES;
  protected readonly commits = COMMITS;
}
