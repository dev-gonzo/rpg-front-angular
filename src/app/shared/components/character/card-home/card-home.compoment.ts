import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CharacterHomeDto } from '@/api/characters/character.types';
import { CharacterSheetMenuComponent } from '@/shared/components/character/character-sheet-menu/character-sheet-menu.component';
import { IconEditComponent } from '@/shared/components/icons/edit-icon.component';
import { IconMinusComponent } from '@/shared/components/icons/minus-icon.component';
import { IconPlusComponent } from '@/shared/components/icons/plus-icon.component';
import { IconRotateComponent } from '@/shared/components/icons/rotate-icon.component';

@Component({
  selector: 'app-card-home',
  imports: [
    CommonModule,
    IconPlusComponent,
    IconMinusComponent,
    IconRotateComponent,
    IconEditComponent,
    CharacterSheetMenuComponent
],
  templateUrl: './card-home.compoment.html',
  standalone: true,
})
export class CardHomeComponent {
  @Input() characters: CharacterHomeDto[] = [];
}
