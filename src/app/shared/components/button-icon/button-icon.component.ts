import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  imports: [CommonModule],
  templateUrl: './button-icon.component.html',
  standalone: true,
})
export class ButtonIconComponent {
  @Input() label: string = '';
}
