import * as yup from 'yup';
import { TranslateService } from '@ngx-translate/core';

export function createInfoEditSchema(translate: TranslateService) {
  return yup.object({
    name: yup.string().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: translate.instant('CHARACTER.NAME'),
      }),
    ),
    profession: yup.string().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: translate.instant('CHARACTER.PROFESSION'),
      }),
    ),
    birthDate: yup.string().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: translate.instant('CHARACTER.BIRTHDATE'),
      }),
    ),
    birthPlace: yup.string().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: translate.instant('CHARACTER.BIRTHPLACE'),
      }),
    ),
    gender: yup.string().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: translate.instant('CHARACTER.GENDER'),
      }),
    ),
    age: yup.number().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: translate.instant('CHARACTER.AGE'),
      }),
    ),

    apparentAge: yup.number().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: translate.instant('CHARACTER.APPARENTAGE'),
      }),
    ),
    heightCm: yup.number().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: translate.instant('CHARACTER.HEIGHTCM'),
      }),
    ),
    weightKg: yup.number().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: translate.instant('CHARACTER.WEIGHTKG'),
      }),
    ),
    religion: yup.string().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: translate.instant('CHARACTER.RELIGION'),
      }),
    ),
  });
}

export type InfoEditFormData = yup.InferType<
  ReturnType<typeof createInfoEditSchema>
>;
