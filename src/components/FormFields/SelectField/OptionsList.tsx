import React, { type FC, ReactElement } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/constants/styles';

interface OptionsListProps {
  options: string[];
  optionsToShowCount: number;
  searchValue: string;
  onSelect: (value: string) => void;
}

const StyledWrapper = styled.ul`
  position: absolute;
  margin: 0.2rem 0;
  padding: 0;
  width: 100%;
  background-color: ${COLORS.WhiteColor};
`;

const StyledItem = styled.li`
  list-style: none;
  padding-left: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    transform: scale(0.97);
  }
`;

const OptionsList: FC<OptionsListProps> = ({
  options,
  optionsToShowCount,
  searchValue,
  onSelect,
}) => {
  return (
    <StyledWrapper>
      {...options.reduce((acc, option, ind) => {
        if (
          option.toLowerCase().includes(searchValue.toLowerCase()) &&
          acc.length < optionsToShowCount
        )
          acc.push(
            <StyledItem
              key={ind}
              onClick={() => {
                onSelect(option);
              }}
            >
              {option}
            </StyledItem>,
          );

        if (acc.length === optionsToShowCount) {
          acc.push(<StyledItem key={-1}>{'...'}</StyledItem>);
        }

        return acc;
      }, new Array<ReactElement>())}
    </StyledWrapper>
  );
};

export default OptionsList;
