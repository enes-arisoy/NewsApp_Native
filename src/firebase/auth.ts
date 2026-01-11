import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from './firebaseConfig';

export const auth = getAuth(firebaseApp);

export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
