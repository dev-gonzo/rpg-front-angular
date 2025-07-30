import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-skill',
  template: '<fa-icon [icon]="faUser" />',
})
export class IconSkillComponent {
  faUser = faFileLines;
}
