import { Component } from '@angular/core';
import { IconRotateComponent } from "../../icons/rotate-icon.component";
import { IconMinusComponent } from "../../icons/minus-icon.component";
import { IconPlusComponent } from "../../icons/plus-icon.component";

@Component({
  selector: 'app-character-card-points-control',
  imports: [IconRotateComponent, IconMinusComponent, IconPlusComponent],
  templateUrl: './character-card-points-control.component.html',
})
export class CharacterCardPointsControlComponent {}
