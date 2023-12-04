import React, { FC } from 'react';
import type { FormData } from '@/store/formDataSlice';
import styled from 'styled-components';
import { FORM_FIELDS_LABELS } from '@/constants/formSchema';
import { COLORS } from '@/constants/styles';

interface TileProps {
  data: FormData;
}

const Wrapper = styled.section<{ $isNew: boolean }>`
  margin-top: 1rem;
  padding: 0.5rem;
  width: 22rem;
  height: 12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: ${(props) =>
    props.$isNew ? COLORS.NewTileColor : COLORS.TileColor};
  border: 1px solid ${COLORS.TileBorderColor};
  border-radius: 0.5rem;
`;

const Image = styled.img`
  max-width: 10rem;
  max-height: 10rem;
  border-radius: 0.3rem;
`;

const Tile: FC<TileProps> = ({ data: formData }) => {
  const { isNew, data } = formData;
  const fields = Object.keys(
    FORM_FIELDS_LABELS,
  ) as (keyof typeof FORM_FIELDS_LABELS)[];

  return (
    <Wrapper $isNew={isNew}>
      <Image
        src={data[FORM_FIELDS_LABELS.IMAGE].content}
        alt={data[FORM_FIELDS_LABELS.IMAGE].name}
      />
      <div>
        {fields.map((fieldName, ind) =>
          FORM_FIELDS_LABELS[fieldName] === FORM_FIELDS_LABELS.IMAGE ||
          FORM_FIELDS_LABELS[fieldName] ===
            FORM_FIELDS_LABELS.PASSWORD_CONFIRM ? null : (
            <div key={ind}>{`${FORM_FIELDS_LABELS[fieldName]}: ${
              data[FORM_FIELDS_LABELS[fieldName]]
            }`}</div>
          ),
        )}
      </div>
    </Wrapper>
  );
};

export default Tile;
