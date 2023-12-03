import React, {
  ChangeEvent,
  type FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FORM_FIELDS_LABELS, FormType } from '@/constants/formSchema';
import searchIcon from '@/components/FormFields/CustomSelect/search.svg';
import { BASE_ICON_SIZE } from '@/constants/constants';
import OptionsList from '@/components/FormFields/CustomSelect/OptionsList';
import {
  StyledInput,
  StyledSearchWrapper,
  StyledWrapper,
} from '@/components/FormFields/CustomSelect/Wrappers';

interface CustomSelectWithoutControlProps {
  options: string[];
  fieldId: keyof FormType;
  errorHandler: (fieldId: `${FORM_FIELDS_LABELS}`) => void;
}

const OPTIONS_TO_SHOW_COUNT = 12;
const SELECT_ID = 'uncontrolled_select_id';

const CustomSelectWithoutControl: FC<CustomSelectWithoutControlProps> = ({
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

  useEffect(() => {
    const blurListener: EventListener = (e) => {
      const target = e.target;

      if (target instanceof HTMLElement && target.closest(`#${SELECT_ID}`))
        return;

      setIsOptionsShown(false);
    };

    document.addEventListener('click', blurListener);

    return () => {
      document.removeEventListener('click', blurListener);
    };
  }, []);

  return (
    <StyledWrapper id={SELECT_ID}>
      <StyledSearchWrapper>
        <img
          src={searchIcon}
          alt={'search'}
          width={BASE_ICON_SIZE}
          height={BASE_ICON_SIZE}
        />
        <StyledInput
          id={fieldId}
          name={fieldId}
          autoComplete={fieldId}
          onChange={onChange}
          onFocus={() => {
            setIsOptionsShown(true);
          }}
          ref={inputFieldRef}
        />
      </StyledSearchWrapper>
      {isOptionsShown && (
        <OptionsList
          options={options}
          optionsToShowCount={OPTIONS_TO_SHOW_COUNT}
          searchValue={searchValue}
          onSelect={onSelect}
        />
      )}
    </StyledWrapper>
  );
};

export default CustomSelectWithoutControl;
