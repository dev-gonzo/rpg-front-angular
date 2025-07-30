import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClipboardUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-attributes',
  template: '<fa-icon [icon]="faUser" />',
})
export class IconAttributesComponent {
  faUser = faClipboardUser;
}
