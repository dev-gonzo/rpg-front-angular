import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  @Input({ required: true }) control!: AbstractControl;
  @Input() label = '';
  @Input() id?: string;

  get checkboxId(): string {
    return (
      this.id ?? `checkbox-${this.label.toLowerCase().replace(/\s+/g, '-')}`
    );
  }

  get value(): boolean {
    return !!this.control?.value;
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

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.control.setValue(input.checked);
    this.control.markAsTouched();
    this.control.markAsDirty();
  }
}
