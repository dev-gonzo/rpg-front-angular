import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-plus',
  template: '<fa-icon [icon]="icon" />',
})
export class IconPlusComponent {
  icon = faCirclePlus;
}
