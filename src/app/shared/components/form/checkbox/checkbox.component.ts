import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label = '';
  @Input() id?: string;

  get checkboxId(): string {
    return this.id ?? `checkbox-${this.label.toLowerCase().replace(/\s+/g, '-')}`;
  }

  get error(): string | null {
    if (!this.control || !this.control.touched || !this.control.errors) return null;

    const errors = this.control.errors;
    return typeof errors['schema'] === 'string' ? errors['schema'] : null;
  }
}
