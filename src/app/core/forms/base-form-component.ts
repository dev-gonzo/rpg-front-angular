import { ChangeDetectorRef, Directive, OnInit, inject } from '@angular/core';
import { TypedFormGroup } from '@/core/types/forms';
import { createFormFromSchema } from '@/core/utils/createFormFromSchema';
import { ToastService } from '@/shared/components/toast/toast.service';
import * as yup from 'yup';
import { Observable, isObservable } from 'rxjs';
import { FormValidatorService } from './form-validator.service';

@Directive()
export abstract class BaseFormComponent<T extends object> implements OnInit {
  form!: TypedFormGroup<T>;

  protected readonly cdRef = inject(ChangeDetectorRef);
  protected readonly validator = inject(FormValidatorService);
  protected readonly toast = inject(ToastService);

  /** Schema Yup do formulário */
  protected abstract schema: yup.ObjectSchema<T, yup.AnyObject, any, any>;

  /** Função principal do submit (ex: chamada de API) */
  protected abstract onSubmitCallback(data: T): Observable<any>;

  /** Callbacks opcionais */
  protected onSuccessCallback(res: any): void {
    this.toast.success(this.successMessage);
  }

  protected onErrorCallback(err: any): void {
    this.toast.error(this.errorMessage);
  }

  /** Mensagens padrão que podem ser sobrescritas */
  protected successMessage = 'Operação realizada com sucesso!';
  protected errorMessage = 'Ocorreu um erro. Tente novamente.';

  ngOnInit(): void {
    const { form } = createFormFromSchema(this.schema, this.onSubmit.bind(this));
    this.form = form;

    requestAnimationFrame(() => this.cdRef.detectChanges());
  }

  async onSubmit(): Promise<void> {
    try {
      const validated = await this.schema.validate(this.form.value, { abortEarly: false });

      const observable = this.onSubmitCallback(validated as T);
      if (!isObservable(observable)) {
        throw new Error('onSubmitCallback deve retornar um Observable');
      }

      observable.subscribe({
        next: (res) => this.onSuccessCallback(res),
        error: (err) => this.onErrorCallback(err),
      });
    } catch (validationError: any) {
      if (validationError?.inner?.length) {
        for (const err of validationError.inner) {
          if (err.path) {
            this.form.get(err.path)?.setErrors({ message: err.message });
          }
        }
      }

      this.form.markAllAsTouched();
      this.cdRef.detectChanges();
    }
  }
}
