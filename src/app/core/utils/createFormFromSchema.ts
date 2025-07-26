import { FormBuilder, FormGroup } from '@angular/forms';
import * as yup from 'yup';

interface YupFieldDescription {
  type: string;
  default?: unknown;
}

type YupFieldsMap = Record<string, YupFieldDescription>;

export interface FormHandler<T extends yup.Maybe<yup.AnyObject>> {
  form: FormGroup;
  submit: () => Promise<T | undefined>;
}

export function createFormFromSchema<T extends yup.Maybe<yup.AnyObject>>(
  schema: yup.ObjectSchema<T>,
  onValid: (data: T) => void
): FormHandler<T> {
  const fb = new FormBuilder();
  const mergedShape: Record<string, [unknown]> = {};
  const shape = schema.describe().fields as YupFieldsMap;

  for (const key in shape) {
    const field = shape[key];

    let defaultValue: unknown;
    switch (field.type) {
      case 'number':
        defaultValue = null;
        break;
      case 'boolean':
        defaultValue = false;
        break;
      case 'array':
        defaultValue = [];
        break;
      case 'object':
        defaultValue = {};
        break;
      default:
        defaultValue = '';
    }

    mergedShape[key] = [defaultValue];
  }

  const form = fb.group(mergedShape);

  async function submit(): Promise<T | undefined> {
    try {
      const parsed = await schema.validate(form.value, {
        abortEarly: false,
      });

      onValid(parsed as T);
      return parsed as T;
    } catch (err: unknown) {
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((e) => {
          if (e.path) {
            form.get(e.path)?.setErrors({ schema: e.message });
          }
        });
        form.markAllAsTouched();
      }
    }

    return undefined;
  }

  return { form, submit };
}
