import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ViewEncapsulation, inject, signal } from '@angular/core';
import type { PaletteColour } from '../../data/models';
import { PALETTE } from '../../data/palette';
import { RevealDirective } from '../../shared/reveal.directive';

const COPIED_MS = 1400;

/**
 * 06 · Joey Frost UI: the palette of the current theme (tap to copy), then Type, Motion and Accessibility.
 * Both palettes are rendered; the CSS shows the current theme's six chips.
 */
@Component({
  selector: 'app-design-system',
  imports: [RevealDirective],
  templateUrl: './design-system.component.html',
  styleUrl: './design-system.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemComponent {
  private readonly clipboard = inject(DOCUMENT).defaultView?.navigator?.clipboard;

  protected readonly palettes = [
    { theme: 'light', colours: PALETTE.light },
    { theme: 'dark', colours: PALETTE.dark },
  ] as const;
  protected readonly copiedLabel = $localize`:@@sys.copied:Copied!`;
  /** Hex of the chip that shows "Copied!". */
  protected readonly copied = signal<string | null>(null);
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected copyLabel(c: PaletteColour): string {
    const name = c.name;
    const hex = c.hex;
    return $localize`:@@sys.copy:Copy ${name}:name: colour ${hex}:hex:`;
  }

  protected copy(c: PaletteColour): void {
    try {
      this.clipboard?.writeText(c.hex).catch(() => undefined);
    } catch {
      // no clipboard access: the chip still confirms
    }
    this.copied.set(c.hex);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(null), COPIED_MS);
  }
}
