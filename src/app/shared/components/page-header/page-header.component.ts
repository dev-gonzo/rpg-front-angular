import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonOutlineComponent } from '../button-outline/button-outline.component';

import { PagAction } from './page-header.types';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  imports: [CommonModule, ButtonOutlineComponent],
  standalone: true,
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() showBackButton = false;
  @Input() actions: PagAction[] = [];

  @Output() handleBackAction = new EventEmitter<void>();

  handleBack(): void {
    this.handleBackAction.emit();
  }

  executeAction(action: PagAction): void {
    action.action();
  }
}
