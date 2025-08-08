import { CharacterAttributesResponse } from '@/api/characters/character-attributes.types';
import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AttributesTypePage } from '../atributes.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attributes-view',
  imports: [TranslateModule, CommonModule],
  templateUrl: './attributes-view.component.html',
})
export class AttributesViewComponent extends BaseTranslateComponent {
  @Input() attributes: AttributesTypePage | null = null;
}
