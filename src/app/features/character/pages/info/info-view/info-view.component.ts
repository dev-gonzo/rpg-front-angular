import { CharacterInfoApiService } from '@/api/characters/character-info.api.servive';
import { CharacterInfoDto } from '@/api/characters/character.types';
import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { InputViewComponent } from '@/shared/components/input-view/input-view.component';
import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
  private readonly CharacterInfoDto = inject(CharacterInfoApiService);
  id!: string;
  character: CharacterInfoDto | null = null;

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id') ?? '';

    this.reloadCharacters();
  }

  reloadCharacters(): void {
    this.CharacterInfoDto.characterInfo(this.id).subscribe({
      next: (response) => {
        this.character = response;
        this.character.birthDate = new Date(this.character.birthDate);

        console.log('Personagem:', response);
      },
      error: (err) => {
        console.error('Erro ao buscar:', err);
      },
    });
  }
}
