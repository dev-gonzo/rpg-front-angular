import * as yup from 'yup';
import { TranslateService } from '@ngx-translate/core';

export function createCharacterAttributesSchema(translate: TranslateService) {
  return yup.object({
    con: yup.number().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: 'CON',
      }),
    ),
    fr: yup.number().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: 'FR',
      }),
    ),
    dex: yup.number().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: 'DEX',
      }),
    ),
    agi: yup.number().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: 'AGI',
      }),
    ),
    int: yup.number().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: 'INT',
      }),
    ),
    will: yup.number().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: 'WILL',
      }),
    ),
    per: yup.number().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: 'PER',
      }),
    ),
    car: yup.number().required(() =>
      translate.instant('VALIDATION.REQUIRED', {
        field: 'CAR',
      }),
    ),

    conMod: yup.number().required(),
    frMod: yup.number().required(),
    dexMod: yup.number().required(),
    agiMod: yup.number().required(),
    intMod: yup.number().required(),
    willMod: yup.number().required(),
    perMod: yup.number().required(),
    carMod: yup.number().required(),
  });
}

export type CharacterAttributesFormData = yup.InferType<
  ReturnType<typeof createCharacterAttributesSchema>
>;
