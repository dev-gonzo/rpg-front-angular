import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

@Injectable({ providedIn: 'root' })
export class ToastService {
  message = signal<string | null>(null);
  type = signal<ToastType>('info');
  visible = signal(false);

  show(msg: string, type: ToastType = 'info'): void {
    this.message.set(msg);
    this.type.set(type);
    this.visible.set(true);
    setTimeout(() => this.visible.set(false), 4000);
  }

  success(msg: string): void {
    this.show(msg, 'success');
  }
  error(msg: string): void {
    this.show(msg, 'error');
  }
  info(msg: string): void {
    this.show(msg, 'info');
  }
}
