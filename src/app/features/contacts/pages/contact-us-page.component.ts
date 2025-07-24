import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AutocompleteComponent } from '@app/shared/components/form/autocomplete/autocomplete.component';
import { CheckboxComponent } from '@app/shared/components/form/checkbox/checkbox.component';
import { InputComponent } from '@app/shared/components/form/input/input.component';
import { RadioComponent } from '@app/shared/components/form/radio/radio.component';
import { SelectComponent } from '@app/shared/components/form/select/select.component';

@Component({
  standalone: true,
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    AutocompleteComponent,
    CheckboxComponent,
    RadioComponent
  ],
})
export class ContactUsPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly cdRef = inject(ChangeDetectorRef);

  form: FormGroup = this.fb.group({
    nome: [''],
    sobrenome: [''],
    cpf: [''],
    celular: [''],
    email: [''],
    estado: [''],
    cidade: [''],
    aceito: [false],
    membro: ['membro'],
  });

  ngOnInit(): void {
    requestAnimationFrame(() => {
      this.cdRef.detectChanges();
    });
  }

  onSubmit(): void {
    // eslint-disable-next-line no-console
    console.log('Form enviado:', this.form.value);
  }
}
