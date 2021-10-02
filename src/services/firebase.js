import { firebase, FieldValue } from '../lib/firebase';

const getData = (result) => {
  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
};

export const doesUserExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.size > 0;
};

export const getUserByUserId = async (userId) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  return getData(result);
};

export const getUserByUsername = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get();

  return getData(result);
};

export const getUserPhotosByUserId = async (userId) => {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get();

  return getData(result);
};

export const getSuggestedProfiles = async (userId, following) => {
  let query = firebase.firestore().collection('users');

  if (following.length > 0) {
    query = query.where('userId', 'not-in', [...following, userId]);
  } else {
    query = query.where('userId', '!=', userId);
  }
  const result = await query.limit(10).get();

  return getData(result);
};

export const updateLoggedInUserFollowing = async (
  loggedInUserDocId,
  profileId,
  isFollowing = false
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowing
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
};

export const updateFollowedUserFollowers = async (
  profileDocId,
  userId,
  isFollower = false
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollower
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
};

export const getFollowingUserPhotos = async (userId, following) => {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const photos = getData(result);

  const photosWithUserDetails = await Promise.all(
    photos.map(async (photo) => {
      let userLikedPhoto = false;

      if (photo.likes.length) {
        if (photo.likes.includes(userId)) {
          userLikedPhoto = true;
        }

        photo.likes = await Promise.all(
          photo.likes.map(async (userId) => {
            const [user] = await getUserByUserId(userId);
            return user;
          })
        );
      }

      if (photo.comments.length) {
        photo.comments = photo.comments.sort(
          (a, b) => b.createdDate - a.createdDate
        );
      }

      const [user] = await getUserByUserId(photo.userId);
      const { username } = user;

      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
};

export const toggleLikedPhoto = async (docId, userId, toggleLiked) => {
  await firebase
    .firestore()
    .collection('photos')
    .doc(docId)
    .update({
      likes: toggleLiked
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
};

export const updatePostComments = async (docId, commentData) => {
  await firebase
    .firestore()
    .collection('photos')
    .doc(docId)
    .update({
      comments: FieldValue.arrayUnion(commentData),
    });
};
