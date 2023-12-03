import React, { type FC } from 'react';
import type { FormType } from '@/constants/formSchema';
import { FieldWrapper, Wrapper } from '@/components/FormFields/Wrappers';
import { ErrorMessage } from '@/components/FormFields/ErrorMessage';
import CustomSelectWithoutControl from '@/components/FormFields/CustomSelect/CustomSelectWithoutControl';
import { FORM_FIELDS_LABELS } from '@/constants/formSchema';

interface UncontrolledSelectProps {
  options: string[];
  selectId: keyof FormType;
  error?: string;
  errorHandler: (fieldId: `${FORM_FIELDS_LABELS}`) => void;
}

const UncontrolledSelect: FC<UncontrolledSelectProps> = ({
  options,
  selectId,
  error,
  errorHandler,
}) => {
  return (
    <Wrapper>
      <FieldWrapper>
        <label htmlFor={selectId}>{selectId}</label>
        <CustomSelectWithoutControl
          options={options}
          fieldId={selectId}
          errorHandler={errorHandler}
        />
      </FieldWrapper>
      <ErrorMessage>{error ?? ''}</ErrorMessage>
    </Wrapper>
  );
};

export default UncontrolledSelect;
