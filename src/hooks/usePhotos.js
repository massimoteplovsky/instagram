import { useState, useEffect } from 'react';
import { getFollowingUserPhotos } from '../services/firebase';

const usePhotos = (userId, following) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (following.length) {
        const photos = await getFollowingUserPhotos(userId, following);
        photos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(photos);
        setLoading(false);
        return;
      }

      setLoading(false);
    };

    fetchData();
  }, [following.length]);

  return { loading, photos };
};

export default usePhotos;
