import { Component, inject, OnInit } from '@angular/core';
import { MenuFlutuanteComponent } from '@/shared/components/character/floating-menu/floating-menu.component';
import { PageHeaderComponent } from '@/shared/components/page-header/page-header.component';
import { InfoViewComponent } from './info-view/info-view.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoEditComponent } from './info-edit/info-edit.component';
import { CommonModule } from '@angular/common';
import { CharacterInfoApiService } from '@/api/characters/character-info.api.servive';
import { ToastService } from '@/shared/components/toast/toast.service';
import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { CharacterInfoResponse } from '@/api/characters/character-info.types';

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
export class InfoPage extends BaseTranslateComponent implements OnInit {
  private readonly characterInfoApi = inject(CharacterInfoApiService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  public isEditMode = false;
  public navigateCloseTo: string = '';

  characterId!: string;
  character: CharacterInfoResponse | null = null;

  constructor() {
    super(inject(TranslateService), inject(ActivatedRoute));

    const routePath = this.route.snapshot.routeConfig?.path;
    const editParam = this.route.snapshot.paramMap.get('edit');

    const currentUrl = this.router.url;

    if (currentUrl.includes('/create')) {
      this.navigateCloseTo = '/home';
    } else {
      this.navigateCloseTo = currentUrl.replace(/\/edit$/, '');
    }

    this.isEditMode = routePath === 'create' || editParam === 'edit';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id =
        params.get('id') || this.route.parent?.snapshot.paramMap.get('id');
      if (id) {
        this.characterId = id;
        this.reloadCharacters();
      }
    });
  }

  reloadCharacters(): void {
    if (this.characterId) {
      this.characterInfoApi.characterInfo(this.characterId).subscribe({
        next: (response) => {
          this.character = response;
        },
        error: (err) => {
          this.toast.error(err);
        },
      });
    }
  }
}
