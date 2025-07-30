import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-person',
  template: '<fa-icon [icon]="faUser" />',
})
export class IconPersonComponent {
  faUser = faAddressBook;
}
