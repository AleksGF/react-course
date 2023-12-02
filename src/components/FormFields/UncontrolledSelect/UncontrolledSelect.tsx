import React, { type FC } from 'react';
import type { FormType } from '@/constants/formSchema';
import { FieldWrapper, Wrapper } from '@/components/FormFields/Wrappers';
import { ErrorMessage } from '@/components/FormFields/ErrorMessage';
import CustomSelectWithoutControl from '@/components/FormFields/CustomSelect/CustomSelectWithoutControl';

interface UncontrolledSelectProps {
  options: string[];
  selectId: keyof FormType;
  error?: string;
}

const UncontrolledSelect: FC<UncontrolledSelectProps> = ({
  options,
  selectId,
  error,
}) => {
  return (
    <Wrapper>
      <FieldWrapper>
        <label htmlFor={selectId}>{selectId}</label>
        <CustomSelectWithoutControl options={options} fieldId={selectId} />
      </FieldWrapper>
      <ErrorMessage>{error ?? ''}</ErrorMessage>
    </Wrapper>
  );
};

export default UncontrolledSelect;
