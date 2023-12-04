import React, { type FC, memo } from 'react';
import { type UseFormRegister } from 'react-hook-form';
import { FORM_FIELDS_LABELS, type FormType } from '@/constants/formSchema';
import { ErrorMessage } from '@/components/FormFields/ErrorMessage';
import { FieldsetWrapper, Wrapper } from '@/components/FormFields/Wrappers';
import { getCapitalized } from '@/helpers/getCapitalized';

interface RadioFieldProps {
  values: string[];
  inputId: `${FORM_FIELDS_LABELS}`;
  error?: string;
  register?: UseFormRegister<FormType>;
  errorHandler?: (fieldId: `${FORM_FIELDS_LABELS}`) => void;
}

const RadioField: FC<RadioFieldProps> = memo(
  ({ values, inputId, error, register, errorHandler }) => {
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
      <Wrapper $minHeight={'5rem'}>
        <FieldsetWrapper>
          <legend>{`Choose ${inputId}`}</legend>
          {values.map((value) => (
            <div key={value}>
              <label htmlFor={value}>{getCapitalized(value)}</label>
              <input type={'radio'} id={value} value={value} {...restProps} />
            </div>
          ))}
        </FieldsetWrapper>
        <ErrorMessage>{error ?? ''}</ErrorMessage>
      </Wrapper>
    );
  },
);

export default RadioField;
