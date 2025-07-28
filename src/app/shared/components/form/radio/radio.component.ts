import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule
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
  @Input({ required: true }) control!: FormControl;
  @Input() label = '';
  @Input() name = '';
  @Input() options: RadioOption[] = [];

  get error(): string | null {
    if (!this.control || !this.control.touched || !this.control.errors) {
      return null;
    }

    const errors = this.control.errors;
    return typeof errors['schema'] === 'string' ? errors['schema'] : null;
  }
}
