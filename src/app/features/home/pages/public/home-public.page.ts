import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-home-public',
  imports: [CommonModule, TranslateModule],
  templateUrl: './home-public.page.html',
})
export class HomePublicPage {
    constructor(public translate: TranslateService) {} // <-- aqui
}
