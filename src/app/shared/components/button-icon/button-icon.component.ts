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
  @Input() badge?: string;
  @Input() size: ButtonSize = 'md';
  @Input() color: ButtonStyle = 'primary';

  get sizeClass(): string {
    switch (this.size) {
      case 'xs':
        return 'btn-circle-xs';
      case 'sm':
        return 'btn-circle-sm';
      case 'lg':
        return 'btn-circle-lg';
      case 'md':
        return 'btn-circle-md';
      default:
        return 'btn-circle-md';
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
