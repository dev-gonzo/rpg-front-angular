import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeService } from '@/design/theme/theme.service';
import { ButtonIconComponent } from '@/shared/components/button-icon/button-icon.component';
import { IconLanguageComponent } from '@/shared/components/icons/language-icon.component';
import { IconLoginComponent } from '@/shared/components/icons/login-icon.component';
import { IconMoonComponent } from '@/shared/components/icons/moon-icon.component';
import { IconSunComponent } from '@/shared/components/icons/sun-icon.component';
import { CommonModule } from '@angular/common';
import { TranslationService } from '@/core/i18n/translation.service';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  templateUrl: './navbar-blank.component.html',
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ButtonIconComponent,
    IconSunComponent,
    IconMoonComponent,
    IconLanguageComponent,
    IconLoginComponent,
  ],
})
export class NavbarBlankComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  theme = inject(ThemeService);
  lang = inject(TranslationService);
  router = inject(Router);

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

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
