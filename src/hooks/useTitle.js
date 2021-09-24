import { useEffect } from 'react';

const useTitle = (text) => {
  useEffect(() => {
    document.title = text;
  }, []);
};

export default useTitle;
