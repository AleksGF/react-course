import { MAX_FILE_SIZE, VALID_FILE_EXTENSIONS } from '@/constants/constants';

export const isValidImageType = (file: unknown): boolean => {
  if (!file || typeof file !== 'object' || !('name' in file)) return false;

  const fileName = file.name;

  if (!fileName || typeof fileName !== 'string') return false;

  const fileExtention = fileName.split('.').at(-1);

  if (!fileExtention) return false;

  return VALID_FILE_EXTENSIONS.includes(fileExtention);
};

export const isValidImageSize = (file: unknown): boolean => {
  if (!file || typeof file !== 'object' || !('size' in file)) return false;

  const fileSize = file.size;

  if (!fileSize || typeof fileSize !== 'number') return false;

  return fileSize <= MAX_FILE_SIZE;
};
