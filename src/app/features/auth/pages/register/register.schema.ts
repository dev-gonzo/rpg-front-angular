import * as yup from 'yup';
import { TranslateService } from '@ngx-translate/core';

export function createRegisterSchema(translate: TranslateService) {
  return yup.object({
    name: yup
      .string()
      .required(() => translate.instant('VALIDATION.REQUIRED', { field: 'Nome' }))
      .min(2, () => translate.instant('VALIDATION.MIN_LENGTH', { field: 'Nome', min: 2 }))
      .max(100, () => translate.instant('VALIDATION.MAX_LENGTH', { field: 'Nome', max: 100 })),
    email: yup
      .string()
      .required(() => translate.instant('VALIDATION.REQUIRED', { field: 'E-mail' }))
      .email(() => translate.instant('VALIDATION.EMAIL', { field: 'E-mail' }))
      .min(3, () => translate.instant('VALIDATION.MIN_LENGTH', { field: 'E-mail', min: 3 })),
    city: yup
      .string()
      .required(() => translate.instant('VALIDATION.REQUIRED', { field: 'Cidade' }))
      .min(2, () => translate.instant('VALIDATION.MIN_LENGTH', { field: 'Cidade', min: 2 }))
      .max(100, () => translate.instant('VALIDATION.MAX_LENGTH', { field: 'Cidade', max: 100 })),
    country: yup
      .string()
      .required(() => translate.instant('VALIDATION.REQUIRED', { field: 'País' }))
      .min(2, () => translate.instant('VALIDATION.MIN_LENGTH', { field: 'País', min: 2 }))
      .max(100, () => translate.instant('VALIDATION.MAX_LENGTH', { field: 'País', max: 100 })),
  });
}

export type RegisterFormData = yup.InferType<ReturnType<typeof createRegisterSchema>>;