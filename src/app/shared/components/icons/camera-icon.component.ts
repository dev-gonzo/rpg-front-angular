import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-camera',
  template: '<fa-icon [icon]="faUser" />',
})
export class IconCameraComponent {
  faUser = faCamera;
}
