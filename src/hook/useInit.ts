import { useAppDispatch, useAppSelector } from '@src/hook/hook';
import {
  getSavedSearchValue,
  setItemsPerPage,
  showPersonDetails,
} from '@src/store/mainSlice';
import { setInitializationStatus } from '@src/store/appSlice';
import { getNumberFromSearchParams } from '@src/helpers/getNumberFromSearchParams';
import { isItemsPerPageValid } from '@src/helpers/isItemsPerPageValid';
import {
  DETAILSVIEWID_SEARCHPARAMS_KEY,
  ITEMSPERPAGE_SEARCHPARAMS_KEY,
} from '@src/constants/constants';

export const useInit = (): void => {
  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector((state) => state.app);

  if (isInitialized) return;

  const searchParams = new URL(window.location.href).searchParams;

  const itemsPerPage = getNumberFromSearchParams(
    searchParams,
    ITEMSPERPAGE_SEARCHPARAMS_KEY,
  );

  if (itemsPerPage && isItemsPerPageValid(itemsPerPage)) {
    dispatch(setItemsPerPage(itemsPerPage));
  }

  const detailsViewId = getNumberFromSearchParams(
    searchParams,
    DETAILSVIEWID_SEARCHPARAMS_KEY,
  );

  if (detailsViewId && detailsViewId > 0) {
    dispatch(showPersonDetails(detailsViewId));
  }

  dispatch(getSavedSearchValue());
  dispatch(setInitializationStatus(true));
};
