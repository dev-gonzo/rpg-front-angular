import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
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
})
export class AutocompleteComponent implements OnInit {
  @Input({ required: true }) control!: AbstractControl;
  @Input() label = '';
  @Input() options: AutocompleteOption[] = [];
  @Input() placeholder = 'Digite para buscar...';
  @Input() id?: string;

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  filteredOptions: AutocompleteOption[] = [];
  showDropdown = false;

  get inputId(): string {
    return (
      this.id ?? `autocomplete-${this.label.toLowerCase().replace(/\s+/g, '-')}`
    );
  }

  get value(): string {
    return this.control?.value ?? '';
  }

  get error(): string | null {
    if (!this.control || !this.control.touched || !this.control.errors)
      return null;

    const errors = this.control.errors;

    if (typeof errors['schema'] === 'string') {
      return errors['schema'];
    }

    return null;
  }

  ngOnInit(): void {
    this.filteredOptions = this.options;
  }

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.control.setValue(input);
    this.control.markAsDirty();

    this.filteredOptions = this.options.filter((o) =>
      o.label.toLowerCase().includes(input.toLowerCase()),
    );
    this.showDropdown = true;
  }

  selectOption(option: AutocompleteOption): void {
    this.control.setValue(option.value);
    this.control.markAsTouched();
    this.showDropdown = false;
  }

  get displayLabel(): string {
    const val = this.control?.value;
    const selected = this.options.find((o) => o.value === val);
    return selected?.label ?? val ?? '';
  }

  onBlur(): void {
    setTimeout(() => {
      this.showDropdown = false;
      this.control.markAsTouched();
    }, 150);
  }
}
