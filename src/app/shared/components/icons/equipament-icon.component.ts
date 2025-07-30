import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-equipament',
  template: '<fa-icon [icon]="faUser" />',
})
export class IconEquipamentComponent {
  faUser = faToolbox;
}
