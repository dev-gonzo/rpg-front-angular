import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-improvements',
  template: '<fa-icon [icon]="icon" />',
})
export class IconImprovementsComponent {
  icon = faClipboardList;
}
