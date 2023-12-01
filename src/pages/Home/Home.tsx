import React, { type FC } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import Tile from '@/components/Tile/Tile';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Home: FC = () => {
  const data = useAppSelector((state) => state.formData);

  return (
    <Wrapper>
      {data.map((dataItem, ind) => (
        <Tile data={dataItem} key={ind} />
      ))}
    </Wrapper>
  );
};

export default Home;
