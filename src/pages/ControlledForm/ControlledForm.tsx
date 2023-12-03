import React, { type FC, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  FORM_FIELDS_LABELS,
  type FormType,
  formSchema,
  INPUTS,
} from '@/constants/formSchema';
import PageTittle from '@/components/PageTittle/PageTittle';
import InputField from '@/components/FormFields/InputField/InputField';
import ControlledRadio from '@/components/FormFields/ControlledRadio/ControlledRadio';
import ControlledSelect from '@/components/FormFields/ControlledSelect/ControlledSelect';
import { GENDERS } from '@/constants/constants';
import { FormWrapper, StyledForm } from '@/components/FormFields/Wrappers';
import { StyledSubmitBtn } from '@/components/FormFields/StyledSubmitBtn';
import { handleDataDispatch } from '@/helpers/handleDataDispatch';

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
  } = useForm<FormType>({
    resolver: yupResolver(formSchema),
    mode: 'onTouched',
  });

  const memorizedRegister = useCallback(register, [register]);

  const onSubmit: SubmitHandler<FormType> = (data) =>
    handleDataDispatch(dispatch, navigate, reset)(data);

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
          <InputField
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
        <InputField
          type={'file'}
          inputId={FORM_FIELDS_LABELS.IMAGE}
          register={memorizedRegister}
          error={errors[FORM_FIELDS_LABELS.IMAGE]?.message}
        />
        <InputField
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
