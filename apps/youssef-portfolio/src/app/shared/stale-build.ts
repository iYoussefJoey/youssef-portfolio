import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ErrorHandler, Injectable, PLATFORM_ID, inject } from '@angular/core';

/** Same key and window as the boot script in index.html, so the two never reload twice in a row. */
const RELOAD_KEY = 'yk-stale-reload';
const RELOAD_WINDOW_MS = 30_000;

/**
 * A page opened before a new deploy (or kept in the browser cache) still points at the old script files, and a deploy
 * deletes those. The sections below the fold load their code when they scroll into view; if that file is gone, Angular
 * reports NG0750 and the section stays asleep, so its buttons do nothing. Reloading once fetches the current page.
 */
@Injectable()
export class StaleBuildErrorHandler extends ErrorHandler {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly win = inject(DOCUMENT).defaultView;

  override handleError(error: unknown): void {
    if (this.browser && isMissingChunk(error) && this.reloadOnce()) return;
    super.handleError(error);
  }

  private reloadOnce(): boolean {
    try {
      const storage = this.win?.sessionStorage;
      if (!storage || Date.now() - Number(storage.getItem(RELOAD_KEY) ?? 0) < RELOAD_WINDOW_MS) return false;
      storage.setItem(RELOAD_KEY, String(Date.now()));
    } catch {
      return false;
    }
    this.win?.location.reload();
    return true;
  }
}

function isMissingChunk(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /NG0750|dynamically imported module|Importing a module script failed/i.test(message);
}
