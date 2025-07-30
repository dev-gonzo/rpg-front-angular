import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonSize, ButtonStyle } from './button-icon.types';

@Component({
  selector: 'app-button-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-icon.component.html',
})
export class ButtonIconComponent {
  @Input() label?: string;
  @Input() size: ButtonSize = 'md';
  @Input() color: ButtonStyle = 'solid';

  get sizeClass(): string {
    switch (this.size) {
      case 'xs': return 'w-6 h-6 text-xs';
      case 'sm': return 'w-10 h-10 text-sm';
      case 'lg': return 'w-16 h-16 text-xl';
      case 'md':
      default: return 'w-14 h-14 text-base';
    }
  }

  get colorClass(): string {
    return this.color === 'outline'
      ? 'border border-primary text-primary bg-transparent'
      : 'bg-primary text-white';
  }
}