import { Component } from '@angular/core';
import { MenuFlutuanteComponent } from '@/shared/components/character/floating-menu/floating-menu.component';
import { PageHeaderComponent } from "@/shared/components/page-header/page-header.component";
import { InfoViewComponent } from "./info-view/info-view.component";

@Component({
  selector: 'app-info.page',
  imports: [MenuFlutuanteComponent, PageHeaderComponent, InfoViewComponent],
  templateUrl: './info.page.html',
  standalone: true,
})
export class InfoPage {}
