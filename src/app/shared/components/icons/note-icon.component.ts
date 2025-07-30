import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-note',
  template: '<fa-icon [icon]="faUser" />',
})
export class IconNoteComponent {
  faUser = faFilePen;
}
