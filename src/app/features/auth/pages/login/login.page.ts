import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthApiService } from '@/api/auth/auth.api.service';
import { AuthService } from '@/auth/service/auth.service';
import { BaseTranslateComponent } from '@/core/base/base-translate.component';
import { FormValidatorService } from '@/core/forms/form-validator.service';
import { TypedFormGroup } from '@/core/types/forms';
import { createFormFromSchema } from '@/core/utils/create-form-from-schema';
import { InputComponent } from '@/shared/components/form/input/input.component';
import { ToastService } from '@/shared/components/toast/toast.service';
import { TranslateModule } from '@ngx-translate/core';
import { createLoginSchema, LoginFormData } from './login.schema';
import { API_BASE_URL } from '@/core/tokens/api-base-url.token';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './login.page.html',
})
export class LoginPage extends BaseTranslateComponent implements OnInit {
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly validator = inject(FormValidatorService);
  private readonly authApi = inject(AuthApiService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  loginSchema!: ReturnType<typeof createLoginSchema>;

  form!: TypedFormGroup<LoginFormData>;

  ngOnInit(): void {
    const { form } = createFormFromSchema(
      createLoginSchema(this.translate), // idioma atual
      this.onSubmit.bind(this),
    );

    this.form = form;
    requestAnimationFrame(() => this.cdRef.detectChanges());
  }

  async onSubmit(): Promise<void> {
    const schema = createLoginSchema(this.translate); // ← sempre chama de novo

    const result = await this.validator.validateForm(this.form, schema);

    if (!result.success) {
      this.form.markAllAsTouched();
      this.cdRef.detectChanges();
      return;
    }

    this.authApi.login(this.form.value as LoginFormData).subscribe({
      next: ({ token }) => {
        this.auth.setToken(token);
        this.router.navigate(['/home']);
        this.toast.success(this.translate.instant('MSG.LOGIN.SUCCESS'));
      },
      error: (err) => {
        const msg =
          err.status === 401
            ? this.translate.instant('MSG.LOGIN.INVALID')
            : this.translate.instant('MSG.LOGIN.ERROR');
        this.toast.error(msg);
      },
    });
  }
}
