import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastComponent } from './shared/components/toast/toast.component';
import { TranslationService } from './core/i18n/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  template: `
    <router-outlet></router-outlet>
    <app-toast />
  `,
})
export class AppComponent {
  constructor(public translation: TranslationService) {}
}
