import React, { type FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  type UseFormWatch,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';
import { type FormFields } from '@/constants/formSchema';
import searchIcon from '@/components/FormFields/CustomSelect/search.svg';
import { BASE_ICON_SIZE } from '@/constants/constants';
import { COLORS } from '@/constants/styles';
import OptionsList from '@/components/FormFields/CustomSelect/OptionsList';

const OPTIONS_TO_SHOW_COUNT = 12;
const SELECT_ID = 'select_field_id';

interface CustomSelectProps {
  options: string[];
  fieldId: keyof FormFields;
  register: UseFormRegister<FormFields>;
  setValue: UseFormSetValue<FormFields>;
  watch: UseFormWatch<FormFields>;
}

const StyledWrapper = styled.div`
  position: relative;
  border: 1px solid ${COLORS.CustomFieldBorder};
  border-radius: 3px;
`;

const StyledSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border-radius: 3px;
  background-color: ${COLORS.WhiteColor};
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
`;

const CustomSelect: FC<CustomSelectProps> = ({
  options,
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
          autoComplete={fieldId}
          onFocus={() => {
            setIsOptionsShown(true);
          }}
          {...register(fieldId)}
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

export default CustomSelect;
