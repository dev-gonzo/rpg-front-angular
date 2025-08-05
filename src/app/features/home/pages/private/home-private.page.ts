import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { CharacterHomeApiService } from '@/api/characters/character-home.api.servive';
import { CharacterHomeDto } from '@/api/characters/character.types';
import { CardHomeComponent } from '@/shared/components/character/card-home/card-home.compoment';
import { PageHeaderComponent } from '@/shared/components/page-header/page-header.component';
import { HomeToolbarComponent } from "@/shared/components/home-toolbar/home-toolbar.component";

@Component({
  standalone: true,
  selector: 'app-home-private',
  imports: [CommonModule, PageHeaderComponent, CardHomeComponent, HomeToolbarComponent],
  templateUrl: './home-private.page.html',
})
export class HomePrivatePage implements OnInit {
  private readonly CharacterHome = inject(CharacterHomeApiService);
  characters: CharacterHomeDto[] = [];

  columns = 3;
  activeFilter: 'players' | 'npcs' | null = null;

  get filteredCharacters(): CharacterHomeDto[] {
    if (!this.activeFilter) return this.characters;
    return this.characters.filter(c =>
      this.activeFilter === 'players' ? c.controlUser?.id !== null : c.controlUser === null
    );
  }

  ngOnInit(): void {
    this.reloadCharacters();
  }

  reloadCharacters(): void {
    this.CharacterHome.characters().subscribe({
      next: (response) => {
        this.characters = response;
        console.log('Personagens:', response);
      },
      error: (err) => {
        console.error('Erro ao buscar usuário:', err);
      },
    });
  }
}
