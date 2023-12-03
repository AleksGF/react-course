import React, {
  type FC,
  type FormEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { FormWrapper, StyledForm } from '@/components/FormFields/Wrappers';
import PageTittle from '@/components/PageTittle/PageTittle';
import {
  FORM_FIELDS_LABELS,
  type FormType,
  INPUTS,
} from '@/constants/formSchema';
import InputField from '@/components/FormFields/InputField/InputField';
import RadioField from '@/components/FormFields/RadioField/RadioField';
import SelectField from '@/components/FormFields/SelectField/SelectField';
import { StyledSubmitBtn } from '@/components/FormFields/StyledSubmitBtn';
import { handleValidation } from '@/helpers/handleValidation';
import { GENDERS } from '@/constants/constants';

type FieldErrors = Partial<Record<keyof FormType, string>>;

const UncontrolledForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const COUNTRIES = useRef<string[]>(
    useAppSelector((state) => state.app.countries),
  );

  const errorHandler = useCallback(
    (fieldId: `${FORM_FIELDS_LABELS}`) => {
      if (!fieldErrors[fieldId]) return;

      setFieldErrors((prevFieldErrors) => ({
        ...prevFieldErrors,
        [fieldId]: '',
      }));
    },
    [fieldErrors],
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataObj: Record<string, unknown> = {};

    const data = new FormData(e.currentTarget);

    data.forEach((value, key) => {
      switch (key) {
        case FORM_FIELDS_LABELS.ACCEPT:
          dataObj[key] = Boolean(value);
          break;

        case FORM_FIELDS_LABELS.IMAGE:
          dataObj[key] = [value];
          break;

        default:
          dataObj[key] = value;
      }
    });

    handleValidation(dataObj, setFieldErrors, dispatch, navigate);
  };

  const isBtnDisabled = !!Object.values(fieldErrors).filter((value) => !!value)
    .length;

  return (
    <FormWrapper>
      <PageTittle />
      <StyledForm
        id={'uncontrolledForm'}
        onSubmit={onSubmit}
        autoComplete={'off'}
        noValidate={true}
      >
        {INPUTS.map((item, ind) => (
          <InputField
            type={item.type}
            inputId={item.inputId}
            error={fieldErrors[item.inputId]}
            errorHandler={errorHandler}
            key={ind}
          />
        ))}
        <RadioField
          values={GENDERS}
          inputId={FORM_FIELDS_LABELS.GENDER}
          error={fieldErrors[FORM_FIELDS_LABELS.GENDER]}
          errorHandler={errorHandler}
        />
        <SelectField
          options={COUNTRIES.current}
          selectId={FORM_FIELDS_LABELS.COUNTRY}
          error={fieldErrors[FORM_FIELDS_LABELS.COUNTRY]}
          errorHandler={errorHandler}
        />
        <InputField
          type={'file'}
          inputId={FORM_FIELDS_LABELS.IMAGE}
          error={fieldErrors[FORM_FIELDS_LABELS.IMAGE]}
          errorHandler={errorHandler}
        />
        <InputField
          type={'checkbox'}
          inputId={FORM_FIELDS_LABELS.ACCEPT}
          error={fieldErrors[FORM_FIELDS_LABELS.ACCEPT]}
          errorHandler={errorHandler}
        />
        <StyledSubmitBtn type={'submit'} disabled={isBtnDisabled}>
          {'Submit form'}
        </StyledSubmitBtn>
      </StyledForm>
    </FormWrapper>
  );
};

export default UncontrolledForm;
