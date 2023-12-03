import { FORM_FIELDS_LABELS, FormType } from '@/constants/formSchema';
import { addFormData } from '@/store/formDataSlice';
import type { AppDispatch } from '@/store/store';
import type { NavigateFunction } from 'react-router';
import type { UseFormReset } from 'react-hook-form';

export const handleDataDispatch =
  (
    dispatch: AppDispatch,
    navigate: NavigateFunction,
    reset?: UseFormReset<FormType>,
  ) =>
  (data: FormType) => {
    const file = (data[FORM_FIELDS_LABELS.IMAGE] as FileList)[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      if (!reader.result)
        throw new Error(`Error while read file ${file?.name || ''}`);

      dispatch(
        addFormData({
          ...data,
          [FORM_FIELDS_LABELS.IMAGE]: {
            name: file.name,
            content: reader.result as string,
          },
        }),
      );

      navigate('/');
    };

    reader.onerror = () => {
      throw new Error(`Error while read file ${file?.name || ''}`);
    };

    if (reset) reset();

    reader.readAsDataURL(file);
  };
