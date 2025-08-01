import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-sun',
  template: '<fa-icon [icon]="icon" />',
})
export class IconSunComponent {
  icon = faSun;
}
