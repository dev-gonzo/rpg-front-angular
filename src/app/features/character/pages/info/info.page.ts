import { Component } from '@angular/core';
import { MenuFlutuanteComponent } from '@/shared/components/character/floating-menu/floating-menu.component';
import { PageHeaderComponent } from '@/shared/components/page-header/page-header.component';
import { InfoViewComponent } from './info-view/info-view.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-info.page',
  imports: [
    MenuFlutuanteComponent,
    PageHeaderComponent,
    InfoViewComponent,
    TranslateModule,
  ],
  templateUrl: './info.page.html',
  standalone: true,
})
export class InfoPage {}
