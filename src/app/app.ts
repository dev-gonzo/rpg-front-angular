import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './design/theme/theme.service';
import { FontSize, ThemeMode } from './design/theme/theme.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  theme: ThemeMode;
  fontSize: FontSize;

  constructor(private themeService: ThemeService) {
    this.theme = this.themeService.getSavedTheme();
    this.fontSize = this.themeService.getSavedFontSize();

    this.themeService.setTheme(this.theme);
    this.themeService.setFontSize(this.fontSize);
  }
}
