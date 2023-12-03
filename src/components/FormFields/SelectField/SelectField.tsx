import React, { type FC, memo } from 'react';
import { FieldWrapper, Wrapper } from '@/components/FormFields/Wrappers';
import ControlledSelect from '@/components/FormFields/SelectField/ControlledSelect';
import UncontrolledSelect from '@/components/FormFields/SelectField/UncontrolledSelect';
import { ErrorMessage } from '@/components/FormFields/ErrorMessage';
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { FORM_FIELDS_LABELS, type FormType } from '@/constants/formSchema';

interface SelectFieldProps {
  options: string[];
  selectId: keyof FormType;
  error?: string;
  register?: UseFormRegister<FormType>;
  setValue?: UseFormSetValue<FormType>;
  watch?: UseFormWatch<FormType>;
  errorHandler?: (fieldId: `${FORM_FIELDS_LABELS}`) => void;
}

const SelectField: FC<SelectFieldProps> = ({
  options,
  selectId,
  error,
  register,
  setValue,
  watch,
  errorHandler,
}) => {
  return (
    <Wrapper>
      <FieldWrapper>
        <label htmlFor={selectId}>{selectId}</label>
        {register && setValue && watch ? (
          <ControlledSelect
            options={options}
            fieldId={selectId}
            register={register}
            setValue={setValue}
            watch={watch}
          />
        ) : null}
        {errorHandler ? (
          <UncontrolledSelect
            options={options}
            fieldId={selectId}
            errorHandler={errorHandler}
          />
        ) : null}
      </FieldWrapper>
      <ErrorMessage>{error ?? ''}</ErrorMessage>
    </Wrapper>
  );
};
export default SelectField;
