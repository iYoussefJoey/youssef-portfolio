import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@youssef-portfolio/portfolio-ui';
import { NxWelcome } from './nx-welcome';

@Component({
  imports: [NxWelcome, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'youssef-portfolio';

  constructor() {
    // Apply persisted / OS theme on bootstrap (CSS uses light-dark()).
    inject(ThemeService);
  }
}
