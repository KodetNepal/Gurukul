import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCEkWUvcmL5p1kSTdUHbFbtFpGf3ydNg1Y",
  authDomain: "sikshyasetu.firebaseapp.com",
  projectId: "sikshyasetu",
  storageBucket: "sikshyasetu.firebasestorage.app",
  messagingSenderId: "416898715959",
  appId: "1:416898715959:web:2c7ab86db6775f4bd48ab2",
  measurementId: "G-1RSV4VBFYM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
