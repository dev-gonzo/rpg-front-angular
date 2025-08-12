import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { FormValidatorService } from '@/core/forms/form-validator.service';
import { TypedFormGroup } from '@/core/types/forms';
import { createFormFromSchema } from '@/core/utils/create-form-from-schema';
import { InputComponent } from '@/shared/components/form/input/input.component';
import { ToastService } from '@/shared/components/toast/toast.service';
import { ThemeService } from '@/design/theme/theme.service';

import { createRegisterSchema, RegisterFormData } from './register.schema';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    TranslateModule,
  ],
  templateUrl: './register.page.html',
})
export class RegisterPage extends BaseTranslateComponent implements OnInit {
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly validator = inject(FormValidatorService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  readonly theme = inject(ThemeService);

  form?: TypedFormGroup<RegisterFormData>;
  isSubmitting = false;

  ngOnInit(): void {
    const { form } = createFormFromSchema(
      createRegisterSchema(this.translate),
      this.onSubmit.bind(this),
    );

    this.form = form;
    requestAnimationFrame(() => this.cdRef.detectChanges());
  }

  async onSubmit(): Promise<void> {
    if (!this.form || this.isSubmitting) return;

    this.isSubmitting = true;
    const schema = createRegisterSchema(this.translate);

    const result = await this.validator.validateForm(this.form, schema);

    if (!result.success) {
      this.isSubmitting = false;
      return;
    }

    try {
      // TODO: Implementar chamada para API de cadastro
      const formData = result.data;
      
      console.log('Dados do cadastro:', formData);
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.translate.get('MSG.REGISTER.SUCCESS').subscribe((msg) => {
        this.toast.success(msg);
      });

      // Redirecionar para login após cadastro bem-sucedido
      this.router.navigate(['/auth/login']);
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
      
      this.translate.get('MSG.REGISTER.ERROR').subscribe((msg) => {
        this.toast.error(msg);
      });
    } finally {
      this.isSubmitting = false;
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}