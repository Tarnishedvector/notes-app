
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "st-app-f0fe7",
  storageBucket: "st-app-f0fe7.firebasestorage.app",
  messagingSenderId: "537090451436",
  appId: "1:537090451436:web:8bbfc86e410350dd0dc2c9",
  measurementId: "G-THLSNZQG3M"
};


const app = initializeApp(firebaseConfig)


export const db = getFirestore(app)
