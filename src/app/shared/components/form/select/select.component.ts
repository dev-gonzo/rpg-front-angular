import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Selecione';
  @Input() id?: string;

  value: string | number | null = '';
  disabled = false;

  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  get selectId(): string {
    return this.id ?? `select-${this.label.toLowerCase().replace(/\s+/g, '-')}`;
  }

  writeValue(value: string | number | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectedValue = select.value === '' ? null : select.value;
    this.value = selectedValue;
    this.onChange(selectedValue);
  }

  onBlur(): void {
    this.onTouched();
  }
}
