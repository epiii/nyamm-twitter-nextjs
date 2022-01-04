import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCMxqxOOQ5rbE3uQXJwT63gykIBYFORCko",
    authDomain: "twitter-clone-212.firebaseapp.com",
    projectId: "twitter-clone-212",
    storageBucket: "twitter-clone-212.appspot.com",
    messagingSenderId: "721262868987",
    appId: "1:721262868987:web:5575253730b0094613735e"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export default app
export { db, storage };
