import styled from 'styled-components';

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
`;

export const FieldsetWrapper = styled.fieldset`
  display: flex;
  justify-content: space-between;
`;
