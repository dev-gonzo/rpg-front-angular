import { CharacterInfoApiService } from '@/api/characters/character-info.api.servive';
import { CharacterInfoDto } from '@/api/characters/character.types';
import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { InputViewComponent } from '@/shared/components/input-view/input-view.component';
import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-info-view',
  imports: [InputViewComponent, TranslateModule, DatePipe],
  templateUrl: './info-view.component.html',
})
export class InfoViewComponent
  extends BaseTranslateComponent
  implements OnInit
{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() character: CharacterInfoDto | null = null;
}
