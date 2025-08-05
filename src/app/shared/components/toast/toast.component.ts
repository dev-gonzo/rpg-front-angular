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
    'bg-success': this.toast.type() === 'success',
    'bg-danger': this.toast.type() === 'error',
    'bg-info': this.toast.type() === 'info',
  }));
}
