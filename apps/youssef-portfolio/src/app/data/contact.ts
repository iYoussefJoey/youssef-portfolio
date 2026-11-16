import { Want } from './models';

/** The end of "Email me about …" and of the email subject. */
export const WANT_LABELS: Record<Want, string> = {
  ux: $localize`:@@want.ux:a UI/UX role`,
  fe: $localize`:@@want.fe:a front-end role`,
  both: $localize`:@@want.both:a hybrid role`,
};
