import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { TranslateTextComponent } from "@/shared/components/TranslateTextComponent/translate-text.component";

@Component({
  standalone: true,
  selector: 'app-home-public',
  imports: [CommonModule, TranslateTextComponent],
  templateUrl: './home-public.page.html',
})
export class HomePublicPage extends BaseTranslateComponent {}
