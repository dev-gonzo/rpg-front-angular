import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonIconComponent } from '../../button-icon/button-icon.component';
import { IconInfoComponent } from '../../icons/info-icon.component';
// import { IconInfoComponent } from '@icons/info-icon.component';
// import { ButtonIconComponent } from '@components/button-icon/button-icon.component';

@Component({
  selector: 'app-character-sheet-menu',
  imports: [CommonModule, ButtonIconComponent, IconInfoComponent],
  templateUrl: './character-sheet-menu.component.html',
  standalone: true,
})
export class CharacterSheetMenuComponent {

}
