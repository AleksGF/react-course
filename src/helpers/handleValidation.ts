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
    // .then((data) => {
    //   const file = (data[FORM_FIELDS_LABELS.IMAGE] as FileList)[0];
    //
    //   const reader = new FileReader();
    //
    //   reader.onloadend = () => {
    //     if (!reader.result)
    //       throw new Error(`Error while read file ${file?.name || ''}`);
    //
    //     dispatch(
    //       addFormData({
    //         ...data,
    //         [FORM_FIELDS_LABELS.IMAGE]: {
    //           name: file.name,
    //           content: reader.result as string,
    //         },
    //       }),
    //     );
    //
    //     navigate('/');
    //   };
    //
    //   reader.onerror = () => {
    //     throw new Error(`Error while read file ${file?.name || ''}`);
    //   };
    //
    //   reader.readAsDataURL(file);
    // })
    .catch((error) => {
      const errors: Partial<Record<keyof FormType, string>> = {};

      (error.inner as ValidationError[]).forEach((errorItem) => {
        if (errorItem.path)
          errors[errorItem.path as keyof FormType] = errorItem.message;
      });

      setFieldErrors(errors);
    });
};
