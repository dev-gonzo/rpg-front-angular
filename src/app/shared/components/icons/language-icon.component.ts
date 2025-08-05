import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-language',
  template: '<fa-icon [icon]="icon" />',
})
export class IconLanguageComponent {
  icon = faLanguage;
}
