import { Lens } from './models';

/** The hint under the "View this page as" switch. */
export const LENS_HINTS: Record<Lens, string> = {
  ux: 'UX view: the wireframe, the hierarchy and the reasons behind it.',
  ui: 'UI view: the finished design. Try UX or Code to see how it was made.',
  code: 'Code view: the elements and styles the browser actually renders.',
};
