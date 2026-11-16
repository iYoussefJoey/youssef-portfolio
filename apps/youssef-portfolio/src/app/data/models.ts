/** Typed shapes for the portfolio content (source: handoff content/content.json, page-template.html, page-logic.js). */

export type Theme = 'light' | 'dark';

/** Which side of the work a project or role sits on. `both` shows under every filter. */
export type Kind = 'ux' | 'fe' | 'both';

/** An image file in public/, with its intrinsic size (NgOptimizedImage needs it). */
export interface Picture {
  src: string;
  width: number;
  height: number;
}

/** One previewable page of a page card (Monglish, Edulixa360). */
export interface Page {
  /** Stable key (the label is translated). */
  id: string;
  label: string;
  desktop: Picture;
  phone?: Picture;
  liveUrl?: string;
  /** The whole page before the redesign (shown in the browser frame and full size in the lightbox). */
  before?: Picture;
}

export interface CodeLine {
  /** Syntax class used by the code panel: comment, keyword, string or plain. */
  c: '' | 'c' | 'k' | 's';
  t: string;
}

interface ProjectBase {
  title: string;
  meta: string;
  kind: Kind;
  desc: string;
  tags: readonly string[];
  /** Featured projects take a full row under "All". */
  feat?: boolean;
}

/** A browser frame (plus a phone frame when there is a phone screenshot) with page tabs and a LIVE link. */
export interface PagesProject extends ProjectBase {
  type: 'pages';
  key: string;
  /** Address shown in the browser frame's bar. */
  url: string;
  pages: readonly Page[];
}

/** The picture fills the thumb. GapMap is the `gap` variant of the same card. */
export interface PictureProject extends ProjectBase {
  type: 'shot' | 'gap';
  picture: Picture;
  alt: string;
}

/** NDA work, shown as an illustrative code panel. */
export interface CodeProject extends ProjectBase {
  type: 'code';
  file: string;
  code: readonly CodeLine[];
}

export type Project = PagesProject | PictureProject | CodeProject;

export interface Role {
  title: string;
  org: string;
  when: string;
  /** Year watermark in the corner of the card. */
  year: string;
  kind: Kind;
  kindLabel: string;
  /** Position of the dot on the Design–Code slider. */
  pos: string;
  specLabel: string;
  points: readonly string[];
}

export interface Education {
  kindLabel: string;
  title: string;
  when: string;
  org: string;
}

export type Skill = string;

export interface SkillGroup {
  id: 'design' | 'front' | 'tools';
  /** id of the expandable list, referenced by aria-controls. */
  moreId: string;
  title: string;
  caption: string;
  items: readonly Skill[];
}

export interface PaletteColour {
  role: string;
  name: string;
  hex: string;
  /** Text colour on top of the chip. */
  ink: string;
}

export interface Stat {
  n: string;
  label: string;
  sub: string;
}

export interface Side {
  icon: 'design' | 'code';
  kind: string;
  since: string;
  title: string;
  ticks: readonly string[];
  /** Project names shown in bold after "Seen in". */
  proof: readonly [string, string, string];
}

export interface Commit {
  lane: 'd' | 'm' | 'c';
  hash: string;
  verb: string;
  msg: string;
  tag: string;
  /** Tag colour: design (default), handoff (both) or code (fe). */
  tagCls: '' | 'both' | 'fe';
}

export interface Quote {
  text: string;
  initials: string;
  name: string;
  title: string;
}

export type InspectPartId = 'img' | 'chip' | 'title' | 'meta' | 'btn';

export interface InspectPart {
  id: InspectPartId;
  /** Label on the phone picker and the outline tag. */
  label: string;
  tag: string;
  /** Attribute and value of its line in the Angular usage. */
  a: string;
  s: string;
  k: string;
  v: Record<Theme, string>;
  note: string;
}

export type Lens = 'ux' | 'ui' | 'code';
export type Want = 'ux' | 'fe' | 'both';
