import { CharacterInfoApiService } from '@/api/characters/character-info.api.servive';
import { CharacterInfoDto } from '@/api/characters/character.types';
import { InputViewComponent } from '@/shared/components/input-view/input-view.component';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-view',
  imports: [InputViewComponent],
  templateUrl: './info-view.component.html',
})
export class InfoViewComponent implements OnInit {
  private readonly CharacterInfoDto = inject(CharacterInfoApiService);
  id!: string;
  character: CharacterInfoDto | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id') ?? '';

    this.reloadCharacters();
  }

  reloadCharacters(): void {
    this.CharacterInfoDto.characterInfo(this.id).subscribe({
      next: (response) => {
        this.character = response;
        console.log('Personagem:', response);
      },
      error: (err) => {
        console.error('Erro ao buscar:', err);
      },
    });
  }
}
