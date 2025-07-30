import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-minus',
  template: '<fa-icon [icon]="icon" />',
})
export class IconMinusComponent {
  icon = faCircleMinus;
}
