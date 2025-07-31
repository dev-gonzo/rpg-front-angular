import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-12 gap-4">
      <ng-content />
    </div>
  `,
})
export class ContainerComponent {}
