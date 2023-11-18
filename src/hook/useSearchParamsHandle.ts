import { useAppSelector } from '@src/hook/hook';
import { getNumberFromSearchParams } from '@src/helpers/getNumberFromSearchParams';
import {
  DETAILSVIEWID_SEARCHPARAMS_KEY,
  ITEMSPERPAGE_SEARCHPARAMS_KEY,
} from '@src/constants/constants';
import { getSearchParamsWithout } from '@src/helpers/getSearchParamsWithout';
import { getExtendedSearchParams } from '@src/helpers/getExtendedSearchParams';

const setSearchParams = (searchParams: URLSearchParams): void => {
  const url = new URL(window.location.href);
  url.search = searchParams.toString();
  window.history.pushState({}, '', url);
};

export const useSearchParamsHandle = (): void => {
  const { isInitialized } = useAppSelector((state) => state.app);
  const { itemsPerPage, detailsView } = useAppSelector((state) => state.main);

  if (!isInitialized) return;

  const searchParams = new URL(window.location.href).searchParams;

  const detailsViewId = getNumberFromSearchParams(
    searchParams,
    DETAILSVIEWID_SEARCHPARAMS_KEY,
  );

  if (!detailsView && detailsViewId) {
    setSearchParams(
      getSearchParamsWithout(searchParams, [DETAILSVIEWID_SEARCHPARAMS_KEY]),
    );
  }

  if (detailsView && detailsView !== detailsViewId) {
    setSearchParams(
      getExtendedSearchParams(searchParams, {
        [DETAILSVIEWID_SEARCHPARAMS_KEY]: String(detailsView),
      }),
    );
  }

  const itemsLimit = getNumberFromSearchParams(
    searchParams,
    ITEMSPERPAGE_SEARCHPARAMS_KEY,
  );

  if (itemsLimit !== itemsPerPage) {
    setSearchParams(
      getExtendedSearchParams(searchParams, {
        [ITEMSPERPAGE_SEARCHPARAMS_KEY]: String(itemsPerPage),
      }),
    );
  }
};
