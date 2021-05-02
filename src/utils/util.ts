export const isEmptyObject = (obj: any): boolean => !Object.keys(obj).length;

export const isEmpty = (value: any): boolean => {
  if (value === '' || value === null || value === undefined || (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
    return true;
  }
  return false;
};
