import { ChangeDetectionStrategy, Component, DestroyRef, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { LINKS, WANT_LABELS, Want } from '../../data';
import { ICON_PATHS } from '../../shared/icons';
import { PressFeedbackDirective } from '../../shared/press-feedback.directive';
import { RevealDirective } from '../../shared/reveal.directive';

/** How long the email button shows its loading state before the new label slides up. */
const SWAP_MS = 800;

/**
 * 07 · Contact. "I need" UI/UX · Front-end · Both: the heading lights up the matching word,
 * the email subject follows the choice at once, and the button label swaps after a short loading state.
 */
@Component({
  selector: 'app-contact',
  imports: [RevealDirective, PressFeedbackDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected readonly links = LINKS;
  protected readonly icons = ICON_PATHS;
  protected readonly choices: readonly { id: Want; label: string }[] = [
    { id: 'ux', label: 'UI/UX' },
    { id: 'fe', label: 'Front-end' },
    { id: 'both', label: 'Both' },
  ];

  protected readonly want = signal<Want>('both');
  /** The choice the button label shows (it catches up after the loading state). */
  private readonly shown = signal<Want>('both');
  protected readonly busy = signal(false);
  /** Counts label swaps; alternating classes restart the slide-up animation each time. */
  private readonly swaps = signal(0);

  protected readonly label = computed(() => WANT_LABELS[this.shown()]);
  protected readonly mailto = computed(
    () => `mailto:${LINKS.email}?subject=${encodeURIComponent('Portfolio: ' + WANT_LABELS[this.want()])}`,
  );
  protected readonly swapCls = computed(() => {
    const n = this.swaps();
    return n === 0 ? '' : n % 2 ? 'swap-a' : 'swap-b';
  });

  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected choose(w: Want): void {
    if (w === this.want()) return;
    clearTimeout(this.timer);
    this.want.set(w);
    this.busy.set(true);
    this.timer = setTimeout(() => {
      this.shown.set(w);
      this.busy.set(false);
      this.swaps.update((n) => n + 1);
    }, SWAP_MS);
  }
}
