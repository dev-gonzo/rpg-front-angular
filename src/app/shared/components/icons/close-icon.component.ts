import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-close',
  template: '<fa-icon [icon]="icon" />',
})
export class IconCloseComponent {
  icon = faClose;
}
