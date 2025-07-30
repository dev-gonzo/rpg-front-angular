import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-edit',
  template: '<fa-icon [icon]="icon" />',
})
export class IconEditComponent {
  icon = faEdit;
}
