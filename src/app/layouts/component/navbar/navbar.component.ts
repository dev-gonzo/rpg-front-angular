import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThemeService } from '@/design/theme/theme.service';
import { IconBarsComponent } from '@/shared/components/icons/bars-icon.component';
import { IconMoonComponent } from '@/shared/components/icons/moon-icon.component';
import { IconSunComponent } from '@/shared/components/icons/sun-icon.component';
import { CommonModule } from '@angular/common';
import { ButtonIconComponent } from '@/shared/components/button-icon/button-icon.component';
import { TranslationService } from '@/core/i18n/translation.service';
import { IconLanguageComponent } from "@/shared/components/icons/language-icon.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    CommonModule,
    RouterModule,
    IconBarsComponent,
    IconSunComponent,
    IconMoonComponent,
    ButtonIconComponent,
    IconLanguageComponent
],
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  theme = inject(ThemeService);
  lang = inject(TranslationService);

  toggleTheme(): void {
    this.theme.toggleTheme();
  }

  toggleLanguage(): void {
    this.lang.toggleLanguage();
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
