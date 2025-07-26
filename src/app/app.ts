import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeState } from '@shared/state/theme.state';

import { ToastComponent } from './shared/components/toast/toast.component';

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
  private readonly _theme = inject(ThemeState);
}
