import * as yup from 'yup';

export const contactUsSchema = yup.object({
  nome: yup.string().required('O nome é obrigatório').min(3, 'Mínimo de 3 caracteres'),
  // sobrenome: yup.string().required('O sobrenome é obrigatório'),
  cpf: yup.string().required('O CPF é obrigatório'),
  // celular: yup.string().required('O celular é obrigatório'),
  // email: yup
  //   .string()
  //   .required('O e-mail é obrigatório')
  //   .email('E-mail inválido'),
  estado: yup.string().required('Selecione um estado'),
  cidade: yup.string().required('Selecione uma cidade'),
  aceito: yup
    .boolean()
    .oneOf([true], 'Você deve aceitar os termos'),
  tipoUsuario: yup.string().required('Informe o tipo de vínculo'),
});

export type ContactUsFormData = yup.InferType<typeof contactUsSchema>;
