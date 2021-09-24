import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from '../seeds';

const firebaseConfig = {
  apiKey: 'AIzaSyD8hDvwTzHRJ8X78kS7yFnw_6QJgHUUFgk',
  authDomain: 'instagram-7a82c.firebaseapp.com',
  projectId: 'instagram-7a82c',
  storageBucket: 'instagram-7a82c.appspot.com',
  messagingSenderId: '1068895201246',
  appId: '1:1068895201246:web:ca27373cc838df79621f4f',
};

const firebase = Firebase.initializeApp(firebaseConfig);
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
