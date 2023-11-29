import React, { type FC, useCallback } from 'react';
import { useMatches } from 'react-router-dom';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FORM_FIELDS_LABELS,
  formSchema,
  type FormSchemaType,
} from '@/constants/formSchema';
import ControlledInput, {
  type InputType,
} from '@/components/FormFields/ControlledInput/ControlledInput';
import ControlledRadio from '@/components/FormFields/ControlledRadio/ControlledRadio';
import { COUNTRIES, GENDERS } from '@/constants/constants';
import ControlledSelect from '@/components/FormFields/ControlledSelect/ControlledSelect';

const INPUTS: { inputId: `${FORM_FIELDS_LABELS}`; type: InputType }[] = [
  { inputId: FORM_FIELDS_LABELS.NAME, type: 'text' },
  { inputId: FORM_FIELDS_LABELS.AGE, type: 'number' },
  { inputId: FORM_FIELDS_LABELS.EMAIL, type: 'email' },
  { inputId: FORM_FIELDS_LABELS.PASSWORD, type: 'password' },
  { inputId: FORM_FIELDS_LABELS.PASSWORD_CONFIRM, type: 'password' },
];

const ControlledForm: FC = () => {
  const match = useMatches().at(-1);
  const pageTittle =
    match &&
    match.handle &&
    typeof match.handle === 'object' &&
    'navName' in match.handle
      ? (match.handle.navName as () => string)()
      : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const memorizedRegister = useCallback(register, [register]);

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => console.log(data);

  return (
    <>
      <h2>{pageTittle ?? ''}</h2>
      <form
        id={'controlledForm'}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete={'off'}
      >
        {INPUTS.map((item, ind) => (
          <ControlledInput
            type={item.type}
            inputId={item.inputId}
            register={memorizedRegister}
            error={errors[item.inputId] as FieldError}
            key={ind}
          />
        ))}
        <ControlledRadio
          values={GENDERS}
          inputId={FORM_FIELDS_LABELS.GENDER}
          register={memorizedRegister}
          error={errors[FORM_FIELDS_LABELS.GENDER]}
        />
        <ControlledInput
          type={'checkbox'}
          inputId={FORM_FIELDS_LABELS.ACCEPT}
          register={memorizedRegister}
          error={errors[FORM_FIELDS_LABELS.ACCEPT]}
        />
        <ControlledSelect
          options={COUNTRIES}
          selectId={FORM_FIELDS_LABELS.COUNTRY}
          register={memorizedRegister}
          error={errors[FORM_FIELDS_LABELS.COUNTRY]}
        />
        <ControlledInput
          type={'file'}
          inputId={FORM_FIELDS_LABELS.IMAGE}
          register={memorizedRegister}
          error={errors[FORM_FIELDS_LABELS.IMAGE] as FieldError}
        />
        <button type={'submit'}>{'Submit form'}</button>
      </form>
    </>
  );
};

export default ControlledForm;
