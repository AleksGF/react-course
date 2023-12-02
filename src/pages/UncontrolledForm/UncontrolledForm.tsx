import React, { type FC, type FormEvent, useRef, useState } from 'react';
import { FormWrapper, StyledForm } from '@/components/FormFields/Wrappers';
import PageTittle from '@/components/PageTittle/PageTittle';
import {
  FORM_FIELDS_LABELS,
  formSchema,
  FormType,
  INPUTS,
} from '@/constants/formSchema';
import UncontrolledInput from '@/components/FormFields/UncontrolledInput/UncontrolledInput';
import { GENDERS } from '@/constants/constants';
import UncontrolledRadio from '@/components/FormFields/UncontrolledRadio/UncontrolledRadio';
import { StyledSubmitBtn } from '@/components/FormFields/StyledSubmitBtn';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import UncontrolledSelect from '@/components/FormFields/UncontrolledSelect/UncontrolledSelect';
import { ValidationError } from 'yup';
import { addFormData } from '@/store/formDataSlice';

type FieldErrors = Partial<Record<keyof FormType, string>>;

const UncontrolledForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const COUNTRIES = useRef<string[]>(
    useAppSelector((state) => state.app.countries),
  );

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataObj: Record<string, unknown> = {};

    const data = new FormData(e.currentTarget);

    data.forEach((value, key) => {
      switch (key) {
        case FORM_FIELDS_LABELS.ACCEPT:
          dataObj[key] = Boolean(value);
          break;

        case FORM_FIELDS_LABELS.IMAGE:
          dataObj[key] = [value];
          break;

        default:
          dataObj[key] = value;
      }
    });

    formSchema
      .validate(dataObj, { abortEarly: false })
      .then((data) => {
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

        reader.readAsDataURL(file);
      })
      .catch((error) => {
        const errors: FieldErrors = {};

        (error.inner as ValidationError[]).forEach((errorItem) => {
          if (errorItem.path)
            errors[errorItem.path as keyof FormType] = errorItem.message;
        });

        setFieldErrors(errors);
      });
  };

  return (
    <FormWrapper>
      <PageTittle />
      <StyledForm
        id={'uncontrolledForm'}
        onSubmit={onSubmit}
        autoComplete={'off'}
        noValidate={true}
      >
        {INPUTS.map((item, ind) => (
          <UncontrolledInput
            type={item.type}
            inputId={item.inputId}
            error={fieldErrors[item.inputId]}
            key={ind}
          />
        ))}
        <UncontrolledRadio
          values={GENDERS}
          inputId={FORM_FIELDS_LABELS.GENDER}
          error={fieldErrors[FORM_FIELDS_LABELS.GENDER]}
        />
        <UncontrolledSelect
          options={COUNTRIES.current}
          selectId={FORM_FIELDS_LABELS.COUNTRY}
          error={fieldErrors[FORM_FIELDS_LABELS.COUNTRY]}
        />
        <UncontrolledInput
          type={'file'}
          inputId={FORM_FIELDS_LABELS.IMAGE}
          error={fieldErrors[FORM_FIELDS_LABELS.IMAGE]}
        />
        <UncontrolledInput
          type={'checkbox'}
          inputId={FORM_FIELDS_LABELS.ACCEPT}
          error={fieldErrors[FORM_FIELDS_LABELS.ACCEPT]}
        />
        <StyledSubmitBtn type={'submit'}>{'Submit form'}</StyledSubmitBtn>
      </StyledForm>
    </FormWrapper>
  );
};

export default UncontrolledForm;
