import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { INSPECT_PARTS, InspectPart, InspectPartId } from '../../data';
import { RevealDirective } from '../../shared/reveal.directive';

/**
 * "Tap a part to see its code": a sample project card and its Angular usage.
 * Tablet/desktop: design left, code right, either side selects. Phones: the selected part wipes into its line of code in place.
 * The spec values differ per theme; both are rendered and the CSS shows the current one.
 */
@Component({
  selector: 'app-inspect-card',
  imports: [RevealDirective],
  templateUrl: './inspect-card.component.html',
  styleUrl: './inspect-card.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectCardComponent {
  protected readonly parts = INSPECT_PARTS;
  protected readonly selected = signal<InspectPartId>('title');
  protected readonly part = computed<InspectPart>(() => this.parts.find((p) => p.id === this.selected()) ?? this.parts[0]);

  protected pick(id: InspectPartId): void {
    this.selected.set(id);
  }
}
