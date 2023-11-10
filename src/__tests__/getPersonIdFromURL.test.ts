import { getPersonIdFromURL } from '@helpers/getPersonIdFromURL';

describe('getPersonIdFromURL should return', () => {
  test('value with type number', () => {
    expect(typeof getPersonIdFromURL('https://swapi/api/people/1/')).toBe(
      'number',
    );
    expect(typeof getPersonIdFromURL('https://swapi/api/people/78/')).toBe(
      'number',
    );
    expect(typeof getPersonIdFromURL('https://swapi/api/people/abc/')).toBe(
      'number',
    );
  });
  test('correct value with correct string', () => {
    expect(getPersonIdFromURL('people/1/')).toBe(1);
    expect(getPersonIdFromURL('people/1/abc')).toBe(1);
    expect(getPersonIdFromURL('https://swapi/api/people/1/')).toBe(1);
    expect(getPersonIdFromURL('https://swapi/api/people/78/')).toBe(78);
  });
  test('0 with incorrect string', () => {
    expect(getPersonIdFromURL('')).toBe(0);
    expect(getPersonIdFromURL('people/abc/')).toBe(0);
    expect(getPersonIdFromURL('https://swapi/api/people/s12/')).toBe(0);
    expect(getPersonIdFromURL('https://swapi/api/people/12s/')).toBe(0);
  });
});
