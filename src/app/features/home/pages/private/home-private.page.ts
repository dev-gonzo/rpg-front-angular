import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { CharacterHomeApiService } from '@/api/characters/character.api.servive';
import { CharacterHomeDto } from '@/api/characters/character.types';
import { CardHomeComponent } from '@/shared/components/character/card-home/card-home.compoment';
import { PageHeaderComponent } from '@/shared/components/page-header/page-header.component';

@Component({
  standalone: true,
  selector: 'app-home-private',
  imports: [CommonModule, PageHeaderComponent, CardHomeComponent],
  templateUrl: './home-private.page.html',
})
export class HomePrivatePage implements OnInit {
  private readonly CharacterHome = inject(CharacterHomeApiService);
  characters: CharacterHomeDto[] = [];

  ngOnInit(): void {
    this.CharacterHome.characters().subscribe({
      next: (response) => {
        this.characters = response;
        // eslint-disable-next-line no-console
        console.log('Personagens:', response);
      },
      error: (err) => {
        console.error('Erro ao buscar usuário:', err);
      },
    });
  }
}
