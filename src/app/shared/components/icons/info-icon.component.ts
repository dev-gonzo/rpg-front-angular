import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-info',
  template: '<fa-icon [icon]="faUser" />',
})
export class IconInfoComponent {
  faUser = faUserSecret;
}
