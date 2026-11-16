import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * The YK brand mark: a rounded tile split into a design half (Y, sapphire) and a code half (K, code navy).
 * Colours come from the theme tokens, so it follows light and dark mode. Decorative: the name next to it is the label.
 */
@Component({
  selector: 'app-logo-mark',
  template: `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true" focusable="false">
      <path d="M18 0H32V64H18A18 18 0 0 1 0 46V18A18 18 0 0 1 18 0Z" fill="var(--primary)" />
      <path d="M32 0H46A18 18 0 0 1 64 18V46A18 18 0 0 1 46 64H32Z" fill="var(--mark-code)" />
      <g fill="none" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8.5 19 16 31.5 23.5 19M16 31.5V46" stroke="var(--on-p)" />
        <path d="M41 19v27M53 19 41.6 32.5 53 46" stroke="var(--mark-k)" />
      </g>
    </svg>
  `,
  host: { style: 'display:block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoMarkComponent {}
