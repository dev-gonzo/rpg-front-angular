import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeState } from '@shared/state/theme.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  private readonly _theme = inject(ThemeState);
}
