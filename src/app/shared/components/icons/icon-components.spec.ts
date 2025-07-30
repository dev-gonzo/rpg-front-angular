import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IconBackgroundComponent } from './background-icon.component';
import { IconCameraComponent } from './camera-icon.component';
import { IconAttributesComponent } from './attributes-icon.component';
import { IconEditComponent } from './edit-icon.component';
import { IconEquipamentComponent } from './equipament-icon.component';
import { IconImprovementsComponent } from './improvements-icon.component';
import { IconInfoComponent } from './info-icon.component';
import { IconMagiaComponent } from './magia-icon.component';
import { IconMinusComponent } from './minus-icon.component';
import { IconPersonComponent } from './person-icon.component';
import { IconNoteComponent } from './note-icon.component';
import { IconPlusComponent } from './plus-icon.component';
import { IconRitualComponent } from './ritual-icon.component';
import { IconRotateComponent } from './rotate-icon.component';
import { IconSkillComponent } from './skill-icon.component';
import { IconWeaponComponent } from './weapon-icon.component';

interface IconTestCase {
  component: Type<any>;
  description: string;
}

const iconTestCases: IconTestCase[] = [
  {
    component: IconAttributesComponent,
    description: 'IconAttributesComponent deve renderizar <fa-icon>',
  },
  {
    component: IconBackgroundComponent,
    description: 'IconBackgroundComponent deve renderizar <fa-icon>',
  },
  {
    component: IconCameraComponent,
    description: 'IconCameraComponent deve renderizar <fa-icon>',
  },
  {
    component: IconEditComponent,
    description: 'IconEditComponent deve renderizar <fa-icon>',
  },
  {
    component: IconEquipamentComponent,
    description: 'IconEquipamentComponent deve renderizar <fa-icon>',
  },
  {
    component: IconImprovementsComponent,
    description: 'IconImprovementsComponent deve renderizar <fa-icon>',
  },
  {
    component: IconInfoComponent,
    description: 'IconInfoComponent deve renderizar <fa-icon>',
  },
  {
    component: IconMagiaComponent,
    description: 'IconMagiaComponent deve renderizar <fa-icon>',
  },
  {
    component: IconMinusComponent,
    description: 'IconMinusComponent deve renderizar <fa-icon>',
  },
  {
    component: IconNoteComponent,
    description: 'IconNotesComponent deve renderizar <fa-icon>',
  },
  {
    component: IconPersonComponent,
    description: 'IconPersonComponent deve renderizar <fa-icon>',
  },
  {
    component: IconPlusComponent,
    description: 'IconPlusComponent deve renderizar <fa-icon>',
  },
  {
    component: IconRitualComponent,
    description: 'IconRitualComponent deve renderizar <fa-icon>',
  },
  {
    component: IconRotateComponent,
    description: 'IconRotateComponent deve renderizar <fa-icon>',
  },
  {
    component: IconSkillComponent,
    description: 'IconSkillComponent deve renderizar <fa-icon>',
  },
  {
    component: IconWeaponComponent,
    description: 'IconWeaponComponent deve renderizar <fa-icon>',
  },
];

iconTestCases.forEach(({ component, description }) => {
  describe(description, () => {
    let fixture: ComponentFixture<any>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FontAwesomeModule, component],
      }).compileComponents();

      fixture = TestBed.createComponent(component);
      fixture.detectChanges();
    });

    it('deve renderizar <fa-icon>', () => {
      const faIcon = fixture.nativeElement.querySelector('fa-icon');
      expect(faIcon).withContext('fa-icon não encontrado').toBeTruthy();
    });
  });
});
