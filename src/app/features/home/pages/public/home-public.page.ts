import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-home-public',
  imports: [CommonModule, TranslateModule],
  templateUrl: './home-public.page.html',
})
export class HomePublicPage extends BaseTranslateComponent {}
