import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  toast = inject(ToastService);

  cssClass = computed(() => ({
    'bg-green-900': this.toast.type() === 'success',
    'bg-red-900': this.toast.type() === 'error',
    'bg-blue-600': this.toast.type() === 'info',
  }));
}
