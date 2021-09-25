import { firebase, FieldValue } from '../lib/firebase';

export const doesUserExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  console.log(result);

  return result.size > 0;
};
