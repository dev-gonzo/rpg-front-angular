import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input({ required: true }) control!: FormControl<string | null>;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' = 'text';
  @Input() id?: string;
  @Input() mask?: string;

  get inputId(): string {
    return this.id ?? `input-${this.label.toLowerCase().replace(/\s+/g, '-')}`;
  }

  get error(): string | null {
    if (!this.control?.touched || !this.control.errors) return null;

    const errors = this.control.errors;
    return typeof errors['schema'] === 'string' ? errors['schema'] : null;
  }
}
