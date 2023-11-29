import { boolean, InferType, mixed, number, object, ref, string } from 'yup';
import {
  COUNTRIES,
  GENDERS,
  MAX_FILE_SIZE,
  VALID_FILE_EXTENSIONS,
} from '@/constants/constants';
import {
  isValidImageSize,
  isValidImageType,
} from '@/helpers/validationHelpers';

const name = {
  name: string()
    .required()
    .typeError('Field is required')
    .min(1)
    .matches(/^[A-Z]/, 'First letter must be Uppercase'),
};

const age = {
  age: number()
    .required()
    .typeError('Field is required')
    .positive('Age must be positive')
    .integer(),
};

const email = {
  email: string()
    .required()
    .typeError('Field is required')
    .email('You should provide correct email'),
};

const passwordSchema = string()
  .required()
  .typeError('Field is required')
  .matches(/^\S.*\S$/, 'Must not contain leading or trailing whitespace')
  .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
  .matches(/^(?=.*[A-Z])/, 'Must contain at least one Uppercase character')
  .matches(/^(?=.*[0-9])/, 'Must contain at least oOne number character')
  .matches(
    /^(?=.*[@$!%*#?&])/,
    'Must contain at least one special character (@$!%*#?&)',
  )
  .min(8, 'Must have minimum eight characters');

const password = { password: passwordSchema };

const passwordConfirm = {
  passwordConfirm: passwordSchema.oneOf(
    [ref('password')],
    'Your passwords are not the same',
  ),
};

const gender = {
  gender: string().required().typeError('Field is required').oneOf(GENDERS),
};

const accept = { accept: boolean().required().typeError('You should accept') };

const country = {
  country: string().required().typeError('Field is required').oneOf(COUNTRIES),
};

const image = {
  image: mixed()
    .test(
      'isValidType',
      `Allowed extensions are: ${VALID_FILE_EXTENSIONS.toString()}`,
      (value) => isValidImageType(value),
    )
    .test('isValidSize', `Max file size is ${MAX_FILE_SIZE} bytes`, (value) =>
      isValidImageSize(value),
    ),
};

export const formSchema = object({
  ...name,
  ...age,
  ...email,
  ...password,
  ...passwordConfirm,
  ...gender,
  ...accept,
  ...image,
  ...country,
}).required();

export type FormSchemaType = InferType<typeof formSchema>;
