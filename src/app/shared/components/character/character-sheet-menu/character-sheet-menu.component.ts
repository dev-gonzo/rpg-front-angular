import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonIconComponent } from '../../button-icon/button-icon.component';
import { IconAttributesComponent } from '../../icons/attributes-icon.component';
import { IconBackgroundComponent } from '../../icons/background-icon.component';
import { IconCombatSkillComponent } from '../../icons/combat-skill-icon.component';
import { IconEquipamentComponent } from '../../icons/equipament-icon.component';
import { IconImprovementsComponent } from '../../icons/improvements-icon.component';
import { IconInfoComponent } from '../../icons/info-icon.component';
import { IconMagiaComponent } from '../../icons/magia-icon.component';
import { IconNoteComponent } from '../../icons/note-icon.component';
import { IconPersonComponent } from '../../icons/person-icon.component';
import { IconRitualComponent } from '../../icons/ritual-icon.component';
import { IconSkillComponent } from '../../icons/skill-icon.component';
import { IconWeaponComponent } from '../../icons/weapon-icon.component';

@Component({
  selector: 'app-character-sheet-menu',
  imports: [
    CommonModule,
    ButtonIconComponent,
    IconInfoComponent,
    IconAttributesComponent,
    IconImprovementsComponent,
    IconSkillComponent,
    IconCombatSkillComponent,
    IconMagiaComponent,
    IconRitualComponent,
    IconWeaponComponent,
    IconEquipamentComponent,
    IconPersonComponent,
    IconBackgroundComponent,
    IconNoteComponent,
  ],
  templateUrl: './character-sheet-menu.component.html',
  standalone: true,
})
export class CharacterSheetMenuComponent {}
