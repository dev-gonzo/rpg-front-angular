import { CharacterAttributesApiService } from '@/api/characters/character-attributes.api.servive';
import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { MenuFlutuanteComponent } from '@/shared/components/character/floating-menu/floating-menu.component';
import { PageHeaderComponent } from '@/shared/components/page-header/page-header.component';
import { ToastService } from '@/shared/components/toast/toast.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { AttributesTypePage } from './atributes.types';
import { AttributesViewComponent } from './attributes-view/attributes-view.component';
import { AttributesEditComponent } from './attributes-edit/attributes-edit.component';

@Component({
  selector: 'app-attributes.page',
  imports: [
    MenuFlutuanteComponent,
    PageHeaderComponent,
    TranslateModule,
    AttributesViewComponent,
    AttributesEditComponent,
    CommonModule,
  ],
  templateUrl: './attributes.page.html',
  standalone: true,
})
export class AttributesPage extends BaseTranslateComponent implements OnInit {
  private readonly characterAttributesApi = inject(
    CharacterAttributesApiService,
  );
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  public isEditMode = false;
  public navigateCloseTo: string = '';

  characterId!: string;
  attributes: AttributesTypePage | null = null;

  constructor() {
    super(inject(TranslateService), inject(ActivatedRoute));

    this.route = inject(ActivatedRoute);
    this.router = inject(Router);

    const currentUrl = this.router.url;

    this.isEditMode = currentUrl.endsWith('/edit') || false;
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

    const currentUrl = this.router.url;
    this.navigateCloseTo = currentUrl.replace(/\/edit$/, '');

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        const routePath = this.route.snapshot.routeConfig?.path;

        this.isEditMode =
          currentUrl.endsWith('/edit') ||
          routePath?.includes('create') ||
          false;

        this.navigateCloseTo = currentUrl.replace(/\/edit$/, '');
      });
  }

  reloadCharacters(): void {
    if (this.characterId) {
      this.characterAttributesApi
        .characterAttributes(this.characterId)
        .subscribe({
          next: (response) => {
            this.attributes = {
              ...response,
              conPercentTotal: (response.con + (response?.conMod ?? 0)) * 4,
              frPercentTotal: (response.fr + (response?.frMod ?? 0)) * 4,
              dexPercentTotal: (response.dex + (response?.dexMod ?? 0)) * 4,
              agiPercentTotal: (response.agi + (response?.agiMod ?? 0)) * 4,
              intPercentTotal: (response.int + (response?.intMod ?? 0)) * 4,
              willPercentTotal: (response.will + (response?.willMod ?? 0)) * 4,
              perPercentTotal: (response.per + (response?.perMod ?? 0)) * 4,
              carPercentTotal: (response.car + (response?.carMod ?? 0)) * 4,
              conPercent: (response?.con ?? 0) * 4,
              frPercent: (response?.fr ?? 0) * 4,
              dexPercent: (response?.dex ?? 0) * 4,
              agiPercent: (response?.agi ?? 0) * 4,
              intPercent: (response?.int ?? 0) * 4,
              willPercent: (response?.will ?? 0) * 4,
              perPercent: (response?.per ?? 0) * 4,
              carPercent: (response?.car ?? 0) * 4,
              conPercentMod: (response?.conMod ?? 0) * 4,
              frPercentMod: (response?.frMod ?? 0) * 4,
              dexPercentMod: (response?.dexMod ?? 0) * 4,
              agiPercentMod: (response?.agiMod ?? 0) * 4,
              intPercentMod: (response?.intMod ?? 0) * 4,
              willPercentMod: (response?.willMod ?? 0) * 4,
              perPercentMod: (response?.perMod ?? 0) * 4,
              carPercentMod: (response?.carMod ?? 0) * 4,
            };

            console.log(this.attributes);
          },
          error: (err) => {
            if (err?.status == 404) return;
            this.toast.error(err?.error?.title);
          },
        });
    }
  }
}
