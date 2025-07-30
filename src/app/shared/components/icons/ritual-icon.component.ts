import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookSkull } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-ritual',
  template: '<fa-icon [icon]="icon" />',
})
export class IconRitualComponent {
  icon = faBookSkull;
}
