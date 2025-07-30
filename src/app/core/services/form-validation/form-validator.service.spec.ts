import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as yup from 'yup';

import { FormValidatorService } from './form-validator.service';

describe('FormValidatorService', () => {
  let service: FormValidatorService;
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormValidatorService],
    });

    service = TestBed.inject(FormValidatorService);
    fb = TestBed.inject(FormBuilder);
  });

  const schema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    age: yup.number().min(18, 'Idade mínima é 18').required('Idade é obrigatória'),
  });

  function createForm(values: any = {}) {
    return fb.group({
      name: new FormControl(values.name ?? ''),
      age: new FormControl(values.age ?? null),
    });
  }

  it('deve validar com sucesso quando dados são válidos', async () => {
    const form = createForm({ name: 'João', age: 30 });

    const result = await service.validateForm(form, schema);

    expect(result.success).toBeTrue();
    expect(result.data).toEqual({ name: 'João', age: 30 });
    expect(form.valid).toBeTrue();
  });

  it('deve retornar erros de validação quando dados são inválidos', async () => {
    const form = createForm({ name: '', age: 15 });

    const result = await service.validateForm(form, schema);

    expect(result.success).toBeFalse();
    expect(result.errors).toEqual({
      name: 'Nome é obrigatório',
      age: 'Idade mínima é 18',
    });

    expect(form.get('name')?.errors?.['schema']).toBe('Nome é obrigatório');
    expect(form.get('age')?.errors?.['schema']).toBe('Idade mínima é 18');
  });

  it('deve limpar erros antigos de schema', async () => {
    const form = createForm({ name: '', age: 15 });

    // Primeira validação falha
    await service.validateForm(form, schema);
    expect(form.get('name')?.errors?.['schema']).toBeDefined();

    // Segunda validação com sucesso
    form.setValue({ name: 'Maria', age: 25 });
    const result = await service.validateForm(form, schema);

    expect(result.success).toBeTrue();
    expect(form.get('name')?.errors?.['schema']).toBeUndefined();
    expect(form.get('age')?.errors?.['schema']).toBeUndefined();
  });
});
