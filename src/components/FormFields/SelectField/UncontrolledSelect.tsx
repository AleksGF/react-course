import React, {
  type ChangeEvent,
  type FC,
  useCallback,
  useRef,
  useState,
} from 'react';
import { FORM_FIELDS_LABELS, FormType } from '@/constants/formSchema';
import SelectView from '@/components/FormFields/SelectField/SelectView';

interface UncontrolledSelectProps {
  options: string[];
  fieldId: keyof FormType;
  errorHandler: (fieldId: `${FORM_FIELDS_LABELS}`) => void;
}

const OPTIONS_TO_SHOW_COUNT = 12;
const SELECT_ID = 'uncontrolled_select_id';

const UncontrolledSelect: FC<UncontrolledSelectProps> = ({
  options,
  fieldId,
  errorHandler,
}) => {
  const [isOptionsShown, setIsOptionsShown] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const inputFieldRef = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    errorHandler(fieldId);
  };

  const onSelect = useCallback(
    (value: string) => {
      if (!inputFieldRef.current) return;

      inputFieldRef.current.value = value;
      setIsOptionsShown(false);
      errorHandler(fieldId);
    },
    [errorHandler, fieldId],
  );

  return (
    <SelectView
      options={options}
      fieldId={fieldId}
      selectId={SELECT_ID}
      isOptionsShown={isOptionsShown}
      setIsOptionsShown={setIsOptionsShown}
      optionsToShowCount={OPTIONS_TO_SHOW_COUNT}
      searchValue={searchValue}
      onSelect={onSelect}
      onChange={onChange}
      inputFieldRef={inputFieldRef}
    />
  );
};

export default UncontrolledSelect;
