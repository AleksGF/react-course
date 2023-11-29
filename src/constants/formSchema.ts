import {
  boolean,
  mixed,
  number,
  object,
  ref,
  string,
  type InferType,
} from 'yup';
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

export enum FORM_FIELDS_LABELS {
  NAME = 'Name',
  AGE = 'Age',
  EMAIL = 'Email',
  PASSWORD = 'Password',
  PASSWORD_CONFIRM = 'Confirm Password',
  GENDER = 'Gender',
  ACCEPT = 'Accept T&C',
  COUNTRY = 'Country',
  IMAGE = 'Image',
}

const name = {
  [FORM_FIELDS_LABELS.NAME]: string()
    .required()
    .typeError('Field is required')
    .min(1)
    .matches(/^[A-Z]/, 'First letter must be Uppercase'),
};

const age = {
  [FORM_FIELDS_LABELS.AGE]: number()
    .required()
    .typeError('Field is required')
    .positive('Age must be positive')
    .integer(),
};

const email = {
  [FORM_FIELDS_LABELS.EMAIL]: string()
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

const password = { [FORM_FIELDS_LABELS.PASSWORD]: passwordSchema };

const passwordConfirm = {
  [FORM_FIELDS_LABELS.PASSWORD_CONFIRM]: passwordSchema.oneOf(
    [ref(FORM_FIELDS_LABELS.PASSWORD)],
    'Your passwords are not the same',
  ),
};

const gender = {
  [FORM_FIELDS_LABELS.GENDER]: string()
    .required()
    .typeError('Field is required')
    .oneOf(GENDERS),
};

const accept = {
  [FORM_FIELDS_LABELS.ACCEPT]: boolean()
    .required()
    .typeError('You have to accept'),
};

const country = {
  [FORM_FIELDS_LABELS.COUNTRY]: string()
    .required()
    .typeError('Field is required')
    .oneOf(COUNTRIES, `You must choose ${[FORM_FIELDS_LABELS.COUNTRY]}`),
};

const image = {
  [FORM_FIELDS_LABELS.IMAGE]: mixed()
    .test(
      'isUploaded',
      'You should upload image',
      (value) => !!(value as FileList)?.length,
    )
    .test(
      'isValidType',
      `Allowed extensions are: ${VALID_FILE_EXTENSIONS.toString()}`,
      (value) => (value ? isValidImageType((value as FileList)[0]) : false),
    )
    .test('isValidSize', `Max file size is ${MAX_FILE_SIZE} bytes`, (value) =>
      value ? isValidImageSize((value as FileList)[0]) : false,
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
