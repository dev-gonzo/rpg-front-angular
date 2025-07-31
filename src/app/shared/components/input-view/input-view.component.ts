import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-view',
  standalone: true,
  imports: [CommonModule,],
host: { class: 'col-span-2 md:col-span-6 lg:col-span-8' },

  template: `
    <label class="text-xs">{{ label || ' ' }}</label>
    <p class="mb-1"><ng-content />&nbsp;</p>
    <hr />
  `,
})
export class InputViewComponent {
  @Input() label = '';
}
