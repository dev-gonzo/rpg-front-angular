import * as yup from 'yup';
import { createFormFromSchema } from './createFormFromSchema';

describe('createFormFromSchema', () => {
  const schema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    age: yup
      .number()
      .min(18, 'Idade mínima é 18')
      .required('Idade é obrigatória'),
    active: yup.boolean().default(false),
  });

  it('deve criar um formulário com valores iniciais', () => {
    const handler = createFormFromSchema(schema, () => {}, {
      name: 'João',
      age: 25,
    });

    expect(handler.form.value).toEqual({
      name: 'João',
      age: 25,
      active: false,
    });
  });

  it('deve criar um formulário com valores padrão', () => {
    const handler = createFormFromSchema(schema, () => {});

    expect(handler.form.value).toEqual({
      name: '',
      age: null,
      active: false,
    });
  });

  it('deve submeter dados válidos e chamar callback', async () => {
    const onValid = jasmine.createSpy('onValid');
    const handler = createFormFromSchema(schema, onValid);

    handler.form.setValue({
      name: 'Maria',
      age: 30,
      active: true,
    });

    const result = await handler.submit();

    expect(result).toEqual({
      name: 'Maria',
      age: 30,
      active: true,
    });
    expect(onValid).toHaveBeenCalledWith(result);
  });

  it('deve capturar erros de validação no formulário', async () => {
    const onValid = jasmine.createSpy('onValid');
    const handler = createFormFromSchema(schema, onValid);

    handler.form.setValue({
      name: '',
      age: 16,
      active: false,
    });

    const result = await handler.submit();

    expect(result).toBeUndefined();
    expect(handler.form.get('name')?.errors?.['message']).toBe(
      'Nome é obrigatório',
    );
    expect(handler.form.get('age')?.errors?.['message']).toBe(
      'Idade mínima é 18',
    );
    expect(onValid).not.toHaveBeenCalled();
  });
});
