import { CommonModule, Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ButtonIconComponent } from '../../button-icon/button-icon.component';
import { IconAttributesComponent } from '../../icons/attributes-icon.component';
import { IconBackComponent } from '../../icons/back-icon.component';
import { IconBackgroundComponent } from '../../icons/background-icon.component';
import { IconCombatSkillComponent } from '../../icons/combat-skill-icon.component';
import { IconEditComponent } from "../../icons/edit-icon.component";
import { IconEquipamentComponent } from '../../icons/equipament-icon.component';
import { IconImprovementsComponent } from '../../icons/improvements-icon.component';
import { IconInfoComponent } from '../../icons/info-icon.component';
import { IconMagiaComponent } from '../../icons/magia-icon.component';
import { IconMenuComponent } from '../../icons/menu-icon.component';
import { IconNoteComponent } from '../../icons/note-icon.component';
import { IconPersonComponent } from '../../icons/person-icon.component';
import { IconRepeatComponent } from '../../icons/repeat-icon.component';
import { IconRitualComponent } from '../../icons/ritual-icon.component';
import { IconSkillComponent } from '../../icons/skill-icon.component';
import { IconWeaponComponent } from '../../icons/weapon-icon.component';

@Component({
  selector: 'app-menu-flutuante',
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
    IconMenuComponent,
    IconRepeatComponent,
    IconBackComponent,
    IconEditComponent
],
  templateUrl: './floating-menu.component.html',
  standalone: true,
})
export class MenuFlutuanteComponent {
  showMenu = false;
  showExtras = false;
  atTop = true;

  constructor(private location: Location) {}

  handleBack(): void {
    this.location.back();
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    this.showExtras = false;
  }

  toggleExtras(): void {
    this.showExtras = !this.showExtras;
  }

  @HostListener('window:scroll', [])
  checkScrollPosition(): void {
    this.atTop = window.scrollY === 0;
  }
}
