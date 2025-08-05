import { TranslateTextComponent } from '@/shared/components/TranslateTextComponent/translate-text.component';
import { Component, Directive } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Directive({})
export abstract class BaseTranslateComponent {
  constructor(public translate: TranslateService) {}
}
