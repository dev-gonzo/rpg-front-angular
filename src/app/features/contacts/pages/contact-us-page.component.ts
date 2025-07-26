import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  createFormFromSchema
} from '@app/core/utils/createFormFromSchema';
import {
  AutocompleteComponent,
  AutocompleteOption,
} from '@app/shared/components/form/autocomplete/autocomplete.component';
import { CheckboxComponent } from '@app/shared/components/form/checkbox/checkbox.component';
import { InputComponent } from '@app/shared/components/form/input/input.component';
import {
  RadioComponent,
  RadioOption,
} from '@app/shared/components/form/radio/radio.component';
import {
  SelectComponent,
  SelectOption,
} from '@app/shared/components/form/select/select.component';
import { FormValidatorService } from '@app/shared/services/form-validation/form-validator.service';

import { contactUsSchema } from './contact-us.schema';

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
    RadioComponent,
  ],
})
export class ContactUsPageComponent implements OnInit, OnDestroy {
  
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly validator = inject(FormValidatorService);
  private errorSub?: Subscription;

  selectOptions: SelectOption[] = [
    { label: 'SP', value: 'sp' },
    { label: 'RJ', value: 'rj' },
    { label: 'MG', value: 'mg' },
  ];

  cidades: AutocompleteOption[] = [
    { label: 'São Paulo', value: 'sao-paulo' },
    { label: 'Rio de Janeiro', value: 'rio-de-janeiro' },
    { label: 'Belo Horizonte', value: 'belo-horizonte' },
    { label: 'Curitiba', value: 'curitiba' },
    { label: 'Porto Alegre', value: 'porto-alegre' },
  ];

  opcoesUsuario: RadioOption[] = [
    { label: 'Aluno', value: 'aluno' },
    { label: 'Professor', value: 'professor' },
    { label: 'Administrador', value: 'admin' },
  ];

  form!: FormGroup;

  ngOnInit(): void {
    const { form } = createFormFromSchema(
      contactUsSchema,
      this.onSubmit.bind(this),
    );
    this.form = form;

    requestAnimationFrame(() => this.cdRef.detectChanges());
  }

  ngOnDestroy(): void {
    this.errorSub?.unsubscribe();
  }

  async onSubmit(): Promise<void> {
    const result = await this.validator.validateForm(
      this.form,
      contactUsSchema,
    );

    if (result.success) {
      // eslint-disable-next-line no-console
      console.log('Dados válidos:', this.form.value);
    } else {
      // eslint-disable-next-line no-console
      console.log('Erros form:', result.errors);
      this.form.markAllAsTouched();
      this.cdRef.detectChanges();
    }
  }
}
