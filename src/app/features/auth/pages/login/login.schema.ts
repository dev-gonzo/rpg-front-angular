import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('O e-mail é obrigatório')
    .min(3, 'Mínimo de 3 caracteres'),
  password: yup.string().required('O Senha é obrigatório'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
