import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeState } from '@shared/state/theme.state';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [MatIconModule],
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(public theme: ThemeState) {}

  toggleTheme() {
    this.theme.toggleTheme();
  }

  increaseFont() {
    this.theme.adjustFontSize('increase');
  }

  decreaseFont() {
    this.theme.adjustFontSize('decrease');
  }

  resetFont() {
    this.theme.resetFontSize();
  }
}
