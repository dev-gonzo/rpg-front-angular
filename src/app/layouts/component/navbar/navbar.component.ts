import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThemeService } from '@/design/theme/theme.sevice';
import { IconBarsComponent } from "@/shared/components/icons/bars-icon.component";
import { IconMoonComponent } from "@/shared/components/icons/moon-icon.component";
import { IconSunComponent } from "@/shared/components/icons/sun-icon.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterModule, IconBarsComponent, IconSunComponent, IconMoonComponent, ],
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
