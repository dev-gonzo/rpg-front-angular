import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-menu',
  template: '<fa-icon [icon]="icon" />',
})
export class IconMenuComponent {
  icon = faEllipsisV;
}
