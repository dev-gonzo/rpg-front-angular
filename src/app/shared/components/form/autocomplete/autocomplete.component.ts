import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

export interface AutocompleteOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-form-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './autocomplete.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements ControlValueAccessor, OnInit {
  @Input() label = '';
  @Input() options: AutocompleteOption[] = [];
  @Input() placeholder = 'Digite para buscar...';
  @Input() id?: string;

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  value: string | number | null = '';
  filteredOptions: AutocompleteOption[] = [];

  disabled = false;
  touched = false;
  showDropdown = false;

  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  get inputId(): string {
    return (
      this.id ?? `autocomplete-${this.label.toLowerCase().replace(/\s+/g, '-')}`
    );
  }

  ngOnInit(): void {
    this.filteredOptions = this.options;
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

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.value = input;
    this.filteredOptions = this.options.filter((o) =>
      o.label.toLowerCase().includes(input.toLowerCase()),
    );
    this.showDropdown = true;
    this.onChange(input);
  }

  selectOption(option: AutocompleteOption): void {
    this.value = option.label;
    this.showDropdown = false;
    this.onChange(option.value);
    this.markAsTouched();
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  onBlur(): void {
    setTimeout(() => {
      this.showDropdown = false;
      this.markAsTouched();
    }, 150);
  }
}
