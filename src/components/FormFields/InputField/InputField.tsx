import React, { type FC, memo } from 'react';
import { type UseFormRegister } from 'react-hook-form';
import {
  FORM_FIELDS_LABELS,
  type FormType,
  type InputType,
} from '@/constants/formSchema';
import { FieldWrapper, Wrapper } from '@/components/FormFields/Wrappers';
import { ErrorMessage } from '@/components/FormFields/ErrorMessage';

interface InputFieldProps {
  type: InputType;
  inputId: `${FORM_FIELDS_LABELS}`;
  error?: string;
  register?: UseFormRegister<FormType>;
  errorHandler?: (fieldId: `${FORM_FIELDS_LABELS}`) => void;
}

const InputField: FC<InputFieldProps> = memo(
  ({ type, inputId, error, register, errorHandler }) => {
    const restProps = register
      ? register(inputId)
      : {
          name: inputId,
          onChange: errorHandler
            ? () => {
                errorHandler(inputId);
              }
            : undefined,
        };

    return (
      <Wrapper>
        <FieldWrapper>
          <label htmlFor={inputId}>{inputId}</label>
          <input
            type={type}
            id={inputId}
            autoComplete={type === 'password' ? 'new-password' : inputId}
            {...restProps}
          />
        </FieldWrapper>
        <ErrorMessage>{error ?? ''}</ErrorMessage>
      </Wrapper>
    );
  },
);

export default InputField;
