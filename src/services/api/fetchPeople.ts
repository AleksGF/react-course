import { fetchApi } from '@services/api/fetchApi';
import { API_URL, FIRST_PAGE, ITEMS_PER_PAGE } from '@constants/constants';
import { type Person, type peopleApiResponse } from '@/types/apiTypes';

interface PeopleFetchResult {
  totalCount: number;
  people: Person[];
}

// Get api page number for different itemsPerPage counts
const getApiPageNumber = (pageNumber: number, itemsPerPage: number): number =>
  (pageNumber - 1) * (itemsPerPage / ITEMS_PER_PAGE.DEFAULT) + 1;

export const fetchPeople = async (
  currentPage: number = FIRST_PAGE,
  personsPerPage: ITEMS_PER_PAGE = ITEMS_PER_PAGE.DEFAULT,
  searchValue: string = '',
): Promise<PeopleFetchResult> => {
  const fetchCount = personsPerPage / ITEMS_PER_PAGE.DEFAULT;
  const result: PeopleFetchResult = { totalCount: 0, people: [] };

  const page = getApiPageNumber(currentPage, personsPerPage);

  let apiUrl: string | null = searchValue
    ? `${API_URL}?search=${encodeURIComponent(searchValue)}&page=${String(
        page,
      )}`
    : `${API_URL}?page=${String(page)}`;
  for (let i = 0; i < fetchCount; i += 1) {
    const res: peopleApiResponse | null =
      await fetchApi<peopleApiResponse>(apiUrl);

    if (!res) return result;

    result.totalCount = res.count;
    result.people.push(...res.results);

    apiUrl = res.next;

    if (!apiUrl) break;
  }

  return result;
};
