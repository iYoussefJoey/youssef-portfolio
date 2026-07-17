import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../theme/theme.service';
import { THEME_PREFERENCE } from '../../theme/theme.model';

@Component({
  selector: 'yk-header-component',
  imports: [
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  systemTheme = inject(ThemeService);

  /**
   * Set the theme menu items
   */
  readonly themeMenuItems = [
    { preference: THEME_PREFERENCE.Light, icon: 'light_mode', label: 'Light' },
    { preference: THEME_PREFERENCE.Dark, icon: 'dark_mode', label: 'Dark' },
    {
      preference: THEME_PREFERENCE.System,
      icon: 'keyboard_command_key',
      label: 'System',
    },
  ];
}
