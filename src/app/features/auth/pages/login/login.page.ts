import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { createFormFromSchema } from '@app/core/utils/createFormFromSchema';
import { InputComponent } from '@app/shared/components/form/input/input.component';
import { FormValidatorService } from '@app/core/services/form-validation/form-validator.service';
import { AuthApiService } from '@app/api/auth/auth.api.service';
import { AuthService } from '@app/auth/service/auth.service';
import { ToastService } from '@app/shared/components/toast/toast.service';

import { loginSchema } from './login.schema';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  templateUrl: './login.page.html',
})
export class HomePrivatePage implements OnInit {
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly validator = inject(FormValidatorService);
  private readonly authApi = inject(AuthApiService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  form!: FormGroup;

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

    this.authApi.login(this.form.value).subscribe({
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