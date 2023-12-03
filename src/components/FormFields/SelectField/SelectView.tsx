import React, {
  type ChangeEventHandler,
  type Dispatch,
  type FC,
  type RefObject,
  type SetStateAction,
  useEffect,
} from 'react';
import {
  StyledInput,
  StyledSearchWrapper,
  StyledWrapper,
} from '@/components/FormFields/SelectField/Wrappers';
import SearchIcon from '@/components/FormFields/SelectField/SearchIcon';
import OptionsList from '@/components/FormFields/SelectField/OptionsList';
import type { UseFormRegister } from 'react-hook-form';
import { type FormType } from '@/constants/formSchema';

interface ControlledSelectProps {
  fieldId: keyof FormType;
  selectId: string;
  isOptionsShown: boolean;
  setIsOptionsShown: Dispatch<SetStateAction<boolean>>;
  optionsToShowCount: number;
  searchValue: string;
  onSelect: (value: string) => void;
  register?: UseFormRegister<FormType>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  inputFieldRef?: RefObject<HTMLInputElement>;
}

const SelectView: FC<ControlledSelectProps> = ({
  fieldId,
  selectId,
  isOptionsShown,
  setIsOptionsShown,
  optionsToShowCount,
  searchValue,
  onSelect,
  register,
  onChange,
  inputFieldRef,
}) => {
  useEffect(() => {
    const blurListener: EventListener = (e) => {
      const target = e.target;

      if (target instanceof HTMLElement && target.closest(`#${selectId}`))
        return;

      setIsOptionsShown(false);
    };

    document.addEventListener('click', blurListener);

    return () => {
      document.removeEventListener('click', blurListener);
    };
  }, [selectId, setIsOptionsShown]);

  return (
    <StyledWrapper id={selectId}>
      <StyledSearchWrapper>
        <SearchIcon />
        {register ? (
          <StyledInput
            id={fieldId}
            autoComplete={fieldId}
            onFocus={() => {
              setIsOptionsShown(true);
            }}
            {...register(fieldId)}
          />
        ) : null}
        {onChange && inputFieldRef ? (
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
        ) : null}
      </StyledSearchWrapper>
      {isOptionsShown && (
        <OptionsList
          optionsToShowCount={optionsToShowCount}
          searchValue={searchValue}
          onSelect={onSelect}
        />
      )}
    </StyledWrapper>
  );
};

export default SelectView;
