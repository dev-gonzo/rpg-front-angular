
import { CharacterInfoResponse } from '@/api/characters/character-info.types';
import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { InputViewComponent } from '@/shared/components/input-view/input-view.component';
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-info-view',
  imports: [InputViewComponent, TranslateModule, DatePipe],
  templateUrl: './info-view.component.html',
})
export class InfoViewComponent extends BaseTranslateComponent {
  @Input() character: CharacterInfoResponse | null = null;
}
