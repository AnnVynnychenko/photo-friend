// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
//storage img
import "firebase/storage";
//database
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcHt5OrEHWqW1jRT5CEtmLwhEV5uOG8yw",
  authDomain: "photo-friend-dcd3b.firebaseapp.com",
  projectId: "photo-friend-dcd3b",
  storageBucket: "photo-friend-dcd3b.appspot.com",
  messagingSenderId: "270459813197",
  appId: "1:270459813197:android:949eb7453b2931c3a60b04",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
