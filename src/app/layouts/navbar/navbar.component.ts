import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../design/theme/theme.service';
import { FontSize, ThemeMode } from '../../design/theme/theme.types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [MatIconModule],
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  theme: ThemeMode = 'light';
  fontSizes: FontSize[] = ['sm', 'md', 'lg', 'xl'];
  fontSize: FontSize = 'md';

  constructor(private themeService: ThemeService) {
    this.theme = this.themeService.getSavedTheme();
    this.themeService.setTheme(this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(this.theme);
  }

  setFontSize(size: FontSize) {
    this.fontSize = size;
    this.themeService.setFontSize(size);
  }

  adjustFont(direction: 'increase' | 'decrease') {
    const currentIndex = this.fontSizes.indexOf(this.fontSize);
    const nextIndex =
      direction === 'increase'
        ? Math.min(currentIndex + 1, this.fontSizes.length - 1)
        : Math.max(currentIndex - 1, 0);

    this.setFontSize(this.fontSizes[nextIndex]);
  }

  resetFont() {
    this.setFontSize('md');
  }
}
