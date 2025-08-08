import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColumnHostClass } from '../../abstract/ColumnHostClass';
import { IconPlusComponent } from "../../icons/plus-icon.component";
import { IconMinusComponent } from "../../icons/minus-icon.component";

@Component({
  selector: 'app-form-input-number',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconPlusComponent, IconMinusComponent],
  templateUrl: './input-number.component.html',
})
export class InputNumberComponent extends ColumnHostClass {
  @Input({ required: true }) control!: FormControl<any>;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() id?: string;
  @Input() minValue: number = 0;
  @Input() maxValue: number | undefined = undefined;

  type: 'text' = 'text';

  get inputId(): string {
    return this.id ?? `input-${this.label.toLowerCase().replace(/\s+/g, '-')}`;
  }

  get error(): string | null {
    if (!this.control?.touched || !this.control.errors) return null;

    const errors = this.control.errors;
    return typeof errors['schema'] === 'string' ? errors['schema'] : null;
  }

  handlePlus() {
    const c = this.control as FormControl<number | null>;
    const curr = c.value ?? 0;
    c.setValue(!this.maxValue || this.maxValue > curr ? curr + 1 : curr);
  }

  handleMinus() {
    const c = this.control as FormControl<number | null>;
    const curr = c.value ?? this.minValue;
    c.setValue(curr > this.minValue ? curr - 1 : this.minValue);
  }
}
