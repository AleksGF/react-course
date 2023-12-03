import React, { type FC } from 'react';
import { FORM_FIELDS_LABELS } from '@/constants/formSchema';
import { FieldsetWrapper, Wrapper } from '@/components/FormFields/Wrappers';
import { getCapitalized } from '@/helpers/getCapitalized';
import { ErrorMessage } from '@/components/FormFields/ErrorMessage';

interface UncontrolledRadioProps {
  values: string[];
  inputId: `${FORM_FIELDS_LABELS}`;
  error?: string;
  errorHandler: (fieldId: `${FORM_FIELDS_LABELS}`) => void;
}

const UncontrolledRadio: FC<UncontrolledRadioProps> = ({
  values,
  inputId,
  error,
  errorHandler,
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
              name={inputId}
              value={value}
              onChange={() => {
                errorHandler(inputId);
              }}
            />
          </div>
        ))}
      </FieldsetWrapper>
      <ErrorMessage>{error ?? ''}</ErrorMessage>
    </Wrapper>
  );
};

export default UncontrolledRadio;
