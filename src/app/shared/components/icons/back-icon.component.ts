import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faReplyAll } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-back',
  template: '<fa-icon [icon]="icon" />',
})
export class IconBackComponent {
  icon = faReplyAll;
}
