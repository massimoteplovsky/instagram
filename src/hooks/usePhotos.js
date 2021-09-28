import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
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
      }
    };

    fetchData();
  }, []);

  return { loading, photos };
};

export default usePhotos;
