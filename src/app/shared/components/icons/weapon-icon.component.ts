import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPersonRifle } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-weapon',
  template: '<fa-icon [icon]="faUser" />',
})
export class IconWeaponComponent {
  faUser = faPersonRifle;
}
