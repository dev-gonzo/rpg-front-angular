import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-edit',
  template: '<fa-icon [icon]="faUser" />',
})
export class IconEditComponent {
  faUser = faEdit;
}
