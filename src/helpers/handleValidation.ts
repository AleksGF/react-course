import {
  FORM_FIELDS_LABELS,
  formSchema,
  type FormType,
} from '@/constants/formSchema';
import { handleDataDispatch } from '@/helpers/handleDataDispatch';
import type { ValidationError } from 'yup';
import type { Dispatch, SetStateAction } from 'react';
import type { AppDispatch } from '@/store/store';
import type { NavigateFunction } from 'react-router';

export const handleValidation = (
  dataObj: Record<string, unknown> | null,
  setFieldErrors: Dispatch<
    SetStateAction<Partial<Record<FORM_FIELDS_LABELS, string>>>
  >,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) => {
  formSchema
    .validate(dataObj, { abortEarly: false })
    .then(handleDataDispatch(dispatch, navigate))
    .catch((error) => {
      const errors: Partial<Record<keyof FormType, string>> = {};

      (error.inner as ValidationError[]).forEach((errorItem) => {
        const key = errorItem.path as keyof FormType;

        if (!errors[key]) errors[key] = errorItem.message;
      });

      setFieldErrors(errors);
    });
};
