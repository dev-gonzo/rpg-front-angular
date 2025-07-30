import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-magia',
  template: '<fa-icon [icon]="icon" />',
})
export class IconMagiaComponent {
  icon = faHatWizard;
}