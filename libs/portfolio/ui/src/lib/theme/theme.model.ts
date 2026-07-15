// ---TYPES---
/** Actual theme applied to the document (never `system`). */
export type ThemeMode = 'light' | 'dark';

/** User preference: fixed theme or follow the OS. */
export type ThemePreference = ThemeMode | 'system';

// ---VARIABLES---
/** LocalStorage key for the saved theme preference (`yk-theme`). */
export const STORAGE_KEY = 'yk-theme';
