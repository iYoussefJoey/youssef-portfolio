import { DeferBlockBehavior, DeferBlockState, TestBed } from '@angular/core/testing';
import { App } from './app';
import { PROJECTS } from './data/projects';

/** Renders the page with every deferred section loaded, as it is once the visitor has scrolled through. */
async function renderPage(): Promise<HTMLElement> {
  const fixture = TestBed.createComponent(App);
  fixture.detectChanges();
  for (const block of await fixture.getDeferBlocks()) {
    await block.render(DeferBlockState.Complete);
  }
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      deferBlockBehavior: DeferBlockBehavior.Manual,
    }).compileComponents();
  });

  it('renders one h1 and a labelled h2 per section', async () => {
    const el = await renderPage();
    expect(el.querySelectorAll('h1')).toHaveLength(1);
    expect(el.querySelector('h1')?.textContent).toContain('Youssef Khamis');
    const ids = [...el.querySelectorAll('section[id]')].map((s) => s.id);
    expect(ids).toEqual(['top', 'what', 'work', 'experience', 'skills', 'system', 'contact']);
    for (const s of el.querySelectorAll('section[aria-labelledby]')) {
      expect(el.querySelector('#' + s.getAttribute('aria-labelledby'))).not.toBeNull();
    }
  });

  it('shows every project in order, with the featured ones first', async () => {
    const el = await renderPage();
    const titles = [...el.querySelectorAll('.grid-work .proj h3')].map((h) => h.textContent);
    expect(titles).toEqual(PROJECTS.map((p) => p.title));
  });

  it('points every CV button at the PDF as a plain download', async () => {
    const el = await renderPage();
    const cv = [...el.querySelectorAll('a[download]')];
    expect(cv).toHaveLength(3);
    for (const a of cv) {
      expect(a.getAttribute('href')).toBe('docs/Youssef-Khamis-CV.pdf');
      expect(a.getAttribute('download')).toBe('Youssef-Khamis-CV.pdf');
    }
  });
});
