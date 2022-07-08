import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA99B4qM6bXhpccBc7HIA5wj_hDdzq1XDg',
  authDomain: 'crwn-clothing-db-535e0.firebaseapp.com',
  projectId: 'crwn-clothing-db-535e0',
  storageBucket: 'crwn-clothing-db-535e0.appspot.com',
  messagingSenderId: '177043105851',
  appId: '1:177043105851:web:1405cf29a7b68b014dd41e',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomerParameters({
  prompt: 'select_account',
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (error) {
      console.log('error', error.message);
    }
  }
  return userDocRef;
};
