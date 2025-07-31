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
  @Input() color: ButtonStyle = 'primary';

  get sizeClass(): string {
    switch (this.size) {
      case 'xs':
        return 'w-8 h-8 text-xs';
      case 'sm':
        return 'w-10 h-10 text-sm';
      case 'lg':
        return 'w-16 h-16 text-xl';
      case 'md':
      default:
        return 'w-14 h-14 text-base';
    }
  }

  get colorClass(): string {
    switch (this.color) {
      case 'outline':
        return 'border border-white bg-primary text-white';
      case 'secondary':
        return 'theme-secondary';
      case 'primary':
      default:
        return 'theme-primary';
    }
  }
}
