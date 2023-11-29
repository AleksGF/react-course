import React, { type FC } from 'react';
import { type FieldError, type UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@/components/FormFields/ErrorMessage';
import { FieldWrapper, Wrapper } from '@/components/FormFields/Wrappers';
import {
  FORM_FIELDS_LABELS,
  type FormSchemaType,
} from '@/constants/formSchema';
import { COUNTRIES } from '@/constants/constants';

type Option = (typeof COUNTRIES)[number];

interface ControlledSelectProps {
  options: Option[];
  selectId: `${FORM_FIELDS_LABELS}`;
  register: UseFormRegister<FormSchemaType>;
  error?: FieldError;
}

const ControlledSelect: FC<ControlledSelectProps> = ({
  options,
  selectId,
  register,
  error,
}) => {
  return (
    <Wrapper>
      <FieldWrapper>
        <label htmlFor={selectId}>{selectId}</label>
        <select id={selectId} autoComplete={selectId} {...register(selectId)}>
          <option value={''}>{`Choose ${FORM_FIELDS_LABELS.COUNTRY}`}</option>
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </FieldWrapper>
      <ErrorMessage>{error?.message ?? ''}</ErrorMessage>
    </Wrapper>
  );
};

export default ControlledSelect;
