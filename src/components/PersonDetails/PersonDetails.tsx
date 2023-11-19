import React, { type FC, useEffect } from 'react';
import { hidePersonDetails } from '@src/store/mainSlice';
import { useAppDispatch, useAppSelector } from '@src/hook/hook';
import { useGetPersonQuery } from '@src/services/api/peopleApi';
import Loader from '@components/common/Loader/Loader';
import CloseSvg from '@src/assets/close.svg';
import './PersonDetails.scss';
import { setDetailsLoadingStatus } from '@src/store/appSlice';

interface PersonDetailsProps {
  personId: number;
}

const PersonDetails: FC<PersonDetailsProps> = (props) => {
  const dispatch = useAppDispatch();
  const { isDetailsLoading } = useAppSelector((state) => state.app);

  const { personId } = props;

  const closeDetailsHandler = (): void => {
    dispatch(hidePersonDetails());
  };

  const { data, isFetching } = useGetPersonQuery(personId);

  useEffect(() => {
    dispatch(setDetailsLoadingStatus(isFetching));
  }, [isFetching]);

  if (isDetailsLoading) return <Loader />;

  return (
    <div className={'details__wrapper'}>
      <img
        className={'details__btn_close'}
        src={CloseSvg}
        alt={'Close details'}
        width={'24'}
        onClick={closeDetailsHandler}
        data-testid={'details-close-btn'}
      />
      <div className={'details__content'}>
        {!data && <h3>No one found</h3>}
        {!!data && (
          <>
            <h3>Person Details:</h3>
            <p>{`${data.name} was born in ${data.birth_year || 'n/a'}.`}</p>
            <p>{`${
              data.gender === 'male'
                ? 'His'
                : data.gender === 'female'
                ? 'Her'
                : 'Its'
            } height is ${data.height || 'n/a'}.`}</p>
            <p>{`Films count with is ${String(data.films?.length || 0)}.`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonDetails;
