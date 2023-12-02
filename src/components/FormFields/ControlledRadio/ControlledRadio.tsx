import React, { type FC, memo } from 'react';
import { type UseFormRegister } from 'react-hook-form';
import { FORM_FIELDS_LABELS, type FormType } from '@/constants/formSchema';
import { ErrorMessage } from '@/components/FormFields/ErrorMessage';
import { FieldsetWrapper, Wrapper } from '@/components/FormFields/Wrappers';
import { getCapitalized } from '@/helpers/getCapitalized';

interface ControlledRadioProps {
  values: string[];
  inputId: `${FORM_FIELDS_LABELS}`;
  register: UseFormRegister<FormType>;
  error?: string;
}

const ControlledRadio: FC<ControlledRadioProps> = memo(
  ({ values, inputId, register, error }) => {
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
        <ErrorMessage>{error ?? ''}</ErrorMessage>
      </Wrapper>
    );
  },
);

export default ControlledRadio;
