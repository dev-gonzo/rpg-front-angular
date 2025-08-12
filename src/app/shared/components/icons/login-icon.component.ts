import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-login',
  template: '<fa-icon [icon]="icon" />',
})
export class IconLoginComponent {
  icon = faSignInAlt;
}