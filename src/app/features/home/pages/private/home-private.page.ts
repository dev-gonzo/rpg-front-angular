import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { CharacterHomeApiService } from '@app/api/characters/character.api.servive';
import { PageHeaderComponent } from '@app/shared/components/page-header/page-header.component';

@Component({
  standalone: true,
  selector: 'app-home-private',
  imports: [CommonModule, PageHeaderComponent, PageHeaderComponent],
  templateUrl: './home-private.page.html',
})
export class HomePrivatePage implements OnInit {
  private readonly CharacterHome = inject(CharacterHomeApiService);
  characters: string = 'Diego' as string;

  ngOnInit(): void {
    this.CharacterHome.characters().subscribe({
      next: (response) => {
        // eslint-disable-next-line no-console
        console.log('Personagens:', response);
        setInterval(() => {
          this.characters = 'Eduardo';
        }, 3000);
      },
      error: (err) => {
        console.error('Erro ao buscar usuário:', err);
      },
    });
  }
}
