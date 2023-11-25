export const getMockLocation = (
  testLocation: string,
): { getHref: jest.Mock; assignLocation: jest.Mock } => {
  const getHref = jest.fn(() => testLocation);
  const assignLocation = jest.fn();

  Object.defineProperty(window, 'location', {
    value: {
      href: getHref(),
      assign: assignLocation,
    },
  });

  return { getHref, assignLocation };
};
