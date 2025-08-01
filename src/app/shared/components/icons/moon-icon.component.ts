import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-moon',
  template: '<fa-icon [icon]="icon" />',
})
export class IconMoonComponent {
  icon = faMoon;
}
