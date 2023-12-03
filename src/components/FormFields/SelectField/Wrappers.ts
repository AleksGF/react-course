import styled from 'styled-components';
import { COLORS } from '@/constants/styles';

export const StyledWrapper = styled.div`
  position: relative;
  border: 1px solid ${COLORS.CustomFieldBorder};
  border-radius: 3px;
`;

export const StyledSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border-radius: 3px;
  background-color: ${COLORS.WhiteColor};
`;

export const StyledInput = styled.input`
  border: none;
  outline: none;
`;
