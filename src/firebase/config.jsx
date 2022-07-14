import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_iP3TZUMWfb3cIG-jk-_vkLDgyK53tY0",
  authDomain: "molhem-63557.firebaseapp.com",
  projectId: "molhem-63557",
  storageBucket: "molhem-63557.appspot.com",
  messagingSenderId: "287716059183",
  appId: "1:287716059183:web:e6fdcb82d0172ea501beda",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const store = getFirestore(app);
const storage = getStorage(app);

export { app, store, storage, auth, firebaseConfig, provider };
