import React, { type FC, memo } from 'react';
import { FORM_FIELDS_LABELS, InputType } from '@/constants/formSchema';
import { FieldWrapper, Wrapper } from '@/components/FormFields/Wrappers';
import { ErrorMessage } from '@/components/FormFields/ErrorMessage';

interface UncontrolledInputProps {
  type: InputType;
  inputId: `${FORM_FIELDS_LABELS}`;
  error?: string;
}

const UncontrolledInput: FC<UncontrolledInputProps> = memo(
  ({ type, inputId, error }) => {
    return (
      <Wrapper>
        <FieldWrapper>
          <label htmlFor={inputId}>{inputId}</label>
          <input
            type={type}
            id={inputId}
            name={inputId}
            autoComplete={type === 'password' ? 'new-password' : inputId}
          />
        </FieldWrapper>
        <ErrorMessage>{error ?? ''}</ErrorMessage>
      </Wrapper>
    );
  },
);

export default UncontrolledInput;
