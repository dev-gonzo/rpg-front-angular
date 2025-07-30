import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-combat-skill',
  template: '<fa-icon [icon]="faUser" />',
})
export class IconCombatSkillComponent {
  faUser = faShieldHalved;
}
