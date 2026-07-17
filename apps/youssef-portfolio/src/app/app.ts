import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService, HeaderComponent } from '@youssef-portfolio/portfolio-ui';

@Component({
  imports: [RouterModule, HeaderComponent],
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
