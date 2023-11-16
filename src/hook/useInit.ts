import { useAppDispatch, useAppSelector } from '@src/hook/hook';
import { getSavedSearchValue } from '@src/store/mainSlice';
import { setInitializationStatus } from '@src/store/appSlice';

export const useInit = (): void => {
  const { isInitialized } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  if (isInitialized) return;

  dispatch(getSavedSearchValue());
  dispatch(setInitializationStatus(true));
};
