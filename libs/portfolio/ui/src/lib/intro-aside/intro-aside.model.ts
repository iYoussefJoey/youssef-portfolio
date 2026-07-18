/**
 * One scroll-spy nav item in the Intro sticky rail.
 */
export interface IntroAsideSection {
  id: string;
  label: string;
}

/**
 * Social / contact link shown at the bottom of the Intro rail.
 * `icon` is an ng-icon name (e.g. tablerBrandGithub).
 */
export interface IntroAsideSocial {
  id: string;
  label: string;
  href: string;
  icon: string;
}
