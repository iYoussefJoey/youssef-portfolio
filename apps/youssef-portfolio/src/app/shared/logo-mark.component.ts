import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * The YK brand mark: a rounded tile split into a design half (Y, sapphire) and a code half (K, code navy).
 * Colours come from the theme tokens, so it follows light and dark mode. Decorative: the name next to it is the label.
 *
 * The tile is the front of a small cube with the mark on all four sides. When the page opens it turns once
 * (Motion on and no reduced-motion request); at rest only the front shows, exactly like the flat mark.
 */
@Component({
  selector: 'app-logo-mark',
  template: `
    <span class="yk-cube">
      @for (side of sides; track side) {
        <svg class="yk-face" viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true" focusable="false">
          <path d="M18 0H32V64H18A18 18 0 0 1 0 46V18A18 18 0 0 1 18 0Z" fill="var(--primary)" />
          <path d="M32 0H46A18 18 0 0 1 64 18V46A18 18 0 0 1 46 64H32Z" fill="var(--mark-code)" />
          <g fill="none" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8.5 19 16 31.5 23.5 19M16 31.5V46" stroke="var(--on-p)" />
            <path d="M41 19v27M53 19 41.6 32.5 53 46" stroke="var(--mark-k)" />
          </g>
        </svg>
      }
    </span>
  `,
  styles: `
    app-logo-mark {
      display: block;
      /* the cube's depth is half the mark's width, whatever size the header gives it */
      container-type: size;
      perspective: 180px;
    }
    .yk-cube {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transform: translateZ(-50cqw);
    }
    .yk-face {
      position: absolute;
      inset: 0;
      display: block;
      backface-visibility: hidden;
    }
    .yk-face:nth-child(1) {
      transform: translateZ(50cqw);
    }
    .yk-face:nth-child(2) {
      transform: rotateY(90deg) translateZ(50cqw);
    }
    .yk-face:nth-child(3) {
      transform: rotateY(180deg) translateZ(50cqw);
    }
    .yk-face:nth-child(4) {
      transform: rotateY(270deg) translateZ(50cqw);
    }
    /* one full turn as the page opens; the Motion switch (or reduced motion) stops it */
    @media (prefers-reduced-motion: no-preference) {
      .motion-on .yk-cube {
        animation: yk-turn 1.3s cubic-bezier(0.65, 0, 0.25, 1) 0.3s 1 both;
      }
    }
    @keyframes yk-turn {
      from {
        transform: translateZ(-50cqw) rotateY(-360deg);
      }
      to {
        transform: translateZ(-50cqw) rotateY(0deg);
      }
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoMarkComponent {
  protected readonly sides = [0, 1, 2, 3] as const;
}
