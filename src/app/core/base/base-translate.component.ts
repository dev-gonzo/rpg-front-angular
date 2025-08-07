import { Directive, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Directive({})
export abstract class BaseTranslateComponent {
  constructor(
    public translate: TranslateService,
    protected route: ActivatedRoute,
  ) {}
}
