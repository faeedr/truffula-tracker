import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDKLvhEJhfsa_6xXa8wch58-IgI_Zp-tZM",
  authDomain: "truffula-tracker.firebaseapp.com",
  projectId: "truffula-tracker",
  storageBucket: "truffula-tracker.firebasestorage.app",
  messagingSenderId: "232901021009",
  appId: "1:232901021009:web:ed4f68c1d34edbd6f71770",
  measurementId: "G-7NTJLPG3RP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
