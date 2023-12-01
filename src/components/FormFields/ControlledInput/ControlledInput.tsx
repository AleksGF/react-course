import React, { type FC, memo } from 'react';
import { type UseFormRegister } from 'react-hook-form';
import { FORM_FIELDS_LABELS, type FormFields } from '@/constants/formSchema';
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
  register: UseFormRegister<FormFields>;
  error?: string;
}

const ControlledInput: FC<ControlledInputProps> = memo(
  ({ type, inputId, register, error }) => {
    return (
      <Wrapper>
        <FieldWrapper>
          <label htmlFor={inputId}>{inputId}</label>
          <input
            type={type}
            id={inputId}
            autoComplete={type === 'password' ? 'new-password' : inputId}
            {...register(inputId)}
          />
        </FieldWrapper>
        <ErrorMessage>{error ?? ''}</ErrorMessage>
      </Wrapper>
    );
  },
);

export default ControlledInput;
