import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-play',
  template: '<fa-icon [icon]="icon" />',
})
export class IconPlayComponent {
  icon = faPlay;
}
