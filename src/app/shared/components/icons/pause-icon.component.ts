import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-pause',
  template: '<fa-icon [icon]="icon" />',
})
export class IconPauseComponent {
  icon = faPause;
}
