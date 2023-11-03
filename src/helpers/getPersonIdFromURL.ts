const getPersonIdFromURL = (url: string): number => {
  const urlMatch = url.match(/people\/(\d*)\//);

  return urlMatch && urlMatch[1] ? Number(urlMatch[1]) : 0;
};

export default getPersonIdFromURL;
