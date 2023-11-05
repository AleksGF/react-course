import React, { useState, type FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchPerson } from '../../api/fetchPerson';
import { getSearchParamsWithout } from '../../helpers/getSearchParamsWithout';
import Loader from '../common/Loader/Loader';
import type { Person } from '../../types/apiTypes';
import CloseSvg from '../../assets/close.svg';
import './PersonDetails.scss';

const PersonDetails: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const personId = searchParams.get('details');

    if (personId) {
      setIsLoading(true);
      fetchPerson(personId)
        .then(setPerson)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [searchParams]);

  const closeDetailsHandler = (): void => {
    setSearchParams(getSearchParamsWithout(searchParams, ['details']));
  };

  if (isLoading) return <Loader />;

  if (!person) return null;

  return (
    <div className={'details__wrapper'}>
      <img
        className={'details__btn_close'}
        src={CloseSvg}
        alt={'Close details'}
        width={'24'}
        onClick={closeDetailsHandler}
      />
      <div className={'details__content'}>
        <h3>Person Details:</h3>
        <p>{`${person.name} was born in ${person.birth_year || 'n/a'}.`}</p>
        <p>{`${
          person.gender === 'male'
            ? 'His'
            : person.gender === 'female'
            ? 'Her'
            : 'Its'
        } height is ${person.height || 'n/a'}.`}</p>
        <p>{`Films count with is ${String(person.films.length || 0)}.`}</p>
      </div>
    </div>
  );
};

export default PersonDetails;
