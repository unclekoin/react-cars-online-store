type DataType = string[] | number[] | [] | boolean;

interface FilterInterface {
  [key: string]: DataType;
}

export const getStorageFilter = (name: string): [FilterInterface, DataType] => {
  const data = JSON.parse(localStorage.getItem('filters') || '{}');

  if (name === 'rating') {
    if (!data[name]) data[name] = false;
  } else if (!data[name]) data[name] = [];

  return [data, data[name]];
};

export const setStorageFilter = (name: string, data: DataType, storageData: FilterInterface): void => {
  storageData[name] = data;
  localStorage.setItem('filters', JSON.stringify(storageData));
};
