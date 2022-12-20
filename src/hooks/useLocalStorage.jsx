import { useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const dataFromStorage = JSON.parse(window.localStorage.getItem(key));

  const [state, setState] = useState(() => {
    return dataFromStorage ?? defaultValue;
  });

  return [state, setState];
};
