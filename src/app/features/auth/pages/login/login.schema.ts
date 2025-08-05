import * as yup from 'yup';
import { TranslateService } from '@ngx-translate/core';

export function createLoginSchema(translate: TranslateService) {
  return yup.object({
    email: yup
      .string()
      .required(() => translate.instant('VALIDATION.REQUIRED', { field: 'E-mail' }))
      .email(() => translate.instant('VALIDATION.EMAIL', { field: 'E-mail' }))
      .min(3, () => translate.instant('VALIDATION.MIN_LENGTH', { field: 'E-mail', min: 3 })),
    password: yup
      .string()
      .required(() => translate.instant('VALIDATION.REQUIRED', { field: 'Senha' })),
  });
}

export type LoginFormData = yup.InferType<ReturnType<typeof createLoginSchema>>;
