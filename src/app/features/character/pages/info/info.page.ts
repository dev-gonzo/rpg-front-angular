import { Component, inject, OnInit } from '@angular/core';
import { MenuFlutuanteComponent } from '@/shared/components/character/floating-menu/floating-menu.component';
import { PageHeaderComponent } from '@/shared/components/page-header/page-header.component';
import { InfoViewComponent } from './info-view/info-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { InfoEditComponent } from './info-edit/info-edit.component';
import { CommonModule } from '@angular/common';
import { CharacterInfoApiService } from '@/api/characters/character-info.api.servive';
import { CharacterInfoDto } from '@/api/characters/character-info.types';

@Component({
  selector: 'app-info.page',
  imports: [
    MenuFlutuanteComponent,
    PageHeaderComponent,
    InfoViewComponent,
    TranslateModule,
    InfoEditComponent,
    CommonModule,
  ],
  templateUrl: './info.page.html',
  standalone: true,
})
export class InfoPage implements OnInit {
  private readonly CharacterInfoDto = inject(CharacterInfoApiService);
  private route = inject(ActivatedRoute);
  public isEditMode = false;

  id!: string;
  character: CharacterInfoDto | null = null;

  constructor() {
    const routePath = this.route.snapshot.routeConfig?.path;
    const editParam = this.route.snapshot.paramMap.get('edit');

    // Ativa modo edição se:
    // - path for exatamente 'create'
    // - ou param :edit === 'edit'
    this.isEditMode = routePath === 'create' || editParam === 'edit';
  }

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
