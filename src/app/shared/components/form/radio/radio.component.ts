import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

export interface RadioOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-form-radio',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './radio.component.html',
})
export class RadioComponent {
  @Input({ required: true }) control!: AbstractControl;
  @Input() label = '';
  @Input() name = '';
  @Input() options: RadioOption[] = [];

  get value(): string | number | null {
    return this.control?.value;
  }

  get disabled(): boolean {
    return this.control?.disabled ?? false;
  }

  get error(): string | null {
    if (!this.control || !this.control.touched || !this.control.errors) {
      return null;
    }

    const errors = this.control.errors;
    if (typeof errors['schema'] === 'string') {
      return errors['schema'];
    }

    return null;
  }

  select(value: string | number): void {
    if (this.disabled) return;
    this.control.setValue(value);
    this.control.markAsTouched();
    this.control.markAsDirty();
  }
}
