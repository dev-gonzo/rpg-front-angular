import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthApiService } from '@/api/auth/auth.api.service';
import { AuthService } from '@/auth/service/auth.service';
import { FormValidatorService } from '@/core/services/form-validation/form-validator.service';
import { TypedFormGroup } from '@/core/types/forms';
import { createFormFromSchema } from '@/core/utils/createFormFromSchema';
import { InputComponent } from '@/shared/components/form/input/input.component';
import { ToastService } from '@/shared/components/toast/toast.service';
import { LoginFormData, loginSchema } from './login.schema';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.page.html',
})
export class HomePrivatePage implements OnInit {
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly validator = inject(FormValidatorService);
  private readonly authApi = inject(AuthApiService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  form!: TypedFormGroup<LoginFormData>;

  ngOnInit(): void {
    const { form } = createFormFromSchema(
      loginSchema,
      this.onSubmit.bind(this),
    );
    this.form = form;

    requestAnimationFrame(() => this.cdRef.detectChanges());
  }

  async onSubmit(): Promise<void> {
    const result = await this.validator.validateForm(this.form, loginSchema);

    if (!result.success) {
      this.form.markAllAsTouched();
      this.cdRef.detectChanges();
      return;
    }

    this.authApi.login(this.form.value as LoginFormData).subscribe({
      next: ({ token }) => {
        this.auth.setToken(token);
        this.router.navigate(['/home']);
        this.toast.success('Login efetuado!');
      },
      error: () => {
        this.toast.error('E-mail ou senha inválidos');
      },
    });
  }
}
