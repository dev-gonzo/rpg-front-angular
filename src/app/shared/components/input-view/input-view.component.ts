import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ColumnHostClass } from '../abstract/ColumnHostClass';

@Component({
  selector: 'app-input-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="form-label text-xs">{{ label || '' }}</label>
    <p class="mb-2"><ng-content />&nbsp;</p>
    <hr class="theme-border" />
  `,
})
export class InputViewComponent extends ColumnHostClass {
  override col = 12;
  override colMd = 6;
  // override colLg = 2;
  @Input() label = '';
}
