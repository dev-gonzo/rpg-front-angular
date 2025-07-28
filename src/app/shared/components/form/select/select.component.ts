import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label = '';
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Selecione';
  @Input() id?: string;

  get selectId(): string {
    return this.id ?? `select-${this.label.toLowerCase().replace(/\s+/g, '-')}`;
  }

  get error(): string | null {
    if (!this.control || !this.control.touched || !this.control.errors) {
      return null;
    }

    const errors = this.control.errors;
    return typeof errors['schema'] === 'string' ? errors['schema'] : null;
  }

  onBlur(): void {
    this.control.markAsTouched();
  }
}
