import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-repeat',
  template: '<fa-icon [icon]="icon" />',
})
export class IconRepeatComponent {
  icon = faRepeat;
}
