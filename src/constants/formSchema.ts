import { boolean, mixed, number, object, ref, string } from 'yup';
import {
  isValidImageSize,
  isValidImageType,
} from '@/helpers/validationHelpers';
import {
  Gender,
  GENDERS,
  MAX_FILE_SIZE,
  VALID_FILE_EXTENSIONS,
} from '@/constants/constants';
import { COUNTRIES } from '@/constants/countries';

export enum FORM_FIELDS_LABELS {
  NAME = 'Name',
  AGE = 'Age',
  EMAIL = 'Email',
  PASSWORD = 'Password',
  PASSWORD_CONFIRM = 'Confirm Password',
  GENDER = 'Gender',
  IMAGE = 'Image',
  ACCEPT = 'Accept T&C',
  COUNTRY = 'Country',
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
  .matches(/^(?=.*[0-9])/, 'Must contain at least one number character')
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

const image = {
  [FORM_FIELDS_LABELS.IMAGE]: mixed()
    .required()
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

const accept = {
  [FORM_FIELDS_LABELS.ACCEPT]: boolean()
    .required()
    .test('isAccepted', 'You have to accept', (value) => value)
    .typeError('You have to accept'),
};

const country = {
  [FORM_FIELDS_LABELS.COUNTRY]: string()
    .required()
    .typeError('Field is required')
    .oneOf(COUNTRIES, `You must choose ${[FORM_FIELDS_LABELS.COUNTRY]}`),
};

export const formSchema = object({
  ...name,
  ...age,
  ...email,
  ...password,
  ...passwordConfirm,
  ...gender,
  ...image,
  ...accept,
  ...country,
}).required();

export interface FormFields {
  [FORM_FIELDS_LABELS.NAME]: string;
  [FORM_FIELDS_LABELS.AGE]: number;
  [FORM_FIELDS_LABELS.EMAIL]: string;
  [FORM_FIELDS_LABELS.PASSWORD]: string;
  [FORM_FIELDS_LABELS.PASSWORD_CONFIRM]: string;
  [FORM_FIELDS_LABELS.GENDER]: Gender;
  [FORM_FIELDS_LABELS.IMAGE]: object;
  [FORM_FIELDS_LABELS.ACCEPT]: NonNullable<boolean | undefined>;
  [FORM_FIELDS_LABELS.COUNTRY]: string;
}
