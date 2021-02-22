import firebase from "firebase/app";
import "firebase/auth"; // 이걸 하지 않으면 인증기능을 할 수 없다.
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = { // .env 에서 불러쓰다가 자꾸 apikey값 에러가 떠서 그냥 입력했음 ... 
    apiKey: "AIzaSyBjeyXoSahY7tNj6NseRDYNiAwPiYOEJME",
    authDomain: "switter-4686c.firebaseapp.com",
    projectId: "switter-4686c",
    storageBucket: "switter-4686c.appspot.com",
    messagingSenderId: "1029374224828",
    appId: "1:1029374224828:web:8827c851f41bd1a38563b9",
  };

firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const authService = firebase.auth();

export const dbService = firebase.firestore();
export const storageService = firebase.storage();