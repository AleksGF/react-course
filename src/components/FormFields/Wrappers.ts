import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div<{ $minHeight?: string }>`
  min-height: ${(props) => props.$minHeight ?? '3rem'};
  max-width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const FieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const FieldsetWrapper = styled.fieldset`
  display: flex;
  justify-content: space-between;
`;
