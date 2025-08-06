import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBolt, faBookSkull, faDragon, faDungeon, faEyeLowVision, faFire, faGhost, faHatWizard, faMap, faShieldAlt, faSkullCrossbones, faWandSparkles, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [FontAwesomeModule],
  selector: 'app-icon-game',
  template: '<fa-icon [icon]="selectedIcon" />',
})
export class IconGameComponent {
  @Input() iconNumber?: number;

  iconList: IconDefinition[] = [
    faHatWizard,  
    faHatWizard, // 1 
    faDragon, // 2
    faSkullCrossbones, // 3
    faShieldAlt, // 4
    faWandSparkles, // 5
    faFire, // 6
    faBookSkull, // 7
    faDungeon, // 8
    faBolt, // 9
    faGhost, // 10
    faMap, // 11
    faEyeLowVision, // 12
  ];

  get selectedIcon(): IconDefinition {
    if (
      this.iconNumber !== 0 &&
      this.iconNumber !== undefined &&
      this.iconNumber >= 0 &&
      this.iconNumber < this.iconList.length
    ) {
      return this.iconList[this.iconNumber];
    }
    return this.iconList[0];
  }
}
