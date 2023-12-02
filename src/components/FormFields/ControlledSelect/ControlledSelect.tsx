import React, { type FC } from 'react';
import {
  type UseFormWatch,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';
import { ErrorMessage } from '@/components/FormFields/ErrorMessage';
import { FieldWrapper, Wrapper } from '@/components/FormFields/Wrappers';
import { type FormType } from '@/constants/formSchema';
import CustomSelect from '@/components/FormFields/CustomSelect/CustomSelect';

interface ControlledSelectProps {
  options: string[];
  selectId: keyof FormType;
  register: UseFormRegister<FormType>;
  setValue: UseFormSetValue<FormType>;
  watch: UseFormWatch<FormType>;
  error?: string;
}

const ControlledSelect: FC<ControlledSelectProps> = ({
  options,
  selectId,
  register,
  setValue,
  watch,
  error,
}) => {
  return (
    <Wrapper>
      <FieldWrapper>
        <label htmlFor={selectId}>{selectId}</label>
        <CustomSelect
          options={options}
          fieldId={selectId}
          register={register}
          setValue={setValue}
          watch={watch}
        />
      </FieldWrapper>
      <ErrorMessage>{error ?? ''}</ErrorMessage>
    </Wrapper>
  );
};

export default ControlledSelect;
