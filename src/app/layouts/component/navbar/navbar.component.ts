import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { ThemeService } from '@app/design/theme/theme.sevice';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [MatIconModule, RouterModule],
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  theme = inject(ThemeService);

  toggleTheme(): void {
    this.theme.toggleTheme();
  }

  increaseFont(): void {
    this.theme.adjustFontSize('increase');
  }

  decreaseFont(): void {
    this.theme.adjustFontSize('decrease');
  }

  resetFont(): void {
    this.theme.resetFontSize();
  }
}
