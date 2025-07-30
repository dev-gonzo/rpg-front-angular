import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFeatherPointed } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-background',
  template: '<fa-icon [icon]="icon" />',
})
export class IconBackgroundComponent {
  icon = faFeatherPointed;
}
