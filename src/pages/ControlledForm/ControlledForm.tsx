import React, { type FC, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { addFormData } from '@/store/formDataSlice';
import {
  FORM_FIELDS_LABELS,
  type FormFields,
  formSchema,
} from '@/constants/formSchema';
import PageTittle from '@/components/PageTittle/PageTittle';
import ControlledInput, {
  type InputType,
} from '@/components/FormFields/ControlledInput/ControlledInput';
import ControlledRadio from '@/components/FormFields/ControlledRadio/ControlledRadio';
import ControlledSelect from '@/components/FormFields/ControlledSelect/ControlledSelect';
import { GENDERS } from '@/constants/constants';
import { FormWrapper, StyledForm } from '@/components/FormFields/Wrappers';
import { StyledSubmitBtn } from '@/components/FormFields/StyledSubmitBtn';

const INPUTS: { inputId: `${FORM_FIELDS_LABELS}`; type: InputType }[] = [
  { inputId: FORM_FIELDS_LABELS.NAME, type: 'text' },
  { inputId: FORM_FIELDS_LABELS.AGE, type: 'number' },
  { inputId: FORM_FIELDS_LABELS.EMAIL, type: 'email' },
  { inputId: FORM_FIELDS_LABELS.PASSWORD, type: 'password' },
  { inputId: FORM_FIELDS_LABELS.PASSWORD_CONFIRM, type: 'password' },
];

const ControlledForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const COUNTRIES = useRef<string[]>(
    useAppSelector((state) => state.app.countries),
  );

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    resolver: yupResolver(formSchema),
    mode: 'onTouched',
  });

  const memorizedRegister = useCallback(register, [register]);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
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

      reset();
      navigate('/');
    };

    reader.onerror = () => {
      throw new Error(`Error while read file ${file?.name || ''}`);
    };

    reader.readAsDataURL(file);
  };

  return (
    <FormWrapper>
      <PageTittle />
      <StyledForm
        id={'controlledForm'}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete={'off'}
        noValidate={true}
      >
        {INPUTS.map((item, ind) => (
          <ControlledInput
            type={item.type}
            inputId={item.inputId}
            register={memorizedRegister}
            error={errors[item.inputId]?.message}
            key={ind}
          />
        ))}
        <ControlledRadio
          values={GENDERS}
          inputId={FORM_FIELDS_LABELS.GENDER}
          register={memorizedRegister}
          error={errors[FORM_FIELDS_LABELS.GENDER]?.message}
        />
        <ControlledSelect
          options={COUNTRIES.current}
          selectId={FORM_FIELDS_LABELS.COUNTRY}
          register={memorizedRegister}
          error={errors[FORM_FIELDS_LABELS.COUNTRY]?.message}
          setValue={setValue}
          watch={watch}
        />
        <ControlledInput
          type={'file'}
          inputId={FORM_FIELDS_LABELS.IMAGE}
          register={memorizedRegister}
          error={errors[FORM_FIELDS_LABELS.IMAGE]?.message}
        />
        <ControlledInput
          type={'checkbox'}
          inputId={FORM_FIELDS_LABELS.ACCEPT}
          register={memorizedRegister}
          error={errors[FORM_FIELDS_LABELS.ACCEPT]?.message}
        />
        <StyledSubmitBtn type={'submit'} disabled={!isValid}>
          {'Submit form'}
        </StyledSubmitBtn>
      </StyledForm>
    </FormWrapper>
  );
};

export default ControlledForm;
