import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-grid',
  template: '<fa-icon [icon]="icon" />',
})
export class IconGridComponent {
  icon = faTable;
}
