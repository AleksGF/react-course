import React, { type FC } from 'react';
import { type FieldError, type UseFormRegister } from 'react-hook-form';
import {
  FORM_FIELDS_LABELS,
  type FormSchemaType,
} from '@/constants/formSchema';
import { ErrorMessage } from '@/components/FormFields/ErrorMessage';
import { FieldWrapper, Wrapper } from '@/components/FormFields/Wrappers';

export type InputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'checkbox'
  | 'file';

interface ControlledInputProps {
  type: InputType;
  inputId: `${FORM_FIELDS_LABELS}`;
  register: UseFormRegister<FormSchemaType>;
  error?: FieldError;
}

const ControlledInput: FC<ControlledInputProps> = ({
  type,
  inputId,
  register,
  error,
}) => {
  return (
    <Wrapper>
      <FieldWrapper>
        <label htmlFor={inputId}>{inputId}</label>
        <input
          type={type}
          id={inputId}
          autoComplete={type === 'password' ? 'new password' : inputId}
          {...register(inputId)}
        />
      </FieldWrapper>
      <ErrorMessage>{error?.message ?? ''}</ErrorMessage>
    </Wrapper>
  );
};

export default ControlledInput;
