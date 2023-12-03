import React, { type FC, useCallback, useState } from 'react';
import {
  type UseFormWatch,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';
import { type FormType } from '@/constants/formSchema';
import SelectView from '@/components/FormFields/SelectField/SelectView';

const OPTIONS_TO_SHOW_COUNT = 12;
const SELECT_ID = 'select_field_id';

interface ControlledSelectProps {
  fieldId: keyof FormType;
  register: UseFormRegister<FormType>;
  setValue: UseFormSetValue<FormType>;
  watch: UseFormWatch<FormType>;
}

const ControlledSelect: FC<ControlledSelectProps> = ({
  fieldId,
  register,
  setValue,
  watch,
}) => {
  const [isOptionsShown, setIsOptionsShown] = useState<boolean>(false);
  const searchValue = watch(fieldId, { defaultValues: '' }) as string;

  const onSelect = useCallback(
    (value: string) => {
      setValue(fieldId, value, { shouldValidate: true });
      setIsOptionsShown(false);
    },
    [fieldId, setValue],
  );

  return (
    <SelectView
      fieldId={fieldId}
      selectId={SELECT_ID}
      isOptionsShown={isOptionsShown}
      setIsOptionsShown={setIsOptionsShown}
      optionsToShowCount={OPTIONS_TO_SHOW_COUNT}
      searchValue={searchValue}
      onSelect={onSelect}
      register={register}
    />
  );
};

export default ControlledSelect;
