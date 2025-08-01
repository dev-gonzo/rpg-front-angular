import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-view',
  standalone: true,
  imports: [CommonModule],
  host: { class: 'col-12 col-md-6 col-lg-8' }, 

  template: `
    <label class="form-label text-xs">{{ label || ' ' }}</label>
    <p class="mb-2"><ng-content />&nbsp;</p>
    <hr class="theme-border" />
  `,
})
export class InputViewComponent {
  @Input() label = '';
}
