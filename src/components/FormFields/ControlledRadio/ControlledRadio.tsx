import React, { type FC } from 'react';
import { type FieldError, type UseFormRegister } from 'react-hook-form';
import {
  FORM_FIELDS_LABELS,
  type FormSchemaType,
} from '@/constants/formSchema';
import { ErrorMessage } from '@/components/FormFields/ErrorMessage';
import {
  FieldsetWrapper,
  FieldWrapper,
  Wrapper,
} from '@/components/FormFields/Wrappers';
import { getCapitalized } from '@/helpers/getCapitalized';

interface ControlledRadioProps {
  values: string[];
  inputId: `${FORM_FIELDS_LABELS}`;
  register: UseFormRegister<FormSchemaType>;
  error?: FieldError;
}

const ControlledRadio: FC<ControlledRadioProps> = ({
  values,
  inputId,
  register,
  error,
}) => {
  return (
    <Wrapper $minHeight={'5rem'}>
      <FieldsetWrapper>
        <legend>{`Choose ${inputId}`}</legend>
        {values.map((value) => (
          <div key={value}>
            <label htmlFor={value}>{getCapitalized(value)}</label>
            <input
              type={'radio'}
              id={value}
              value={value}
              {...register(inputId)}
            />
          </div>
        ))}
      </FieldsetWrapper>
      <ErrorMessage>{error?.message ?? ''}</ErrorMessage>
    </Wrapper>
  );
};

export default ControlledRadio;
