import React, { type FC } from 'react';
import CloseBtn from '@components/PersonDetails/CloseBtn/CloseBtn';
import type { Person } from '@src/types/apiTypes';
import styles from './PersonDetails.module.scss';

interface PersonDetailsProps {
  person: Person;
}

const PersonDetails: FC<PersonDetailsProps> = ({ person }) => {
  return (
    <div className={styles.wrapper} id={'details'} data-testid={'details'}>
      <CloseBtn />
      <div className={'details__content'}>
        <h3>Person Details:</h3>
        <p>{`${person.name} was born in ${person.birth_year || 'n/a'}.`}</p>
        <p>{`Films count with is ${String(person.films?.length || 0)}.`}</p>
      </div>
    </div>
  );
};

export default PersonDetails;
