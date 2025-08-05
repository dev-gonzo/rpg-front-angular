import { CharacterHomeDto } from '@/api/characters/character-home.types';
import { CharacterSheetMenuComponent } from '@/shared/components/character/character-sheet-menu/character-sheet-menu.component';
import { IconEditComponent } from '@/shared/components/icons/edit-icon.component';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CharacterCardPointsControlComponent } from '../character-card-points-control/character-card-points-control.component';
import { IconCameraComponent } from '../../icons/camera-icon.component';
import { FormsModule } from '@angular/forms';
import { ButtonIconComponent } from "../../button-icon/button-icon.component";
import { SwitchComponent } from "../../switch/switch.component";

@Component({
  selector: 'app-card-home',
  imports: [
    CommonModule,
    FormsModule,
    IconEditComponent,
    CharacterSheetMenuComponent,
    CharacterCardPointsControlComponent,
    IconCameraComponent,
    ButtonIconComponent,
    SwitchComponent
],
  templateUrl: './card-home.compoment.html',
  standalone: true,
})
export class CardHomeComponent {
  @Input() characters: CharacterHomeDto[] = [];

  handleEdit(character: CharacterHomeDto) {
    // character.edit = !!character.edit;
  }
}
