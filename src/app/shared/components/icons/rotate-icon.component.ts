import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-rotate',
  template: '<fa-icon [icon]="icon" />',
})
export class IconRotateComponent {
  icon = faRotateLeft;
}
