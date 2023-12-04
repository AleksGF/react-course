import { MAX_FILE_SIZE, VALID_FILE_EXTENSIONS } from '@/constants/constants';

export const isValidImageType = (file: File): boolean => {
  if (!file) return true;

  const fileName = file.name;

  if (!fileName) return false;

  const fileExtension = fileName.split('.').at(-1);

  if (!fileExtension) return false;

  return VALID_FILE_EXTENSIONS.includes(fileExtension);
};

export const isValidImageSize = (file: File): boolean => {
  if (!file) return true;

  const fileSize = file.size;

  if (!fileSize) return false;

  return fileSize <= MAX_FILE_SIZE;
};
