import * as yup from 'yup';
import { TranslateService } from '@ngx-translate/core';

export function createInfoEditSchema(translate: TranslateService) {
  return yup.object({
    name: yup.string().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: translate.instant('CHARACTER.NAME'),
      }),
    ),

    profession: yup.string().notRequired(),
    birthDate: yup.string().notRequired(),
    birthPlace: yup.string().notRequired(),
    gender: yup.string().notRequired(),
    age: yup.number().notRequired(),
    apparentAge: yup.number().notRequired(),
    heightCm: yup.number().notRequired(),
    weightKg: yup.number().notRequired(),
    religion: yup.string().notRequired(),
  });
}

export type InfoEditFormData = yup.InferType<
  ReturnType<typeof createInfoEditSchema>
>;
