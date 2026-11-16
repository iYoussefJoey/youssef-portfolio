import { Lens } from './models';

/** The hint under the "View this page as" switch. */
export const LENS_HINTS: Record<Lens, string> = {
  ux: $localize`:@@lens.hint.ux:UX view: the wireframe, the hierarchy and the reasons behind it.`,
  ui: $localize`:@@lens.hint.ui:UI view: the finished design. Try UX or Code to see how it was made.`,
  code: $localize`:@@lens.hint.code:Code view: the elements and styles the browser actually renders.`,
};
